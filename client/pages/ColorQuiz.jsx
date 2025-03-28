import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const ColorQuiz = () => {
  const navigate = useNavigate();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [result, setResult] = useState(null);
  const [showResult, setShowResult] = useState(false);

  // Quiz questions
  const questions = [
    {
      id: 1,
      question: "What color are the veins on your wrist?",
      options: [
        { text: "Blue or Purple", value: "cool" },
        { text: "Green", value: "warm" },
        { text: "Both blue and green", value: "neutral" },
        { text: "Can't really tell", value: "neutral" }
      ]
    },
    {
      id: 2,
      question: "How does your skin react to sun exposure?",
      options: [
        { text: "Burns easily, rarely tans", value: "light" },
        { text: "Burns first, then tans", value: "light-medium" },
        { text: "Occasionally burns, tans gradually", value: "medium" },
        { text: "Rarely burns, tans easily", value: "medium-dark" },
        { text: "Never burns, deeply pigmented", value: "dark" }
      ]
    },
    {
      id: 3,
      question: "What jewelry tone looks best on you?",
      options: [
        { text: "Silver, platinum, white gold", value: "cool" },
        { text: "Gold, copper, brass", value: "warm" },
        { text: "Both look equally good", value: "neutral" }
      ]
    },
    {
      id: 4,
      question: "What color clothing do you receive the most compliments in?",
      options: [
        { text: "Blues, purples, emeralds", value: "cool" },
        { text: "Oranges, yellows, warm reds", value: "warm" },
        { text: "Earth tones and neutrals", value: "neutral" },
        { text: "Bright, vibrant colors", value: "bright" }
      ]
    },
    {
      id: 5,
      question: "What is your natural hair color?",
      options: [
        { text: "Platinum, ash blonde", value: "cool" },
        { text: "Golden blonde, auburn, copper red", value: "warm" },
        { text: "Brown", value: "neutral" },
        { text: "Black", value: "deep" }
      ]
    }
  ];

  // Handle answer selection
  const handleAnswer = (value) => {
    const newAnswers = { ...answers, [currentQuestion]: value };
    setAnswers(newAnswers);
    
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      // Calculate result
      const skinToneResult = calculateSkinTone(newAnswers);
      setResult(skinToneResult);
      setShowResult(true);
    }
  };

  // Calculate skin tone based on answers
  const calculateSkinTone = (userAnswers) => {
    // Count occurrences of each value
    const counts = {};
    Object.values(userAnswers).forEach(value => {
      counts[value] = (counts[value] || 0) + 1;
    });
    
    // Determine undertone (cool, warm, neutral)
    let undertone = "neutral";
    if ((counts.cool || 0) > (counts.warm || 0) && (counts.cool || 0) > (counts.neutral || 0)) {
      undertone = "cool";
    } else if ((counts.warm || 0) > (counts.cool || 0) && (counts.warm || 0) > (counts.neutral || 0)) {
      undertone = "warm";
    }
    
    // Determine depth (light, medium, dark)
    let depth = "medium";
    if (userAnswers[1] === "light" || userAnswers[1] === "light-medium") {
      depth = "light";
    } else if (userAnswers[1] === "medium-dark" || userAnswers[1] === "dark") {
      depth = "deep";
    }
    
    // Map to skin tone categories
    const skinTones = {
      "light-cool": {
        name: "Light Cool",
        description: "Fair skin with pink or bluish undertones",
        hex: "#F5D6C6",
        recommendations: ["Soft pastels", "Muted blues", "Lavender", "Soft pinks"]
      },
      "light-warm": {
        name: "Light Warm",
        description: "Fair skin with golden or peach undertones",
        hex: "#F7D5AA",
        recommendations: ["Warm peach", "Coral", "Ivory", "Soft gold"]
      },
      "light-neutral": {
        name: "Light Neutral",
        description: "Fair skin with balanced undertones",
        hex: "#F0D0B7",
        recommendations: ["Soft neutrals", "Light blues", "Muted greens", "Soft rose"]
      },
      "medium-cool": {
        name: "Medium Cool",
        description: "Medium skin with pink or olive undertones",
        hex: "#E0B492",
        recommendations: ["Jewel tones", "Emerald", "Ruby", "Sapphire blue"]
      },
      "medium-warm": {
        name: "Medium Warm",
        description: "Medium skin with golden or yellow undertones",
        hex: "#D8A878",
        recommendations: ["Terracotta", "Amber", "Olive green", "Warm browns"]
      },
      "medium-neutral": {
        name: "Medium Neutral",
        description: "Medium skin with balanced undertones",
        hex: "#D9B091",
        recommendations: ["Earth tones", "Teal", "Dusty rose", "Muted purples"]
      },
      "deep-cool": {
        name: "Deep Cool",
        description: "Deep skin with bluish or red undertones",
        hex: "#8D5524",
        recommendations: ["Royal purple", "Fuchsia", "Emerald", "Cool reds"]
      },
      "deep-warm": {
        name: "Deep Warm",
        description: "Deep skin with golden or orange undertones",
        hex: "#7C4E24",
        recommendations: ["Bright orange", "Golden yellow", "Warm reds", "Bright green"]
      },
      "deep-neutral": {
        name: "Deep Neutral",
        description: "Deep skin with balanced undertones",
        hex: "#754C24",
        recommendations: ["Rich browns", "Deep purples", "Forest green", "Navy"]
      }
    };
    
    const key = `${depth}-${undertone}`;
    return skinTones[key] || skinTones["medium-neutral"]; // Default fallback
  };

  // Go to previous question
  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  // Restart the quiz
  const handleRestart = () => {
    setCurrentQuestion(0);
    setAnswers({});
    setResult(null);
    setShowResult(false);
  };

  // Navigate to color gallery with filter
  const handleViewPalettes = () => {
    navigate("/gallery", { state: { skinTone: result.name.toLowerCase().replace(" ", "-") } });
  };

  return (
    <div className="page-container">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1>Color Quiz</h1>
        <p className="subtitle">Find your perfect skin tone through a series of questions</p>

        {!showResult ? (
          <div className="quiz-container">
            <div className="progress-bar">
              <div 
                className="progress-fill" 
                style={{ width: `${(currentQuestion / (questions.length - 1)) * 100}%` }}
              ></div>
            </div>
            <p className="question-counter">Question {currentQuestion + 1} of {questions.length}</p>
            
            <motion.div
              key={currentQuestion}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.3 }}
              className="question-card"
            >
              <h2>{questions[currentQuestion].question}</h2>
              <div className="options-container">
                {questions[currentQuestion].options.map((option, index) => (
                  <button
                    key={index}
                    className={`option-button ${answers[currentQuestion] === option.value ? 'selected' : ''}`}
                    onClick={() => handleAnswer(option.value)}
                  >
                    {option.text}
                  </button>
                ))}
              </div>
              
              {currentQuestion > 0 && (
                <button className="nav-button prev-button" onClick={handlePrevious}>
                  Previous
                </button>
              )}
            </motion.div>
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="result-container"
          >
            <h2>Your Skin Tone Result</h2>
            <div className="result-card">
              <div className="result-color" style={{ backgroundColor: result.hex }}></div>
              <div className="result-details">
                <h3>{result.name}</h3>
                <p>{result.description}</p>
                <div className="recommendations">
                  <h4>Recommended Colors:</h4>
                  <ul>
                    {result.recommendations.map((rec, index) => (
                      <li key={index}>{rec}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
            
            <div className="result-actions">
              <button className="action-button" onClick={handleViewPalettes}>
                View Color Palettes
              </button>
              <button className="action-button secondary" onClick={handleRestart}>
                Retake Quiz
              </button>
            </div>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};

export default ColorQuiz;