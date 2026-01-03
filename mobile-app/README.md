# NECS 2026 Mobile App

Official companion mobile app for the National Esports Championship Series 2026.

## Features

- **Live Scores**: Real-time match scores and updates
- **Player Stats**: Track player performance across all games
- **Watch Replays**: View VODs and match highlights
- **Brackets**: Tournament bracket visualization
- **Live Chat**: Community chat during matches

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn
- Expo CLI (optional, but recommended)
- iOS Simulator (Mac) or Android Emulator

### Installation

```bash
# Install dependencies
npm install

# Start the development server
npm start
```

### Running the App

```bash
# iOS
npm run ios

# Android
npm run android

# Web
npm run web
```

## Project Structure

```
mobile-app/
├── App.js              # Main app entry, navigation setup
├── screens/            # Screen components
│   ├── LiveScoresScreen.js
│   ├── PlayerStatsScreen.js
│   ├── ReplaysScreen.js
│   ├── BracketsScreen.js
│   └── ChatScreen.js
├── components/         # Reusable UI components
│   ├── GameTabs.js
│   └── ScreenHeader.js
├── constants/          # Theme and configuration
│   └── theme.js
├── services/           # Data services
│   ├── dataService.js  # Main data service
│   └── localData/      # Local JSON data (fallback)
└── assets/             # App icons and images
```

## Data Service

The app uses a centralized data service (`services/dataService.js`) that:

1. Provides mock data for development
2. Can switch to live API when backend is ready
3. Handles caching and error fallbacks

### Connecting to Live API

Edit `services/dataService.js`:

```javascript
const API_CONFIG = {
  baseUrl: 'https://your-api-url.com/api',
  useLocalData: false,  // Set to false for live API
  // ...
};
```

## Theme

The app uses a consistent dark theme with neon accents:

- **Primary Background**: `#0a0a0f` (near black)
- **Accent Cyan**: `#00f0ff`
- **Accent Magenta**: `#ff00aa`
- **Game Colors**:
  - Valorant: `#ff4655`
  - Rocket League: `#0080ff`
  - Smash Bros: `#e60012`

## Dependencies

- `expo` - Development framework
- `@react-navigation/native` - Navigation
- `@react-navigation/bottom-tabs` - Tab navigation
- `@expo/vector-icons` - Icon library
- `react-native-safe-area-context` - Safe area handling

## Scripts

| Command | Description |
|---------|-------------|
| `npm start` | Start Expo development server |
| `npm run ios` | Run on iOS simulator |
| `npm run android` | Run on Android emulator |
| `npm run web` | Run in web browser |

---

Part of the NECS 2026 project by Nova Creations.
