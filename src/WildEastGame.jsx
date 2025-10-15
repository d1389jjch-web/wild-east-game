import React, { useState, useEffect } from 'react';
import { Shield, DollarSign, TrendingUp, TrendingDown, Minus } from 'lucide-react';

const WildEastGame = () => {
  const [reputation, setReputation] = useState(10);
  const [wealth, setWealth] = useState(10);
  const [round, setRound] = useState(0);
  const [phase, setPhase] = useState('intro');
  const [clearedPhase1, setClearedPhase1] = useState(false);
  const [clearedPhase2, setClearedPhase2] = useState(false);
  const [usedQuizzes, setUsedQuizzes] = useState([]);
  const [gameEnded, setGameEnded] = useState(false);
  const [endingMessage, setEndingMessage] = useState('');
  const [feedbackMessage, setFeedbackMessage] = useState('');
  const [showFeedback, setShowFeedback] = useState(false);

  const quizzes = [
    {
      q: "Which was a key domestic effect of the Soviet war in Afghanistan?",
      options: [
        "Rapid technological modernization",
        "Stronger ideological cohesion",
        "Erosion of regime legitimacy as costs became public",
        "Stabilization of energy prices"
      ],
      correct: 2
    },
    {
      q: "A built-in contradiction of the Soviet nationalities policy was:",
      options: [
        "Support for local languages paired with highly centralized control",
        "Full fiscal autonomy for all republics",
        "Abolition of ethnic territorial units",
        "Free exit for any republic at any time"
      ],
      correct: 0
    },
    {
      q: "The core rationale of post-Soviet price liberalization in 1992 was to:",
      options: [
        "Reduce trade deficits",
        "Replace plan targets with price signals to allocate resources",
        "Increase military output",
        "Fix the exchange rate"
      ],
      correct: 1
    },
    {
      q: "Immediately after prices were freed in 1992, most households experienced:",
      options: [
        "Stable real incomes",
        "A sharp fall in purchasing power as prices jumped ahead of wages",
        "Plentiful cheap credit",
        "Automatic indexation of savings"
      ],
      correct: 1
    },
    {
      q: "The voucher privatization program was intended to:",
      options: [
        "Concentrate ownership in a state holding company",
        "Create equal citizen stakes in former state firms",
        "Reserve shares for foreign investors only",
        "Privatize only small retail shops"
      ],
      correct: 1
    },
    {
      q: "Why did many citizens sell vouchers cheaply to funds or insiders?",
      options: [
        "Vouchers had legal restrictions on transfer",
        "Hyperinflation and weak investor protection made cash today more attractive",
        "Banks refused to buy vouchers",
        "Vouchers expired within 10 days"
      ],
      correct: 1
    },
    {
      q: "The loans-for-shares scheme (1995–1996) is best described as:",
      options: [
        "A consumer credit program for households",
        "A temporary nationalization of banks",
        "Collateralized transfers of stakes in major resource firms to select financiers at low valuations",
        "An anti-monopoly law targeting metals and oil"
      ],
      correct: 2
    },
    {
      q: "Which group is not cited as a typical recruitment source for post-Soviet organized crime?",
      options: [
        "Sportsmen",
        "Afghan war veterans",
        "Thieves-in-law",
        "Foreign tourists"
      ],
      correct: 3
    },
    {
      q: "Which change most undercut mafia protection markets in the 2000s?",
      options: [
        "Collapse of private security firms",
        "Strengthening of the state and courts, plus growth of licensed private security",
        "End of taxation",
        "Lifting of all import tariffs"
      ],
      correct: 1
    }
  ];

  const rounds = [
    {
      title: "The Beginning",
      year: "1992",
      story: "A small kiosk owner refuses to pay your 'protection fee,' claiming he doesn't need it. Word spreads quickly. If you do nothing, your reputation will crumble before it's even built.",
      choices: [
        { text: "Burn down his kiosk at night as a warning to everyone.", rep: 25, wealth: -20 },
        { text: "Beat him up and also take out some local thugs to prove your protection is worth the price.", rep: 5, wealth: -5 },
        { text: "Use your network to find his supplier and choke his business until he pays.", rep: -10, wealth: -10 }
      ]
    },
    {
      title: "Turf War",
      year: "1993",
      story: "Another Afghan veterans' crew is expanding into your district. They are well-armed and respected. This is a test of strength.",
      choices: [
        { text: "Declare war. Ambush their leaders and fight them on the streets until they are broken.", rep: 30, wealth: -20 },
        { text: "Request a sit-down arbitrated by a respected Thief-in-Law to divide territory.", rep: 15, wealth: -5 },
        { text: "Avoid a direct fight. Secretly approach their clients and offer better protection for a lower price.", rep: -10, wealth: 5 }
      ]
    },
    {
      title: "The First Big Contract",
      year: "1993",
      story: "A factory director approaches you. His plant is being stripped by creditors and thieves. He needs muscle, customs connections, and someone who can 'solve problems.'",
      choices: [
        { text: "Demand a 30% share of his company in exchange for your protection.", rep: 10, wealth: 20 },
        { text: "Handle security and smooth customs for a 20% share.", rep: 5, wealth: 10 }
      ]
    },
    {
      title: "Shadow Arbitration",
      year: "1994",
      story: "A businessman who owes millions to another criminal group begs you to mediate. If you handle it well, you will be seen as a neutral arbiter—a figure of authority.",
      choices: [
        { text: "Kidnap the debtor's family to force immediate payment.", rep: 25, wealth: 10 },
        { text: "Hold a sit-down, investigate assets, and seize property per underworld rules.", rep: 15, wealth: 5 },
        { text: "Convert the debt into a long-term liability to you.", rep: 10, wealth: 10 }
      ]
    },
    {
      title: "The Veterans' Network",
      year: "1995",
      story: "Your Afghan comrades have a scheme: smuggling alcohol from the Baltics and selling it tax-free. The profits are enormous, but it requires upfront capital and armed convoys.",
      choices: [
        { text: "Invest your own men and money to become a major partner in alcohol smuggling.", rep: 5, wealth: 30 },
        { text: "Provide armed guards for fixed payments.", rep: 5, wealth: 15 }
      ]
    },
    {
      title: "The New Competitors",
      year: "1996",
      story: "Western-style security firms with licenses and lawyers are appearing. They can't match your muscle, but they have government connections and legitimacy.",
      choices: [
        { text: "Intimidate their employees and sabotage operations.", rep: 20, wealth: -20 },
        { text: "Create your own legal-looking security front.", rep: -20, wealth: 15 },
        { text: "Make a deal: they take official contracts, you take the dirty work.", rep: 10, wealth: 5 }
      ]
    },
    {
      title: "The Privatization Wave",
      year: "1997",
      story: "An oil refinery is going up for auction. It's worth hundreds of millions, but the bidding is rigged. You have a chance to get in—either by force or by playing the game.",
      choices: [
        { text: "Forcefully invest to become a major shareholder in the oil refinery.", rep: 15, wealth: 35 },
        { text: "Use influence to secure the bid for an exclusive long-term security contract.", rep: 10, wealth: 25 }
      ]
    },
    {
      title: "A Touch of Politics",
      year: "1998",
      story: "A regional politician offers a deal: fund his campaign, and he will make sure law enforcement leaves you alone. It's expensive, but it could be insurance.",
      choices: [
        { text: "Donate off the books and persuade voters.", rep: 15, wealth: -30 },
        { text: "Stay out of politics.", rep: -5, wealth: 5 }
      ]
    },
    {
      title: "The 'Businessman'",
      year: "1999",
      story: "You now control legitimate enterprises. Some advisors say you should keep a large armed crew and intimidate rivals. Others say you should downsize, go clean, and rely on money and lawyers.",
      choices: [
        { text: "Keep the large crew and expand through force.", rep: 30, wealth: 5 },
        { text: "Downsize the crew, move them into legitimate jobs, grow with money.", rep: -20, wealth: 30 }
      ]
    },
    {
      title: "International Business",
      year: "1999",
      story: "Foreign consultants propose moving your assets offshore and accepting international investment. It's safer from Russian chaos, but also more exposed to Western scrutiny.",
      choices: [
        { text: "Accept offshores and international investments.", rep: -10, wealth: 20 },
        { text: "Refuse and keep money at home.", rep: 10, wealth: 10 }
      ]
    },
    {
      title: "A Signal of the New Order",
      year: "2000",
      story: "A major oligarch is suddenly arrested on national television. The message is clear: the new president is restoring state power. The Wild East is ending.",
      choices: [
        { text: "Halt all illegal activities and focus on legitimate businesses.", rep: -20, wealth: -15 },
        { text: "Spend heavily to bribe high-ranking officials.", rep: 10, wealth: -45 },
        { text: "Use media to denounce the arrest as political.", rep: 60, wealth: -25 }
      ]
    },
    {
      title: "The Tax Storm",
      year: "2001",
      story: "The tax authorities come after you with claims stretching back years. They have evidence—real and fabricated. This is the state's way of asserting control.",
      choices: [
        { text: "Pay back taxes and fines to make the books clean.", rep: -10, wealth: -50 },
        { text: "Hire top lawyers to fight the claims.", rep: 20, wealth: -15 }
      ]
    },
    {
      title: "The Last Feast",
      year: "2002",
      story: "A rival oligarch has fallen from grace. His assets are being seized and sold. You can buy them cheaply—but this may be a trap, or a test of loyalty.",
      choices: [
        { text: "Buy rival assets cheap and absorb operations.", rep: 50, wealth: 45 },
        { text: "Tip off authorities to prove loyalty.", rep: -40, wealth: 5 },
        { text: "Turn it down and secure what you have.", rep: 10, wealth: 0 }
      ]
    },
    {
      title: "The Greed of the New Nobility",
      year: "2003",
      story: "A Kremlin-connected oligarch wants to take over your most profitable asset. He offers a low price and makes veiled threats. This is a moment of truth.",
      choices: [
        { text: "Arrange a fatal accident for the oligarch.", rep: 180, wealth: -30 },
        { text: "Wage a legal counter-attack.", rep: -10, wealth: -60 },
        { text: "Cut a deal and sell at a much higher price.", rep: -50, wealth: 90 }
      ]
    }
  ];

  const getFeedback = (repChange, wealthChange) => {
    let repFeedback = '';
    let wealthFeedback = '';
    let repIcon = null;
    let wealthIcon = null;

    if (repChange > 20) {
      repFeedback = 'Your name spreads like wildfire through the underworld';
      repIcon = <TrendingUp className="text-red-400 inline" size={16} />;
    } else if (repChange > 5) {
      repFeedback = 'Your reputation grows steadily';
      repIcon = <TrendingUp className="text-red-300 inline" size={16} />;
    } else if (repChange > -5) {
      repFeedback = 'Your standing remains relatively stable';
      repIcon = <Minus className="text-gray-400 inline" size={16} />;
    } else if (repChange > -15) {
      repFeedback = 'Some question your strength';
      repIcon = <TrendingDown className="text-orange-400 inline" size={16} />;
    } else {
      repFeedback = 'Your authority is visibly weakened';
      repIcon = <TrendingDown className="text-orange-500 inline" size={16} />;
    }

    if (wealthChange > 25) {
      wealthFeedback = 'Money flows into your coffers';
      wealthIcon = <TrendingUp className="text-green-400 inline" size={16} />;
    } else if (wealthChange > 5) {
      wealthFeedback = 'Your finances improve';
      wealthIcon = <TrendingUp className="text-green-300 inline" size={16} />;
    } else if (wealthChange > -10) {
      wealthFeedback = 'The cost is manageable';
      wealthIcon = <Minus className="text-gray-400 inline" size={16} />;
    } else if (wealthChange > -30) {
      wealthFeedback = 'This decision hits your wallet hard';
      wealthIcon = <TrendingDown className="text-yellow-400 inline" size={16} />;
    } else {
      wealthFeedback = 'Your treasury takes a severe blow';
      wealthIcon = <TrendingDown className="text-yellow-500 inline" size={16} />;
    }

    return { repFeedback, wealthFeedback, repIcon, wealthIcon };
  };

  const getStatusMessage = (currentRound, rep, wealth) => {
    if (currentRound === 5) {
      if (rep >= 90) return { type: 'success', msg: 'Your empire is feared and respected. The streets know your name.' };
      if (rep >= 75) return { type: 'warning', msg: 'You have established yourself, but your grip is not yet unshakeable.' };
      return { type: 'danger', msg: 'Your position is precarious. Without more respect, you may not survive.' };
    }
    
    if (currentRound === 10) {
      const repOk = rep >= 85;
      const wealthOk = wealth >= 130;
      
      if (repOk && wealthOk) return { type: 'success', msg: 'Your transformation is proceeding well. You command respect and resources.' };
      if (!repOk && !wealthOk) return { type: 'danger', msg: 'Your empire is crumbling. You lack both influence and capital.' };
      if (!repOk) return { type: 'danger', msg: 'Money alone cannot save you. The underworld no longer fears your name.' };
      return { type: 'danger', msg: 'Reputation without wealth is hollow. You need capital to survive the new era.' };
    }
    
    return null;
  };

  const checkEnding = () => {
    if (round === 5 && !clearedPhase1) {
      if (reputation < 75) {
        setEndingMessage({
          title: "Swallowed by the Streets",
          text: "You failed to establish yourself in the brutal world of 1990s Russia. Without sufficient reputation, rivals and ambitious upstarts swallowed your operation. You fade into obscurity, just another failed veteran trying to survive the chaos.",
          stats: `Final Reputation: ${reputation} | Final Wealth: ${wealth}`
        });
        setGameEnded(true);
        return true;
      }
      setClearedPhase1(true);
    }

    if (round === 10 && !clearedPhase2) {
      if (wealth < 130) {
        setEndingMessage({
          title: "Bankrupt Warlord",
          text: "You built a fearsome reputation but failed to convert it into lasting wealth. As the 2000s dawn and the state returns, you find yourself with muscle but no money. Your empire crumbles under debt and pressure.",
          stats: `Final Reputation: ${reputation} | Final Wealth: ${wealth}`
        });
        setGameEnded(true);
        return true;
      }
      if (reputation < 85) {
        setEndingMessage({
          title: "Forgotten Force",
          text: "In the consolidation phase, you lost your edge. Without sufficient reputation in the underworld, you are squeezed out by better-connected rivals and the returning state apparatus. You remain a minor player, forgotten in the new order.",
          stats: `Final Reputation: ${reputation} | Final Wealth: ${wealth}`
        });
        setGameEnded(true);
        return true;
      }
      setClearedPhase2(true);
    }

    if (round === 14) {
      if (reputation >= 180) {
        setEndingMessage({
          title: "Enemy of the State",
          text: "Your reputation grew too large, your defiance too public. The Kremlin sees you as a threat to their monopoly on power. You are arrested on fabricated charges, your assets seized. Some say you were betrayed. Others say you flew too close to the sun. Either way, you will spend your remaining years in prison, a symbol of the Wild East that could not be tamed.",
          stats: `Final Reputation: ${reputation} | Final Wealth: ${wealth}`
        });
        setGameEnded(true);
        return true;
      }
      if (reputation < 60 || wealth < 200) {
        setEndingMessage({
          title: "A Quiet Life in Poverty",
          text: "The game is over, and you are not among the winners. You lack both the reputation to command respect and the wealth to live comfortably. As the state consolidates power, you find yourself on the margins—a relic of a bygone era with nothing to show for it. You live out your days in a small apartment, haunted by what might have been.",
          stats: `Final Reputation: ${reputation} | Final Wealth: ${wealth}`
        });
        setGameEnded(true);
        return true;
      }
      setEndingMessage({
        title: "The Legitimate Tycoon",
        text: "You walked the tightrope between the underworld and legitimacy, and you succeeded. With enough wealth to live comfortably and enough discretion to avoid the Kremlin's wrath, you transform yourself into a respectable businessman. Your past is whispered about but never proven. You sit on corporate boards, donate to charity, and enjoy the fruits of your labor. The Wild East made you, but you were smart enough to leave it behind.",
        stats: `Final Reputation: ${reputation} | Final Wealth: ${wealth}`
      });
      setGameEnded(true);
      return true;
    }

    return false;
  };

  const makeChoice = (choiceIndex) => {
    const choice = rounds[round].choices[choiceIndex];
    const feedback = getFeedback(choice.rep, choice.wealth);
    
    setFeedbackMessage(feedback);
    setShowFeedback(true);
    
    setReputation(prev => prev + choice.rep);
    setWealth(prev => prev + choice.wealth);
    
    setTimeout(() => {
      setShowFeedback(false);
      const nextRound = round + 1;
      
      if (nextRound === 5 || nextRound === 10 || nextRound === 14) {
        setRound(nextRound);
        setPhase('checking');
      } else if (usedQuizzes.length < 9 && Math.random() < 0.4) {
        setPhase('quiz');
      } else {
        setRound(nextRound);
        setPhase('story');
      }
    }, 2500);
  };

  const answerQuiz = (answerIndex) => {
    const availableQuizzes = quizzes.filter((_, i) => !usedQuizzes.includes(i));
    const quizIndex = quizzes.indexOf(availableQuizzes[0]);
    const quiz = quizzes[quizIndex];
    const isCorrect = answerIndex === quiz.correct;
    
    setUsedQuizzes([...usedQuizzes, quizIndex]);
    
    if (isCorrect) {
      setWealth(prev => prev + 15);
      setPhase('quizCorrect');
    } else {
      setWealth(prev => prev - 5);
      setPhase('quizWrong');
    }
    
    setTimeout(() => {
      const nextRound = round + 1;
      if (nextRound === 5 || nextRound === 10 || nextRound === 14) {
        setRound(nextRound);
        setPhase('checking');
      } else if (nextRound < 14) {
        setRound(nextRound);
        setPhase('story');
      }
    }, 2000);
  };

  useEffect(() => {
    if (phase === 'checking') {
      const hasEnded = checkEnding();
      if (!hasEnded && round < 14) {
        setTimeout(() => {
          const statusMsg = getStatusMessage(round, reputation, wealth);
          if (statusMsg) {
            setPhase('status');
          } else {
            setPhase('story');
          }
        }, 1000);
      }
    }
  }, [phase, round]);

  if (phase === 'intro') {
    return (
      <div className="min-h-screen bg-gray-900 text-gray-100 p-8">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl font-bold text-red-600 mb-6 text-center">WILD EAST</h1>
          <h2 className="text-2xl text-gray-300 mb-8 text-center">Rise of the Bratva</h2>
          
          <div className="bg-gray-800 p-6 rounded-lg mb-8 border border-gray-700">
            <p className="mb-4 leading-relaxed">
              The old state is dead, the new one is not yet born. On the ruins of the Soviet Union, an era has ended. The once-omnipotent state apparatus is paralyzed, laws are meaningless, and order is nonexistent.
            </p>
            <p className="mb-4 leading-relaxed">
              For millions, this is the beginning of confusion and hardship; but for a select few with keen instincts and iron wills, it is a "Wild East" of infinite possibility.
            </p>
            <p className="mb-4 leading-relaxed">
              You are one of them. As a veteran returned from Afghanistan, you and your comrades possess qualities that ordinary people lack: a familiarity with violence, steel-like discipline, and a brotherhood forged in life-and-death situations.
            </p>
            <p className="leading-relaxed">
              Welcome to the 1990s, comrade. The frost has settled. Are you ready to become its new lord?
            </p>
          </div>
          
          <button
            onClick={() => {
              setPhase('story');
              setRound(0);
            }}
            className="w-full bg-red-700 hover:bg-red-600 text-white font-bold py-4 px-6 rounded-lg transition-colors"
          >
            BEGIN YOUR RISE
          </button>
        </div>
      </div>
    );
  }

  if (gameEnded) {
    return (
      <div className="min-h-screen bg-gray-900 text-gray-100 p-8">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl font-bold text-red-600 mb-8 text-center">{endingMessage.title}</h1>
          
          <div className="bg-gray-800 p-8 rounded-lg border border-gray-700 mb-6">
            <p className="text-lg leading-relaxed mb-6">{endingMessage.text}</p>
            <div className="border-t border-gray-700 pt-4">
              <p className="text-gray-400">{endingMessage.stats}</p>
            </div>
          </div>
          
          <button
            onClick={() => {
              setReputation(10);
              setWealth(10);
              setRound(0);
              setPhase('intro');
              setClearedPhase1(false);
              setClearedPhase2(false);
              setUsedQuizzes([]);
              setGameEnded(false);
            }}
            className="w-full bg-red-700 hover:bg-red-600 text-white font-bold py-4 px-6 rounded-lg transition-colors"
          >
            PLAY AGAIN
          </button>
        </div>
      </div>
    );
  }

  if (phase === 'status') {
    const statusMsg = getStatusMessage(round, reputation, wealth);
    const bgColor = statusMsg.type === 'success' ? 'bg-green-900 border-green-700' :
                    statusMsg.type === 'warning' ? 'bg-yellow-900 border-yellow-700' :
                    'bg-red-900 border-red-700';
    const textColor = statusMsg.type === 'success' ? 'text-green-300' :
                      statusMsg.type === 'warning' ? 'text-yellow-300' :
                      'text-red-300';
    
    return (
      <div className="min-h-screen bg-gray-900 text-gray-100 p-8 flex items-center justify-center">
        <div className="max-w-2xl">
          <div className={`${bgColor} p-8 rounded-lg border`}>
            <h2 className={`text-2xl font-bold ${textColor} mb-4`}>
              {round === 5 ? 'Phase I Complete' : 'Phase II Complete'}
            </h2>
            <p className="text-lg">{statusMsg.msg}</p>
            <button
              onClick={() => setPhase('story')}
              className="mt-6 bg-gray-700 hover:bg-gray-600 px-6 py-2 rounded transition-colors"
            >
              Continue
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (phase === 'quiz' || phase === 'quizCorrect' || phase === 'quizWrong') {
    const availableQuizzes = quizzes.filter((_, i) => !usedQuizzes.includes(i));
    const quiz = availableQuizzes[0];

    if (phase === 'quizCorrect') {
      return (
        <div className="min-h-screen bg-gray-900 text-gray-100 p-8">
          <div className="max-w-3xl mx-auto">
            <div className="bg-green-900 p-8 rounded-lg border border-green-700">
              <h2 className="text-2xl font-bold text-green-300 mb-4">Correct!</h2>
              <p className="text-lg">Your sharp understanding of Russia's political and social landscape allows your company to navigate the chaos smoothly.</p>
              <p className="text-green-400 mt-4 flex items-center gap-2">
                <TrendingUp size={20} /> Your operations run more efficiently
              </p>
            </div>
          </div>
        </div>
      );
    }

    if (phase === 'quizWrong') {
      return (
        <div className="min-h-screen bg-gray-900 text-gray-100 p-8">
          <div className="max-w-3xl mx-auto">
            <div className="bg-orange-900 p-8 rounded-lg border border-orange-700">
              <h2 className="text-2xl font-bold text-orange-300 mb-4">Incorrect</h2>
              <p className="text-lg">Your unfamiliarity with the shifting situation causes minor setbacks in your operations.</p>
              <p className="text-orange-400 mt-4 flex items-center gap-2">
                <TrendingDown size={20} /> Some inefficiencies arise
              </p>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className="min-h-screen bg-gray-900 text-gray-100 p-8">
        <div className="max-w-3xl mx-auto">
          <div className="mb-6 flex justify-between items-center">
            <div className="flex items-center gap-2">
              <Shield className="text-red-500" />
              <span className="font-bold">Reputation: {reputation}</span>
            </div>
            <div className="flex items-center gap-2">
              <DollarSign className="text-green-500" />
              <span className="font-bold">Wealth: {wealth}</span>
            </div>
          </div>

          <div className="bg-gray-800 p-6 rounded-lg mb-6 border border-gray-700">
            <h2 className="text-xl font-bold text-yellow-500 mb-4">Test Your Knowledge</h2>
            <p className="text-lg mb-6">{quiz.q}</p>
            
            <div className="space-y-3">
              {quiz.options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => answerQuiz(index)}
                  className="w-full text-left bg-gray-700 hover:bg-gray-600 p-4 rounded-lg transition-colors border border-gray-600"
                >
                  {String.fromCharCode(65 + index)}. {option}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (phase === 'checking') {
    return (
      <div className="min-h-screen bg-gray-900 text-gray-100 p-8 flex items-center justify-center">
        <div className="text-center">
          <div className="text-2xl text-gray-400">Evaluating your empire...</div>
        </div>
      </div>
    );
  }

  const currentRound = rounds[round];
  const phaseLabel = round < 5 ? "Phase I: The Wild Growth (1992-1995)" : 
                     round < 10 ? "Phase II: Transformation & Consolidation (1996-1999)" :
                     "Phase III: The Return of the State (2000-Onward)";

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 p-8">
      <div className="max-w-3xl mx-auto">
        <div className="mb-6 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Shield className="text-red-500" />
            <span className="font-bold">Reputation: {reputation}</span>
          </div>
          <div className="flex items-center gap-2">
            <DollarSign className="text-green-500" />
            <span className="font-bold">Wealth: {wealth}</span>
          </div>
        </div>

        {showFeedback && (
          <div className="mb-6 bg-gray-800 p-4 rounded-lg border border-gray-700 space-y-2">
            <div className="flex items-center gap-2">
              {feedbackMessage.repIcon}
              <span className="text-sm text-gray-300">{feedbackMessage.repFeedback}</span>
            </div>
            <div className="flex items-center gap-2">
              {feedbackMessage.wealthIcon}
              <span className="text-sm text-gray-300">{feedbackMessage.wealthFeedback}</span>
            </div>
          </div>
        )}

        <div className="text-center mb-4 text-gray-400 text-sm">{phaseLabel}</div>
        
        <div className="bg-gray-800 p-6 rounded-lg mb-6 border border-gray-700">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold text-red-500">{currentRound.title}</h2>
            <span className="text-gray-400">{currentRound.year}</span>
          </div>
          <p className="text-lg leading-relaxed">{currentRound.story}</p>
        </div>

        <div className="space-y-4">
          {currentRound.choices.map((choice, index) => (
            <button
              key={index}
              onClick={() => makeChoice(index)}
              disabled={showFeedback}
              className="w-full text-left bg-gray-700 hover:bg-gray-600 p-4 rounded-lg transition-colors border border-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {choice.text}
            </button>
          ))}
        </div>

        <div className="mt-6 text-center text-gray-500 text-sm">
          Round {round + 1} of 14
        </div>
      </div>
    </div>
  );
};

export default WildEastGame;
