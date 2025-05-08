"use client";

import React, { useEffect, useState, use } from "react";
import { useAuth } from "@/context/AuthContext";
import { getRoom, getRoomOpponent } from "@/lib/fastGameFunctions";
import { getUserByAuthId } from "@/lib/firestoreFunctions";
import PageLayout from "@/components/layout/PageLayout";
import PlayersBars from "@/components/fastGame/PlayersBars";
import GameBar from "@/components/fastGame/GameBar";
import { generateQuestionsForRoom } from "@/lib/data/QuestionGenerator";

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
          
          // יצירת שאלות למשחק
          const gameQuestions = generateQuestionsForRoom(roomData, 5);
          setQuestions(gameQuestions);
        }
      } catch (error) {
        console.error("Error fetching room or opponent:", error);
      }
    };

    if (user && id) {
      fetchRoom();
    }
  }, [id, user]);

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
    
    // בדיקה אם התשובה נכונה
    const currentQuestion = getCurrentQuestion();
    if (currentQuestion) {
      const isAnswerCorrect = option === currentQuestion.correctAnswer;
      setIsCorrect(isAnswerCorrect);
      
      // כאן אפשר להוסיף לוגיקה לעדכון התוצאה בחדר
      
      // מעבר לשאלה הבאה אחרי השהייה קצרה
      setTimeout(() => {
        setCurrentQuestionIndex(prev => (prev < questions.length - 1) ? prev + 1 : prev);
        setSelectedOption(null);
        setIsCorrect(null);
      }, 1500);
    }
  };
  
  const getCurrentQuestion = () => {
    if (!questions || questions.length === 0 || !user) return null;
    
    const isFirstUser = room?.users[0] === user.id;
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
        <PlayersBars room={room} user={user} opponent={opponent} />
        
        <div className="flex-1 flex flex-col items-center justify-center p-4">
          {currentQuestion ? (
            <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-md mx-auto">
              <h2 className="text-xl font-bold mb-4 text-center">
                {currentQuestion.questionLanguage === 'english' ? 'תרגם לעברית:' : 'תרגם לאנגלית:'}
              </h2>
              
              <div className="text-3xl font-bold text-center mb-6 p-4 bg-indigo-50 rounded-lg">
                {currentQuestion.questionWord}
              </div>
              
              <div className="space-y-3">
                {currentQuestion.options.map((option, index) => (
                  <button
                    key={index}
                    className={`w-full p-3 text-center rounded-lg transition-all ${
                      selectedOption === option
                        ? isCorrect
                          ? 'bg-green-500 text-white'
                          : 'bg-red-500 text-white'
                        : 'bg-gray-100 hover:bg-indigo-100'
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
              
              <div className="mt-4 text-right">
                <span className="text-gray-500">
                  שאלה {currentQuestionIndex + 1} מתוך {questions.length}
                </span>
              </div>
            </div>
          ) : (
            <div className="text-center">
              <p className="text-xl">מכין שאלות...</p>
            </div>
          )}
        </div>
        
        <GameBar room={room} />
      </div>
    </PageLayout>
  );
}
