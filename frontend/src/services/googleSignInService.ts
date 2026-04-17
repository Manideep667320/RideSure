import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';
import googleServices from '../../google-services.json';

type GoogleServicesConfig = {
  client?: Array<{
    oauth_client?: Array<{
      client_id: string;
      client_type: number;
    }>;
  }>;
};

const getWebClientId = () => {
  const config = googleServices as GoogleServicesConfig;
  const webClientId = config.client
    ?.flatMap((client) => client.oauth_client ?? [])
    .find((oauthClient) => oauthClient.client_type === 3)?.client_id;

  if (!webClientId) {
    throw new Error(
      'Missing Google web client ID in google-services.json. Re-download it from Firebase.'
    );
  }

  return webClientId;
};

// Initialize Google Sign-In
export const configureGoogleSignIn = async () => {
  try {
    await GoogleSignin.hasPlayServices();
    GoogleSignin.configure({
      webClientId: getWebClientId(),
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
