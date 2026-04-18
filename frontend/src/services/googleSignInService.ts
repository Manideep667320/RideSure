import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import Constants from 'expo-constants';
import auth from '@react-native-firebase/auth';

const getWebClientId = () => {
  const extraWebClientId = Constants.expoConfig?.extra?.googleWebClientId;

  if (typeof extraWebClientId === 'string' && extraWebClientId.length > 0) {
    return extraWebClientId;
  }

  throw new Error(
    'Missing Google web client ID in app config. Rebuild after updating google-services.json.'
  );
};

// Initialize Google Sign-In
export const configureGoogleSignIn = async () => {
  try {
    GoogleSignin.configure({
      webClientId: getWebClientId(),
      offlineAccess: true,
      profileImageSize: 120,
    });
  } catch (error: any) {
    console.error('Google Sign-In Configuration Error:', error);
  }
};

// Sign in with Google
export const signInWithGoogle = async () => {
  try {
    await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
    const userInfo = await GoogleSignin.signIn();

    if (userInfo.type !== 'success') {
      throw new Error('Sign-in was cancelled');
    }

    let idToken = userInfo.data.idToken;

    if (!idToken) {
      const tokens = await GoogleSignin.getTokens();
      idToken = tokens.idToken;
    }

    if (!idToken) {
      throw new Error('No ID token received from Google Sign-In');
    }

    // Create Firebase credential with the Google ID token
    const googleCredential = auth.GoogleAuthProvider.credential(
      idToken
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
    const isDeveloperError =
      error?.code === '10' || String(error?.message).includes('DEVELOPER_ERROR');

    if (error.code === statusCodes.SIGN_IN_CANCELLED) {
      throw new Error('Sign-in was cancelled');
    } else if (error.code === statusCodes.IN_PROGRESS) {
      throw new Error('Sign-in is in progress');
    } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
      throw new Error('Play Services not available');
    } else if (isDeveloperError) {
      throw new Error(
        'Google Sign-In is misconfigured. Verify the Firebase web client ID and Android SHA certificates.'
      );
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
