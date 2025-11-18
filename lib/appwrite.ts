import { Account, Client, Databases, ID } from "appwrite";
import { Alert } from "react-native";

// ✅ Environment variables (public ones in app.json or .env)
const appwriteEndpoint = process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT || "";
const appwriteProjectId = process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID || "";
const appwriteDatabaseId = process.env.EXPO_PUBLIC_APPWRITE_DATABASE_ID || "";
const appwriteUserProfilesCollectionId =
  process.env.EXPO_PUBLIC_APPWRITE_PROFILES_COLLECTION_ID || "";

// ✅ Initialize Appwrite client
const client = new Client();
client.setEndpoint(appwriteEndpoint).setProject(appwriteProjectId);

const account = new Account(client);
const databases = new Databases(client);

export { account, ID };

//
// 🔐 AUTHENTICATION FUNCTIONS
//

// ✅ Create account with email/password
export const createAccount = async (signUpData: any) => {
  try {
    // Step 1: Create user account
    const user = await account.create(
      ID.unique(),
      signUpData.email,
      signUpData.password,
      signUpData.name
    );

    // Step 2: Login immediately (session required for DB access)
    await account.createEmailPasswordSession(
      signUpData.email,
      signUpData.password
    );

    // Step 3: Create profile document in database
    const userProfileData = {
      userId: user.$id,
      name: signUpData.name,
      email: signUpData.email,
      mobile: signUpData.mobile || "",
      role: signUpData.role || "parent",
      studentId: signUpData.studentId || "",
      dob: signUpData.dob || "",
      registeredMobile: signUpData.registeredMobile || "",
      employeeId: signUpData.employeeId || "",
    };

    await databases.createDocument(
      appwriteDatabaseId,
      appwriteUserProfilesCollectionId,
      user.$id,
      userProfileData
    );

    return user;
  } catch (error: any) {
    console.error("createAccount error:", error);
    Alert.alert("Error", error.message || "Failed to create account.");
    throw new Error(error?.message);
  }
};

// ✅ Sign in with email & password
export const signInWithEmail = async (email: string, password: string) => {
  try {
    try {
      await account.deleteSession("current");
    } catch (err) {}
    const session = await account.createEmailPasswordSession(email, password);
    return session;
  } catch (error: any) {
    console.error("signInWithEmail error:", error);
    Alert.alert("Error", error?.message || "Failed to sign in.");
    throw new Error(error?.message);
  }
};

// ✅ Get current logged-in account
export const getAccount = async () => {
  try {
    const currentAccount = await account.get();
    return currentAccount;
  } catch (error) {
    console.log("getAccount error:", error);
    return null;
  }
};

// ✅ Sign out current user
export const signOut = async () => {
  try {
    await account.deleteSession("current");
  } catch (error: any) {
    Alert.alert("Error", error.message || "Failed to sign out.");
    throw new Error(error);
  }
};

// ✅ Fetch user profile from database
export const getUserProfile = async (userId: string) => {
  try {
    const document = await databases.getDocument(
      appwriteDatabaseId,
      appwriteUserProfilesCollectionId,
      userId
    );
    return document;
  } catch (error) {
    console.log("getUserProfile error:", error);
    return null;
  }
};
