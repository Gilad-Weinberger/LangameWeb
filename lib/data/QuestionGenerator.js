import { words, getWord } from './Words';

/**
 * יוצר שאלה אמריקאית עבור מילה על פי ה-ID שלה
 * @param {number} wordId - ה-ID של המילה שעבורה רוצים ליצור שאלה
 * @param {string} questionLanguage - השפה בה תוצג המילה בשאלה ('english' או 'hebrew')
 * @param {number} optionsCount - מספר האפשרויות הכולל (כולל התשובה הנכונה)
 * @returns {Object} - אובייקט השאלה עם המילה המקורית, התשובה הנכונה, ואפשרויות בחירה
 */
export const generateWordQuestion = (wordId, questionLanguage = 'english', optionsCount = 4) => {
  // קבלת המילה המבוקשת
  const targetWord = getWord(wordId);
  
  if (!targetWord) {
    console.error(`מילה עם ID ${wordId} לא נמצאה`);
    return null;
  }
  
  // קביעת שפת השאלה והתשובה
  const questionLang = questionLanguage === 'hebrew' ? 'hebrew' : 'english';
  const answerLang = questionLang === 'hebrew' ? 'english' : 'hebrew';
  
  // יצירת מערך של כל המילים פרט למילת היעד
  const otherWords = Object.values(words).filter(word => word !== targetWord);
  
  // מיון המילים האחרות לפי קרבה בדירוג למילה המקורית
  const sortedWords = otherWords.sort((a, b) => {
    return Math.abs(a.rank - targetWord.rank) - Math.abs(b.rank - targetWord.rank);
  });
  
  // בחירת אפשרויות לא נכונות בטווח דירוג דומה (200+-)
  const incorrectOptions = sortedWords
    .filter(word => Math.abs(word.rank - targetWord.rank) <= 200)
    .slice(0, optionsCount - 1)
    .map(word => word[answerLang]);
  
  // אם אין מספיק אפשרויות בטווח הדירוג, להשלים עם מילים אחרות
  if (incorrectOptions.length < optionsCount - 1) {
    const additionalOptions = sortedWords
      .filter(word => !incorrectOptions.includes(word[answerLang]))
      .slice(0, optionsCount - 1 - incorrectOptions.length)
      .map(word => word[answerLang]);
    
    incorrectOptions.push(...additionalOptions);
  }
  
  // יצירת מערך האפשרויות כולל התשובה הנכונה
  const correctAnswer = targetWord[answerLang];
  const allOptions = [...incorrectOptions, correctAnswer];
  
  // ערבוב האפשרויות
  const shuffledOptions = shuffleArray(allOptions);
  
  // יצירת אובייקט השאלה
  return {
    questionWord: targetWord[questionLang],
    questionLanguage: questionLang,
    answerLanguage: answerLang,
    correctAnswer: correctAnswer,
    options: shuffledOptions,
    wordId: wordId,
    wordInfo: targetWord
  };
};

/**
 * פונקציה מסייעת לערבוב מערך
 * @param {Array} array - המערך לערבוב
 * @returns {Array} - המערך המעורבב
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
 * יוצר שאלה אמריקאית אקראית מהמילים הקיימות
 * @param {string} questionLanguage - השפה בה תוצג המילה בשאלה ('english' או 'hebrew')
 * @param {number} optionsCount - מספר האפשרויות הכולל (כולל התשובה הנכונה)
 * @param {number} minRank - דירוג מינימלי של המילה (אופציונלי)
 * @param {number} maxRank - דירוג מקסימלי של המילה (אופציונלי)
 * @returns {Object} - אובייקט השאלה
 */
export const generateRandomWordQuestion = (questionLanguage = 'english', optionsCount = 4, minRank = 0, maxRank = Infinity) => {
  // סינון מילים לפי טווח דירוג (אם צוין)
  const filteredWords = Object.entries(words).filter(([_, word]) => 
    word.rank >= minRank && word.rank <= maxRank
  );
  
  // בחירת מילה אקראית
  const randomIndex = Math.floor(Math.random() * filteredWords.length);
  const randomWordId = parseInt(filteredWords[randomIndex][0]);
  
  // יצירת שאלה עבור המילה שנבחרה
  return generateWordQuestion(randomWordId, questionLanguage, optionsCount);
};

/**
 * יוצר שאלות אמריקאיות עבור חדר משחק
 * @param {Object} room - אובייקט החדר
 * @param {number} questionsCount - מספר השאלות הרצוי
 * @returns {Array} - מערך של אובייקטי שאלות
 */
export const generateQuestionsForRoom = (room, questionsCount = 5) => {
  // בדיקה אם יש מידע על מילים בחדר
  if (room?.gameData?.wordList && room.gameData.wordList.length > 0) {
    // שימוש במילים הקיימות בחדר
    return room.gameData.wordList.map(wordId => {
      // יצירת שאלה אנגלית לשחקן הראשון
      const questionForUser0 = generateWordQuestion(wordId, 'english');
      // יצירת שאלה עברית לשחקן השני
      const questionForUser1 = generateWordQuestion(wordId, 'hebrew');
      
      return {
        wordId,
        forUser0: questionForUser0,
        forUser1: questionForUser1
      };
    });
  } else {
    // יצירת שאלות חדשות אם אין מילים בחדר
    const questions = [];
    const usedWordIds = new Set();
    
    for (let i = 0; i < questionsCount; i++) {
      // בחירת מילה אקראית שעדיין לא נבחרה
      let randomWordId;
      do {
        randomWordId = Math.floor(Math.random() * Object.keys(words).length) + 1;
      } while (usedWordIds.has(randomWordId));
      
      usedWordIds.add(randomWordId);
      
      // יצירת שאלה אנגלית לשחקן הראשון
      const questionForUser0 = generateWordQuestion(randomWordId, 'english');
      // יצירת שאלה עברית לשחקן השני
      const questionForUser1 = generateWordQuestion(randomWordId, 'hebrew');
      
      questions.push({
        wordId: randomWordId,
        forUser0: questionForUser0,
        forUser1: questionForUser1
      });
    }
    
    return questions;
  }
}; 