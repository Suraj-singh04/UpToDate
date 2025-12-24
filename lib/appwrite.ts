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
    try {
        await account.create(
            ID.unique(),
            signUpData.email,
            signUpData.password,
            signUpData.name
        );
    } catch (error: any) {
        // If user already exists, we proceed to try logging in. 
        // If it's another error, we throw it.
        // Appwrite error types are usually string codes or messages
        if (!error.message?.includes("already exists") && error.type !== "user_already_exists") {
             throw error;
        }
        // If user exists, we continue to Step 2 (Login & Profile check)
    }

    // Step 2: Login (Create Session) to allow profile creation permissions
    // This also verifies the password if the user already existed.
    await account.createEmailPasswordSession(signUpData.email, signUpData.password);
    
    const accountUser = await account.get();

        // Create profile (if not exists)
    try {
        await databases.getDocument(DB_ID, PROFILE_COLLECTION, accountUser.$id);
    } catch (e) {
        // Profile not found, so create it.
        const profileData: any = {
            userId: accountUser.$id,
            name: signUpData.name,
            email: signUpData.email,
            mobile: signUpData.mobile || "",
            role: signUpData.role || "parent",
        };

        // Only add optional fields if they have values
        if (signUpData.studentId) profileData.studentId = signUpData.studentId;
        if (signUpData.dob) profileData.dob = signUpData.dob;
        if (signUpData.registeredMobile) profileData.registeredMobile = signUpData.registeredMobile;
        if (signUpData.employeeId) profileData.employeeId = signUpData.employeeId;

        await databases.createDocument(
            DB_ID, 
            PROFILE_COLLECTION, 
            accountUser.$id, 
            profileData
        );
    }

    return accountUser;
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
        const docPayload: any = {
            userId: userId,
            name: profileData.name,
            email: profileData.email,
            mobile: profileData.mobile || "",
            role: profileData.role || "parent",
        };

        if (profileData.studentId) docPayload.studentId = profileData.studentId;
        if (profileData.dob) docPayload.dob = profileData.dob;
        if (profileData.registeredMobile) docPayload.registeredMobile = profileData.registeredMobile;
        if (profileData.employeeId) docPayload.employeeId = profileData.employeeId;

        await databases.createDocument(DB_ID, PROFILE_COLLECTION, userId, docPayload);
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
