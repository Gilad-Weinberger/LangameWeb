"use client";
import { useState } from "react";
import { ButtonDetailsForm } from "@/components/ui/ButtonDetailsForm";

const quizQuestions = [
  {
    question: "איזה רמת מילים באנגלית תכיר?",
    options: [
      { text: "מוגבל - אני יודע מילים נפוצות", value: 400 },
      { text: "בסיסי - אני יודע מילים יומיות", value: 800 },
      { text: "טוב - אני יודע מילים טובות", value: 1200 },
      { text: "מתקדם - אני יודע מילים מוזרות", value: 1600 },
    ],
  },
];

const FormEloQuiz = ({ prevStep, nextStep, setEloScore }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState([]);

  const handleAnswer = (value) => {
    const newAnswers = [...answers, value];
    setAnswers(newAnswers);

    if (currentQuestion < quizQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      // Select one of the fixed Elo options (400, 800, 1200, 1600)
      // based on the user's answers
      const eloOptions = [400, 800, 1200, 1600];
      const average =
        newAnswers.reduce((sum, value) => sum + value, 0) / newAnswers.length;

      // Find the closest Elo option to the calculated average
      const closestElo = eloOptions.reduce((prev, curr) => {
        return Math.abs(curr - average) < Math.abs(prev - average)
          ? curr
          : prev;
      });

      setEloScore(closestElo);
      nextStep(); // Proceed to the next step immediately
    }
  };

  const handleBack = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
      setAnswers(answers.slice(0, -1));
    } else {
      prevStep();
    }
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm">
      <div>
        <div className="mb-6">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-text-secondary">
              שאלה {currentQuestion + 1} מתוך {quizQuestions.length}
            </span>
            <div className="flex gap-1">
              {quizQuestions.map((_, index) => (
                <div
                  key={index}
                  className={`w-6 h-1 rounded-full ${
                    index <= currentQuestion ? "bg-main" : "bg-gray-200"
                  }`}
                ></div>
              ))}
            </div>
          </div>
          <h2 className="text-xl font-semibold text-text-primary">
            {quizQuestions[currentQuestion].question}
          </h2>
        </div>

        <div className="space-y-3">
          {quizQuestions[currentQuestion].options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleAnswer(option.value)}
              className="w-full text-right p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
            >
              {option.text}
            </button>
          ))}
        </div>

        <div className="mt-6">
          <ButtonDetailsForm
            type="button"
            onClick={handleBack}
            variant="secondary"
            size="small"
          >
            &rarr; חזרה
          </ButtonDetailsForm>
        </div>
      </div>
    </div>
  );
};

export default FormEloQuiz;
