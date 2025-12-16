# NECS 2026 - National Esports Championship Series

## BPA User Experience Design Team Event Submission

A comprehensive website and mobile app prototype for the National Esports Championship Series 2026, designed for the BPA User Experience Design Team Event.

---

## 📋 Project Overview

**Event:** National Esports Championship Series 2026  
**Dates:** May 6–10, 2026  
**Location:** Nashville, Tennessee  
**Games Featured:** Valorant, Rocket League, Super Smash Bros

This project delivers a cohesive brand experience across a promotional landing page and a five-screen mobile application, following modern esports design conventions while prioritizing accessibility and user experience.

---

## 📁 File Structure

```
Bpa Project/
├── index.html                 # Main promotional website
├── STYLE-GUIDE.html           # Comprehensive design system documentation
├── README.md                  # Project documentation (this file)
│
├── css/
│   ├── design-tokens.css      # CSS custom properties (design tokens)
│   ├── main.css               # Website styles and components
│   └── mobile-app.css         # Mobile app prototype styles
│
├── js/
│   └── main.js                # Website interactivity (countdown, tabs, etc.)
│
├── mobile-app/
│   ├── live-scores.html       # Screen 1: Live Scores
│   ├── player-stats.html      # Screen 2: Player Stats
│   ├── replays.html           # Screen 3: Match Replays
│   ├── brackets.html          # Screen 4: Tournament Brackets
│   └── chat.html              # Screen 5: Community Chat
│
└── assets/
    └── favicon.svg            # Event logo/favicon
```

---

## 🌐 Website Features

### Hero Section
- Event branding with animated background effects
- Date and location information
- Three call-to-action buttons: View Teams, Watch Live, Buy Tickets
- Countdown timer to event start

### Team Rosters Section
- Tabbed interface for game selection (Valorant, Rocket League, Smash)
- Team cards with logos, names, and full rosters
- Player roles and positions displayed
- Hover animations and smooth transitions

### Livestream Schedule Section
- 5-day schedule toggle (May 6–10)
- Match times, teams, and game types
- Status indicators (Live, Upcoming, Completed)
- Live countdown to next match

### Event Tickets Section
- Three ticket tiers: Day Pass ($49), Full Event ($179), VIP ($399)
- Feature comparison
- Responsive pricing cards
- "Best Value" badge on featured tier

### Footer
- Event branding
- Social media links (Twitter, Instagram, YouTube, Discord, Twitch)
- Quick links navigation
- Legal text and privacy policy links

---

## 📱 Mobile App Screens

### 1. Live Scores Screen (`live-scores.html`)
- Real-time score display
- Game tabs (Valorant, Rocket League, Smash)
- Match cards with team vs team format
- Status indicators: In Progress (animated), Final, Upcoming
- Team records and scores

### 2. Player Stats Screen (`player-stats.html`)
- Searchable player directory
- Player profile cards with avatars
- Game-specific stats (K/D, ACS, HS% for Valorant)
- Tournament leaderboards
- Quick stat comparisons

### 3. Match Replays Screen (`replays.html`)
- Video replay grid layout
- Filter chips for games, dates, and content type
- Thumbnail previews with play button overlay
- Duration badges
- Match and top play categories

### 4. Bracket Updates Screen (`brackets.html`)
- Mobile-optimized vertical bracket layout
- Stage-by-stage progression (Quarterfinals → Semifinals → Finals)
- Winner highlighting with visual indicators
- Swipeable hint for navigation
- Real-time status updates

### 5. Community Chat Screen (`chat.html`)
- Channel tabs (#general, #valorant, #rocketleague, #smash)
- Message bubbles with user avatars
- User badges (VIP, MOD)
- Timestamps
- Message input with send button
- Online user count

---

## 🎨 Design System

### Color Palette

**Background Colors:**
- Primary: `#0a0a0f`
- Secondary: `#12121a`
- Tertiary: `#1a1a24`
- Elevated: `#22222e`

**Accent Colors (Neon Palette):**
- Cyan (Primary): `#00f0ff`
- Magenta: `#ff00ff`
- Orange: `#ff6b00`
- Purple: `#8b5cf6`
- Green: `#00ff88`
- Yellow: `#ffd500`

**Game Colors:**
- Valorant: `#ff4655`
- Rocket League: `#0080ff`
- Super Smash Bros: `#e60012`

**Status Colors:**
- Live: `#ef4444`
- Upcoming: `#f59e0b`
- Completed: `#22c55e`

### Typography

| Font | Usage | Weights |
|------|-------|---------|
| Rajdhani | Headings, Navigation, Buttons | 300–700 |
| Inter | Body text, Paragraphs, UI | 300–800 |
| JetBrains Mono | Scores, Stats, Code | 400–600 |

### Spacing Scale
4px → 8px → 12px → 16px → 24px → 32px → 48px → 64px → 96px

### Border Radius
- sm: 4px
- md: 8px
- lg: 12px
- xl: 16px
- 2xl: 24px
- full: 9999px (pill)

---

## ♿ Accessibility

This design system prioritizes accessibility:

- **Color Contrast:** All text meets WCAG 2.1 AA standards
  - Primary text: 15.5:1 contrast ratio
  - Secondary text: 7.2:1 contrast ratio
  - Accent colors tested for readability

- **Interactive Elements:**
  - Visible focus states on all interactive elements
  - Minimum 44x44px touch targets
  - Color is not the sole indicator of state

- **Semantic HTML:**
  - Proper heading hierarchy
  - ARIA labels for icons and buttons
  - Role attributes for navigation and tabs

- **Motion:**
  - Subtle, purposeful animations
  - Respects `prefers-reduced-motion` preferences

---

## 🚀 How to View

### Website
1. Open `index.html` in any modern web browser
2. The website is fully responsive and works on all screen sizes

### Mobile App Screens
1. Navigate to the `mobile-app/` folder
2. Open any screen HTML file in a browser
3. Each screen displays in an iPhone-style frame (390×844px)
4. Use the bottom navigation to switch between screens

### Style Guide
1. Open `STYLE-GUIDE.html` in a browser
2. View all design tokens, components, and guidelines

---

## 📤 Exporting for BPA Submission

### Capturing Screenshots
1. Open each HTML file in Chrome or Firefox
2. Use the browser's screenshot tool or developer tools
3. For mobile screens, they're already framed for export

### Creating PDF
1. Capture screenshots of all pages
2. Compile into a PDF document
3. Include the style guide as a reference section

### Recommended Export Order
1. Website Homepage (full page scroll capture)
2. Live Scores Screen
3. Player Stats Screen
4. Match Replays Screen
5. Bracket Updates Screen
6. Community Chat Screen
7. Style Guide (full page)

---

## 🛠️ Technical Notes

### Browser Compatibility
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

### Fonts
Fonts are loaded via Google Fonts CDN. For offline use, download:
- Rajdhani
- Inter
- JetBrains Mono

### No External Dependencies
- Pure HTML, CSS, and vanilla JavaScript
- No frameworks or build tools required
- All assets are original or free-to-use

---

## 📝 Design Decisions

### Why This Color Palette?
The dark background with neon accents reflects the energy and atmosphere of professional esports broadcasts. The cyan-magenta gradient is commonly associated with gaming culture while maintaining excellent readability.

### Why Rajdhani for Headings?
Rajdhani offers a technical, futuristic feel that matches esports aesthetics while remaining highly legible. Its geometric construction pairs well with the angular design elements.

### Why Glassmorphism Effects?
The frosted glass effect on cards creates depth and visual hierarchy without overwhelming the content. It's modern, subtle, and works well with the dark theme.

### Mobile-First Approach
While the website is fully responsive, the mobile app screens were designed specifically for mobile viewing, prioritizing touch interactions and thumb-friendly navigation.

---

## 👥 Credits

**Designed and Developed for:**  
BPA User Experience Design Team Event

**Event Scenario:**  
National Esports Championship Series 2026

**All content is original and created specifically for this project.**  
No copyrighted materials have been used.

---

## 📄 License

This project was created for educational purposes as part of a BPA competition submission. All designs and code are original work.

© 2026 NECS 2026 Design Team



