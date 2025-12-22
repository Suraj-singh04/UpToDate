import React, { createContext, useContext, useEffect, useState } from "react";

import { Models } from "react-native-appwrite";
import {
  account,
  signOut as appwriteLogout,
  getAccount,
  getUserProfile,
} from "../lib/appwrite";

type SignUpData = {
  role: "parent" | "teacher" | null;
  name: string;
  email: string;
  mobile: string;
  password?: string;
  studentId?: string;
  dob?: string;
  registeredMobile?: string;
  employeeId?: string;
};

type UserProfile = Models.Document & {
  name: string;
  email: string;
  role: "parent" | "teacher";
};

type AuthContextType = {
  isLoggedIn: boolean;
  user: Models.User<Models.Preferences> | null;
  profile: UserProfile | null;
  isLoading: boolean;
  signUpData: SignUpData;
  setSignUpData: React.Dispatch<React.SetStateAction<SignUpData>>;
  checkSession: () => Promise<void>;
  logout: () => Promise<void>;
  isNewUser: boolean;
};

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<Models.User<Models.Preferences> | null>(
    null
  );
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isNewUser, setIsNewUser] = useState(false);

  const [signUpData, setSignUpData] = useState<SignUpData>({
    role: null,
    name: "",
    email: "",
    mobile: "",
  });

  const checkSession = async () => {
    setIsLoading(true);

    try {
      const accountUser = await getAccount();

      if (accountUser) {
        setUser(accountUser);
        setIsLoggedIn(true);


        const dbProfile = await getUserProfile(accountUser.$id);
        
        if (dbProfile) {
          setProfile(dbProfile as unknown as UserProfile);
          setIsNewUser(false);
        } else {
          // No profile found = New User (via Social Login)
          setProfile(null);
          setIsNewUser(true);
        }
      } else {
        // clear stale session
        await account.deleteSession("current").catch(() => {});
        setUser(null);
        setProfile(null);
        setIsNewUser(false);
        setIsLoggedIn(false);
      }
    } catch {
      await account.deleteSession("current").catch(() => {});
      setUser(null);
      setProfile(null);
      setIsLoggedIn(false);
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    setIsLoading(true);
    try {
        await appwriteLogout();
    } catch (error) {
        console.error("Logout error (session might be already expired):", error);
        // We continue to clear local state regardless of server error
    } finally {
        setUser(null);
        setProfile(null);
        setIsLoggedIn(false);
        setIsLoading(false);
    }
  };

  useEffect(() => {
    checkSession();
  }, []);

  const value = {
    isLoggedIn,
    user,
    profile,
    isLoading,
    signUpData,
    setSignUpData,
    checkSession,
    logout,
    isNewUser
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};
