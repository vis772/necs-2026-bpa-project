/**
 * NECS 2026 - Shared Data Service
 * 
 * This service provides data access for both website and mobile app.
 * Currently uses local JSON files, can be easily switched to API calls.
 */

import config from './config.js';

// Import local data (fallback when API is not available)
import teamsData from '../data/teams.json';
import scheduleData from '../data/schedule.json';
import ticketsData from '../data/tickets.json';

class DataService {
  constructor() {
    this.useLocalData = true; // Set to false when API is ready
    this.cache = new Map();
    this.cacheTimeout = 60000; // 1 minute cache
  }

  /**
   * Generic fetch with caching
   */
  async fetchWithCache(key, fetchFn) {
    const cached = this.cache.get(key);
    if (cached && Date.now() - cached.timestamp < this.cacheTimeout) {
      return cached.data;
    }

    const data = await fetchFn();
    this.cache.set(key, { data, timestamp: Date.now() });
    return data;
  }

  /**
   * Get all teams
   */
  async getTeams() {
    if (this.useLocalData) {
      return teamsData;
    }
    return this.fetchWithCache('teams', async () => {
      const response = await fetch(`${config.apiBaseUrl}${config.endpoints.teams}`);
      return response.json();
    });
  }

  /**
   * Get teams by game
   */
  async getTeamsByGame(game) {
    const teams = await this.getTeams();
    return teams[game] || [];
  }

  /**
   * Get team by ID
   */
  async getTeamById(teamId) {
    const teams = await this.getTeams();
    for (const game of Object.keys(teams)) {
      const team = teams[game].find(t => t.id === teamId);
      if (team) return team;
    }
    return null;
  }

  /**
   * Get full schedule
   */
  async getSchedule() {
    if (this.useLocalData) {
      return scheduleData;
    }
    return this.fetchWithCache('schedule', async () => {
      const response = await fetch(`${config.apiBaseUrl}${config.endpoints.schedule}`);
      return response.json();
    });
  }

  /**
   * Get schedule by day
   */
  async getScheduleByDay(day) {
    const schedule = await this.getSchedule();
    return schedule.days.find(d => d.day === day);
  }

  /**
   * Get event info
   */
  async getEventInfo() {
    const schedule = await this.getSchedule();
    return schedule.eventInfo;
  }

  /**
   * Get live matches
   */
  async getLiveMatches() {
    if (this.useLocalData) {
      const schedule = await this.getSchedule();
      const allMatches = schedule.days.flatMap(day => day.matches);
      return allMatches.filter(m => m.status === 'live');
    }
    const response = await fetch(`${config.apiBaseUrl}${config.endpoints.liveMatches}`);
    return response.json();
  }

  /**
   * Get tickets
   */
  async getTickets() {
    if (this.useLocalData) {
      return ticketsData.tickets;
    }
    return this.fetchWithCache('tickets', async () => {
      const response = await fetch(`${config.apiBaseUrl}${config.endpoints.tickets}`);
      return response.json();
    });
  }

  /**
   * Get live scores (mock data for now)
   */
  async getLiveScores() {
    if (this.useLocalData) {
      return this.getMockLiveScores();
    }
    const response = await fetch(`${config.apiBaseUrl}${config.endpoints.liveScores}`);
    return response.json();
  }

  /**
   * Get player stats (mock data for now)
   */
  async getPlayerStats() {
    if (this.useLocalData) {
      return this.getMockPlayerStats();
    }
    const response = await fetch(`${config.apiBaseUrl}${config.endpoints.playerStats}`);
    return response.json();
  }

  /**
   * Mock live scores for development
   */
  getMockLiveScores() {
    return [
      {
        id: 'live-1',
        status: 'live',
        game: 'valorant',
        round: 'Semifinals',
        team1: { name: 'Nova Vanguard', abbreviation: 'NV', score: 11 },
        team2: { name: 'Shadow Elite', abbreviation: 'SE', score: 9 },
        map: 'Haven',
        mapNumber: 2,
        totalMaps: 3
      },
      {
        id: 'live-2',
        status: 'live',
        game: 'rocketLeague',
        round: 'Finals',
        team1: { name: 'Supersonic Racers', abbreviation: 'SR', score: 3 },
        team2: { name: 'Aerial Experts', abbreviation: 'AE', score: 2 },
        gameNumber: 5,
        totalGames: 7,
        time: '3:45'
      }
    ];
  }

  /**
   * Mock player stats for development
   */
  getMockPlayerStats() {
    return [
      {
        id: 'p1',
        name: 'Alex Chen',
        ign: 'Phantom',
        team: 'Nova Vanguard',
        game: 'valorant',
        stats: { kills: 156, deaths: 89, assists: 45, rating: 1.42 }
      },
      {
        id: 'p2',
        name: 'Ryan Kim',
        ign: 'Reaper',
        team: 'Shadow Elite',
        game: 'valorant',
        stats: { kills: 142, deaths: 95, assists: 38, rating: 1.35 }
      },
      {
        id: 'p3',
        name: 'Jake Reynolds',
        ign: 'Turbo',
        team: 'Supersonic Racers',
        game: 'rocketLeague',
        stats: { goals: 24, assists: 18, saves: 12, rating: 1.38 }
      },
      {
        id: 'p4',
        name: 'Leo Nakamura',
        ign: 'Lightning',
        team: 'Smash Masters',
        game: 'smash',
        stats: { wins: 18, losses: 4, kos: 156, stocksLost: 89 }
      }
    ];
  }

  /**
   * Clear cache
   */
  clearCache() {
    this.cache.clear();
  }
}

// Singleton instance
const dataService = new DataService();

export default dataService;

