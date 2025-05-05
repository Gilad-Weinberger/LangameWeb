import { db } from "./firebase";
import {
  collection,
  query,
  where,
  getDocs,
  getDoc,
  addDoc,
  serverTimestamp,
} from "firebase/firestore";
import { getUserByAuthId } from "./firestoreFunctions";
import { calculatePlayerWinProbability } from "./eloFunctions";

// {
//   users: [user1, user2],
//   userCount: len(users),
//   gameData: {
//     state: "waiting" | "playing" | "finished",
//   }
//   createdAt: timestamp,
//   updatedAt: timestamp,
// }

export const searchValidRoomForPlayer = async (player) => {
  const roomsCollectionRef = collection(db, "rooms");
  const q = query(roomsCollectionRef, where("userCount", "==", 1));

  try {
    const querySnapshot = await getDocs(q);
    if (!querySnapshot.empty) {
      for (const docSnap of querySnapshot.docs) {
        const roomData = docSnap.data();
        if (
          roomData.users &&
          roomData.users.length === 1 &&
          roomData.users[0] !== player.uid
        ) {
          const opponentId = roomData.users[0];
          const opponent = await getUserByAuthId(opponentId);
          if (await checkIfOpponentIsFairForPlayer(player, opponent)) {
            return { id: docSnap.id, ...roomData };
          }
        }
      }
    }
    return null;
  } catch (error) {
    console.error("Error searching for room:", error);
    return null;
  }
};

export const checkIfOpponentIsFairForPlayer = async (player, opponent) => {
  const playerWinProbability = calculatePlayerWinProbability(
    player.elo,
    opponent.elo
  );
  return playerWinProbability < 0.65 && playerWinProbability > 0.35;
};

export const createRoom = async (user) => {
  const roomsCollectionRef = collection(db, "rooms");
  try {
    const newRoomDocRef = await addDoc(roomsCollectionRef, {
      users: [user.uid],
      userCount: 1,
      gameData: {
        state: "waiting",
      },
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });
    const newRoomSnap = await getDoc(newRoomDocRef);
    if (newRoomSnap.exists()) {
      return { id: newRoomSnap.id, ...newRoomSnap.data() };
    } else {
      console.error("Failed to fetch newly created room.");
      return null;
    }
  } catch (error) {
    console.error("Error creating room:", error);
    return null;
  }
};
