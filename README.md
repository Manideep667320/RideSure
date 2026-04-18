# RideSure - Micro-Insurance App for Gig Workers

🚀 **RideSure** is a cutting-edge micro-insurance platform designed specifically for the gig economy. It provides delivery partners and gig-workers with ultra-flexible, on-demand insurance coverage (daily/weekly plans) with seamless mobile-first experience powered by React Native (Expo) on the frontend and a robust Node.js/Express backend.

**Key Features:**
- ✅ Phone OTP, Email/Password, and Google Sign-In authentication
- ✅ Flexible daily & weekly insurance plans with auto-expiry
- ✅ AI-powered claim evaluation system
- ✅ Real-time claim submissions with GPS tracking & image uploads
- ✅ Payment integration for plan purchases
- ✅ User profile management & policy history
- ✅ Production-ready Android APK builds

---

## 🛠 Tech Stack

### Frontend (Mobile App)
- **Framework**: React Native with Expo SDK 54
- **Navigation**: `@react-navigation/stack` (stack-based routing)
- **Authentication**: 
  - Firebase Authentication (Native SDK)
  - Google Sign-In with `@react-native-google-signin/google-signin`
  - Context API for global state management
- **Storage**: AsyncStorage for local persistence
- **Styling**: Custom design system with glassmorphic UI tokens
  - Custom typography, shadows, gradients
  - `react-native-safe-area-context` for responsive layouts
  - `expo-linear-gradient` for premium gradient effects
- **Build System**: EAS (Expo Application Services) for production builds

### Backend (API Server)
- **Framework**: Node.js + Express.js v5.2
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: Firebase Admin SDK for token verification
- **Architecture**: Modular MVC pattern
  - Controllers: Request handling & business logic
  - Services: Policy, Claim, Payment, Auth, and AI Agent services
  - Models: User, Policy, Claim, Transaction schemas
  - Middlewares: Auth protection, error handling
- **AI Integration**: Intelligent claim evaluation engine
- **Payment Processing**: Payment service module

---

## 📁 Project Structure

```
Micro-Insurance-App/
├── backend/                      # Node.js Express API
│   ├── config/
│   │   ├── db.js                 # MongoDB connection
│   │   ├── firebase.js           # Firebase Admin SDK
│   │   └── serviceAccountKey.json # Firebase credentials
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── policyController.js
│   │   ├── claimController.js
│   │   └── paymentController.js
│   ├── models/
│   │   ├── User.js
│   │   ├── Policy.js
│   │   ├── Claim.js
│   │   └── Transaction.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── policyRoutes.js
│   │   ├── claimRoutes.js
│   │   └── paymentRoutes.js
│   ├── services/
│   │   ├── authService.js
│   │   ├── policyService.js
│   │   ├── claimService.js
│   │   ├── paymentService.js
│   │   └── aiAgentService.js    # AI claim evaluation
│   ├── middlewares/
│   │   ├── authMiddleware.js    # Firebase token verification
│   │   └── errorHandler.js
│   ├── utils/
│   │   ├── validators.js
│   │   └── riskScoring.js
│   └── server.js               # Entry point
│
└── frontend/                     # React Native Expo App
    ├── App.tsx                   # Root component
    ├── app.json                  # Expo configuration
    ├── eas.json                  # EAS build config
    ├── google-services.json      # Firebase Android config
    ├── android/
    │   └── app/
    │       ├── google-services.json  # Production config
    │       └── build.gradle
    ├── src/
    │   ├── screens/
    │   │   ├── auth/
    │   │   │   ├── LoginScreen.tsx        # Phone OTP, Email, Google Sign-In
    │   │   │   ├── SignupScreen.tsx       # Phone-based signup
    │   │   │   ├── SignUpDetailsScreen.tsx # Post-auth profile setup
    │   │   │   └── SplashScreen.tsx
    │   │   ├── home/                      # Dashboard
    │   │   ├── plans/                     # Insurance plan selection
    │   │   ├── claims/                    # Claim submission & history
    │   │   ├── payment/                   # Payment processing
    │   │   ├── profile/                   # User profile
    │   │   ├── protection/                # Policy details
    │   │   ├── history/                   # Transaction history
    │   │   └── settings/                  # App settings
    │   ├── components/
    │   │   ├── common/
    │   │   │   ├── Button.tsx
    │   │   │   └── Card.tsx
    │   │   └── ui/
    │   │       ├── GradientButton.tsx
    │   │       ├── InputField.tsx
    │   │       ├── PlanCard.tsx
    │   │       ├── StatusBadge.tsx
    │   │       └── ProgressRing.tsx
    │   ├── context/
    │   │   └── AuthContext.tsx    # Global auth state
    │   ├── services/
    │   │   ├── api.ts             # Axios instance with auth headers
    │   │   ├── googleSignInService.ts
    │   │   ├── policyService.ts
    │   │   └── claimService.ts
    │   ├── navigation/
    │   │   └── AppNavigator.tsx   # Route configuration
    │   ├── theme/
    │   │   ├── colors.ts
    │   │   ├── gradients.ts
    │   │   ├── shadows.ts
    │   │   ├── spacing.ts
    │   │   └── typography.ts
    │   ├── constants/
    │   │   ├── config.ts
    │   │   └── routes.ts
    │   ├── types/
    │   │   └── index.ts
    │   ├── utils/
    │   │   ├── formatCurrency.ts
    │   │   └── validators.ts
    │   └── hooks/
    │       └── useDebounce.ts
    └── package.json
```

---

## 🔐 Authentication Flow

RideSure supports **three authentication methods**:

### 1. **Phone OTP (Firebase)**
- User enters phone number
- Firebase sends SMS verification code
- User confirms code
- Firebase creates/verifies user
- Backend auto-creates MongoDB user on first login

### 2. **Email/Password (Firebase)**
- User can log in with email and password
- Firebase manages user account
- Synced with MongoDB backend

### 3. **Google Sign-In**
- User taps "Sign in with Google"
- Google OAuth flow
- Firebase verifies Google token
- Backend creates user from Google profile data (email, name, photoURL)

### Backend Authentication
- **Middleware**: `authMiddleware.js` verifies Firebase ID tokens
- **Verification**: Firebase Admin SDK `verifyIdToken()`
- **Auto-provisioning**: New users automatically created in MongoDB
- **Token Headers**: All API requests include `Authorization: Bearer <TOKEN>`

---

## 🚨 Key Features Explained

### 📋 Insurance Plans
- **Daily Plans**: 24-hour coverage starting immediately
- **Weekly Plans**: 7-day continuous coverage
- **Auto-Expiry**: Plans automatically expire at end time
- **Status Tracking**: Active, Expired, Cancelled states

### 🤖 AI-Powered Claim Evaluation
- Submits claim with description, image, and GPS location
- `aiAgentService.js` evaluates risk using:
  - Policy coverage details
  - Claim description analysis
  - Automatic risk scoring
  - Fraud detection flags
- Returns decision (approved/pending/rejected) with explanation

### 💳 Payment Integration
- Users purchase plans through in-app payment
- Transaction tracking in database
- Payment method management (cards, wallets, etc.)

### 📊 User Dashboard
- Active policy display
- Plan purchase history
- Claim submission status
- Profile information

---

## 🏎 How to Run Locally

### Prerequisites
- **Node.js** (v16+)
- **npm** or **yarn**
- **Android emulator** or **physical device** (for frontend)
- **MongoDB** (local or Atlas cloud)
- **Firebase project** with credentials
- **Expo CLI**: `npm install -g eas-cli`

### 1. Backend Setup

```bash
# Navigate to backend
cd backend

# Install dependencies
npm install

# Create .env file with:
MONGO_URI=mongodb+srv://user:password@cluster.mongodb.net/ridesure
PORT=5000
FIREBASE_PROJECT_ID=your-firebase-project-id

# Place serviceAccountKey.json in config/ directory
# Download from Firebase Console → Project Settings → Service Accounts

# Start server
npm start
```

Server runs on `http://localhost:5000`

### 2. Frontend Setup

> [!IMPORTANT]
> **RideSure requires a Custom Dev Client** (not Expo Go) because it uses native Firebase modules.

```bash
# Navigate to frontend
cd frontend

# Install dependencies
npm install --legacy-peer-deps

# Add google-services.json
# Download from Firebase Console → Project Settings → Android app
# Place in frontend/ directory

# Build and run on Android
npx expo run:android

# Or start dev server
expo start
```

---

## 📱 Building for Production

### Android APK (Google Play Store)

#### Debug/Preview Build
```bash
cd frontend

# Build preview APK (unsigned, for testing)
npm run build:android:preview

# Or directly
eas build --platform android --profile preview
```

#### Production Build
```bash
# Build production APK (signed with keystore)
npm run build:android

# Or directly
eas build --platform android --profile production
```

### Prerequisites for Production Build
1. **Google Play Developer Account** ($25 one-time)
2. **Firebase Configuration**:
   - Download `google-services.json` from Firebase Console
   - Ensure Android SHA-1 certificate is registered in Firebase
3. **Version Management**:
   - Update `package.json` version before building
   - EAS auto-increments build numbers

### Updating the App
```bash
# Update version in package.json
# "version": "1.0.1"

# Rebuild
eas build --platform android --profile production

# Submit to Play Store
eas submit --platform android

# Users automatically get update notifications
```

---

## 🔧 API Endpoints

### Authentication
- `POST /auth/signup` - Phone OTP signup
- `POST /auth/verify-otp` - Verify OTP
- `POST /auth/login/email` - Email login
- `POST /auth/profile` - Get/update user profile

### Policies
- `GET /policies/active` - Get user's active policy
- `POST /policies` - Create new policy (daily/weekly)
- `GET /policies` - Get all user policies
- `PUT /policies/:id` - Update policy

### Claims
- `POST /claims` - Submit claim with image & GPS
- `GET /claims` - Get all user claims
- `GET /claims/:id` - Get claim details
- `PUT /claims/:id` - Update claim

### Payments
- `POST /payments` - Process payment
- `GET /payments/history` - Get payment history

### User
- `GET /auth/me` - Get current user
- `PUT /auth/profile` - Update profile

---

## 🐛 Troubleshooting

### Google Sign-In Error: "Misconfigured"
**Issue**: "Google Signin is misconfigured. Verify firebase web client ID and android SHA certificates"

**Solution**:
1. Get your Android device's SHA-1 certificate:
   ```powershell
   keytool -list -v -keystore "C:\Users\YourUsername\.android\debug.keystore" -alias "androiddebugkey" -storepass "android" -keypass "android"
   ```
2. Copy the SHA-1 value
3. Go to Firebase Console → Project Settings → Your Android app → Add fingerprint
4. Download updated `google-services.json`

### EAS Build Upload Failed
**Issue**: "Failed to upload the project tarball to EAS Build"

**Solution**: Create `.easignore` in `frontend/` directory:
```
node_modules/
.expo/
.expo-shared/
dist/
build/
.git/
android/build/
android/.gradle/
.env.local
.env.*.local
```

### Firebase Token Invalid
**Issue**: "Token verification failed"

**Solution**:
- Verify Firebase Admin SDK credentials
- Ensure `serviceAccountKey.json` is valid
- Check Firebase project ID matches

---

## 📦 Dependencies

### Frontend Key Packages
- `react-native`: Core mobile framework
- `@react-native-firebase/auth`: Native Firebase integration
- `@react-native-google-signin/google-signin`: Google OAuth
- `@react-navigation/stack`: Navigation
- `expo`: Managed React Native framework

### Backend Key Packages
- `express`: HTTP server
- `mongoose`: MongoDB ODM
- `firebase-admin`: Firebase token verification
- `cors`: Cross-origin support
- `dotenv`: Environment variables

---

## 🚀 Deployment

### Android (Google Play Store)
1. Build production APK with EAS
2. Create Google Play Developer account
3. Upload APK to Play Console
4. Fill in app details, screenshots, description
5. Submit for review (24-48 hours)
6. Once approved, app is live on Play Store
7. For updates, increment version and resubmit

### Backend (Cloud Hosting)
- Deploy to Heroku, AWS, Google Cloud, or Azure
- Set environment variables for MongoDB, Firebase
- Ensure MongoDB is accessible from cloud environment

---

## 📄 License

MIT License - Feel free to use for personal/commercial projects
5. **Start the Bundler**:
   Once the app is installed, you can start the development server:
   ```bash
   npx expo start
   ```
6. The app will open inside your custom **RideSure** developer build. Standard hot-reloading works as expected.

---

## 🔑 Native Firebase Setup
To ensure Phone Auth works correctly on Android:
1. Generate your **SHA-1** fingerprint from your local debug keystore.
2. Add the SHA-1 to your Firebase project under **Project Settings > Android App**.
3. Ensure **Phone Authentication** is enabled in the Firebase Auth console.

---

> Built with passion inside the Fluid Architect design specifications.
