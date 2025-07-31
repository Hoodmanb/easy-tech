import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { auth } from "../lib/firebase";

// custom func to handle firebase error
import handleSignupError from "../utils/firebaseError"

interface Prop {
  email: string
  password: string
}


export const login = async ({ email, password }: Prop) => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    return { success: true, message: "success" };
  } catch (err) {
    if (err && typeof err === "object" && "code" in err) {
      return { success: false, message: handleSignupError((err as any).code) };
    }
    return { success: false, message: "An unexpected error occurred." };
  }
};

export const register = async ({ email, password }: Prop) => {
  console.log(email);
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;
    console.log(user.uid)
    // Update display name
    return { success: true, message: "success" };
  } catch (err) {
    if (err && typeof err === "object" && "code" in err) {
      return { success: false, message: handleSignupError((err as any).code) };
    }
    return { success: false, message: "An unexpected error occurred." };
  }
};
