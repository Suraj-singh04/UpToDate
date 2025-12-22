import { Alert } from "react-native";
import { Account, Client, Databases, ID, OAuthProvider } from "react-native-appwrite";

// Env
const ENDPOINT = process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT || "";
const PROJECT = process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID || "";
const DB_ID = process.env.EXPO_PUBLIC_APPWRITE_DATABASE_ID || "";
const PROFILE_COLLECTION = process.env.EXPO_PUBLIC_APPWRITE_PROFILES_COLLECTION_ID || "";

// Init client
const client = new Client()
  .setEndpoint(ENDPOINT)
  .setProject(PROJECT);

const account = new Account(client);
const databases = new Databases(client);

export { account, client, ID };

// -------------------------------
// AUTH FUNCTIONS
// -------------------------------

// CREATE ACCOUNT (no auto-login)
export const createAccount = async (signUpData: any) => {
  try {
    // Step 1: Create Appwrite user
    const user = await account.create(
      ID.unique(),
      signUpData.email,
      signUpData.password,
      signUpData.name
    );

    // Step 2: Create profile
    await databases.createDocument(DB_ID, PROFILE_COLLECTION, user.$id, {
      userId: user.$id,
      name: signUpData.name,
      email: signUpData.email,
      mobile: signUpData.mobile || "",
      role: signUpData.role || "parent",
      studentId: signUpData.studentId || "",
      dob: signUpData.dob || "",
      registeredMobile: signUpData.registeredMobile || "",
      employeeId: signUpData.employeeId || "",
    });

    return user;
  } catch (error: any) {
    console.error("createAccount error:", error);
    Alert.alert("Error", error.message || "Failed to create account.");
    throw new Error(error?.message);
  }
};

// LOGIN
export const signInWithEmail = async (email: string, password: string) => {
  try {
    // clear active session
    try {
      await account.deleteSession("current");
    } catch {}

    const session = await account.createEmailPasswordSession(email, password);
    return session;
  } catch (error: any) {
    console.error("signInWithEmail error:", error);
    Alert.alert("Error", error?.message || "Failed to sign in.");
    throw new Error(error?.message);
  }
};

// GET ACCOUNT
export const getAccount = async () => {
  try {
    return await account.get();
  } catch {
    return null;
  }
};

// LOGOUT
export const signOut = async () => {
  try {
    await account.deleteSession("current");
  } catch (error) {
    console.error("signOut error:", error);
    throw error;
  }
};

// SOCIAL LOGIN
export const loginWithOAuth = async (provider: OAuthProvider) => {
    try {
        await account.createOAuth2Session(
            provider,
            "uptodate://callback", // Success URL (Deep Link)
            "uptodate://callback"  // Failure URL
        );
        return true;
    } catch (error: any) {
        console.error("loginWithOAuth error:", error);
        throw new Error(error?.message);
    }
};

// CREATE PROFILE (For Social Login users)
export const createProfile = async (userId: string, profileData: any) => {
    try {
        await databases.createDocument(DB_ID, PROFILE_COLLECTION, userId, {
            userId: userId,
            name: profileData.name,
            email: profileData.email,
            mobile: profileData.mobile || "",
            role: profileData.role || "parent",
            studentId: profileData.studentId || "",
            dob: profileData.dob || "",
            registeredMobile: profileData.registeredMobile || "",
            employeeId: profileData.employeeId || "",
        });
        return true;
    } catch (error: any) {
        console.error("createProfile error:", error);
        throw new Error(error?.message);
    }
};

// GET PROFILE
export const getUserProfile = async (userId: string) => {
  try {
    return await databases.getDocument(DB_ID, PROFILE_COLLECTION, userId);
  } catch {
    return null;
  }
};
