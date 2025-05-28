// Test the Second Row: Common Availability functionality
console.log("🔧 Testing Common Availability Section...");

// Test data that should result in common dates
const testUsers = [
  {
    name: "Jessica",
    color: "blue",
    availableDates: [
      new Date("2025-05-15"),
      new Date("2025-05-20"),
      new Date("2025-06-01"),
    ],
  },
  {
    name: "Flint",
    color: "green",
    availableDates: [
      new Date("2025-05-15"),
      new Date("2025-05-25"),
      new Date("2025-06-01"),
    ],
  },
  {
    name: "Josh & Karen",
    color: "orange",
    availableDates: [
      new Date("2025-05-15"),
      new Date("2025-06-01"),
      new Date("2025-06-10"),
    ],
  },
  {
    name: "Jeff & Mafalda",
    color: "purple",
    availableDates: [
      new Date("2025-05-15"),
      new Date("2025-06-01"),
      new Date("2025-06-15"),
    ],
  },
];

// Function to test common dates computation
function computeCommonDatesSafe(usersData, trigger) {
  console.log(
    "🔧 computeCommonDatesSafe: Starting computation, trigger:",
    trigger
  );

  if (!usersData || usersData.length === 0) {
    console.log("🔧 computeCommonDatesSafe: No users data");
    return [];
  }

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
}

// Test the computation
const result = computeCommonDatesSafe(testUsers, Date.now());

console.log("📊 Test Results:");
console.log("Expected common dates: 2025-05-15, 2025-06-01");
console.log(
  "Computed common dates:",
  result.map((d) => d.toISOString().split("T")[0])
);
console.log("Total common dates:", result.length);

if (result.length === 2) {
  console.log(
    "✅ SUCCESS: Common Availability functionality is working correctly!"
  );
  console.log("📋 Instructions for testing in the UI:");
  console.log("1. Open http://localhost:5174/");
  console.log("2. Click the '📊 Add Test Data' button");
  console.log(
    "3. The 'Second Row: Common Availability' section should show common dates"
  );
  console.log(
    "4. You should see chips showing the dates that everyone is available"
  );
} else {
  console.log("❌ ISSUE: Expected 2 common dates, found", result.length);
}
