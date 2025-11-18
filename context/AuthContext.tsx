import React, { createContext, useContext, useEffect, useState } from "react";

import { Models } from "appwrite";
import {
  account,
  signOut as appwriteLogout,
  getAccount,
  getUserProfile as getProfile,
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
};

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<Models.User<Models.Preferences> | null>(
    null
  );
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const [signUpData, setSignUpData] = useState<SignUpData>({
    role: null,
    name: "",
    email: "",
    mobile: "",
  });

  const checkSession = async () => {
    setIsLoading(true);

    try {
      const session = await getAccount();

      if (session) {
        // 🎉 Active session found
        setUser(session);
        setIsLoggedIn(true);

        const dbProfile = await getProfile(session.$id);
        setProfile(dbProfile as UserProfile);
      } else {
        // User session exists locally but Appwrite sees it as invalid
        await account.deleteSession("current").catch(() => {});

        setUser(null);
        setProfile(null);
        setIsLoggedIn(false);
      }
    } catch (error) {
      // ❗ Any failure = delete stale session
      await account.deleteSession("current").catch(() => {});

      setUser(null);
      setProfile(null);
      setIsLoggedIn(false);
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    try {
      await appwriteLogout();
    } catch {}
    setUser(null);
    setProfile(null);
    setIsLoggedIn(false);
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
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
