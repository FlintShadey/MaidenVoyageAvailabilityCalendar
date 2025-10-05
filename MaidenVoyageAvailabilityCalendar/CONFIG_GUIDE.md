# Configuration Guide

This guide explains how to customize the Availability Calendar app using the `src/config.js` file.

## Quick Start

All customization can be done by editing **`src/config.js`**. You don't need to touch any other files!

## 📋 Configuration Options

### 1. Users

Edit the `users` array to add, remove, or modify users:

```javascript
export const users = [
  { name: "Flint", color: "blue", availableDates: [] },
  { name: "Yanni", color: "green", availableDates: [] },
  { name: "Mike", color: "orange", availableDates: [] },
  { name: "Zack", color: "purple", availableDates: [] },
];
```

**Available colors:** blue, green, orange, purple, red, pink, teal, cyan, amber, indigo, brown, grey

**To add a user:**
```javascript
{ name: "Sarah", color: "pink", availableDates: [] },
```

**To remove a user:**
Simply delete the entire line with that user's object.

---

### 2. Calendar Date Range

Control which dates are selectable in the calendar:

```javascript
export const calendarConfig = {
  minDate: new Date(2025, 7, 1),   // August 1, 2025
  maxDate: new Date(2025, 9, 31),  // October 31, 2025
  // initialPage is auto-calculated from minDate
};
```

**Important:** JavaScript months are **0-indexed**:
- `0` = January
- `1` = February
- `2` = March
- `3` = April
- `4` = May
- `5` = June
- `6` = July
- `7` = August
- `8` = September
- `9` = October
- `10` = November
- `11` = December

**Examples:**
```javascript
// January 1 - March 31, 2026
minDate: new Date(2026, 0, 1),
maxDate: new Date(2026, 2, 31),

// June 1 - August 15, 2025
minDate: new Date(2025, 5, 1),
maxDate: new Date(2025, 7, 15),

// Full year 2025
minDate: new Date(2025, 0, 1),
maxDate: new Date(2025, 11, 31),
```

---

### 3. App Settings

Customize the app name and behavior:

```javascript
export const appConfig = {
  // App name (shown in browser tab and PWA)
  appName: "Trip to Fredericksberg Calendar",
  shortName: "Fredericksberg",
  description: "Collaborative calendar for tracking team availability",
  
  // Theme colors
  themeColor: "#1976D2",
  backgroundColor: "#1976D2",
  
  // Minimum users needed to show date in "Shared Availability"
  minUsersForSharedAvailability: 2,
  
  // Logo path
  logoPath: "./assets/FlintCal_Logo.png"
};
```

**Common Changes:**

To require 3+ users for shared availability:
```javascript
minUsersForSharedAvailability: 3,
```

To show ALL dates (even with just 1 user):
```javascript
minUsersForSharedAvailability: 1,
```

---

## 🚀 After Making Changes

1. **Save** the `config.js` file
2. **Refresh** your browser - changes take effect immediately during development
3. **Build** for production: `npm run build`
4. **Commit** your changes: `git add src/config.js && git commit -m "Update configuration"`
5. **Deploy**: `npm run deploy`

---

## 📝 Example Configurations

### Example 1: Simple 2-Person Calendar
```javascript
export const users = [
  { name: "Alice", color: "blue", availableDates: [] },
  { name: "Bob", color: "green", availableDates: [] },
];

export const calendarConfig = {
  minDate: new Date(2025, 11, 1),  // December 1, 2025
  maxDate: new Date(2025, 11, 31), // December 31, 2025
};

export const appConfig = {
  appName: "Holiday Planning",
  shortName: "Holiday",
  minUsersForSharedAvailability: 2,
};
```

### Example 2: Large Team Planning
```javascript
export const users = [
  { name: "Team Lead", color: "purple", availableDates: [] },
  { name: "Developer 1", color: "blue", availableDates: [] },
  { name: "Developer 2", color: "cyan", availableDates: [] },
  { name: "Designer", color: "pink", availableDates: [] },
  { name: "QA", color: "orange", availableDates: [] },
  { name: "Manager", color: "red", availableDates: [] },
];

export const calendarConfig = {
  minDate: new Date(2025, 0, 1),   // January 1, 2025
  maxDate: new Date(2025, 11, 31), // December 31, 2025
};

export const appConfig = {
  appName: "Team Availability Calendar",
  shortName: "Team Cal",
  minUsersForSharedAvailability: 3, // Need 3+ for shared availability
};
```

### Example 3: Weekend Trip Planning
```javascript
export const users = [
  { name: "John", color: "blue", availableDates: [] },
  { name: "Jane", color: "pink", availableDates: [] },
  { name: "Jack", color: "green", availableDates: [] },
  { name: "Jill", color: "orange", availableDates: [] },
];

export const calendarConfig = {
  // Just November 2025
  minDate: new Date(2025, 10, 1),
  maxDate: new Date(2025, 10, 30),
};

export const appConfig = {
  appName: "Weekend Getaway Planning",
  shortName: "Getaway",
  minUsersForSharedAvailability: 2,
};
```

---

## ⚠️ Important Notes

- **Do NOT modify** the `availableDates: []` - this is managed by the app
- **Month numbering** starts at 0 (not 1!)
- After changing users, **clear your browser's local storage** if dates don't load correctly
- The first user in the array becomes the default selected user

---

## 🆘 Troubleshooting

**Issue:** Changes don't appear
- **Solution:** Hard refresh your browser (Cmd+Shift+R on Mac, Ctrl+Shift+R on Windows)

**Issue:** Dates from old users still showing
- **Solution:** Clear database or use `submitToDatabase` for each user to reset

**Issue:** Calendar doesn't show any months
- **Solution:** Check that `maxDate` is after `minDate` and dates are valid

---

## 📚 More Help

For database setup and deployment, see:
- `README.md` - General project information
- `SUPABASE_SETUP.md` - Database configuration
- `PWA_INSTALLATION.md` - Installing as an app

---

**Happy Planning! 📅**
