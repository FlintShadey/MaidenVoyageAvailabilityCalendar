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
 * Optional rename support:
 * If you rename a user, add a previousNames array with any old names so
 * the database entries can be reconciled automatically.
 * Example:
 * { name: "New Name", previousNames: ["Old Name", "Older Name"], color: "blue", availableDates: [] }
 */
export const users = [
  { name: "Flint & Maryam", color: "blue", availableDates: [], previousNames: [] },
  { name: "Bryan & Marlene", color: "green", availableDates: [], previousNames: [] },
  { name: "Leslie & Manny", color: "orange", availableDates: [], previousNames: [] },
  { name: "Molly & Hubby", color: "purple", availableDates: [], previousNames: [] },
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
  // Desired start: October 1, 2025
  // NOTE: JavaScript Date months are 0-indexed (0=Jan, 9=Oct)
  minDate: new Date(2025, 9, 1), // October 1, 2025

  // End of October 2025 (month 9, day 31)
  maxDate: new Date(2025, 11, 31), // December 31, 2025

  // Initial calendar page seed (will be normalized below to 1-indexed for v-calendar)
  initialPage: {
    month: 9, // 0-index placeholder (will be replaced below)
    year: 2025,
  },
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
  appName: "Availability Calendar",
  shortName: "Calendar",
  description: "Collaborative calendar for tracking availability",
  
  // Theme colors (for PWA and UI)
  themeColor: "#1976D2",
  backgroundColor: "#1976D2",
  
  // Minimum number of users required to show a date in "Shared Availability"
  minUsersForSharedAvailability: 2,
  
  // Logo path (relative to assets folder)
  logoPath: "./assets/FlintCal_Logo.png"
};

// Application version (bump this to force PWA/service worker & cache refresh)
export const appVersion = "2025-10-05-3"; // bumped after extending navigation months

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

// Build a rename mapping object: { currentName: [oldName1, oldName2] }
export const getUserRenameMapping = () => {
  const mapping = {};
  for (const u of users) {
    if (Array.isArray(u.previousNames) && u.previousNames.length > 0) {
      mapping[u.name] = u.previousNames;
    }
  }
  return mapping;
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
