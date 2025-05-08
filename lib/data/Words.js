import { db } from "../firebase";
import { collection, addDoc } from "firebase/firestore";

export const words = {
  1: { english: "shop", hebrew: "חנות", category: "food", rank: 400 },
  2: { english: "airport", hebrew: "שדה תעופה", category: "travel", rank: 800 },
  3: { english: "passport", hebrew: "דרכון", category: "school", rank: 400 },
  4: { english: "hotel", hebrew: "מלון", category: "travel", rank: 800 },
  5: { english: "train", hebrew: "רכבת", category: "travel", rank: 1200 },
  6: { english: "bus", hebrew: "אוטובוס", category: "travel", rank: 1200 },
  7: { english: "ticket", hebrew: "כרטיס", category: "travel", rank: 400 },
  8: { english: "map", hebrew: "מפה", category: "travel", rank: 1600 },
  9: { english: "luggage", hebrew: "מזוודה", category: "travel", rank: 800 },
  10: { english: "guide", hebrew: "מדריך", category: "travel", rank: 800 },
  11: { english: "restaurant", hebrew: "מסעדה", category: "food", rank: 800 },
  12: { english: "apple", hebrew: "תפוח", category: "food", rank: 1600 },
  13: { english: "bread", hebrew: "לחם", category: "food", rank: 800 },
  14: { english: "water", hebrew: "מים", category: "food", rank: 1200 },
  15: { english: "cheese", hebrew: "גבינה", category: "food", rank: 800 },
  16: { english: "chicken", hebrew: "עוף", category: "food", rank: 800 },
  17: { english: "salt", hebrew: "מלח", category: "food", rank: 800 },
  18: { english: "pepper", hebrew: "פלפל", category: "food", rank: 1200 },
  19: { english: "milk", hebrew: "חלב", category: "food", rank: 1200 },
  20: { english: "tea", hebrew: "תה", category: "food", rank: 1200 },
  21: { english: "teacher", hebrew: "מורה", category: "school", rank: 800 },
  22: { english: "student", hebrew: "תלמיד", category: "school", rank: 1600 },
  23: { english: "notebook", hebrew: "מחברת", category: "school", rank: 1200 },
  24: { english: "pencil", hebrew: "עיפרון", category: "school", rank: 400 },
  25: { english: "book", hebrew: "ספר", category: "school", rank: 400 },
  26: {
    english: "homework",
    hebrew: "שיעורי בית",
    category: "school",
    rank: 800,
  },
  27: { english: "classroom", hebrew: "כיתה", category: "school", rank: 800 },
  28: { english: "exam", hebrew: "מבחן", category: "school", rank: 800 },
  29: { english: "desk", hebrew: "שולחן", category: "school", rank: 1200 },
  30: { english: "board", hebrew: "לוח", category: "school", rank: 1200 },
  31: { english: "tree", hebrew: "עץ", category: "nature", rank: 1600 },
  32: { english: "mountain", hebrew: "הר", category: "nature", rank: 1200 },
  33: { english: "river", hebrew: "נהר", category: "nature", rank: 800 },
  34: { english: "lake", hebrew: "אגם", category: "nature", rank: 1600 },
  35: { english: "sky", hebrew: "שמיים", category: "nature", rank: 800 },
  36: { english: "sun", hebrew: "שמש", category: "nature", rank: 800 },
  37: { english: "moon", hebrew: "ירח", category: "nature", rank: 400 },
  38: { english: "flower", hebrew: "פרח", category: "nature", rank: 400 },
  39: { english: "leaf", hebrew: "עלה", category: "nature", rank: 400 },
  40: { english: "rock", hebrew: "סלע", category: "nature", rank: 1200 },
};

export const getWord = (id) => {
  return words[id];
};

export const getWordByEnglish = (english) => {
  return Object.values(words).find((word) => word.english === english);
};

export const getWordByHebrew = (hebrew) => {
  return Object.values(words).find((word) => word.hebrew === hebrew);
};

export const getWordByCategory = (category) => {
  return Object.values(words).filter((word) => word.category === category);
};

export const getWordsByRank = (rank) => {
  return Object.values(words).filter((word) => word.rank === rank);
};

export const getWordsByRankRange = (min, max) => {
  return Object.values(words).filter(
    (word) => word.rank >= min && word.rank <= max
  );
};

export const getWordsByCategoryAndRankRange = (category, min, max) => {
  return Object.values(words).filter(
    (word) => word.category === category && word.rank >= min && word.rank <= max
  );
};

export const convertWordsToDB = async () => {
  const wordEntries = Object.values(words);
  await Promise.all(
    wordEntries.map(async (word) => {
      await addDoc(collection(db, "words"), {
        english: word.english,
        hebrew: word.hebrew,
        category: word.category,
        rank: word.rank,
      });
    })
  );
};
