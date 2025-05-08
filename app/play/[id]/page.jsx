"use client";

import React, { useEffect, useState, use } from "react";
import { useAuth } from "@/context/AuthContext";
import { getRoom, getRoomOpponent } from "@/lib/fastGameFunctions";
import { getUserByAuthId } from "@/lib/firestoreFunctions";
import PageLayout from "@/components/layout/PageLayout";
import PlayersBars from "@/components/fastGame/PlayersBars";
import GameBar from "@/components/fastGame/GameBar";
import { generateQuestionsSet, generateRoomQuestions } from "@/lib/data/WordService";

// Create a component that properly uses the params
export default function GamePage({ params }) {
  const { id } = use(params);
  const { user: authUser } = useAuth();
  const [user, setUser] = useState(null);
  const [room, setRoom] = useState(null);
  const [opponent, setOpponent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isCorrect, setIsCorrect] = useState(null);
  const [score, setScore] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function fetchUserData() {
      if (authUser) {
        console.log("Fetching user data for ID:", authUser);
        try {
          const userData = await getUserByAuthId(authUser);
          setUser(userData);
        } catch (error) {
          console.error("Error fetching user data:", error);
        } finally {
          setLoading(false);
        }
      } else {
        setLoading(false);
      }
    }

    fetchUserData();
  }, [authUser]);

  useEffect(() => {
    const fetchRoom = async () => {
      if (!id || !user) return;

      try {
        console.log(`Fetching room data for ID: ${id}`);
        const roomData = await getRoom(id);
        setRoom(roomData);

        if (roomData) {
          const opponentId = await getRoomOpponent(id, user.id);
          if (opponentId) {
            const opponentData = await getUserByAuthId(opponentId);
            setOpponent(opponentData);
          }
        }
      } catch (error) {
        console.error("Error fetching room or opponent:", error);
      }
    };

    if (user && id) {
      fetchRoom();
    }
  }, [id, user]);

  const startGame = async () => {
    setIsLoading(true);
    try {
      // קבלת שאלות מפיירבייס
      const questionsData = await generateQuestionsSet(5);
      setQuestions(questionsData);
      setGameStarted(true);
      setCurrentQuestionIndex(0);
      setScore(0);
    } catch (error) {
      console.error("Error starting game:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
    
    // בדיקה אם התשובה נכונה
    const currentQuestion = getCurrentQuestion();
    if (currentQuestion) {
      const isAnswerCorrect = option === currentQuestion.correctAnswer;
      setIsCorrect(isAnswerCorrect);
      
      if (isAnswerCorrect) {
        setScore(prev => prev + 1);
      }
      
      // מעבר לשאלה הבאה אחרי השהייה קצרה
      setTimeout(() => {
        if (currentQuestionIndex < questions.length - 1) {
          setCurrentQuestionIndex(prev => prev + 1);
          setSelectedOption(null);
          setIsCorrect(null);
        } else {
          // סיום המשחק אחרי שנגמרו השאלות
          // כאן צריך להוסיף לוגיקה לעדכון תוצאה במסד הנתונים
          console.log("Game finished with score:", score + (isAnswerCorrect ? 1 : 0));
        }
      }, 1500);
    }
  };
  
  const getCurrentQuestion = () => {
    if (!questions || questions.length === 0 || !user || !room) return null;
    
    const isFirstUser = room.users[0] === user.id;
    const currentQuestion = questions[currentQuestionIndex];
    
    if (!currentQuestion) return null;
    
    return isFirstUser ? currentQuestion.forUser0 : currentQuestion.forUser1;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  if (!room) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-4">
        <h1 className="text-2xl font-bold mb-4">חדר לא נמצא</h1>
        <p>החדר שחיפשת לא נמצא או שאינו זמין יותר.</p>
      </div>
    );
  }
  
  const currentQuestion = getCurrentQuestion();

  return (
    <PageLayout>
      <div className="flex flex-col w-full h-full">
        <div className="flex w-full">
          <GameBar room={room} />
          <PlayersBars room={room} user={user} opponent={opponent} />
        </div>
        
        <div className="flex-1 flex flex-col items-center justify-center p-4 bg-gradient-to-b from-indigo-50 to-white">
          {!gameStarted ? (
            <div className="text-center">
              <h2 className="text-3xl font-bold mb-6 text-indigo-800">מוכן למשחק מילים?</h2>
              <button 
                onClick={startGame}
                disabled={isLoading}
                className="px-8 py-4 bg-indigo-600 text-white rounded-lg text-xl font-semibold shadow-lg hover:bg-indigo-700 transition-colors disabled:bg-indigo-300"
              >
                {isLoading ? (
                  <span className="flex items-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    טוען...
                  </span>
                ) : 'התחל משחק'}
              </button>
            </div>
          ) : currentQuestion ? (
            <div className="w-full max-w-xl mx-auto">
              <div className="bg-white rounded-xl shadow-xl overflow-hidden transform transition-all">
                {/* כותרת ופרטי המשחק */}
                <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-4 text-white">
                  <div className="flex justify-between items-center">
                    <h2 className="text-xl font-bold">
                      {currentQuestion.questionLanguage === 'english' ? 'תרגם לעברית:' : 'תרגם לאנגלית:'}
                    </h2>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm bg-white bg-opacity-20 px-3 py-1 rounded-full">
                        ניקוד: {score}
                      </span>
                      <span className="text-sm bg-white bg-opacity-20 px-3 py-1 rounded-full">
                        {currentQuestionIndex + 1} / {questions.length}
                      </span>
                    </div>
                  </div>
                </div>
                
                {/* המילה לתרגום */}
                <div className="p-6">
                  <div className="text-3xl font-bold text-center mb-6 p-8 bg-indigo-50 rounded-lg shadow-inner">
                    {currentQuestion.questionWord}
                  </div>
                  
                  {/* האפשרויות */}
                  <div className="space-y-3 mt-6">
                    {currentQuestion.options.map((option, index) => (
                      <button
                        key={index}
                        className={`w-full p-4 text-lg text-center rounded-lg transition-all transform hover:scale-105 ${
                          selectedOption === option
                            ? isCorrect
                              ? 'bg-green-500 text-white shadow-green-200'
                              : 'bg-red-500 text-white shadow-red-200'
                            : 'bg-gray-100 hover:bg-indigo-100 hover:shadow-md'
                        } ${
                          selectedOption && option === currentQuestion.correctAnswer && 'bg-green-500 text-white'
                        }`}
                        onClick={() => !selectedOption && handleOptionSelect(option)}
                        disabled={selectedOption !== null}
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                </div>
                
                {/* התקדמות */}
                <div className="bg-gray-50 p-4 border-t">
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-indigo-600 h-2 rounded-full transition-all" 
                      style={{ width: `${((currentQuestionIndex + 1) / questions.length) * 100}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center">
              <svg className="animate-spin h-10 w-10 text-indigo-600 mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <p className="text-xl">מכין שאלות...</p>
            </div>
          )}
          
          {/* תוצאות סופיות */}
          {gameStarted && currentQuestionIndex === questions.length - 1 && selectedOption && (
            <div className="mt-8 bg-white rounded-xl shadow-lg p-6 w-full max-w-md">
              <h2 className="text-2xl font-bold text-center mb-4">סיום המשחק!</h2>
              <p className="text-center text-lg mb-6">
                הניקוד הסופי שלך: <span className="font-bold text-indigo-600">{score + (isCorrect ? 1 : 0)}</span> מתוך {questions.length}
              </p>
              <button
                onClick={startGame}
                className="w-full py-3 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transition-colors"
              >
                שחק שוב
              </button>
            </div>
          )}
        </div>
      </div>
    </PageLayout>
  );
}
