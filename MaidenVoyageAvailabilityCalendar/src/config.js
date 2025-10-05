/**
 * Application Configuration
 * 
 * This file contains all the configurable settings for the Availability Calendar app.
 * Modify these values to customize the app for your needs.
 */

// ============================================================================
// USER CONFIGURATION
// ============================================================================

/**
 * Define your users here
 * Each user needs:
 * - name: Display name (used in UI and database)
 * - color: Vuetify color name (blue, green, orange, purple, red, pink, etc.)
 * - availableDates: Leave as empty array (managed by the app)
 */
export const users = [
  { name: "Flint", color: "blue", availableDates: [] },
  { name: "Yanni", color: "green", availableDates: [] },
  { name: "Mike", color: "orange", availableDates: [] },
  { name: "Zack", color: "purple", availableDates: [] },
];

// ============================================================================
// CALENDAR DATE RANGE CONFIGURATION
// ============================================================================

/**
 * Calendar date range settings
 * 
 * Format: Use JavaScript Date constructor or date strings
 * Remember: JavaScript months are 0-indexed (0 = January, 11 = December)
 * 
 * Examples:
 * - new Date(2025, 7, 1)  = August 1, 2025
 * - new Date(2025, 0, 1)  = January 1, 2025
 * - new Date(2025, 11, 31) = December 31, 2025
 */

export const calendarConfig = {
  // Minimum selectable date
  minDate: new Date(2025, 7, 1), // August 1, 2025
  
  // Maximum selectable date
  maxDate: new Date(2025, 9, 31), // October 31, 2025
  
  // Initial calendar page to display
  // { month: 8 = August, year: 2025 }
  initialPage: {
    month: 8,  // August (0-indexed, so 8 = September... wait, let me fix this)
    year: 2025
  }
};

// Note: v-calendar uses 1-indexed months (1 = January, 12 = December)
// So we need to adjust the initialPage
calendarConfig.initialPage = {
  month: calendarConfig.minDate.getMonth() + 1, // Convert to 1-indexed
  year: calendarConfig.minDate.getFullYear()
};

// ============================================================================
// APP SETTINGS
// ============================================================================

/**
 * General application settings
 */
export const appConfig = {
  // App name and branding
  appName: "Trip to Fredericksberg Calendar",
  shortName: "Fredericksberg",
  description: "Collaborative calendar for tracking team availability for the trip to Fredericksberg",
  
  // Theme colors (for PWA and UI)
  themeColor: "#1976D2",
  backgroundColor: "#1976D2",
  
  // Minimum number of users required to show a date in "Shared Availability"
  minUsersForSharedAvailability: 2,
  
  // Logo path (relative to assets folder)
  logoPath: "./assets/FlintCal_Logo.png"
};

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

/**
 * Get the default/first user
 */
export const getDefaultUser = () => users[0]?.name || "";

/**
 * Get a user by name
 */
export const getUserByName = (name) => users.find(u => u.name === name);

/**
 * Get all user names
 */
export const getUserNames = () => users.map(u => u.name);

/**
 * Validate if a date is within the allowed range
 */
export const isDateInRange = (date) => {
  if (!(date instanceof Date) || isNaN(date.getTime())) return false;
  return date >= calendarConfig.minDate && date <= calendarConfig.maxDate;
};

/**
 * Format date range for display
 */
export const getDateRangeText = () => {
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  const start = calendarConfig.minDate.toLocaleDateString(undefined, options);
  const end = calendarConfig.maxDate.toLocaleDateString(undefined, options);
  return `${start} - ${end}`;
};

// ============================================================================
// EXPORT DEFAULT CONFIG
// ============================================================================

export default {
  users,
  calendarConfig,
  appConfig,
  getDefaultUser,
  getUserByName,
  getUserNames,
  isDateInRange,
  getDateRangeText
};
