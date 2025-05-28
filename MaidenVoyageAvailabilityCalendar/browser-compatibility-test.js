/**
 * Browser Compatibility Test for Maiden Voyage Availability Calendar
 * Tests the specific issue with "everyone is available" date chips only working in Safari
 */

console.log("🌐 Browser Compatibility Test Starting...");
console.log('🔍 Testing: "Everyone is available" date chips functionality');
console.log("📱 Browser:", navigator.userAgent);

// Test 1: Check if Vue reactive system is working
const testVueReactivity = () => {
  console.log("\n📋 Test 1: Vue Reactivity Check");
  try {
    if (typeof Vue !== "undefined" && Vue.version) {
      console.log("✅ Vue is available:", Vue.version);
      return true;
    } else {
      console.log("❌ Vue not found in global scope");
      return false;
    }
  } catch (error) {
    console.log("❌ Vue reactivity test failed:", error.message);
    return false;
  }
};

// Test 2: Check Date object compatibility
const testDateCompatibility = () => {
  console.log("\n📅 Test 2: Date Object Compatibility");
  try {
    const testDate = new Date("2025-05-15");
    const isoString = testDate.toISOString();
    const localString = testDate.toLocaleDateString();

    console.log("✅ Date creation:", testDate);
    console.log("✅ ISO String:", isoString);
    console.log("✅ Local String:", localString);

    // Test date comparison
    const sameDate = new Date("2025-05-15");
    const timeComparison = testDate.getTime() === sameDate.getTime();
    console.log("✅ Date comparison:", timeComparison);

    return true;
  } catch (error) {
    console.log("❌ Date compatibility test failed:", error.message);
    return false;
  }
};

// Test 3: Check Array methods compatibility
const testArrayMethods = () => {
  console.log("\n🔗 Test 3: Array Methods Compatibility");
  try {
    const testUsers = [
      {
        name: "Jessica",
        availableDates: [new Date("2025-05-15"), new Date("2025-05-20")],
      },
      {
        name: "Flint",
        availableDates: [new Date("2025-05-15"), new Date("2025-05-25")],
      },
      { name: "Josh & Karen", availableDates: [new Date("2025-05-15")] },
      { name: "Jeff & Mafalda", availableDates: [new Date("2025-05-15")] },
    ];

    // Test reduce functionality
    const allDates = testUsers.reduce((acc, user) => {
      user.availableDates.forEach((date) => {
        if (!acc.find((d) => d.getTime() === date.getTime())) {
          acc.push(date);
        }
      });
      return acc;
    }, []);

    console.log("✅ Reduce method works:", allDates.length, "unique dates");

    // Test filter + every combination (this is the critical part for commonAvailableDates)
    const commonDates = allDates.filter((date) => {
      return testUsers.every((user) => {
        return user.availableDates.some(
          (userDate) => userDate.getTime() === date.getTime()
        );
      });
    });

    console.log(
      "✅ Filter + every + some methods work:",
      commonDates.length,
      "common dates"
    );
    console.log(
      "✅ Common dates:",
      commonDates.map((d) => d.toISOString())
    );

    return commonDates.length > 0;
  } catch (error) {
    console.log("❌ Array methods test failed:", error.message);
    return false;
  }
};

// Test 4: Check computed property simulation
const testComputedSimulation = () => {
  console.log("\n⚡ Test 4: Computed Property Simulation");
  try {
    // Simulate the exact logic from commonAvailableDates computed
    const users = [
      {
        name: "Jessica",
        availableDates: [new Date("2025-05-15"), new Date("2025-05-20")],
      },
      {
        name: "Flint",
        availableDates: [new Date("2025-05-15"), new Date("2025-05-25")],
      },
      { name: "Josh & Karen", availableDates: [new Date("2025-05-15")] },
      { name: "Jeff & Mafalda", availableDates: [new Date("2025-05-15")] },
    ];

    // Get all unique dates
    const allSelectedDates = users.reduce((acc, user) => {
      if (!Array.isArray(user.availableDates)) return acc;

      user.availableDates.forEach((date) => {
        if (
          date instanceof Date &&
          !isNaN(date.getTime()) &&
          !acc.find((d) => d.getTime() === date.getTime())
        ) {
          acc.push(date);
        }
      });
      return acc;
    }, []);

    console.log("✅ All selected dates:", allSelectedDates.length);

    // Filter for common dates
    const commonDates = allSelectedDates
      .filter((date) => {
        return users.every((user) => {
          if (!Array.isArray(user.availableDates)) return false;
          return user.availableDates.some(
            (userDate) =>
              userDate instanceof Date &&
              !isNaN(userDate.getTime()) &&
              userDate.getTime() === date.getTime()
          );
        });
      })
      .sort((a, b) => a - b);

    console.log("✅ Common dates computed:", commonDates.length);
    console.log(
      "✅ Result:",
      commonDates.map((d) => d.toLocaleDateString())
    );

    return commonDates.length > 0;
  } catch (error) {
    console.log("❌ Computed simulation failed:", error.message);
    return false;
  }
};

// Test 5: Check DOM rendering compatibility
const testDOMRendering = () => {
  console.log("\n🎨 Test 5: DOM Rendering Compatibility");
  try {
    // Create test elements
    const testContainer = document.createElement("div");
    testContainer.className = "d-flex flex-wrap ga-2";

    const testChip = document.createElement("div");
    testChip.className = "v-chip";
    testChip.textContent = "Test Date Chip";

    testContainer.appendChild(testChip);

    console.log("✅ DOM element creation works");
    console.log("✅ Class assignment works");
    console.log("✅ Text content works");

    return true;
  } catch (error) {
    console.log("❌ DOM rendering test failed:", error.message);
    return false;
  }
};

// Test 6: Check specific browser quirks
const testBrowserQuirks = () => {
  console.log("\n🔧 Test 6: Browser-Specific Quirks");

  const userAgent = navigator.userAgent.toLowerCase();
  const isSafari =
    userAgent.includes("safari") && !userAgent.includes("chrome");
  const isChrome = userAgent.includes("chrome");
  const isFirefox = userAgent.includes("firefox");
  const isEdge = userAgent.includes("edge");

  console.log("🔍 Browser Detection:");
  console.log("  Safari:", isSafari);
  console.log("  Chrome:", isChrome);
  console.log("  Firefox:", isFirefox);
  console.log("  Edge:", isEdge);

  // Test ES6 features that might cause issues
  try {
    // Arrow functions
    const testArrow = () => "arrow function works";
    console.log("✅ Arrow functions:", testArrow());

    // Template literals
    const testTemplate = `template literal works`;
    console.log("✅ Template literals:", testTemplate);

    // Destructuring
    const { userAgent: ua } = navigator;
    console.log("✅ Destructuring works");

    // Array.find
    const testArray = [1, 2, 3];
    const found = testArray.find((x) => x === 2);
    console.log("✅ Array.find:", found);

    // Array.every
    const everyTest = testArray.every((x) => x > 0);
    console.log("✅ Array.every:", everyTest);

    // Array.some
    const someTest = testArray.some((x) => x === 2);
    console.log("✅ Array.some:", someTest);

    return true;
  } catch (error) {
    console.log("❌ Browser quirks test failed:", error.message);
    return false;
  }
};

// Run all tests
const runAllTests = async () => {
  console.log("🚀 Running Browser Compatibility Tests...\n");

  const results = {
    vueReactivity: testVueReactivity(),
    dateCompatibility: testDateCompatibility(),
    arrayMethods: testArrayMethods(),
    computedSimulation: testComputedSimulation(),
    domRendering: testDOMRendering(),
    browserQuirks: testBrowserQuirks(),
  };

  console.log("\n📊 Test Results Summary:");
  Object.entries(results).forEach(([test, passed]) => {
    console.log(
      `  ${passed ? "✅" : "❌"} ${test}: ${passed ? "PASSED" : "FAILED"}`
    );
  });

  const allPassed = Object.values(results).every((result) => result);
  console.log(
    `\n${allPassed ? "🎉" : "⚠️"} Overall: ${
      allPassed ? "ALL TESTS PASSED" : "SOME TESTS FAILED"
    }`
  );

  if (!allPassed) {
    console.log("\n🔧 Recommended Actions:");
    if (!results.vueReactivity)
      console.log("  - Check Vue.js loading and version compatibility");
    if (!results.dateCompatibility)
      console.log("  - Check Date object polyfills");
    if (!results.arrayMethods)
      console.log(
        "  - Check Array method polyfills (reduce, filter, every, some)"
      );
    if (!results.computedSimulation)
      console.log("  - Debug commonAvailableDates computation logic");
    if (!results.domRendering)
      console.log("  - Check DOM manipulation compatibility");
    if (!results.browserQuirks)
      console.log("  - Check ES6+ feature support and polyfills");
  }

  return results;
};

// Auto-run tests when script loads
if (typeof window !== "undefined") {
  // Browser environment
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", runAllTests);
  } else {
    runAllTests();
  }
} else {
  // Node.js environment
  runAllTests();
}

// Export for manual testing
if (typeof module !== "undefined" && module.exports) {
  module.exports = { runAllTests };
} else if (typeof window !== "undefined") {
  window.browserCompatibilityTest = { runAllTests };
}
