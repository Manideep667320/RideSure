# RideSure - Micro-Insurance App

RideSure is a dynamic, high-fidelity micro-insurance platform designed specifically for the gig economy. It provides delivery partners and gig-workers with ultra-flexible, on-demand insurance packages (e.g., active daily plans) seamlessly through a premium React Native (Expo) front-end powered by a secure Node.js backend.

---

## 🛠 Tech Stack

### Frontend (Mobile App)
- **Framework**: React Native with Expo (SDK 54)
- **Navigation**: `@react-navigation/stack`
- **Authentication/Session**: `@react-native-async-storage/async-storage` & Context API
- **Styling**: Premium custom UI Tokens mimicking state-of-the-art Glassmorphic layouts. Uses custom typography, shadows, gradients, and fluid architectures utilizing `react-native-safe-area-context`.
- **Features**: Real-time plan purchasing simulations, profile sync, history tracking, and intelligent dashboard alerts.

### Backend (API Server)
- **Framework**: Node.js & Express.js
- **Database**: MongoDB (Object Data Modeling via `mongoose`)
- **Authentication Strategy**: Firebase Admin SDK Verification paired with MongoDB schema syncing. (Includes a customized bypass simulation module for rapid Hackathon validations).
- **Core Modules**: Modular MVC architecture covering `Auth`, `Payments`, `Claims`, and `Policies`.

---

## 🏗 Project Architecture & Structure

The repository uses a clear, uncoupled Monorepo layout ensuring maximum separation of concerns horizontally across the full stack.

```
Micro-Insurance-App/
├── backend/                  # Node.js API Service
│   ├── config/               # Database and Firebase connection handlers
│   ├── controllers/          # Endpoint logic implementations
│   ├── middlewares/          # Firebase Auth logic & Global Error handlers 
│   ├── models/               # MongoDB Mongoose schemas (User, Claim, etc.)
│   ├── routes/               # API route definitions
│   └── services/             # 3rd-party integrators (e.g., Stripe Payments)
│
└── frontend/                 # React Native Mobile App
    ├── App.tsx               # Root entry & Navigation tree mapping
    ├── src/
    │   ├── components/       # Reusable primitive UI blocks (Cards, Buttons)
    │   ├── constants/        # Global Env and config variables
    │   ├── context/          # Global Auth Provider hydration states
    │   ├── navigation/       # Stack Navigator execution logic
    │   ├── screens/          # Specific module layouts (Login, Dashboard, Claims)
    │   └── theme/            # Hardcoded design system tokens (colors, fonts, etc.)
```

---

## 🔐 Authentication Ecosystem

RideSure currently utilizes a dual-tier identity ecosystem:
1. **Frontend**: Sends Identity tokens mapped over HTTP `Authorization: Bearer <TOKEN>` headers universally intercepted via `services/api.ts`.
2. **Backend**: The `protect` middleware evaluates incoming access requests. 
   - Uses **Firebase Admin SDK** `verifyIdToken()` in production.
   - For rapid deployment and development testing, sending `MOCK_FIREBASE_TOKEN_FOR_HACKATHON` will instantly hit the MongoDB auto-provisioning route—instantiating a clean synthetic user schema effortlessly to prevent arbitrary blocking.

---

## 🏎 How to Run Locally

Because the backend and the frontend operate horizontally, you must launch them natively inside two separate terminal sessions.

### 1. Launching the Backend
1. Open your terminal and navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Make sure you install dependencies:
   ```bash
   npm install
   ```
3. Set up your `.env` to include proper connection strings (e.g., `MONGO_URI`) and drop your `serviceAccountKey.json` inside the `config/` directory for Firebase admin capabilities.
4. Launch the server locally:
   ```bash
   node server.js
   ```
   *The server defaults to running dynamically on Port `5000`.*

### 2. Launching the Frontend
1. Open a **new** terminal window and navigate into the `frontend` folder:
   ```bash
   cd frontend
   ```
2. Install SDK 54 compatible modules allowing resolving dependencies securely:
   ```bash
   npm install
   ```
3. Ensure that your native `frontend/src/constants/config.ts` points accurately to your live development IP. Given React Native Expo relies on dynamic Local Area Network mapping instead of `localhost`, verify:
   ```typescript
   export const CONFIG = {
     API_URL: 'http://<YOUR_LAN_IP_ADDRESS>:5000',
   };
   ```
4. Start the frontend through Expo:
   ```bash
   npx expo start
   ```
5. Choose your target target platform by pressing:
   - `a` to open mapped to your Android Emulator.
   - `i` to execute onto your iOS Simulator.
   - Or simply scan the generated QR Code with the **Expo Go** application available natively on any physical mobile device.

---

> Built with passion inside the Fluid Architect design specifications.
