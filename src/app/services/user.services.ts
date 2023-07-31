import { Injectable } from "@angular/core";
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, signInWithPopup
, GoogleAuthProvider } from "@angular/fire/auth";

@Injectable({
    providedIn: "root"
})
export class UserService {
    constructor(private auth: Auth) {}

    register({ email, password }: any) {
        return createUserWithEmailAndPassword(this.auth, email, password)
          .catch(error => {
            const errorCode = error.code;
            let errorMessage = "An unknown error occurred.";
            if (errorCode === "auth/email-already-in-use") {
              errorMessage = "The email address is already in use.";
            } else if (errorCode === "auth/invalid-email") {
              errorMessage = "Invalid email address.";
            } else if (errorCode === "auth/operation-not-allowed") {
              errorMessage = "Account creation is not allowed.";
            } else if (errorCode === "auth/weak-password") {
              errorMessage = "Weak password. Please choose a stronger password.";
            }
            return Promise.reject(new Error(errorMessage));
          });
    }

    login({ email, password }: any) {
        return signInWithEmailAndPassword(this.auth, email, password)
          .catch(error => {
            const errorCode = error.code;
            let errorMessage = "An unknown error occurred.";
            if (errorCode === "auth/user-disabled") {
              errorMessage = "The user account has been disabled.";
            } else if (errorCode === "auth/user-not-found" || errorCode === "auth/wrong-password") {
              errorMessage = "Invalid email or password.";
            } else if (errorCode === "auth/invalid-email") {
              errorMessage = "Invalid email address.";
            }
            return Promise.reject(new Error(errorMessage));
          });
    }

    loginWithGoogle() {
        return signInWithPopup(this.auth, new GoogleAuthProvider())
          .catch(error => {
            const errorMessage = "An error occurred while logging in with Google.";
            return Promise.reject(new Error(errorMessage));
          });
    }

    logout() {
        return signOut(this.auth);
    }
}
