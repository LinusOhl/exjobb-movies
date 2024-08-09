import { createContext, useEffect, useState } from "react";
import useIsAdmin from "../hooks/other/useIsAdmin";
import { auth, db } from "../services/firebase";
import { User as UserProfile } from "../types/User.types";
import {
  User,
  UserCredential,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signOut,
  updateEmail,
  updatePassword,
  updateProfile,
} from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";

type AuthContextType = {
  currentUser: User | null;
  login: (email: string, password: string) => Promise<UserCredential>;
  logout: () => Promise<void>;
  signup: (email: string, password: string) => Promise<UserCredential>;
  reloadUser: () => Promise<boolean>;
  resetPassword: (email: string) => Promise<void>;
  setEmail: (email: string) => Promise<void>;
  setDisplayName: (displayName: string) => Promise<void>;
  setPassword: (password: string) => Promise<void>;
  setPhotoUrl: (photoURL: string) => Promise<void>;
  userEmail: string | null;
  userName: string | null;
  userPhotoUrl: string | null;
  userIsAdmin: boolean | null;
  userProfile: UserProfile | null;
};

export const AuthContext = createContext<AuthContextType | null>(null);

type AuthContextProps = {
  children: React.ReactNode;
};

const AuthContextProvider = ({ children }: AuthContextProps) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [userName, setUserName] = useState<string | null>(null);
  const [userPhotoUrl, setUserPhotoUrl] = useState<string | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [userIsAdmin, setUserIsAdmin] = useState<boolean | null>(null);
  const isAdmin = useIsAdmin(userEmail);

  const login = (email: string, password: string) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const logout = () => {
    return signOut(auth);
  };

  const signup = (email: string, password: string) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const reloadUser = async () => {
    if (!auth.currentUser) {
      return false;
    }

    setUserName(auth.currentUser.displayName);
    setUserEmail(auth.currentUser.email);
    setUserPhotoUrl(auth.currentUser.photoURL);

    return true;
  };

  const resetPassword = (email: string) => {
    return sendPasswordResetEmail(auth, email, {
      url: window.location.origin + "/login",
    });
  };

  const setEmail = (email: string) => {
    if (!currentUser) {
      throw new Error("Current User is null!");
    }
    return updateEmail(currentUser, email);
  };

  const setPassword = (password: string) => {
    if (!currentUser) {
      throw new Error("Current User is null!");
    }
    return updatePassword(currentUser, password);
  };

  const setDisplayName = (displayName: string) => {
    if (!currentUser) {
      throw new Error("Current User is null!");
    }
    return updateProfile(currentUser, { displayName });
  };

  const setPhotoUrl = (photoURL: string) => {
    if (!currentUser) {
      throw new Error("Current User is null!");
    }
    return updateProfile(currentUser, { photoURL });
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      console.log("Auth state changed.");
      setCurrentUser(user);

      if (user) {
        // User is logged in
        setUserEmail(user.email);
        setUserName(user.displayName);
        setUserPhotoUrl(user.photoURL);
        setUserIsAdmin(isAdmin);
      } else {
        // User is NOT logged in
        setUserEmail(null);
        setUserName(null);
        setUserPhotoUrl(null);
      }
      setLoading(false);
    });

    return unsubscribe;
  }, [isAdmin]);

  useEffect(() => {
    const fetchUserProfile = async () => {
      if (currentUser) {
        try {
          const userRef = doc(db, "users", currentUser.uid);
          const docSnap = await getDoc(userRef);

          if (docSnap.exists()) {
            const userData = docSnap.data() as UserProfile;
            setUserProfile(userData);
          } else {
            console.error("No such document!");
          }
        } catch (error) {
          console.error("Error fetching user profile:", error);
        }
      } else {
        setUserProfile(null);
      }
    };
    fetchUserProfile();
  }, [currentUser]);

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        login,
        logout,
        reloadUser,
        resetPassword,
        setDisplayName,
        setEmail,
        setPassword,
        setPhotoUrl,
        signup,
        userEmail,
        userName,
        userPhotoUrl,
        userIsAdmin,
        userProfile,
      }}
    >
      {loading ? <p>Loading...</p> : <>{children}</>}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
