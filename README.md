# NECS 2026 - National Esports Championship Series

Official project for the National Esports Championship Series 2026 event, featuring a promotional website and companion mobile app.

## Project Structure

```
Bpa Project/
├── website/           # Promotional website
│   ├── index.html     # Main landing page
│   ├── css/           # Stylesheets
│   ├── js/            # JavaScript files
│   └── assets/        # Images and icons
│
├── mobile-app/        # React Native mobile app (Expo)
│   ├── App.js         # Main app entry point
│   ├── screens/       # App screens
│   ├── components/    # Reusable components
│   ├── constants/     # Theme and configuration
│   └── services/      # Data services and API
│
└── shared/            # Shared resources between website & app
    ├── data/          # Shared JSON data (teams, schedule, etc.)
    ├── api/           # Shared API configuration
    └── theme/         # Shared color palette and design tokens
```

## Getting Started

### Website

The website is a static HTML/CSS/JS site that can be served directly:

```bash
cd website
# Use any static server, e.g.:
npx serve .
# Or open index.html directly in a browser
```

### Mobile App

The mobile app is built with React Native and Expo:

```bash
cd mobile-app

# Install dependencies
npm install

# Start the development server
npm start

# Run on specific platform
npm run ios      # iOS Simulator
npm run android  # Android Emulator
npm run web      # Web browser
```

## Shared Backend

Both the website and mobile app are designed to connect to a shared backend API. Currently, they use local JSON data files for development.

### Switching to Live API

1. **Mobile App**: Edit `mobile-app/services/dataService.js`
   - Set `API_CONFIG.useLocalData = false`
   - Update `API_CONFIG.baseUrl` with your API URL

2. **Website**: Edit `shared/api/config.js`
   - Update the `apiBaseUrl` to your production API

### API Endpoints (for future backend)

| Endpoint | Description |
|----------|-------------|
| `/api/teams` | Get all teams |
| `/api/schedule` | Get event schedule |
| `/api/scores/live` | Get live match scores |
| `/api/stats/players` | Get player statistics |
| `/api/brackets` | Get tournament brackets |
| `/api/chat/messages` | Get chat messages |

## Event Information

- **Event**: National Esports Championship Series 2026
- **Dates**: May 6-10, 2026
- **Venue**: Bridgestone Arena, Nashville, Tennessee
- **Games**: Valorant, Rocket League, Super Smash Bros

## Tech Stack

### Website
- HTML5, CSS3 (Custom Properties)
- Vanilla JavaScript
- Responsive Design

### Mobile App
- React Native
- Expo SDK 54
- React Navigation 7
- Ionicons

## Team

Built by Nova Creations for BPA Competition.

---

*Last updated: January 2026*
