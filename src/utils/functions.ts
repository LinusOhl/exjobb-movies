import { db } from "../services/firebase";
import { User } from "../types/User.types";
import { arrayUnion, doc, getDoc, updateDoc } from "firebase/firestore";

export const checkForNewBadge = async (userId: string) => {
  const userRef = doc(db, "users", userId);
  const userSnap = await getDoc(userRef);
  const userData = userSnap.data() as User;

  if (userData.reviews >= 3 && !userData.badges.includes("Critic Starter")) {
    await updateDoc(userRef, {
      badges: arrayUnion("Critic Starter"),
    });
  }

  if (userData.reviews >= 5 && !userData.badges.includes("Expert Critic")) {
    await updateDoc(userRef, {
      badges: arrayUnion("Expert Critic"),
    });
  }
};
