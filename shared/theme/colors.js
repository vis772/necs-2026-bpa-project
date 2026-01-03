/**
 * NECS 2026 - Shared Color Palette
 * 
 * This is the single source of truth for colors used across
 * both the website and mobile app.
 */

const Colors = {
  // Background colors
  bgPrimary: '#0a0a0f',
  bgSecondary: '#12121a',
  bgTertiary: '#1a1a24',
  bgElevated: '#22222e',
  
  // Text colors
  textPrimary: '#ffffff',
  textSecondary: '#a1a1aa',
  textMuted: '#71717a',
  textDisabled: '#52525b',
  
  // Accent colors - Neon Palette
  accentCyan: '#00f0ff',
  accentMagenta: '#ff00ff',
  accentOrange: '#ff6b00',
  accentGreen: '#00ff88',
  accentPurple: '#8b5cf6',
  accentYellow: '#ffd500',
  
  // Glow variants
  glowCyan: 'rgba(0, 240, 255, 0.4)',
  glowMagenta: 'rgba(255, 0, 255, 0.4)',
  glowOrange: 'rgba(255, 107, 0, 0.4)',
  
  // Status colors
  statusLive: '#ef4444',
  statusUpcoming: '#f59e0b',
  statusCompleted: '#22c55e',
  statusPending: '#6b7280',
  
  // Game-specific colors
  gameValorant: '#ff4655',
  gameRocketLeague: '#0080ff',
  gameSmash: '#e60012',
  
  // Border colors
  borderDefault: 'rgba(255, 255, 255, 0.1)',
  borderHover: 'rgba(255, 255, 255, 0.2)',
  borderAccent: '#00f0ff',
  
  // Gradients (as arrays for linear gradients)
  gradientPrimary: ['#00f0ff', '#ff00ff'],
  gradientDark: ['#0a0a0f', '#1a1a24'],
  gradientValorant: ['#ff4655', '#fd4556'],
  gradientRocketLeague: ['#0080ff', '#0052cc'],
  gradientSmash: ['#e60012', '#cc0000']
};

// CSS custom properties version for website
const CSSColors = Object.entries(Colors)
  .filter(([_, value]) => typeof value === 'string')
  .map(([key, value]) => `--color-${key.replace(/([A-Z])/g, '-$1').toLowerCase()}: ${value};`)
  .join('\n  ');

// Export for different module systems
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { Colors, CSSColors };
}

export { Colors, CSSColors };
export default Colors;

