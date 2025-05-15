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
  // Check if user is already in a room with status 'waiting' or 'playing'
  const activeRoom = await getUserActiveRoom(player.id || player.uid);
  if (activeRoom) {
    console.log(
      `User ${player.id || player.uid} is already in an active room: ${
        activeRoom.id
      }`
    );
    return { id: activeRoom.id, ...activeRoom };
  }
  console.log(
    `Attempting to get room ready for player: ${player.id || player.uid}`
  );
  // Try to find and join an existing room
  const existingRoomFound = await searchValidRoomForPlayer(player);

  if (existingRoomFound) {
    console.log(
      `Found existing room ${existingRoomFound.id} for player ${
        player.id || player.uid
      }. Attempting to join.`
    );
    const joinedRoom = await joinRoom(existingRoomFound.id, player);
    if (joinedRoom && joinedRoom.userCount === 2) {
      console.log(
        `Player ${player.id || player.uid} successfully joined room ${
          existingRoomFound.id
        }. Room is now full and ready.`
      );
      return joinedRoom;
    } else if (joinedRoom && joinedRoom.userCount !== 2) {
      console.warn(
        `Player ${player.id || player.uid} joined room ${
          existingRoomFound.id
        }, but room is not full (userCount: ${
          joinedRoom.userCount
        }). Proceeding to create new room.`
      );
    } else {
      console.warn(
        `Failed to join existing room ${existingRoomFound.id} for player ${
          player.id || player.uid
        }. Proceeding to create new room.`
      );
      // return null; // This was an unintentional removal, it should not be here if we proceed to create a new room.
    }
  }

  // Create a new room if no existing room was joined or joining failed
  console.log(
    `No suitable existing room found or joining failed for player ${
      player.id || player.uid
    }. Creating a new room.`
  );
  const newRoom = await createRoom(player);
  if (!newRoom || !newRoom.id) {
    console.error(
      `Failed to create a new room for player ${player.id || player.uid}.`
    );
    return null;
  }
  console.log(
    `New room ${newRoom.id} created for player ${
      player.id || player.uid
    }. Waiting for a second player.`
  );

  // Poll for the second player
  const pollingTimeout = 60000; // 60 seconds timeout
  const pollingInterval = 200; // Check every 200ms (10ms is too frequent for Firestore)
  let elapsedTime = 0;
  console.log(`Starting to poll room ${newRoom.id} for a second player...`);

  while (elapsedTime < pollingTimeout) {
    const currentRoomState = await getRoom(newRoom.id);
    if (currentRoomState && currentRoomState.userCount === 2) {
      console.log(`Second player joined room ${newRoom.id}. Game ready.`);
      return { id: newRoom.id, ...currentRoomState };
    }
    await new Promise((resolve) => setTimeout(resolve, pollingInterval));
    elapsedTime += pollingInterval;
  }
  console.warn(
    `Polling timed out for room ${newRoom.id}. No second player joined within ${
      pollingTimeout / 1000
    } seconds.`
  );
  // Optionally, delete or mark the room as abandoned here
  return null;
};

export const searchValidRoomForPlayer = async (player) => {
  console.log(
    `Searching for a valid room for player: ${
      player.id || player.uid
    } with ELO ${player.elo}`
  );
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
        console.log(
          `Evaluating room ${docSnap.id}: userCount=${roomData.userCount}, state=${roomData.gameData?.state}, users=${roomData.users}`
        );
        if (
          roomData.users &&
          roomData.users.length === 1 &&
          roomData.users[0] !== (player.id || player.uid) // Ensure checking against the correct player identifier
        ) {
          const opponentId = roomData.users[0];
          console.log(
            `Room ${docSnap.id} has one user ${opponentId}. Fetching opponent details for ELO check.`
          );
          const opponent = await getUserByAuthId(opponentId);
          if (opponent) {
            console.log(
              `Opponent ${opponentId} (ELO: ${
                opponent.elo
              }) found. Checking ELO compatibility with player ${
                player.id || player.uid
              } (ELO: ${player.elo}).`
            );
            if (await checkIfOpponentIsFairForPlayer(player, opponent)) {
              console.log(
                `Found suitable opponent ${opponentId} in room ${
                  docSnap.id
                } for player ${player.id || player.uid}.`
              );
              return {
                id: docSnap.id,
                ...roomData,
              };
            } else {
              console.log(
                `Opponent ${opponentId} in room ${
                  docSnap.id
                } is not a fair ELO match for player ${
                  player.id || player.uid
                }.`
              );
            }
          } else {
            console.warn(
              `Could not fetch opponent details for ID ${opponentId} in room ${docSnap.id}. Skipping room.`
            );
          }
        }
      }
    }
    console.log(
      `No suitable waiting room found for player ${
        player.id || player.uid
      } after checking all available rooms.`
    );
    return null;
  } catch (error) {
    console.error(
      `Error searching for room for player ${player.id || player.uid}:`,
      error
    );
    return null;
  }
};

export const createRoom = async (user) => {
  console.log(`Creating a new room for user: ${user.id || user.uid}`);
  const roomsCollectionRef = collection(db, "rooms");
  try {
    const newRoomDocRef = await addDoc(roomsCollectionRef, {
      users: [user.id || user.uid], // Use user.id or user.uid
      userCount: 1,
      gameData: {
        state: "waiting",
        wordList: [],
        wordsCount: 0,
        user0: {
          fails: 2,
          scores: [
            true,
            true,
            true,
            true,
            true,
            true,
            true,
            false,
            false,
            true,
            true,
            true,
            true,
            true,
            true,
            true,
            true,
            true,
            true,
            true,
            true,
            true,
            true,
            true,
            true,
            true,
            true,
            true,
            true,
            true,
          ],
        },
        user1: {
          fails: 1,
          scores: [
            true,
            true,
            true,
            true,
            true,
            true,
            true,
            false,
            true,
            true,
            true,
            true,
            true,
            true,
            true,
          ],
        },
      },
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });
    const newRoomSnap = await getDoc(newRoomDocRef);
    if (newRoomSnap.exists()) {
      console.log(
        `Successfully created room ${newRoomSnap.id} with data:`,
        newRoomSnap.data()
      );
      return { id: newRoomSnap.id, ...newRoomSnap.data() };
    } else {
      console.error(
        `Failed to fetch newly created room ${newRoomDocRef.id} for user ${
          user.id || user.uid
        }. The room document does not exist after creation.`
      );
      return null;
    }
  } catch (error) {
    console.error(
      `Error creating room for user ${user.id || user.uid}:`,
      error
    );
    return null;
  }
};

export const joinRoom = async (roomId, player) => {
  console.log(
    `Player ${player.id || player.uid} attempting to join room ${roomId}`
  );
  const roomDocRef = doc(db, "rooms", roomId);
  try {
    const roomDocSnap = await getDoc(roomDocRef);
    if (roomDocSnap.exists()) {
      const roomData = roomDocSnap.data();
      console.log(`Room ${roomId} exists. Current data:`, roomData);
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
        console.log(
          `Player ${
            player.id || player.uid
          } successfully joined room ${roomId}. Room state updated to 'playing'. New data:`,
          updatedRoomData
        );
        // Return the full room data including the original data and the updates
        return { id: roomId, ...roomData, ...updatedRoomData }; // roomData here is stale, but this matches original logic.
      } else {
        console.warn(
          `Room ${roomId} is not in a state to be joined by player ${
            player.id || player.uid
          }. User count: ${roomData.userCount}, state: ${
            roomData.gameData?.state
          }.`
        );
        return null;
      }
    } else {
      console.error(
        `Room ${roomId} not found when player ${
          player.id || player.uid
        } attempted to join.`
      );
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
  console.log(`Fetching room data for roomId: ${roomId}`);
  const roomsCollectionRef = collection(db, "rooms");
  const roomDocRef = doc(roomsCollectionRef, roomId);
  try {
    const roomDocSnap = await getDoc(roomDocRef);
    if (roomDocSnap.exists()) {
      const roomData = roomDocSnap.data();
      console.log(
        `Successfully fetched room data for roomId: ${roomId}. Data:`,
        roomData
      );
      return roomData;
    } else {
      console.warn(`Room with roomId: ${roomId} not found.`);
      return null; // Explicitly return null if room doesn't exist
    }
  } catch (error) {
    console.error(`Error fetching room data for roomId: ${roomId}:`, error);
    return null;
  }
};

export const getRoomOpponent = async (roomId, playerId) => {
  console.log(
    `Attempting to get opponent for player ${playerId} in room ${roomId}`
  );
  const room = await getRoom(roomId); // getRoom already has logging
  if (room && room.users && Array.isArray(room.users)) {
    if (room.users.length === 2) {
      const opponentId =
        room.users[0] === playerId ? room.users[1] : room.users[0];
      console.log(
        `Opponent for player ${playerId} in room ${roomId} is ${opponentId}.`
      );
      return opponentId;
    } else {
      console.warn(
        `Room ${roomId} does not have 2 users. Current users: ${room.users}. Cannot determine opponent for player ${playerId}.`
      );
    }
  } else {
    console.warn(
      `Could not find opponent for player ${playerId} in room ${roomId}. Room data or users array is invalid. Room:`,
      room
    );
  }
  return null;
};

// Helper: Check if user is already in a room with status 'waiting' or 'playing'
export const getUserActiveRoom = async (userId) => {
  const roomsCollectionRef = collection(db, "rooms");
  const q = query(
    roomsCollectionRef,
    where("users", "array-contains", userId),
    where("gameData.state", "in", ["waiting", "playing"])
  );
  try {
    const querySnapshot = await getDocs(q);
    if (!querySnapshot.empty) {
      // Return the first active room found
      const docSnap = querySnapshot.docs[0];
      return { id: docSnap.id, ...docSnap.data() };
    }
    return null;
  } catch (error) {
    console.error(`Error checking active room for user ${userId}:`, error);
    return null;
  }
};

export const createWordListForRoom = async (roomId) => {
  const room = await getRoom(roomId);
  if (room) {
    const wordList = room.gameData.wordListMM;
    if (wordList.length === 0) {
      const wordList = ["test", "test2", "test3", "test4", "test5"];
      await updateDoc(doc(db, "rooms", roomId), {
        "gameData.wordList": wordList,
      });
    }
  }
};
