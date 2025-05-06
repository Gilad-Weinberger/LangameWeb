import { db } from "@/lib/firebase";
import {
  doc,
  getDoc,
  setDoc,
  collection,
  query,
  where,
  getDocs,
} from "firebase/firestore";

/**
 * Fetches a user document from Firestore based on auth user
 * @param {Object|string} authUser - The authenticated user object or user ID string
 * @returns {Promise<Object|null>} The user document or null if not found
 */
export const getUserByAuthId = async (authUser) => {
  let userId;
  
  // Handle both user objects and direct user IDs
  if (typeof authUser === 'string') {
    userId = authUser;
  } else if (authUser && authUser.uid) {
    userId = authUser.uid;
  } else {
    console.error("Invalid user parameter provided to getUserByAuthId:", authUser);
    return null;
  }

  try {
    console.log(`Fetching user document for ID: ${userId}`);
    const userDoc = await getDoc(doc(db, "users", userId));
    if (userDoc.exists()) {
      return { id: userDoc.id, ...userDoc.data() };
    }
    console.warn(`User document not found for ID: ${userId}`);
    return null;
  } catch (error) {
    console.error(`Error getting user by ID ${userId}:`, error);
    throw error;
  }
};

/**
 * Creates or updates a user profile in Firestore
 * @param {Object} authUser - The authenticated user object
 * @param {Object} userData - The user data to save
 * @param {boolean} checkUsername - Whether to check if username is already taken
 * @returns {Promise<Object>} The created/updated user object
 */
export const saveUserObject = async (
  authUser,
  userData = {},
  checkUsername = true
) => {
  if (!authUser || !authUser.uid) throw new Error("No authenticated user");

  try {
    // Check if username is already taken when needed
    if (checkUsername && userData.username) {
      const usernameQuery = query(
        collection(db, "users"),
        where("username", "==", userData.username)
      );

      const usernameQuerySnapshot = await getDocs(usernameQuery);

      if (!usernameQuerySnapshot.empty) {
        const existingUser = usernameQuerySnapshot.docs[0];
        if (existingUser.id !== authUser.uid) {
          throw new Error("Username is already taken");
        }
      }
    }

    // Set default values for the user
    const userDefaults = {
      createdAt: new Date().toISOString(),
      role: "client",
      email: authUser.email || "",
      elo: 1200,
    };

    // Check if user already exists
    const userExists = (await getDoc(doc(db, "users", authUser.uid))).exists();

    // Create or update the user document
    await setDoc(
      doc(db, "users", authUser.uid),
      {
        ...userDefaults,
        ...userData,
      },
      { merge: true }
    );

    console.log(
      userExists ? "User updated in database." : "User created in database."
    );
    return { id: authUser.uid, ...userDefaults, ...userData };
  } catch (error) {
    console.error("Error saving user profile:", error);
    throw error;
  }
};

/**
 * Check if username is available
 * @param {string} username - The username to check
 * @returns {Promise<boolean>} Whether the username is available
 */
export const checkUsernameAvailability = async (username) => {
  try {
    const usernameQuery = query(
      collection(db, "users"),
      where("username", "==", username)
    );

    const querySnapshot = await getDocs(usernameQuery);
    return querySnapshot.empty;
  } catch (error) {
    console.error("Error checking username availability:", error);
    throw error;
  }
};

/**
 * Check if a user is an admin
 * @param {Object} authUser - The authenticated user object
 * @returns {Promise<boolean>} Whether the user is an admin
 */
export const isUserAdmin = async (authUser) => {
  if (!authUser || !authUser.uid) return false;

  console.log("just before the getDoc");

  const userDoc = await getDoc(doc(db, "users", authUser.uid));
  if (!userDoc.exists()) return false;

  const userData = userDoc.data();
  return userData.role === "admin";
};
