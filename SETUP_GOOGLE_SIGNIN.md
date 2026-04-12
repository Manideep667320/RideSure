# Google Sign-In Setup Guide

## Overview
I've implemented Google Sign-In authentication for your app. Here's how to complete the configuration:

## Step 1: Get Your Web Client ID from Firebase Console

1. Open **Firebase Console**: https://console.firebase.google.com/
2. Select your project
3. Go to **Authentication** → **Sign-in method** → **Google** (should already be enabled)
4. Click on **Google** to expand it
5. You'll see:
   - **Web SDK configuration**
   - Look for the **Web Client ID** in the format: `xxx-xxx.apps.googleusercontent.com`

## Step 2: Update Google Sign-In Configuration

1. Open: `frontend/src/services/googleSignInService.ts`
2. Find the line with `webClientId: 'YOUR_WEB_CLIENT_ID'`
3. Replace `'YOUR_WEB_CLIENT_ID'` with your actual Web Client ID:

```typescript
GoogleSignin.configure({
  webClientId: 'YOUR_ACTUAL_WEB_CLIENT_ID.apps.googleusercontent.com', // ← Replace this
  scopes: ['https://www.googleapis.com/auth/userinfo.email'],
  profileImageSize: 120,
});
```

## Step 3: Android Configuration

Your Android app needs the `google-services.json` file configured:

1. In Firebase Console, go to **Project Settings** → **Your apps** → **Android app**
2. Download the updated `google-services.json`
3. Replace the file at: `frontend/android/app/google-services.json`

## Step 4: iOS Configuration (if building for iOS later)

1. In Firebase Console, get the **iOS configuration** settings
2. The `@react-native-google-signin/google-signin` package handles most of the setup automatically
3. You may need to add URL schemes in Info.plist if running on iOS

## Step 5: Test the Implementation

After configuration:

```bash
cd frontend
npx expo run:android
```

On the Login screen, you should now see:
- **Phone OTP login** (existing)
- **Divider line with "Or"**
- **Sign in with Google button**

## Features Implemented

✅ **Google Sign-In Button** - Beautiful styled button with Google icon
✅ **Google Authentication** - Secure Firebase authentication via Google
✅ **Auto-User Creation** - New users are automatically created in MongoDB on first login
✅ **Seamless Navigation** - Users directed to profile setup or home based on existing data
✅ **Error Handling** - Proper error messages for all scenarios

## Backend Integration

Your backend already supports Google Sign-In! The authentication middleware:
- ✅ Verifies Firebase tokens from Google Sign-In
- ✅ Automatically creates users in MongoDB with their Google UID and email
- ✅ Handles session management

## Troubleshooting

**Issue**: "Play Services not available"
- Make sure you have **Google Play Services** installed on your device/emulator

**Issue**: "Sign-in was cancelled"
- User dismissed the Google sign-in dialog - this is normal, no action needed

**Issue**: "Token failed" error after sign-in
- Check that the `webClientId` is correctly set in `googleSignInService.ts`
- Verify `google-services.json` is properly configured

**Issue**: User created but login fails
- Check backend logs to ensure Firebase token verification passes
- Verify the MongoDB User is being created with the correct `firebaseUid`

