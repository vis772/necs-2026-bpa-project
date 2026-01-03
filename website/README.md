# NECS 2026 Website

Official promotional website for the National Esports Championship Series 2026.

## Features

- **Hero Section**: Event countdown and key information
- **Team Rosters**: Browse teams by game (Valorant, Rocket League, Smash)
- **Event Schedule**: Day-by-day match schedule
- **Ticket Sales**: Ticket tier information and purchase

## Getting Started

### Running Locally

The website is a static HTML/CSS/JS site. Simply open `index.html` in your browser or use a local server:

```bash
# Using Python
python -m http.server 8080

# Using Node.js
npx serve .

# Using PHP
php -S localhost:8080
```

Then visit `http://localhost:8080`

## Project Structure

```
website/
├── index.html          # Main landing page
├── STYLE-GUIDE.html    # Design system documentation
├── css/
│   ├── main.css        # Primary stylesheet
│   ├── design-tokens.css # CSS custom properties
│   └── mobile-app.css  # Mobile-specific styles
├── js/
│   └── main.js         # Interactive functionality
└── assets/
    └── favicon.svg     # Site favicon
```

## Design System

### Colors

The website uses CSS Custom Properties for consistent theming:

```css
--color-bg-primary: #0a0a0f;
--color-accent-cyan: #00f0ff;
--color-accent-magenta: #ff00ff;
--color-valorant: #ff4655;
--color-rocket-league: #0080ff;
--color-smash: #e60012;
```

### Typography

- **Display Font**: Rajdhani / Orbitron
- **Body Font**: Inter / Segoe UI
- **Mono Font**: JetBrains Mono

## JavaScript Features

The `main.js` file provides:

- Navigation toggle (mobile menu)
- Countdown timer to event date
- Tab switching for teams and schedule
- Scroll animations
- Smooth scrolling

## Responsive Design

The website is fully responsive:
- **Desktop**: Full layout with animations
- **Tablet**: Adjusted spacing and grid
- **Mobile**: Stacked layout, hamburger menu

## Integration with Mobile App

The website and mobile app share:
- Common data (teams, schedule) in `../shared/data/`
- API configuration in `../shared/api/`
- Color palette in `../shared/theme/`

## Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

---

Part of the NECS 2026 project by Nova Creations.

