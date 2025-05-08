import { convertWordsToDB } from "../lib/data/Words.js";

(async () => {
  try {
    await convertWordsToDB();
    console.log("Words uploaded to Firestore!");
  } catch (error) {
    console.error("Error uploading words:", error);
    process.exit(1);
  }
  process.exit(0);
})();
