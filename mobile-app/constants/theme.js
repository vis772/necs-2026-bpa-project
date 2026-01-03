// NECS 2026 Design System - NBA-Style Theme Constants

export const Colors = {
  // Core Background Colors (Black & Dark Blue)
  bgPrimary: '#0d1117',
  bgSecondary: '#161b22',
  bgTertiary: '#1c2128',
  bgElevated: '#21262d',
  bgCard: '#1a1f26',
  
  // Accent Background (Beige/Light Brown tones)
  bgBeige: '#f5f0e8',
  bgLightBrown: '#e8e0d5',
  bgCream: '#faf8f5',
  
  // Text Colors
  textPrimary: '#ffffff',
  textSecondary: '#8b949e',
  textMuted: '#6e7681',
  textDark: '#1a1a1a',
  textBeige: '#d4c5b0',
  
  // Primary Accent Colors
  accentBlue: '#58a6ff',
  accentLightBlue: '#79c0ff',
  accentNavy: '#1f3a5f',
  accentGold: '#d4a853',
  accentBrown: '#8b7355',
  
  // Status Colors
  statusLive: '#f85149',
  statusLiveGlow: 'rgba(248, 81, 73, 0.3)',
  statusUpcoming: '#d29922',
  statusCompleted: '#3fb950',
  statusFinal: '#8b949e',
  
  // Game-Specific Colors (subtle accents)
  gameValorant: '#ff4655',
  gameRocketLeague: '#0080ff',
  gameSmash: '#e60012',
  
  // Border Colors
  borderDefault: '#30363d',
  borderSubtle: '#21262d',
  borderAccent: '#58a6ff',
  
  // Tab Bar
  tabActive: '#58a6ff',
  tabInactive: '#6e7681',
  tabBarBg: '#0d1117',
  
  // Gradients
  gradientPrimary: ['#1f3a5f', '#0d1117'],
  gradientCard: ['#1c2128', '#161b22'],
  gradientGold: ['#d4a853', '#8b7355'],
  gradientLive: ['#f85149', '#da3633'],
};

export const Spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  '2xl': 24,
  '3xl': 32,
  '4xl': 48,
  '5xl': 64,
};

export const FontSizes = {
  xs: 10,
  sm: 12,
  md: 14,
  lg: 16,
  xl: 18,
  '2xl': 20,
  '3xl': 24,
  '4xl': 32,
  '5xl': 40,
};

export const FontWeights = {
  regular: '400',
  medium: '500',
  semibold: '600',
  bold: '700',
  extrabold: '800',
};

export const BorderRadius = {
  xs: 4,
  sm: 6,
  md: 8,
  lg: 12,
  xl: 16,
  '2xl': 20,
  '3xl': 24,
  full: 9999,
};

export const Shadows = {
  sm: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.15,
    shadowRadius: 3,
    elevation: 2,
  },
  md: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 4,
  },
  lg: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.25,
    shadowRadius: 12,
    elevation: 8,
  },
  card: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 3,
  },
  glow: {
    shadowColor: '#58a6ff',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.4,
    shadowRadius: 16,
    elevation: 10,
  },
};

// 6-Tab Navigation Icons (left 3 - Home - right 2)
export const TabIcons = {
  news: { active: 'newspaper', inactive: 'newspaper-outline' },
  games: { active: 'trophy', inactive: 'trophy-outline' },
  brackets: { active: 'git-network', inactive: 'git-network-outline' },
  home: { active: 'home', inactive: 'home-outline' },
  stats: { active: 'stats-chart', inactive: 'stats-chart-outline' },
  more: { active: 'grid', inactive: 'grid-outline' },
};

export default {
  Colors,
  Spacing,
  FontSizes,
  FontWeights,
  BorderRadius,
  Shadows,
  TabIcons,
};
