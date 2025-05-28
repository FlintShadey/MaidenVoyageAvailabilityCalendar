/**
 * Cross-Browser Test for Common Dates Functionality
 * Run this in the browser console to test the specific issue
 */

window.testCommonDates = () => {
  console.log("🧪 Testing Common Dates Functionality");
  console.log("🌐 Browser:", navigator.userAgent);

  // Test data simulation
  const testUsers = [
    {
      name: "Jessica",
      availableDates: [
        new Date("2025-05-15"),
        new Date("2025-05-20"),
        new Date("2025-05-25"),
      ],
    },
    {
      name: "Flint",
      availableDates: [
        new Date("2025-05-15"),
        new Date("2025-05-22"),
        new Date("2025-05-25"),
      ],
    },
    {
      name: "Josh & Karen",
      availableDates: [new Date("2025-05-15"), new Date("2025-05-18")],
    },
    {
      name: "Jeff & Mafalda",
      availableDates: [new Date("2025-05-15"), new Date("2025-05-20")],
    },
  ];

  console.log(
    "📊 Test data:",
    testUsers.map((u) => ({
      name: u.name,
      dates: u.availableDates.map((d) => d.toISOString().split("T")[0]),
    }))
  );

  // Method 1: Original approach (using reduce + filter + every + some)
  console.log("\n🔬 Method 1: Original approach");
  try {
    const allSelectedDates = testUsers.reduce((acc, user) => {
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

    console.log(
      "✅ Unique dates:",
      allSelectedDates.map((d) => d.toISOString().split("T")[0])
    );

    const commonDates1 = allSelectedDates.filter((date) => {
      return testUsers.every((user) => {
        return user.availableDates.some(
          (userDate) =>
            userDate instanceof Date &&
            !isNaN(userDate.getTime()) &&
            userDate.getTime() === date.getTime()
        );
      });
    });

    console.log(
      "✅ Method 1 result:",
      commonDates1.map((d) => d.toISOString().split("T")[0])
    );
  } catch (error) {
    console.log("❌ Method 1 failed:", error.message);
  }

  // Method 2: For-loop approach (more compatible)
  console.log("\n🔬 Method 2: For-loop approach");
  try {
    const allSelectedDates = [];
    const seenTimestamps = new Set();

    for (const user of testUsers) {
      for (const date of user.availableDates) {
        if (date instanceof Date && !isNaN(date.getTime())) {
          const timestamp = date.getTime();
          if (!seenTimestamps.has(timestamp)) {
            seenTimestamps.add(timestamp);
            allSelectedDates.push(date);
          }
        }
      }
    }

    console.log(
      "✅ Unique dates:",
      allSelectedDates.map((d) => d.toISOString().split("T")[0])
    );

    const commonDates2 = [];

    for (const date of allSelectedDates) {
      const dateTimestamp = date.getTime();
      let isCommonToAll = true;

      for (const user of testUsers) {
        let userHasThisDate = false;
        for (const userDate of user.availableDates) {
          if (
            userDate instanceof Date &&
            !isNaN(userDate.getTime()) &&
            userDate.getTime() === dateTimestamp
          ) {
            userHasThisDate = true;
            break;
          }
        }

        if (!userHasThisDate) {
          isCommonToAll = false;
          break;
        }
      }

      if (isCommonToAll) {
        commonDates2.push(date);
      }
    }

    console.log(
      "✅ Method 2 result:",
      commonDates2.map((d) => d.toISOString().split("T")[0])
    );
  } catch (error) {
    console.log("❌ Method 2 failed:", error.message);
  }

  // Method 3: Map-based approach
  console.log("\n🔬 Method 3: Map-based approach");
  try {
    const dateMap = new Map();

    // Count occurrences of each date
    testUsers.forEach((user) => {
      user.availableDates.forEach((date) => {
        if (date instanceof Date && !isNaN(date.getTime())) {
          const key = date.toISOString().split("T")[0];
          const count = dateMap.get(key) || 0;
          dateMap.set(key, count + 1);
        }
      });
    });

    // Find dates that appear for all users
    const commonDates3 = [];
    dateMap.forEach((count, dateStr) => {
      if (count === testUsers.length) {
        commonDates3.push(new Date(dateStr));
      }
    });

    console.log(
      "✅ Method 3 result:",
      commonDates3.map((d) => d.toISOString().split("T")[0])
    );
  } catch (error) {
    console.log("❌ Method 3 failed:", error.message);
  }

  // Test DOM manipulation
  console.log("\n🎨 Testing DOM manipulation");
  try {
    const testContainer = document.createElement("div");
    testContainer.style.display = "none";
    testContainer.innerHTML = `
      <div class="d-flex flex-wrap ga-2">
        <div class="v-chip">Test Date 1</div>
        <div class="v-chip">Test Date 2</div>
      </div>
    `;
    document.body.appendChild(testContainer);

    const chips = testContainer.querySelectorAll(".v-chip");
    console.log("✅ DOM manipulation works, created", chips.length, "chips");

    document.body.removeChild(testContainer);
  } catch (error) {
    console.log("❌ DOM manipulation failed:", error.message);
  }

  console.log("\n🎉 Cross-browser test complete!");
};

// Test Vue reactivity if app is available
window.testVueReactivity = () => {
  console.log("🧪 Testing Vue Reactivity");

  if (window.Vue) {
    console.log("✅ Vue global available:", window.Vue.version);
  } else {
    console.log("⚠️ Vue not in global scope (expected in production)");
  }

  // Test if we can access the app instance
  const appElement = document.getElementById("app");
  if (appElement && appElement.__vue_app__) {
    console.log("✅ Vue app instance found");
  } else {
    console.log("⚠️ Vue app instance not accessible");
  }
};

// Auto-run basic test
console.log("🔧 Cross-browser compatibility tester loaded");
console.log("📝 Run testCommonDates() to test common dates functionality");
console.log("📝 Run testVueReactivity() to test Vue reactivity");

// Auto-run on page load
if (document.readyState === "complete") {
  setTimeout(() => {
    testCommonDates();
    testVueReactivity();
  }, 2000);
} else {
  window.addEventListener("load", () => {
    setTimeout(() => {
      testCommonDates();
      testVueReactivity();
    }, 2000);
  });
}
