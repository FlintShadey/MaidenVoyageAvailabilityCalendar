/**
 * v-calendar Component Test
 * Tests the v-calendar component registration and basic functionality
 */

console.log("🗓️ Testing v-calendar component registration...");

// Test 1: Check if VCalendar component is available globally
setTimeout(() => {
  console.log("Test 1: Global Component Check");

  const app = document.getElementById("app");
  if (app && app.__vue_app__) {
    const vueApp = app.__vue_app__;
    const components = vueApp._component?.components || {};

    console.log("Available components:", Object.keys(components));
    console.log(
      "VCalendar component:",
      components.VCalendar ? "✅ Registered" : "❌ Not found"
    );
  } else {
    console.log("Vue app not found in DOM");
  }

  // Test 2: Check v-calendar CSS classes
  const vcElements = document.querySelectorAll('[class*="vc-"]');
  console.log("Test 2: v-calendar DOM elements found:", vcElements.length);

  // Test 3: Check for calendar error messages in console
  console.log("Test 3: Check for errors in console - review above messages");

  console.log("✅ v-calendar component test complete!");
}, 2000); // Wait for Vue app to fully mount
