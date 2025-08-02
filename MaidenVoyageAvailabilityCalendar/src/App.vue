<template>
  <v-app>
    <v-main>
      <v-container fluid class="pa-2 pa-md-4 d-flex flex-column">
        <!-- First Row: User Selection and Calendar -->
        <v-row class="flex-grow-1" style="min-height: 70vh">
          <v-col cols="12" sm="4" md="3" lg="2" xl="2" class="d-flex">
            <v-card class="flex-grow-1">
              <div class="d-flex justify-center pa-3">
                <v-img
                  :src="logoUrl"
                  alt="Trip to Fredericksberg Logo"
                  max-width="250"
                  max-height="160"
                  contain
                ></v-img>
              </div>
              <v-card-title>Select User</v-card-title>
              <v-card-text>
                <!-- Demo Mode Alert -->
                <v-alert
                  v-if="demoMode"
                  type="info"
                  variant="tonal"
                  density="compact"
                  class="mb-3"
                  icon="mdi-test-tube"
                >
                  <template #title>Demo Mode</template>
                  Data won't persist. See SUPABASE_SETUP.md
                </v-alert>

                <div class="d-flex flex-column ga-3">
                  <v-btn
                    v-for="user in users"
                    :key="user.name"
                    :variant="
                      selectedUser === user.name ? 'elevated' : 'outlined'
                    "
                    :color="user.color"
                    @click="selectedUser = user.name"
                    class="text-left justify-start"
                    size="default"
                  >
                    {{ user.name }}
                  </v-btn>
                </div>
              </v-card-text>
            </v-card>
          </v-col>
          <v-col cols="12" sm="8" md="9" lg="10" xl="10" class="d-flex">
            <v-card class="flex-grow-1">
              <v-card-title>Select Availability</v-card-title>
              <v-card-text class="pa-2 d-flex flex-column">
                <div
                  v-if="isLoading"
                  class="d-flex align-center justify-center"
                  style="min-height: 400px"
                >
                  <v-progress-circular
                    indeterminate
                    color="primary"
                    size="64"
                  ></v-progress-circular>
                </div>
                <div v-else class="calendar-container">
                  <VCalendar
                    v-if="!calendarError && calendarReady"
                    :key="calendarKey"
                    :min-date="new Date(2025, 7, 1)"
                    :max-date="new Date(2025, 9, 31)"
                    :from-page="currentCalendarPage"
                    :attributes="safeCalendarAttributes"
                    @dayclick="onDayClick"
                    @update:from-page="onPageChange"
                    expanded
                    is-dark
                    view="monthly"
                    :columns="1"
                    class="custom-calendar"
                  />
                  <div v-else-if="calendarError" class="text-center">
                    <v-icon size="48" class="mb-2">mdi-calendar-alert</v-icon>
                    <p>Calendar temporarily unavailable</p>
                    <v-btn
                      @click="resetCalendar"
                      variant="outlined"
                      size="small"
                    >
                      Reset Calendar
                    </v-btn>
                  </div>
                  <div v-else class="text-center">
                    <v-progress-circular
                      indeterminate
                      color="primary"
                      size="32"
                    ></v-progress-circular>
                    <p class="mt-2">Preparing calendar...</p>
                  </div>
                </div>

                <!-- Submit Button - positioned right after calendar -->
                <div class="d-flex justify-center mt-4 mb-2">
                  <v-btn
                    @click="submitToDatabase"
                    :disabled="!hasSelectedDates || isSubmitting"
                    :loading="isSubmitting"
                    :color="hasPendingChanges ? 'warning' : 'primary'"
                    :variant="hasPendingChanges ? 'elevated' : 'outlined'"
                    prepend-icon="mdi-database-plus"
                    size="large"
                  >
                    {{
                      hasPendingChanges ? "Save Changes" : "Submit to Database"
                    }}
                    <v-chip
                      v-if="hasPendingChanges"
                      color="white"
                      variant="elevated"
                      size="x-small"
                      class="ml-2"
                    >
                      Pending
                    </v-chip>
                  </v-btn>
                </div>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>

        <!-- Second Row: Common Availability -->
        <v-row style="min-height: 25vh">
          <v-col cols="12">
            <v-card class="fill-height">
              <v-card-title class="d-flex align-center">
                <div
                  class="d-flex align-center flex-grow-1 justify-center text-center"
                >
                  <!-- Wrap span and chip for alignment -->
                  <span class="text-center">Shared Availability:</span>
                  <v-chip
                    color="info"
                    variant="outlined"
                    size="x-small"
                    class="ml-2"
                  >
                    {{ userAvailabilityByDate.length }} dates
                  </v-chip>
                </div>
                <!-- <v-spacer></v-spacer> REMOVED to allow centering of the div above -->
                <v-btn
                  icon="mdi-refresh"
                  size="small"
                  variant="text"
                  @click="forceCommonDatesUpdate"
                  title="Refresh availability"
                >
                </v-btn>
              </v-card-title>
              <v-card-text>
                <!-- Debug info (remove in production) -->
                <div
                  v-if="false"
                  class="mb-3 pa-2 bg-grey-lighten-4 text-caption rounded"
                >
                  <strong>🔧 Debug Info:</strong><br />
                  Calendar Ready: {{ calendarReady }}<br />
                  Users Count: {{ users.length }}<br />
                  Availability Dates Count: {{ userAvailabilityByDate.length }}<br />
                  Update Trigger: {{ commonDatesUpdateTrigger }}<br />
                  Users with dates:
                  {{
                    users
                      .filter((u) => u.availableDates?.length > 0)
                      .map((u) => `${u.name}(${u.availableDates.length})`)
                      .join(", ")
                  }}<br />
                  Browser: {{ browserType }}

                  <div class="mt-2">
                    <v-btn
                      size="x-small"
                      color="primary"
                      @click="runBrowserTest"
                      class="mr-2"
                    >
                      🧪 Test Browser
                    </v-btn>
                    <v-btn
                      size="x-small"
                      color="warning"
                      @click="addTestData"
                      class="mr-2"
                    >
                      📊 Add Test Data
                    </v-btn>
                    <v-btn size="x-small" color="error" @click="clearTestData">
                      🗑️ Clear Data
                    </v-btn>
                  </div>
                </div>

                <div
                  v-if="userAvailabilityByDate.length === 0"
                  class="text-center text-medium-emphasis"
                >
                  <v-icon size="48" class="mb-2">mdi-calendar-question</v-icon>
                  <p>
                    No dates with 2 or more users available yet. Select dates for multiple users to see shared availability!
                  </p>
                </div>
                <div v-else class="d-flex flex-column ga-3">
                  <div
                    v-for="(dateInfo, index) in userAvailabilityByDate"
                    :key="`availability-${dateInfo.date.toISOString()}-${index}`"
                    class="availability-item"
                  >
                    <div class="d-flex align-center ga-2 flex-wrap">
                      <v-chip
                        color="primary"
                        variant="elevated"
                        size="large"
                        class="date-chip"
                      >
                        {{ formatDate(dateInfo.date) }}
                      </v-chip>
                      <span class="text-body-1">
                        {{ formatUserNames(dateInfo.users) }}
                        {{ dateInfo.users.length === 1 ? 'is' : 'are' }} available
                      </span>
                      <div class="d-flex flex-wrap ga-1 ml-auto">
                        <v-chip
                          v-for="user in dateInfo.users"
                          :key="`user-${user.name}-${index}`"
                          :color="user.color"
                          variant="outlined"
                          size="small"
                        >
                          {{ user.name }}
                        </v-chip>
                      </div>
                    </div>
                  </div>
                </div>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted, nextTick, watch } from "vue";

// Import DatabaseService normally and handle errors at runtime
import { DatabaseService } from "./lib/database.js";

// Import logo asset
import logoUrl from "./assets/TriptoFredericksberg.png";

const users = ref([
  { name: "Flint", color: "blue", availableDates: [] },
  { name: "Yanni", color: "green", availableDates: [] },
  { name: "Mike", color: "orange", availableDates: [] },
  { name: "Zack", color: "purple", availableDates: [] },
]);

const selectedUser = ref(users.value[0].name);

// Reactive triggers for cross-browser compatibility
const commonDatesUpdateTrigger = ref(0);
const forceCommonDatesUpdate = () => {
  commonDatesUpdateTrigger.value++;
  console.log(
    "🔄 Forcing common dates update, trigger:",
    commonDatesUpdateTrigger.value
  );
};
const isLoading = ref(true);
const isSubmitting = ref(false);
const hasPendingChanges = ref(false);
const subscription = ref(null);
const demoMode = ref(false);
const calendarError = ref(false);
const calendarReady = ref(false);
const calendarKey = ref(0); // Force re-render when needed
const currentCalendarPage = ref({ month: 8, year: 2025 }); // Start with August 2025

// Browser compatibility detection
const userAgent =
  typeof window !== "undefined" ? window.navigator.userAgent : "";
const browserType = computed(() => {
  const ua = userAgent.toLowerCase();
  if (ua.includes("safari") && !ua.includes("chrome")) return "Safari";
  if (ua.includes("chrome")) return "Chrome";
  if (ua.includes("firefox")) return "Firefox";
  if (ua.includes("edge")) return "Edge";
  return "Other";
});

// Debounced calendar update to prevent rapid changes
let calendarUpdateTimer = null;

// Helper function to safely create Date objects from date strings
const createSafeDate = (dateString) => {
  if (!dateString) return null;

  try {
    // Handle both YYYY-MM-DD format and full ISO strings
    const dateStr = dateString.split("T")[0]; // Get just the date part
    const dateParts = dateStr.split("-");

    if (dateParts.length !== 3) return null;

    const year = parseInt(dateParts[0]);
    const month = parseInt(dateParts[1]) - 1; // JavaScript months are 0-indexed
    const day = parseInt(dateParts[2]);

    // Check for valid date components
    if (isNaN(year) || isNaN(month) || isNaN(day)) return null;
    if (year < 1900 || year > 2100) return null;
    if (month < 0 || month > 11) return null;
    if (day < 1 || day > 31) return null;

    const date = new Date(year, month, day);

    // Verify the date is valid and matches what we expected
    if (
      isNaN(date.getTime()) ||
      date.getFullYear() !== year ||
      date.getMonth() !== month ||
      date.getDate() !== day
    ) {
      return null;
    }

    return date;
  } catch (error) {
    console.warn("Failed to parse date:", dateString, error);
    return null;
  }
};

// Load data from database when component mounts
onMounted(async () => {
  try {
    if (DatabaseService.isAvailable()) {
      await loadAllUserAvailability();
      setupRealtimeSubscription();
    } else {
      console.log("🎭 Running in demo mode - data will not persist");
      demoMode.value = true;
      calendarReady.value = true;
      isLoading.value = false;
    }
  } catch (error) {
    console.error("Error during component mount:", error);
    calendarError.value = true;
    calendarReady.value = true;
    isLoading.value = false;
  }
});

// Watch for user changes and handle calendar updates
watch(
  selectedUser,
  () => {
    // Force calendar re-render when user changes to prevent stale state
    calendarKey.value += 1;
    // Clear pending changes when switching users
    hasPendingChanges.value = false;
  },
  { immediate: false }
);

// Watch for deep changes in users data to trigger common dates update
watch(
  users,
  () => {
    forceCommonDatesUpdate();
  },
  { deep: true, immediate: false }
);

// Cleanup subscription when component unmounts
onUnmounted(() => {
  if (calendarUpdateTimer) {
    clearTimeout(calendarUpdateTimer);
  }
  if (subscription.value && DatabaseService.isAvailable()) {
    DatabaseService.unsubscribe(subscription.value);
  }
});

// Load all user availability from database
const loadAllUserAvailability = async () => {
  if (!DatabaseService.isAvailable()) return;

  try {
    isLoading.value = true;
    calendarReady.value = false;

    const data = await DatabaseService.getAllUserAvailability();

    // Clear any existing calendar update timers
    if (calendarUpdateTimer) {
      clearTimeout(calendarUpdateTimer);
    }

    // Create a new users array to avoid reactive issues during updates
    const updatedUsers = users.value.map((user) => ({
      ...user,
      availableDates: [],
    }));

    // Populate user availability from database
    data.forEach((record) => {
      const user = updatedUsers.find((u) => u.name === record.user_name);
      if (user && record.selected_date) {
        const date = createSafeDate(record.selected_date);
        if (date) {
          user.availableDates.push(date);
        } else {
          console.warn(
            "Skipping invalid date:",
            record.selected_date,
            "for user:",
            record.user_name
          );
        }
      }
    });

    // Update users in a single operation to minimize reactive updates
    users.value = updatedUsers;

    // Clear pending changes since we're loading fresh data from database
    hasPendingChanges.value = false;

    // Force common dates to update after loading data
    forceCommonDatesUpdate();

    // Debounced calendar ready state to prevent rapid updates
    calendarUpdateTimer = setTimeout(() => {
      calendarReady.value = true;
      calendarError.value = false;
      // Force another update once calendar is ready
      forceCommonDatesUpdate();
    }, 100);

    console.log("Loaded user availability from database:", data);
  } catch (error) {
    console.error("Failed to load user availability:", error);
    console.log("🎭 Falling back to demo mode");
    demoMode.value = true;
    calendarReady.value = true;
  } finally {
    isLoading.value = false;
  }
};

// Setup real-time subscription for database changes
const setupRealtimeSubscription = () => {
  if (!DatabaseService.isAvailable()) return;

  subscription.value = DatabaseService.subscribeToChanges(async (payload) => {
    console.log("Real-time update received:", payload);
    // Reload all data when changes occur
    await loadAllUserAvailability();
  });
};

// Check if current user has selected any dates
const hasSelectedDates = computed(() => {
  try {
    const user = users.value.find((u) => u.name === selectedUser.value);
    return (
      user &&
      Array.isArray(user.availableDates) &&
      user.availableDates.length > 0
    );
  } catch (error) {
    console.error("Error in hasSelectedDates computed:", error);
    return false;
  }
});

// Safe calendar attributes with debouncing and validation
const safeCalendarAttributes = computed(() => {
  try {
    if (!calendarReady.value || calendarError.value) return [];

    const user = users.value.find((u) => u.name === selectedUser.value);
    if (
      !user ||
      !Array.isArray(user.availableDates) ||
      user.availableDates.length === 0
    ) {
      return [];
    }

    // Filter out any invalid dates and ensure they are proper Date objects
    const validDates = user.availableDates.filter((date) => {
      if (!(date instanceof Date)) return false;
      if (isNaN(date.getTime())) return false;
      if (date.getFullYear() < 2020 || date.getFullYear() > 2030) return false;
      return true;
    });

    if (validDates.length === 0) return [];

    // Ensure the user has a valid color
    const userColor = user.color || "blue";

    return [
      {
        key: `${user.name}-highlights-${calendarKey.value}`,
        highlight: {
          color: userColor,
          fillMode: "light",
          class: "user-available-date",
        },
        dates: validDates,
      },
    ];
  } catch (error) {
    console.error("Error in safeCalendarAttributes computed:", error);
    calendarError.value = true;
    return [];
  }
});

// Only show highlights for the selected user's dates
const calendarAttributes = computed(() => {
  try {
    const user = users.value.find((u) => u.name === selectedUser.value);
    if (!user || !user.availableDates || user.availableDates.length === 0)
      return [];

    // Filter out any invalid dates and ensure they are proper Date objects
    const validDates = user.availableDates.filter((date) => {
      return (
        date instanceof Date &&
        !isNaN(date.getTime()) &&
        date.getFullYear() >= 2020 &&
        date.getFullYear() <= 2030
      );
    });

    if (validDates.length === 0) return [];

    // Ensure the user has a valid color
    const userColor = user.color || "blue";

    return [
      {
        key: `${user.name}-highlights`,
        highlight: {
          color: userColor,
          fillMode: "light",
          class: "user-available-date",
        },
        dates: validDates,
      },
    ];
  } catch (error) {
    console.error("Error in calendarAttributes computed:", error);
    return [];
  }
});

// Handle calendar page changes to maintain navigation state
const onPageChange = (page) => {
  try {
    if (page && page.month !== undefined && page.year !== undefined) {
      currentCalendarPage.value = { month: page.month, year: page.year };
      console.log(`📅 Calendar page changed to: ${page.month}/${page.year}`);
    }
  } catch (error) {
    console.error("Error in onPageChange:", error);
  }
};

const onDayClick = async (day) => {
  try {
    if (!calendarReady.value || calendarError.value) return;

    const user = users.value.find((u) => u.name === selectedUser.value);
    if (!user || isSubmitting.value || !day || !day.date) return;

    const clickedDate = day.date;

    // Ensure user.availableDates is an array
    if (!Array.isArray(user.availableDates)) {
      user.availableDates = [];
    }

    const dateIndex = user.availableDates.findIndex(
      (d) => d instanceof Date && d.getTime() === clickedDate.getTime()
    );

    // Update UI immediately (local change only)
    if (dateIndex > -1) {
      // Remove the date if it's already selected
      user.availableDates.splice(dateIndex, 1);
      console.log(
        `🗓️ Removed ${clickedDate.toDateString()} for ${
          selectedUser.value
        } (pending submit)`
      );
    } else {
      // Add the date if it's not selected
      user.availableDates.push(new Date(clickedDate));
      console.log(
        `🗓️ Added ${clickedDate.toDateString()} for ${
          selectedUser.value
        } (pending submit)`
      );
    }

    // Force common dates to update (cross-browser compatibility)
    forceCommonDatesUpdate();

    // Mark that user has pending changes
    hasPendingChanges.value = true;
  } catch (error) {
    console.error("Error in onDayClick:", error);
    calendarError.value = true;
  }
};

// Helper function to compute dates with user availability information
const computeUserAvailabilityByDate = (usersData, trigger) => {
  console.log(
    "🔧 computeUserAvailabilityByDate: Starting computation, trigger:",
    trigger
  );

  if (!usersData || usersData.length === 0) {
    console.log("🔧 computeUserAvailabilityByDate: No users data");
    return [];
  }

  try {
    console.log("🔧 computeUserAvailabilityByDate: Building date availability map");

    const dateAvailabilityMap = new Map();

    // Build map of dates to users who are available
    for (const user of usersData) {
      if (!Array.isArray(user.availableDates)) continue;

      for (const date of user.availableDates) {
        if (
          date instanceof Date &&
          !isNaN(date.getTime()) &&
          date.getFullYear() >= 2020 &&
          date.getFullYear() <= 2030
        ) {
          const dateKey = date.toISOString().split("T")[0];
          
          if (!dateAvailabilityMap.has(dateKey)) {
            dateAvailabilityMap.set(dateKey, {
              date: new Date(date),
              users: []
            });
          }
          
          const dateInfo = dateAvailabilityMap.get(dateKey);
          if (!dateInfo.users.some(u => u.name === user.name)) {
            dateInfo.users.push({
              name: user.name,
              color: user.color
            });
          }
        }
      }
    }

    // Convert to array, filter to only dates with 2+ users, and sort by date
    const availabilityByDate = Array.from(dateAvailabilityMap.values())
      .filter(dateInfo => dateInfo.users.length >= 2) // Only show dates with 2+ users
      .sort((a, b) => a.date.getTime() - b.date.getTime());

    console.log(
      "✅ computeUserAvailabilityByDate: Successfully found",
      availabilityByDate.length,
      "dates with 2+ users available"
    );
    
    return availabilityByDate;
  } catch (error) {
    console.error(
      "❌ computeUserAvailabilityByDate: Failed:",
      error.message
    );
    return [];
  }
};

const userAvailabilityByDate = computed(() => {
  try {
    // Include the trigger in the computation to force reactivity
    const trigger = commonDatesUpdateTrigger.value;

    if (!calendarReady.value || users.value.length === 0) {
      console.log(
        "🔍 userAvailabilityByDate: Calendar not ready or no users, trigger:",
        trigger
      );
      return [];
    }

    console.log(
      "🔍 userAvailabilityByDate: Computing availability for",
      users.value.length,
      "users, trigger:",
      trigger
    );

    return computeUserAvailabilityByDate(users.value, trigger);
  } catch (error) {
    console.error("❌ Error in userAvailabilityByDate computed:", error);
    return [];
  }
});

// Helper function to format user names nicely
const formatUserNames = (users) => {
  if (!users || users.length === 0) return "";
  if (users.length === 1) return users[0].name;
  if (users.length === 2) return `${users[0].name} and ${users[1].name}`;
  
  const allButLast = users.slice(0, -1).map(u => u.name).join(", ");
  const last = users[users.length - 1].name;
  return `${allButLast}, and ${last}`;
};

const formatDate = (date) => {
  try {
    if (!(date instanceof Date) || isNaN(date.getTime())) {
      return "Invalid Date";
    }
    return date.toLocaleDateString(undefined, {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  } catch (error) {
    console.error("Error formatting date:", error);
    return "Invalid Date";
  }
};

const submitToDatabase = async () => {
  try {
    const user = users.value.find((u) => u.name === selectedUser.value);
    if (
      !user ||
      !Array.isArray(user.availableDates) ||
      user.availableDates.length === 0 ||
      isSubmitting.value
    ) {
      return;
    }

    if (demoMode.value || !DatabaseService.isAvailable()) {
      // Demo mode - just show the data that would be submitted
      const dateStrings = user.availableDates
        .filter((date) => date instanceof Date && !isNaN(date.getTime()))
        .map((date) => date.toISOString().split("T")[0]);

      console.log(`🎭 Demo mode - would submit ${user.name}'s availability:`, {
        user: user.name,
        dates: dateStrings,
        totalDates: dateStrings.length,
      });

      alert(
        `🎭 Demo mode: Would submit ${user.name}'s availability for ${dateStrings.length} dates. Check console for details.`
      );

      // Clear pending changes flag in demo mode too
      hasPendingChanges.value = false;
      return;
    }

    isSubmitting.value = true;

    // Convert dates to ISO string format (YYYY-MM-DD), filtering out invalid dates
    const dateStrings = user.availableDates
      .filter((date) => date instanceof Date && !isNaN(date.getTime()))
      .map((date) => date.toISOString().split("T")[0]);

    if (dateStrings.length === 0) {
      alert("No valid dates to submit.");
      isSubmitting.value = false; // Ensure isSubmitting is reset
      return;
    }

    await DatabaseService.setUserAvailability(selectedUser.value, dateStrings);

    console.log(`Successfully submitted ${user.name}'s availability:`, {
      user: user.name,
      dates: dateStrings,
      totalDates: dateStrings.length,
    });

    // Clear pending changes flag on successful submission
    hasPendingChanges.value = false;

    alert(
      `Successfully submitted ${user.name}'s availability for ${dateStrings.length} dates.`
    );
  } catch (error) {
    console.error("Failed to submit to database:", error);
    alert(
      `Failed to submit availability to the database. Error: ${error.message}`
    );
  } finally {
    isSubmitting.value = false;
  }
};

// Reset calendar in case of errors
const resetCalendar = async () => {
  try {
    console.log("Resetting calendar...");

    // Clear any existing timers
    if (calendarUpdateTimer) {
      clearTimeout(calendarUpdateTimer);
    }

    calendarError.value = false;
    calendarReady.value = false;
    isLoading.value = true;
    hasPendingChanges.value = false; // Clear pending changes on reset

    // Force calendar re-render
    calendarKey.value += 1;

    // Clear all user dates
    users.value.forEach((user) => {
      user.availableDates = [];
    });

    await nextTick();

    // Reload data if database is available
    if (DatabaseService.isAvailable()) {
      await loadAllUserAvailability();
    } else {
      // Handle demo mode reset
      calendarReady.value = true;
      isLoading.value = false;
      forceCommonDatesUpdate(); // Ensure common dates are re-evaluated
      console.log("🎭 Calendar reset in demo mode.");
    }

    console.log("Calendar reset complete");
  } catch (error) {
    console.error("Error resetting calendar:", error);
    calendarError.value = true;
    calendarReady.value = true;
    isLoading.value = false;
  }
};

// Debug/Test methods for cross-browser compatibility
const runBrowserTest = () => {
  console.log("🧪 Running cross-browser compatibility test...");

  const testResults = {
    browser: navigator.userAgent,
    availabilityDatesCount: userAvailabilityByDate.value.length,
    usersWithData: users.value.filter((u) => u.availableDates?.length > 0)
      .length,
    totalUsers: users.value.length,
  };

  console.log("🔍 Test Results:", testResults);

  // Test the computation methods directly
  const testData = [
    {
      name: "Test1",
      color: "blue",
      availableDates: [new Date("2025-08-15"), new Date("2025-08-20")],
    },
    {
      name: "Test2",
      color: "green",
      availableDates: [new Date("2025-08-15"), new Date("2025-08-25")],
    },
    { 
      name: "Test3", 
      color: "orange",
      availableDates: [new Date("2025-08-15")] 
    },
    { 
      name: "Test4", 
      color: "purple",
      availableDates: [new Date("2025-08-15")] 
    },
  ];

  const testResult = computeUserAvailabilityByDate(testData, Date.now());
  console.log(
    "✅ Direct computation test:",
    testResult.map((item) => ({
      date: item.date.toISOString().split("T")[0],
      users: item.users.map(u => u.name)
    }))
  );

  alert(
    `🧪 Browser Test Complete!\n\nBrowser: ${
      testResults.browser.includes("Safari") &&
      !testResults.browser.includes("Chrome")
        ? "Safari"
        : testResults.browser.includes("Chrome")
        ? "Chrome"
        : "Other"
    }\nAvailability Dates: ${testResults.availabilityDatesCount}\nUsers with Data: ${
      testResults.usersWithData
    }/${testResults.totalUsers}\nDirect Test Result: ${
      testResult.length
    } dates with availability\n\nCheck console for detailed results.`
  );
};

const addTestData = () => {
  console.log("📊 Adding test data...");

  // Add some test dates to all users
  const testDates = [
    new Date("2025-08-15"),
    new Date("2025-09-01"),
    new Date("2025-09-15"),
  ];

  users.value.forEach((user, index) => {
    user.availableDates = [...testDates];
    // Add some unique dates for variety
    if (index === 0) user.availableDates.push(new Date("2025-08-20"));
    if (index === 1) user.availableDates.push(new Date("2025-08-25"));
  });

  forceCommonDatesUpdate();

  const availabilityCount = userAvailabilityByDate.value.length;
  console.log("✅ Test data added, availability dates:", availabilityCount);
  alert(
    `📊 Test data added!\n\nUsers now have dates selected.\nTotal dates with availability: ${availabilityCount}\n\nExpected: Several dates with different user combinations`
  );
};

const clearTestData = () => {
  console.log("🗑️ Clearing test data...");

  users.value.forEach((user) => {
    user.availableDates = [];
  });

  forceCommonDatesUpdate();

  console.log("✅ Test data cleared");
  alert("🗑️ All test data cleared!");
};

// Global error handler for calendar issues
window.addEventListener("unhandledrejection", (event) => {
  if (
    event.reason &&
    event.reason.message &&
    (event.reason.message.includes("dayIndex") ||
      event.reason.message.includes("v-calendar") ||
      event.reason.message.includes("calendar"))
  ) {
    console.warn(
      "Detected v-calendar error, resetting calendar state:",
      event.reason.message
    );
    calendarError.value = true;
    calendarReady.value = false;
    event.preventDefault();

    // Auto-reset after a brief delay
    setTimeout(() => {
      resetCalendar();
    }, 1000);
  }
});

// Global error handler for regular errors
window.addEventListener("error", (event) => {
  if (
    event.message &&
    (event.message.includes("dayIndex") ||
      event.message.includes("v-calendar") ||
      event.message.includes("calendar"))
  ) {
    console.warn(
      "Detected v-calendar DOM error, resetting calendar state:",
      event.message
    );
    calendarError.value = true;
    calendarReady.value = false;
    event.preventDefault();

    // Auto-reset after a brief delay
    setTimeout(() => {
      resetCalendar();
    }, 1000);
  }
});
</script>

<style scoped>
/* Full viewport styles - override all width constraints */
.v-application {
  min-height: 100vh !important;
  width: 100vw !important;
  max-width: none !important;
}

.v-main {
  min-height: 100vh !important;
  width: 100% !important;
  max-width: none !important;
}

/* Override Vuetify container constraints */
.v-container {
  max-width: none !important;
  width: 100% !important;
}

.calendar-container {
  overflow-x: auto;
  min-height: 400px;
  height: auto;
  flex: 1 1 auto;
  display: flex;
  align-items: center;
  justify-content: center;
  width: fit-content;
  max-width: 100%;
  margin: 0 auto;
}

/* Make v-calendar responsive and fit content size */
.custom-calendar {
  width: auto !important;
  max-width: 100% !important;
  height: auto !important;
  flex-shrink: 0;
}

:deep(.vc-container) {
  width: auto !important;
  max-width: 100% !important;
  font-size: 1.125rem;
  height: auto !important;
  min-height: auto !important;
}

:deep(.vc-pane-container) {
  width: auto !important;
  max-width: 100% !important;
}

:deep(.vc-pane-layout) {
  flex-wrap: wrap !important;
  justify-content: center !important;
  width: auto !important;
  max-width: 100% !important;
}

:deep(.vc-pane) {
  min-width: 500px !important;
  max-width: 750px !important;
  flex: 0 0 auto !important;
  margin: 0.25rem !important;
}

/* Calendar navigation and header */
:deep(.vc-nav-container) {
  width: 100% !important;
}

:deep(.vc-title) {
  font-size: 1.5rem !important;
  font-weight: 600;
}

/* Calendar day cells */
:deep(.vc-day) {
  min-height: 56px !important;
  cursor: pointer;
  border-radius: 4px;
  transition: all 0.2s ease;
}

:deep(.vc-day:hover) {
  background-color: rgba(255, 255, 255, 0.1) !important;
}

:deep(.vc-day-content) {
  width: 100% !important;
  height: 100% !important;
  display: flex !important;
  align-items: center !important;
  justify-content: center !important;
  border-radius: 4px;
  transition: all 0.2s ease;
}

:deep(.vc-highlights) {
  pointer-events: none;
}

/* User available dates styling */
:deep(.user-available-date .vc-day-content) {
  font-weight: 600 !important;
  color: white !important;
}

/* Enhanced responsive adjustments */
@media (max-width: 1200px) {
  :deep(.vc-pane) {
    min-width: 450px !important;
    max-width: 650px !important;
  }
}

@media (max-width: 960px) {
  :deep(.vc-pane) {
    min-width: 400px !important;
    max-width: 550px !important;
  }

  :deep(.vc-day) {
    min-height: 50px !important;
  }

  :deep(.vc-day-content) {
    font-size: 1rem !important;
  }

  :deep(.vc-weekday) {
    font-size: 0.9rem !important;
  }

  .calendar-container {
    min-height: 380px;
  }
}

@media (max-width: 600px) {
  :deep(.vc-pane) {
    min-width: 350px !important;
    max-width: 480px !important;
  }

  :deep(.vc-container) {
    font-size: 1rem !important;
  }

  :deep(.vc-day) {
    min-height: 45px !important;
  }

  .calendar-container {
    min-height: 330px;
  }
}

/* Ensure user selection buttons don't overflow */
.v-btn.text-left {
  max-width: 100%;
  text-overflow: ellipsis;
  white-space: nowrap;
}

/* Full height cards */
.v-card {
  height: 100%;
}

/* Availability item styling */
.availability-item {
  padding: 12px;
  border-radius: 8px;
  background-color: rgba(var(--v-theme-surface-variant), 0.1);
  border: 1px solid rgba(var(--v-theme-outline), 0.2);
}

.date-chip {
  min-width: 120px;
  font-weight: 600;
}

/* Responsive padding */
@media (max-width: 600px) {
  .v-container {
    padding: 8px !important;
  }
  
  .availability-item {
    padding: 8px;
  }
  
  .date-chip {
    min-width: 100px;
  }
}
</style>
