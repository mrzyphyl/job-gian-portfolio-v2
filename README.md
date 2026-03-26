# Job Gian Dispo Portfolio

A Windows 7-themed interactive portfolio web application that showcases professional profile, technical skills, work experience, education, projects, and contact information through a nostalgic desktop operating system interface.

## Features

### Desktop Environment

- Fully functional Windows 7-style desktop with draggable and resizable windows
- Taskbar with Start menu, open window indicators, system tray, and clock
- Clickable desktop icons for quick access to applications
- Window management (minimize, maximize, restore, close)
- Custom logo branding
- Mobile-responsive design with toast notification for desktop recommendation

### Applications

| Application      | Description                                                             |
| ---------------- | ----------------------------------------------------------------------- |
| **Profile**      | Personal information with avatar, bio, location, and social media links |
| **Tech Stacks**  | Technical skills organized by category with proficiency indicators      |
| **Careers**      | Work experience timeline with company roles and tenure                  |
| **Education**    | Academic background and professional certifications                     |
| **Projects**     | GitHub repositories with real-time data, descriptions, and links        |
| **Contact**      | Contact information with EmailJS-powered inquiry form                   |
| **SQL Terminal** | Interactive terminal for querying portfolio data using SQL              |

### SQL Terminal Capabilities

The SQL Terminal supports the following queries:

- `HELP` - Display available commands
- `TABLES` - List all available database tables
- `CLEAR` - Clear terminal output
- `SELECT * FROM <table>` - Query all records from a table
- `SELECT <columns> FROM <table>` - Query specific columns
- `SELECT * FROM <table> WHERE <condition>` - Filtered queries
- `INNER JOIN` - Combine data from multiple tables

### Contact Form

- EmailJS integration for real email delivery
- Loading and error states
- Success confirmation messages

### Analytics

- Vercel Analytics integration for traffic monitoring

## Tech Stack

- **Vue 3** - Progressive JavaScript framework
- **TypeScript** - Type-safe JavaScript
- **Vite** - Fast build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **Pinia** - State management
- **Vue Router** - Client-side routing
- **EmailJS** - Email service for contact form
- **Vercel Analytics** - Website analytics

## Getting Started

### Prerequisites

- Node.js 20.19.0 or higher
- npm or yarn

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd job-gian-portfolio-v2

# Install dependencies
npm install
```

### Environment Setup

Create a `.env` file in the root directory for EmailJS configuration:

```bash
VITE_EMAILJS_SERVICE_ID=your_service_id
VITE_EMAILJS_TEMPLATE_ID=your_template_id
VITE_EMAILJS_PUBLIC_KEY=your_public_key
```

### Development

```bash
# Start development server
npm run dev

# Run type checking
npm run type-check

# Format code
npm run format
```

### Build

```bash
# Build for production
npm run build

# Preview production build
npm run preview
```

## Project Structure

```
src/
├── App.vue              # Main application wrapper
├── main.ts              # Application entry point
├── router/
│   └── index.ts         # Route definitions
├── stores/
│   └── desktop.ts        # Desktop state management
├── components/
│   ├── Desktop.vue      # Desktop environment container
│   ├── DesktopIcon.vue  # Clickable desktop shortcut
│   ├── Taskbar.vue      # Bottom taskbar
│   ├── StartMenu.vue    # Start menu popup
│   ├── Window.vue       # Draggable/resizable window
│   └── ToastNotification.vue  # Mobile warning toast
├── views/
│   ├── ProfileView.vue
│   ├── TechstacksView.vue
│   ├── CareersView.vue
│   ├── EducationView.vue
│   ├── ProjectsView.vue
│   ├── ContactView.vue
│   └── SqlView.vue
├── data/
│   ├── profile.json       # Personal profile data
│   ├── techstacks.json   # Technical skills
│   ├── careers.json      # Work experience
│   ├── education.json    # Education history
│   ├── projects.json     # Portfolio projects
│   ├── contact.json      # Contact information
│   └── sql_database.json # SQL terminal sample data
└── style.css            # Global styles and Tailwind imports

public/
└── logo.png             # Brand logo
```

## Data Management

All portfolio data is stored in JSON files located in `src/data/`. This separation allows for easy content updates without modifying application code.

## License

Private project - All rights reserved
