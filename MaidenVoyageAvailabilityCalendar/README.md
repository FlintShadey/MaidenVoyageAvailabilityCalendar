# Maiden Voyage Availability Calendar

A collaborative calendar application for tracking team availability for the Maiden Voyage trip (May-July 2025). Built with Vue.js, Vuetify, VCalendar, and Supabase for real-time data persistence.

## Features

- **Multi-user Selection**: Switch between team members (Jessica, Flint, Josh & Karen, Jeff & Mafalda)
- **Interactive Calendar**: Click dates to select/deselect availability for May-July 2025
- **Color-coded Availability**: Each user has a unique color for their selected dates
- **Common Availability Display**: Automatically shows dates when ALL users are available
- **Real-time Sync**: Changes are instantly saved to Supabase and synced across all browser sessions
- **Responsive Design**: Works on desktop, tablet, and mobile devices
- **Dark Theme**: Modern dark UI using Vuetify
- **Robust Error Handling**: Advanced error recovery and fallback mechanisms

## Technology Stack

- **Frontend**: Vue.js 3 (Composition API)
- **UI Framework**: Vuetify 3
- **Calendar**: VCalendar 3 (with advanced error handling)
- **Build Tool**: Vite
- **Database**: Supabase (PostgreSQL)
- **Real-time**: Supabase Realtime subscriptions
- **Icons**: Material Design Icons

## V-Calendar Stability Improvements

This application includes comprehensive fixes for v-calendar stability issues:

### 🔧 Implemented Solutions

1. **Calendar Key Rotation**: Forces calendar re-render when needed to prevent stale state
2. **Debounced Updates**: 100ms delay prevents rapid reactive updates that cause errors
3. **Enhanced Validation**: Comprehensive date object and array validation
4. **Error Boundaries**: Try-catch blocks in all reactive computations
5. **Global Error Handlers**: Automatically catch and recover from v-calendar errors
6. **Safe Attributes**: Defensive programming in calendar attribute generation
7. **Auto-Recovery**: Automatic calendar reset when errors are detected
8. **User Switch Handling**: Proper calendar re-render when switching users

### 🛡️ Error Prevention

- Validates all date objects before passing to v-calendar
- Checks array integrity in computed properties
- Handles null/undefined values gracefully
- Prevents invalid date ranges
- Manages calendar state transitions safely

### 🔄 Recovery Mechanisms

- Auto-reset calendar on dayIndex errors
- Fallback UI when calendar fails
- Manual reset button for user recovery
- Preserves user data during error recovery

## Quick Start

### 1. Install Dependencies

```bash
npm install
```

### 2. Set Up Supabase Database

Follow the detailed instructions in [`SUPABASE_SETUP.md`](./SUPABASE_SETUP.md) to:

- Create a Supabase project
- Set up the database table
- Configure environment variables

### 3. Configure Environment Variables

Create a `.env` file in the project root:

```env
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here
```

### 4. Start Development Server

```bash
npm run dev
```

### 5. Build for Production

```bash
npm run build
```

### 6. Deploy to GitHub Pages

```bash
npm run deploy
```

## Usage

1. **Select a User**: Click on any of the four user buttons (Jessica, Flint, Josh & Karen, Jeff & Mafalda)
2. **Choose Dates**: Click on calendar dates to select/deselect availability
   - Selected dates are highlighted in the user's color
   - Click again to deselect a date
3. **View Common Availability**: The bottom section shows dates when ALL users are available
4. **Auto-save**: Changes are automatically saved to the database as you click
5. **Submit to Database**: Use the "Submit to Database" button to batch-save all selected dates
6. **Real-time Updates**: Open multiple browser tabs to see real-time synchronization

## Database Schema

The application uses a single `user_availability` table:

| Column          | Type        | Description                 |
| --------------- | ----------- | --------------------------- |
| `id`            | SERIAL      | Primary key                 |
| `user_name`     | VARCHAR(50) | User identifier             |
| `selected_date` | DATE        | Available date (YYYY-MM-DD) |
| `created_at`    | TIMESTAMP   | Creation timestamp          |
| `updated_at`    | TIMESTAMP   | Last update timestamp       |

## Project Structure

```
src/
├── App.vue              # Main application component
├── main.js              # Vue app initialization
├── style.css            # Global styles
├── lib/
│   ├── supabase.js      # Supabase client configuration
│   └── database.js      # Database service layer
├── plugins/
│   └── vuetify.js       # Vuetify configuration
└── assets/
    └── MaidenVoyageLogo.png
```

## Development

### Code Organization

- **App.vue**: Main component with calendar UI and user interaction logic
- **database.js**: Abstraction layer for all database operations
- **supabase.js**: Supabase client configuration and setup

### Key Features Implementation

- **Real-time Sync**: Uses Supabase's real-time subscriptions for live updates
- **Optimistic UI**: Updates UI immediately, with error handling for failed database operations
- **Responsive Calendar**: Custom CSS ensures calendar works on all screen sizes
- **Error Handling**: Graceful fallbacks for database connection issues

### Environment Variables

- `VITE_SUPABASE_URL`: Your Supabase project URL
- `VITE_SUPABASE_ANON_KEY`: Your Supabase anonymous key

## Deployment

### GitHub Pages

The project includes a deploy script for GitHub Pages:

```bash
npm run deploy
```

### Other Platforms

The built files in the `dist/` folder can be deployed to any static hosting service:

- Netlify
- Vercel
- AWS S3
- Firebase Hosting

## Troubleshooting

### Database Connection Issues

1. Verify your `.env` file has correct Supabase credentials
2. Check that your Supabase project is active
3. Ensure the database table was created with the correct schema

### Real-time Not Working

1. Verify real-time is enabled for the `user_availability` table
2. Check browser console for WebSocket connection errors
3. Ensure Row Level Security policies allow read/write access

### Build Issues

1. Run `npm install` to ensure all dependencies are installed
2. Check that Node.js version is 16+
3. Clear Vite cache: `rm -rf node_modules/.vite`

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is for the Maiden Voyage team's internal use.
