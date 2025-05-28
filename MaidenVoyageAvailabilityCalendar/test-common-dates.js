// Test script to verify common dates computation
console.log("🧪 Testing common dates computation...");

// Simulate the computeCommonDatesSafe function
const computeCommonDatesSafe = (usersData, trigger) => {
  console.log(
    "🔧 computeCommonDatesSafe: Starting computation, trigger:",
    trigger
  );

  if (!usersData || usersData.length === 0) {
    console.log("🔧 computeCommonDatesSafe: No users data");
    return [];
  }

  // Method 1: Try the for-loop approach (most compatible)
  try {
    console.log("🔧 computeCommonDatesSafe: Trying for-loop method");

    const allSelectedDates = [];
    const seenTimestamps = new Set();

    for (const user of usersData) {
      if (!Array.isArray(user.availableDates)) continue;

      for (const date of user.availableDates) {
        if (
          date instanceof Date &&
          !isNaN(date.getTime()) &&
          date.getFullYear() >= 2020 &&
          date.getFullYear() <= 2030
        ) {
          const timestamp = date.getTime();
          if (!seenTimestamps.has(timestamp)) {
            seenTimestamps.add(timestamp);
            allSelectedDates.push(date);
          }
        }
      }
    }

    const commonDates = [];

    for (const date of allSelectedDates) {
      const dateTimestamp = date.getTime();
      let isCommonToAll = true;

      for (const user of usersData) {
        if (!Array.isArray(user.availableDates)) {
          isCommonToAll = false;
          break;
        }

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
        commonDates.push(date);
      }
    }

    commonDates.sort((a, b) => a.getTime() - b.getTime());
    console.log(
      "✅ computeCommonDatesSafe: For-loop method succeeded, found",
      commonDates.length,
      "dates"
    );
    return commonDates;
  } catch (error) {
    console.warn(
      "⚠️ computeCommonDatesSafe: For-loop method failed:",
      error.message
    );
    return [];
  }
};

// Test data
const testUsers = [
  {
    name: "Jessica",
    availableDates: [
      new Date("2025-05-15"),
      new Date("2025-05-20"),
      new Date("2025-06-01"),
    ],
  },
  {
    name: "Flint",
    availableDates: [
      new Date("2025-05-15"),
      new Date("2025-05-25"),
      new Date("2025-06-01"),
    ],
  },
  {
    name: "Josh & Karen",
    availableDates: [
      new Date("2025-05-15"),
      new Date("2025-06-01"),
      new Date("2025-06-10"),
    ],
  },
  {
    name: "Jeff & Mafalda",
    availableDates: [
      new Date("2025-05-15"),
      new Date("2025-06-01"),
      new Date("2025-06-15"),
    ],
  },
];

console.log(
  "📊 Test Users:",
  testUsers.map((u) => ({
    name: u.name,
    dates: u.availableDates.map((d) => d.toISOString().split("T")[0]),
  }))
);

const result = computeCommonDatesSafe(testUsers, Date.now());

console.log("🎯 Expected common dates: 2025-05-15, 2025-06-01");
console.log(
  "✅ Computed common dates:",
  result.map((d) => d.toISOString().split("T")[0])
);
console.log("🔍 Total common dates found:", result.length);

if (result.length === 2) {
  console.log("✅ TEST PASSED: Found expected 2 common dates");
} else {
  console.log("❌ TEST FAILED: Expected 2 common dates, found", result.length);
}
