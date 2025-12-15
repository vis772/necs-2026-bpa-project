# NECS 2026 Mobile App

React Native / Expo version of the NECS 2026 mobile application.

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ installed
- Expo Go app on your phone (iOS or Android)

### Installation

1. Navigate to the mobile app folder:
```bash
cd necs-mobile-app
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npx expo start
```

4. Scan the QR code with:
   - **iOS**: Camera app
   - **Android**: Expo Go app

## 📱 Screens

1. **Live Scores** - Real-time match tracking with game tabs
2. **Player Stats** - Searchable player profiles with statistics
3. **Match Replays** - Video replay grid with filters
4. **Brackets** - Tournament bracket progression
5. **Community Chat** - Real-time chat with channels

## 🎨 Design System

The app uses the same design tokens as the website:
- Dark theme with neon accents
- Cyan (#00f0ff) and Magenta (#ff00ff) accent colors
- Consistent typography and spacing

## 📁 Project Structure

```
necs-mobile-app/
├── App.js                 # Main entry point
├── app.json               # Expo configuration
├── package.json           # Dependencies
├── babel.config.js        # Babel configuration
│
├── assets/                # App icons and splash
│
├── constants/
│   └── theme.js           # Design tokens
│
├── components/
│   ├── ScreenHeader.js    # Reusable header
│   └── GameTabs.js        # Game selection tabs
│
└── screens/
    ├── LiveScoresScreen.js
    ├── PlayerStatsScreen.js
    ├── ReplaysScreen.js
    ├── BracketsScreen.js
    └── ChatScreen.js
```

## ⚠️ Asset Placeholders

The PNG files in `/assets` are placeholders. Replace them with actual images:
- `icon.png` - 1024x1024px app icon
- `splash.png` - 1284x2778px splash screen
- `adaptive-icon.png` - 1024x1024px Android adaptive icon
- `favicon.png` - 32x32px web favicon

