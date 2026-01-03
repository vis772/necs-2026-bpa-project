/**
 * NECS 2026 - Shared API Configuration
 * 
 * This configuration is shared between the website and mobile app.
 * Update this file to configure API endpoints and settings.
 */

const config = {
  // API Base URL - Update this when you have a backend server
  apiBaseUrl: process.env.API_BASE_URL || 'http://localhost:3000/api',
  
  // WebSocket URL for real-time updates
  wsUrl: process.env.WS_URL || 'ws://localhost:3000/ws',
  
  // Event Information
  event: {
    name: 'National Esports Championship Series 2026',
    shortName: 'NECS 2026',
    startDate: '2026-05-06',
    endDate: '2026-05-10',
    venue: 'Bridgestone Arena',
    location: 'Nashville, Tennessee',
    timezone: 'America/Chicago'
  },
  
  // API Endpoints
  endpoints: {
    // Teams
    teams: '/teams',
    teamById: (id) => `/teams/${id}`,
    teamsByGame: (game) => `/teams?game=${game}`,
    
    // Schedule
    schedule: '/schedule',
    scheduleByDay: (day) => `/schedule?day=${day}`,
    liveMatches: '/schedule/live',
    
    // Scores & Stats
    liveScores: '/scores/live',
    matchScores: (matchId) => `/scores/${matchId}`,
    playerStats: '/stats/players',
    playerStatsById: (playerId) => `/stats/players/${playerId}`,
    
    // Brackets
    brackets: '/brackets',
    bracketsByGame: (game) => `/brackets?game=${game}`,
    
    // Chat & Social
    chatMessages: '/chat/messages',
    chatRooms: '/chat/rooms',
    
    // Replays & VODs
    replays: '/replays',
    replayById: (id) => `/replays/${id}`,
    
    // Tickets
    tickets: '/tickets',
    purchaseTicket: '/tickets/purchase'
  },
  
  // Polling Intervals (in milliseconds)
  polling: {
    liveScores: 5000,      // 5 seconds
    liveChat: 2000,        // 2 seconds
    schedule: 60000,       // 1 minute
    playerStats: 30000     // 30 seconds
  },
  
  // Feature Flags
  features: {
    liveChat: true,
    liveScores: true,
    replays: true,
    ticketPurchase: false,  // Enable when payment is ready
    pushNotifications: false
  }
};

// Export for different module systems
if (typeof module !== 'undefined' && module.exports) {
  module.exports = config;
}

if (typeof window !== 'undefined') {
  window.NECSConfig = config;
}

export default config;

