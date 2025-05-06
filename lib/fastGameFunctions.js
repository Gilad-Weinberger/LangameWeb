import { db } from "./firebase";
import {
  collection,
  query,
  where,
  getDocs,
  getDoc,
  addDoc,
  updateDoc,
  serverTimestamp,
  doc,
} from "firebase/firestore";
import { getUserByAuthId } from "./firestoreFunctions";
import { checkIfOpponentIsFairForPlayer } from "./eloFunctions";

// {
//   users: [user1, user2],
//   userCount: len(users),
//   gameData: {
//     state: "waiting" | "playing" | "finished",
//   }
//   createdAt: timestamp,
//   updatedAt: timestamp,
// }

export const getRoomReadyForGame = async (player) => {
  // Try to find and join an existing room
  const existingRoomFound = await searchValidRoomForPlayer(player);

  if (existingRoomFound) {
    const joinedRoom = await joinRoom(existingRoomFound.id, player);
    if (joinedRoom && joinedRoom.userCount === 2) {
      return joinedRoom;
    } else {
      return null;
    }
  }

  // Create a new room if no existing room was joined or joining failed
  const newRoom = await createRoom(player);
  if (!newRoom || !newRoom.id) {
    return null;
  }

  // Poll for the second player
  const pollingTimeout = 60000; // 60 seconds timeout
  const pollingInterval = 200; // Check every 200ms (10ms is too frequent for Firestore)
  let elapsedTime = 0;

  while (elapsedTime < pollingTimeout) {
    const currentRoomState = await getRoom(newRoom.id);
    if (currentRoomState && currentRoomState.userCount === 2) {
      return { id: newRoom.id, ...currentRoomState };
    }
    await new Promise((resolve) => setTimeout(resolve, pollingInterval));
    elapsedTime += pollingInterval;
  }
  return null;
};

export const searchValidRoomForPlayer = async (player) => {
  const roomsCollectionRef = collection(db, "rooms");
  const q = query(
    roomsCollectionRef,
    where("userCount", "==", 1),
    where("gameData.state", "==", "waiting")
  );

  try {
    const querySnapshot = await getDocs(q);
    if (!querySnapshot.empty) {
      for (const docSnap of querySnapshot.docs) {
        const roomData = docSnap.data();
        if (
          roomData.users &&
          roomData.users.length === 1 &&
          roomData.users[0] !== player.id
        ) {
          const opponentId = roomData.users[0];
          const opponent = await getUserByAuthId(opponentId);
          if (
            opponent &&
            (await checkIfOpponentIsFairForPlayer(player, opponent))
          ) {
            return {
              id: docSnap.id,
              ...roomData,
            };
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

export const createRoom = async (user) => {
  const roomsCollectionRef = collection(db, "rooms");
  try {
    const newRoomDocRef = await addDoc(roomsCollectionRef, {
      users: [user.id],
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

export const joinRoom = async (roomId, player) => {
  const roomDocRef = doc(db, "rooms", roomId);
  try {
    const roomDocSnap = await getDoc(roomDocRef);
    if (roomDocSnap.exists()) {
      const roomData = roomDocSnap.data();
      // Ensure room is in a state to be joined
      if (roomData.userCount === 1 && roomData.gameData?.state === "waiting") {
        const updatedRoomData = {
          users: [...roomData.users, player.id || player.uid], // Use player.id or player.uid
          userCount: 2,
          gameData: {
            ...roomData.gameData,
            state: "playing", // Transition state to playing or ready
          },
          updatedAt: serverTimestamp(),
        };
        await updateDoc(roomDocRef, updatedRoomData);
        // Return the full room data including the original data and the updates
        return { id: roomId, ...roomData, ...updatedRoomData };
      } else {
        return null;
      }
    } else {
      return null;
    }
  } catch (error) {
    console.error(
      `Error joining room ${roomId} for player ${player.id || player.uid}:`,
      error
    );
    return null;
  }
};

export const getRoom = async (roomId) => {
  const roomsCollectionRef = collection(db, "rooms");
  const roomDocRef = doc(roomsCollectionRef, roomId);
  const roomDocSnap = await getDoc(roomDocRef);
  return roomDocSnap.data();
};

export const getRoomOpponent = async (roomId, playerId) => {
  const room = await getRoom(roomId);
  if (room.users.length === 2) {
    return room.users[0] === playerId ? room.users[1] : room.users[0];
  }
  return null;
};
