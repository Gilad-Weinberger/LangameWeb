import { db } from "../firebase";
import { collection, getDocs, getDoc, doc, query, where, limit } from "firebase/firestore";

/**
 * מביא מילה מפיירבייס לפי מזהה
 * @param {string} wordId - מזהה המילה
 * @returns {Promise<Object|null>} - אובייקט המילה או null אם לא נמצא
 */
export const getWordById = async (wordId) => {
  try {
    const wordDoc = await getDoc(doc(db, "words", wordId));
    if (wordDoc.exists()) {
      return { id: wordDoc.id, ...wordDoc.data() };
    }
    return null;
  } catch (error) {
    console.error("Error fetching word by ID:", error);
    return null;
  }
};

/**
 * מביא רשימת מילים מפיירבייס לפי קטגוריה
 * @param {string} category - קטגוריית המילים
 * @returns {Promise<Array>} - מערך של אובייקטי מילים
 */
export const getWordsByCategory = async (category) => {
  try {
    const q = query(collection(db, "words"), where("category", "==", category));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error("Error fetching words by category:", error);
    return [];
  }
};

/**
 * מביא רשימת מילים מפיירבייס לפי טווח דירוג
 * @param {number} minRank - דירוג מינימלי
 * @param {number} maxRank - דירוג מקסימלי
 * @returns {Promise<Array>} - מערך של אובייקטי מילים
 */
export const getWordsByRankRange = async (minRank, maxRank) => {
  try {
    const q = query(
      collection(db, "words"), 
      where("rank", ">=", minRank),
      where("rank", "<=", maxRank)
    );
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error("Error fetching words by rank range:", error);
    return [];
  }
};

/**
 * מביא מילים אקראיות מפיירבייס
 * @param {number} count - מספר המילים לשליפה
 * @returns {Promise<Array>} - מערך של אובייקטי מילים אקראיים
 */
export const getRandomWords = async (count = 5) => {
  try {
    // פיירבייס אינו תומך ישירות בשליפה אקראית,
    // לכן נשלוף יותר מילים ונערבב אותן בצד הלקוח
    const snapshot = await getDocs(collection(db, "words"));
    const words = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    
    // ערבוב אקראי
    for (let i = words.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [words[i], words[j]] = [words[j], words[i]];
    }
    
    return words.slice(0, count);
  } catch (error) {
    console.error("Error fetching random words:", error);
    return [];
  }
};

/**
 * מחפש מילים עם דירוג דומה למילה מסוימת
 * @param {Object} targetWord - המילה המקורית
 * @param {number} range - טווח הדירוג (פלוס-מינוס)
 * @param {number} count - מספר המילים לשליפה
 * @returns {Promise<Array>} - מערך של מילים עם דירוג דומה
 */
export const getWordsSimilarRank = async (targetWord, range = 200, count = 3) => {
  if (!targetWord || !targetWord.rank) return [];
  
  try {
    const minRank = Math.max(0, targetWord.rank - range);
    const maxRank = targetWord.rank + range;
    
    const q = query(
      collection(db, "words"),
      where("rank", ">=", minRank),
      where("rank", "<=", maxRank)
    );
    
    const querySnapshot = await getDocs(q);
    const words = querySnapshot.docs
      .map(doc => ({ id: doc.id, ...doc.data() }))
      .filter(word => word.id !== targetWord.id); // להוציא את המילה המקורית
    
    // ערבוב אקראי
    for (let i = words.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [words[i], words[j]] = [words[j], words[i]];
    }
    
    return words.slice(0, count);
  } catch (error) {
    console.error("Error fetching words with similar rank:", error);
    return [];
  }
};

/**
 * יוצר שאלה אמריקאית ממילה
 * @param {Object} targetWord - המילה המקורית
 * @param {string} questionLanguage - שפת השאלה ('english' או 'hebrew')
 * @param {Array} optionsWords - מילים עבור האפשרויות השגויות
 * @returns {Object} - אובייקט השאלה
 */
export const createQuestionFromWord = (targetWord, questionLanguage = 'english', optionsWords = []) => {
  // קביעת שפת השאלה והתשובה
  const questionLang = questionLanguage === 'hebrew' ? 'hebrew' : 'english';
  const answerLang = questionLang === 'hebrew' ? 'english' : 'hebrew';
  
  // האפשרויות השגויות הן התרגום של המילים האחרות
  const incorrectOptions = optionsWords.map(word => word[answerLang]);
  
  // התשובה הנכונה
  const correctAnswer = targetWord[answerLang];
  
  // שילוב כל האפשרויות
  const allOptions = [...incorrectOptions, correctAnswer];
  
  // ערבוב האפשרויות
  const shuffledOptions = shuffleArray(allOptions);
  
  return {
    wordId: targetWord.id,
    questionWord: targetWord[questionLang],
    questionLanguage: questionLang,
    answerLanguage: answerLang,
    correctAnswer: correctAnswer,
    options: shuffledOptions,
    wordInfo: targetWord
  };
};

/**
 * פונקציה עזר לערבוב מערך
 */
function shuffleArray(array) {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
}

/**
 * יוצר שאלה אמריקאית ממילה עם שליפת אפשרויות מפיירבייס
 * @param {string} wordId - מזהה המילה
 * @param {string} questionLanguage - שפת השאלה ('english' או 'hebrew')
 * @param {number} optionsCount - מספר האפשרויות הכולל
 * @returns {Promise<Object>} - אובייקט השאלה
 */
export const generateWordQuestion = async (wordId, questionLanguage = 'english', optionsCount = 4) => {
  try {
    // קבלת המילה מפיירבייס
    const targetWord = await getWordById(wordId);
    if (!targetWord) {
      console.error(`מילה עם ID ${wordId} לא נמצאה`);
      return null;
    }
    
    // קבלת מילים עם דירוג דומה לאפשרויות נוספות
    const optionsWords = await getWordsSimilarRank(targetWord, 200, optionsCount - 1);
    
    // יצירת השאלה
    return createQuestionFromWord(targetWord, questionLanguage, optionsWords);
  } catch (error) {
    console.error("Error generating word question:", error);
    return null;
  }
};

/**
 * יוצר שאלות לשני המשתתפים בחדר
 * @param {string} wordId - מזהה המילה
 * @returns {Promise<Object>} - אובייקט עם שאלות לשני משתתפים
 */
export const generateRoomQuestions = async (wordId) => {
  try {
    // יצירת שאלה אנגלית לשחקן הראשון
    const question1 = await generateWordQuestion(wordId, 'english');
    
    // יצירת שאלה עברית לשחקן השני
    const question2 = await generateWordQuestion(wordId, 'hebrew');
    
    return {
      wordId,
      forUser0: question1,
      forUser1: question2
    };
  } catch (error) {
    console.error("Error generating room questions:", error);
    return null;
  }
};

/**
 * יוצר סט שאלות עבור חדר
 * @param {number} questionsCount - מספר השאלות
 * @returns {Promise<Array>} - מערך של שאלות
 */
export const generateQuestionsSet = async (questionsCount = 5) => {
  try {
    // קבלת מילים אקראיות מפיירבייס
    const randomWords = await getRandomWords(questionsCount);
    
    // יצירת שאלות עבור כל מילה
    const questions = await Promise.all(
      randomWords.map(word => generateRoomQuestions(word.id))
    );
    
    return questions.filter(q => q !== null); // סינון שאלות שנכשלו
  } catch (error) {
    console.error("Error generating questions set:", error);
    return [];
  }
}; 