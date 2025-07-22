import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import vuetify from "./plugins/vuetify";
import "@mdi/font/css/materialdesignicons.css"; // Import MDI icon font
import { Calendar } from "v-calendar";
import "v-calendar/style.css";

// Cross-browser compatibility fixes
console.log("🌐 Initializing browser compatibility fixes...");

// Ensure Array methods are available (polyfills for older browsers)
if (!Array.prototype.find) {
  console.log("📦 Adding Array.find polyfill");
  Array.prototype.find = function (predicate) {
    for (let i = 0; i < this.length; i++) {
      if (predicate(this[i], i, this)) {
        return this[i];
      }
    }
    return undefined;
  };
}

if (!Array.prototype.every) {
  console.log("📦 Adding Array.every polyfill");
  Array.prototype.every = function (callback) {
    for (let i = 0; i < this.length; i++) {
      if (!callback(this[i], i, this)) {
        return false;
      }
    }
    return true;
  };
}

if (!Array.prototype.some) {
  console.log("📦 Adding Array.some polyfill");
  Array.prototype.some = function (callback) {
    for (let i = 0; i < this.length; i++) {
      if (callback(this[i], i, this)) {
        return true;
      }
    }
    return false;
  };
}

// Log browser info for debugging
console.log("🔍 Browser Info:", {
  userAgent: navigator.userAgent,
  vendor: navigator.vendor,
  platform: navigator.platform,
  language: navigator.language,
});

const app = createApp(App);

app.use(vuetify);

// Register v-calendar v3 Calendar component manually to avoid conflicts
app.component("VCalendar", Calendar);

app.mount("#app");

// Note: Service Worker registration is handled automatically by VitePWA plugin
