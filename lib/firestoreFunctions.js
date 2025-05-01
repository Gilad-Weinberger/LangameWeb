import { db } from "./firebase";
import { doc, getDoc } from "firebase/firestore";

/**
 * Fetches a user document from Firestore based on auth user
 * @param {Object} authUser - The authenticated user object
 * @returns {Promise<Object|null>} The user document or null if not found
 */
export const getUserByAuthId = async (authUser) => {
  if (!authUser || !authUser.uid) {
    return null;
  }

  try {
    const userDocRef = doc(db, "users", authUser.uid);
    const userDocSnap = await getDoc(userDocRef);

    if (userDocSnap.exists()) {
      return {
        id: userDocSnap.id,
        ...userDocSnap.data(),
      };
    } else {
      console.log("No matching user document found in Firestore");
      return null;
    }
  } catch (error) {
    console.error("Error fetching user document:", error);
    throw error;
  }
};
