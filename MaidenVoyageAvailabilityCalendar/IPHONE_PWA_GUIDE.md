# iPhone PWA Installation Guide - UPDATED

## 🔧 **Recent PWA Fixes Applied:**

### Fixed Issues:

- ✅ **Relative Paths**: Changed all icon paths from `/icons/` to `./icons/`
- ✅ **Manifest Configuration**: Updated scope and start_url to use relative paths (`./`)
- ✅ **Apple Touch Icons**: Fixed paths in index.html for proper home screen icons
- ✅ **Complete Icon Set**: Added all required sizes (72x72 to 512x512) with both 'any' and 'maskable' purposes
- ✅ **GitHub Pages Compatibility**: Configured for subdirectory deployment

---

## 📱 **iPhone Installation Steps:**

### 1. **Open Safari on iPhone**

- Navigate to: **https://flintcampbell.github.io/MaidenVoyageAvailabilityCalendar/**
- ⚠️ **Important**: Must use Safari (Chrome won't work for PWA installation)

### 2. **Verify PWA is Working**

Before installing, check these indicators:

- Page loads with Trip to Fredericksberg logo
- Calendar shows August 2025 initially
- User buttons show: Flint, Yanni, Mike, Zack
- Calendar navigation works between Aug/Sep/Oct 2025

### 3. **Install as PWA**

1. Tap the **Share** button (square with arrow pointing up)
2. Scroll down in the share menu
3. Look for **"Add to Home Screen"**
4. Tap **"Add to Home Screen"**
5. Customize the name if desired (default: "Fredericksberg")
6. Tap **"Add"** in the top right

### 4. **Verify Installation**

- Check your iPhone home screen
- Look for the Trip to Fredericksberg app icon
- Tap to launch - should open in standalone mode (no Safari UI)

---

## 🔍 **Troubleshooting:**

### If PWA Install Option Doesn't Appear:

1. **Clear Safari Cache**: Settings → Safari → Clear History and Website Data
2. **Force Refresh**: Hold refresh button in Safari
3. **Check URL**: Ensure you're on the exact GitHub Pages URL
4. **Try Again**: Sometimes takes 2-3 page loads to detect PWA

### If Icons Don't Load:

- The app should still work, icons might take a moment to cache
- Check if you have a stable internet connection
- Try refreshing the app

### If App Opens in Safari:

- Delete the home screen app
- Clear Safari cache
- Re-install following steps above

---

## 📊 **Expected Results:**

### ✅ **Working PWA Should Have:**

- **App Name**: "Fredericksberg" (or "Trip to Fredericksberg Calendar")
- **Icon**: Trip to Fredericksberg logo on home screen
- **Launch**: Opens in standalone mode (no Safari address bar)
- **Functionality**: All calendar features work offline after first load
- **Navigation**: Smooth month switching between Aug/Sep/Oct 2025
- **Users**: Flint, Yanni, Mike, Zack selection buttons

### 🎯 **Test Scenarios:**

1. **Install**: Follow installation steps above
2. **Offline Test**: Turn off WiFi, app should still work
3. **Home Screen**: Icon should appear with proper logo
4. **Standalone**: No Safari UI when launched from home screen
5. **Functionality**: Can select dates, switch users, see common availability

---

## 🌐 **URLs for Testing:**

- **GitHub Pages**: https://flintcampbell.github.io/MaidenVoyageAvailabilityCalendar/
- **Dev Server**: http://localhost:5173/ (for development)

---

## 📝 **Report Issues:**

If PWA installation still doesn't work, please check:

1. **Safari Version**: iOS 14.3+ required for proper PWA support
2. **Network**: Stable connection needed for initial install
3. **Storage**: Sufficient storage space on device
4. **Manifest**: Check browser dev tools for manifest errors (Safari Web Inspector)

The PWA configuration has been updated to fix GitHub Pages deployment paths and should now work properly for iPhone home screen installation! 🎉
