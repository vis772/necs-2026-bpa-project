/**
 * NECS 2026 Mobile App - Data Service
 * 
 * This service connects to the shared data and API configuration.
 * It provides data access for all screens in the mobile app.
 */

// API Configuration
const API_CONFIG = {
  // Update this URL when you have a backend server
  baseUrl: 'http://localhost:3000/api',
  useLocalData: true, // Set to false when API is ready
  
  // Polling intervals
  polling: {
    liveScores: 5000,
    liveChat: 2000,
    schedule: 60000,
    playerStats: 30000
  }
};

// Import shared data directly for now (until API is ready)
// These will be replaced with API calls when backend is implemented
import teamsData from './localData/teams.json';
import scheduleData from './localData/schedule.json';
import ticketsData from './localData/tickets.json';

class DataService {
  constructor() {
    this.cache = new Map();
    this.cacheTimeout = 60000;
    this.listeners = new Map();
  }

  // ============================================
  // TEAMS
  // ============================================

  async getTeams() {
    if (API_CONFIG.useLocalData) {
      return teamsData;
    }
    try {
      const response = await fetch(`${API_CONFIG.baseUrl}/teams`);
      return response.json();
    } catch (error) {
      console.error('Error fetching teams:', error);
      return teamsData; // Fallback to local data
    }
  }

  async getTeamsByGame(game) {
    const teams = await this.getTeams();
    return teams[game] || [];
  }

  async getTeamById(teamId) {
    const teams = await this.getTeams();
    for (const game of Object.keys(teams)) {
      const team = teams[game].find(t => t.id === teamId);
      if (team) return team;
    }
    return null;
  }

  // ============================================
  // SCHEDULE
  // ============================================

  async getSchedule() {
    if (API_CONFIG.useLocalData) {
      return scheduleData;
    }
    try {
      const response = await fetch(`${API_CONFIG.baseUrl}/schedule`);
      return response.json();
    } catch (error) {
      console.error('Error fetching schedule:', error);
      return scheduleData;
    }
  }

  async getScheduleByDay(day) {
    const schedule = await this.getSchedule();
    return schedule.days.find(d => d.day === day);
  }

  async getEventInfo() {
    const schedule = await this.getSchedule();
    return schedule.eventInfo;
  }

  async getLiveMatches() {
    const schedule = await this.getSchedule();
    const allMatches = schedule.days.flatMap(day => day.matches);
    return allMatches.filter(m => m.status === 'live');
  }

  // ============================================
  // TICKETS
  // ============================================

  async getTickets() {
    if (API_CONFIG.useLocalData) {
      return ticketsData.tickets;
    }
    try {
      const response = await fetch(`${API_CONFIG.baseUrl}/tickets`);
      return response.json();
    } catch (error) {
      console.error('Error fetching tickets:', error);
      return ticketsData.tickets;
    }
  }

  // ============================================
  // LIVE SCORES (Mock data for development)
  // ============================================

  async getLiveScores() {
    if (API_CONFIG.useLocalData) {
      return this.getMockLiveScores();
    }
    try {
      const response = await fetch(`${API_CONFIG.baseUrl}/scores/live`);
      return response.json();
    } catch (error) {
      console.error('Error fetching live scores:', error);
      return this.getMockLiveScores();
    }
  }

  getMockLiveScores() {
    return [
      {
        id: 'live-1',
        status: 'live',
        game: 'valorant',
        gameDisplay: 'VALORANT',
        round: 'Quarterfinal 1',
        team1: { 
          name: 'Nova Vanguard', 
          abbr: 'NV', 
          score: 2, 
          color: '#00f0ff' 
        },
        team2: { 
          name: 'Shadow Elite', 
          abbr: 'SE', 
          score: 1, 
          color: '#ff4655' 
        },
        time: 'Map 3 • Haven',
        viewers: '24.5K'
      },
      {
        id: 'live-2',
        status: 'live',
        game: 'rocketLeague',
        gameDisplay: 'ROCKET LEAGUE',
        round: 'Semifinal 1',
        team1: { 
          name: 'Supersonic Racers', 
          abbr: 'SR', 
          score: 3, 
          color: '#0080ff' 
        },
        team2: { 
          name: 'Aerial Experts', 
          abbr: 'AE', 
          score: 2, 
          color: '#8b5cf6' 
        },
        time: 'Overtime',
        viewers: '18.2K'
      }
    ];
  }

  // ============================================
  // PLAYER STATS (Mock data for development)
  // ============================================

  async getPlayerStats() {
    if (API_CONFIG.useLocalData) {
      return this.getMockPlayerStats();
    }
    try {
      const response = await fetch(`${API_CONFIG.baseUrl}/stats/players`);
      return response.json();
    } catch (error) {
      console.error('Error fetching player stats:', error);
      return this.getMockPlayerStats();
    }
  }

  getMockPlayerStats() {
    return [
      {
        id: 'p1',
        name: 'Alex Chen',
        ign: 'Phantom',
        team: 'Nova Vanguard',
        teamAbbr: 'NV',
        game: 'valorant',
        stats: { 
          kills: 156, 
          deaths: 89, 
          assists: 45, 
          rating: 1.42,
          headshots: 78,
          clutches: 12
        },
        rank: 1
      },
      {
        id: 'p2',
        name: 'Ryan Kim',
        ign: 'Reaper',
        team: 'Shadow Elite',
        teamAbbr: 'SE',
        game: 'valorant',
        stats: { 
          kills: 142, 
          deaths: 95, 
          assists: 38, 
          rating: 1.35,
          headshots: 65,
          clutches: 9
        },
        rank: 2
      },
      {
        id: 'p3',
        name: 'Jake Reynolds',
        ign: 'Turbo',
        team: 'Supersonic Racers',
        teamAbbr: 'SR',
        game: 'rocketLeague',
        stats: { 
          goals: 24, 
          assists: 18, 
          saves: 12, 
          rating: 1.38,
          shots: 52,
          mvps: 8
        },
        rank: 1
      },
      {
        id: 'p4',
        name: 'Leo Nakamura',
        ign: 'Lightning',
        team: 'Smash Masters',
        teamAbbr: 'SM',
        game: 'smash',
        stats: { 
          wins: 18, 
          losses: 4, 
          kos: 156, 
          stocksLost: 89,
          winRate: 82
        },
        rank: 1
      }
    ];
  }

  // ============================================
  // REPLAYS (Mock data for development)
  // ============================================

  async getReplays() {
    return [
      {
        id: 'r1',
        title: 'Nova Vanguard vs Shadow Elite',
        subtitle: 'Valorant Semifinal • Full Match',
        game: 'valorant',
        duration: '1:24:35',
        thumbnail: null,
        views: '45.2K',
        date: '2026-05-08'
      },
      {
        id: 'r2',
        title: 'Supersonic Racers vs Aerial Experts',
        subtitle: 'Rocket League Finals • Game 5',
        game: 'rocketLeague',
        duration: '12:45',
        thumbnail: null,
        views: '32.1K',
        date: '2026-05-09'
      },
      {
        id: 'r3',
        title: 'Smash Masters Championship Run',
        subtitle: 'Super Smash Bros Highlights',
        game: 'smash',
        duration: '18:22',
        thumbnail: null,
        views: '28.5K',
        date: '2026-05-09'
      }
    ];
  }

  // ============================================
  // CHAT (Mock data for development)
  // ============================================

  async getChatMessages(roomId = 'general') {
    return [
      { id: 1, user: 'ProGamer99', message: 'Let\'s go NV! 🔥', time: '2m ago' },
      { id: 2, user: 'EsportsFan', message: 'This match is insane!', time: '1m ago' },
      { id: 3, user: 'TeamShadow', message: 'SE coming back strong 💪', time: '30s ago' }
    ];
  }

  // ============================================
  // REAL-TIME SUBSCRIPTIONS (for future use)
  // ============================================

  subscribeToLiveScores(callback) {
    const intervalId = setInterval(async () => {
      const scores = await this.getLiveScores();
      callback(scores);
    }, API_CONFIG.polling.liveScores);
    
    return () => clearInterval(intervalId);
  }

  subscribeToChat(roomId, callback) {
    const intervalId = setInterval(async () => {
      const messages = await this.getChatMessages(roomId);
      callback(messages);
    }, API_CONFIG.polling.liveChat);
    
    return () => clearInterval(intervalId);
  }
}

// Singleton instance
const dataService = new DataService();
export default dataService;

