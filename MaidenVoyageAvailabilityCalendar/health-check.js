// Health Check Utility for Maiden Voyage Calendar
// Run this in browser console to check app status

(function () {
  console.log("🚢 Maiden Voyage Calendar Health Check");
  console.log("=====================================");

  // Check if Vue app is mounted
  const app = document.getElementById("app");
  if (app && app.__vue_app__) {
    console.log("✅ Vue app is mounted");
  } else {
    console.log("❌ Vue app not found");
  }

  // Check if Vuetify is loaded
  if (window.vuetify || document.querySelector(".v-application")) {
    console.log("✅ Vuetify is loaded");
  } else {
    console.log("❌ Vuetify not found");
  }

  // Check environment variables
  const hasSupabaseUrl = import.meta?.env?.VITE_SUPABASE_URL;
  const hasSupabaseKey = import.meta?.env?.VITE_SUPABASE_ANON_KEY;

  if (hasSupabaseUrl && hasSupabaseKey) {
    console.log("✅ Supabase credentials configured");

    // Check if credentials are not placeholder values
    if (
      hasSupabaseUrl.includes("your-project") ||
      hasSupabaseKey.includes("your-anon")
    ) {
      console.log("⚠️  Supabase credentials are placeholder values");
    } else {
      console.log("✅ Supabase credentials appear valid");
    }
  } else {
    console.log("⚠️  Supabase credentials not found (running in demo mode)");
  }

  // Check calendar component
  if (document.querySelector(".vc-container")) {
    console.log("✅ VCalendar is rendered");
  } else {
    console.log("❌ VCalendar not found");
  }

  // Check user buttons
  const userButtons = document.querySelectorAll(".v-btn");
  if (userButtons.length >= 4) {
    console.log(`✅ Found ${userButtons.length} interactive elements`);
  } else {
    console.log("❌ User interface elements not found");
  }

  // Check for demo mode indicator
  if (
    document.querySelector('[role="alert"]') ||
    document.querySelector(".v-alert")
  ) {
    console.log("ℹ️  Demo mode alert detected");
  }

  // Network status
  if (navigator.onLine) {
    console.log("✅ Network connection available");
  } else {
    console.log("❌ No network connection");
  }

  // Performance check
  const timing = performance.getEntriesByType("navigation")[0];
  if (timing) {
    const loadTime = timing.loadEventEnd - timing.loadEventStart;
    console.log(`📊 Page load time: ${loadTime.toFixed(2)}ms`);
  }

  console.log("\n💡 To test the app:");
  console.log(
    "1. Select a user (Jessica, Flint, Josh & Karen, Jeff & Mafalda)"
  );
  console.log("2. Click on calendar dates to select availability");
  console.log('3. Check "Everyone is available on:" section for common dates');
  console.log('4. Use "Submit to Database" to save (if Supabase configured)');

  if (hasSupabaseUrl && !hasSupabaseUrl.includes("your-project")) {
    console.log("5. Open multiple tabs to test real-time sync");
  }

  console.log("\n📚 For help: Check README.md or SUPABASE_SETUP.md");
})();
