import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';

// Initialize Google Sign-In
export const configureGoogleSignIn = async () => {
  try {
    await GoogleSignin.hasPlayServices();
    GoogleSignin.configure({
      webClientId: 'YOUR_WEB_CLIENT_ID', // Replace with your web client ID from Firebase console
      scopes: ['https://www.googleapis.com/auth/userinfo.email'],
      profileImageSize: 120,
    });
  } catch (error: any) {
    console.error('Google Sign-In Configuration Error:', error);
  }
};

// Sign in with Google
export const signInWithGoogle = async () => {
  try {
    await GoogleSignin.hasPlayServices();
    const userInfo = await GoogleSignin.signIn();
    
    if (!userInfo.data?.idToken) {
      throw new Error('No ID token received from Google Sign-In');
    }

    // Create Firebase credential with the Google ID token
    const googleCredential = auth.GoogleAuthProvider.credential(
      userInfo.data.idToken
    );

    // Sign in with Firebase using the Google credential
    const result = await auth().signInWithCredential(googleCredential);
    
    // Get the ID token from Firebase auth
    const token = await result.user.getIdToken();
    
    return {
      token,
      user: {
        email: result.user.email,
        displayName: result.user.displayName,
        photoURL: result.user.photoURL,
        firebaseUid: result.user.uid,
      },
    };
  } catch (error: any) {
    if (error.code === statusCodes.SIGN_IN_CANCELLED) {
      throw new Error('Sign-in was cancelled');
    } else if (error.code === statusCodes.IN_PROGRESS) {
      throw new Error('Sign-in is in progress');
    } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
      throw new Error('Play Services not available');
    } else {
      throw new Error(`Google Sign-In Error: ${error.message}`);
    }
  }
};

// Sign out from Google
export const signOutGoogle = async () => {
  try {
    await GoogleSignin.signOut();
  } catch (error: any) {
    console.error('Google Sign-Out Error:', error);
  }
};
