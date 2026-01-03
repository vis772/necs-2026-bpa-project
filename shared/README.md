# NECS 2026 Shared Resources

This folder contains shared resources used by both the website and mobile app.

## Structure

```
shared/
├── data/           # Shared JSON data files
│   ├── teams.json      # Team rosters for all games
│   ├── schedule.json   # Event schedule
│   └── tickets.json    # Ticket information
│
├── api/            # API configuration
│   ├── config.js       # API endpoints and settings
│   └── dataService.js  # Data fetching service
│
└── theme/          # Design tokens
    └── colors.js       # Shared color palette
```

## Data Files

### teams.json

Contains all team data organized by game:

```json
{
  "valorant": [...],
  "rocketLeague": [...],
  "smash": [...]
}
```

Each team includes:
- `id` - Unique identifier
- `name` - Team name
- `abbreviation` - Short name (2-3 letters)
- `game` - Game identifier
- `roster` - Array of players

### schedule.json

Contains event information and match schedule:

```json
{
  "eventInfo": {
    "name": "...",
    "startDate": "2026-05-06",
    ...
  },
  "days": [
    { "day": 1, "matches": [...] },
    ...
  ]
}
```

### tickets.json

Contains ticket tier information:

```json
{
  "tickets": [
    { "id": "day-pass", "price": 49, ... },
    { "id": "full-event", "price": 179, ... },
    { "id": "vip", "price": 399, ... }
  ]
}
```

## API Configuration

### config.js

Central configuration for API endpoints:

```javascript
import config from '../shared/api/config.js';

// Use endpoints
fetch(`${config.apiBaseUrl}${config.endpoints.teams}`)
```

### dataService.js

Data fetching service with caching:

```javascript
import dataService from '../shared/api/dataService.js';

const teams = await dataService.getTeams();
const schedule = await dataService.getSchedule();
```

## Theme

### colors.js

Shared color palette for consistent branding:

```javascript
import { Colors } from '../shared/theme/colors.js';

// Use colors
const style = { backgroundColor: Colors.bgPrimary };
```

## Usage

### In Mobile App

The mobile app has its own copy of data in `mobile-app/services/localData/` for offline use, but syncs from these shared files.

### In Website

The website can import shared data via JavaScript modules or use the API when configured.

## Updating Data

When updating shared data:

1. Edit files in `shared/data/`
2. Copy to `mobile-app/services/localData/` for offline support
3. When API is ready, the apps will fetch from server instead

---

Part of the NECS 2026 project by Nova Creations.

