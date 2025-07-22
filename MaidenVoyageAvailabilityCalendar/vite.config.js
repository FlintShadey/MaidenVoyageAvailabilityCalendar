import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { VitePWA } from "vite-plugin-pwa";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    VitePWA({
      registerType: "autoUpdate",
      workbox: {
        globPatterns: ["**/*.{js,css,html,ico,png,svg}"],
      },
      includeAssets: ["favicon.ico", "TriptoFredericksberg.png", "icons/*.png"],
      manifest: {
        name: "Trip to Fredericksberg Calendar",
        short_name: "Fredericksberg",
        description:
          "Collaborative calendar for tracking team availability for the trip to Fredericksberg",
        theme_color: "#1976D2",
        background_color: "#1976D2",
        display: "standalone",
        scope: "./",
        start_url: "./",
        orientation: "portrait-primary",
        categories: ["productivity", "travel", "utilities"],
        icons: [
          {
            src: "icons/icon-72x72.png",
            sizes: "72x72",
            type: "image/png",
            purpose: "any"
          },
          {
            src: "icons/icon-96x96.png",
            sizes: "96x96",
            type: "image/png",
            purpose: "any"
          },
          {
            src: "icons/icon-128x128.png",
            sizes: "128x128",
            type: "image/png",
            purpose: "any"
          },
          {
            src: "icons/icon-144x144.png",
            sizes: "144x144",
            type: "image/png",
            purpose: "any"
          },
          {
            src: "icons/icon-152x152.png",
            sizes: "152x152",
            type: "image/png",
            purpose: "any"
          },
          {
            src: "icons/icon-192x192.png",
            sizes: "192x192",
            type: "image/png",
            purpose: "any"
          },
          {
            src: "icons/icon-384x384.png",
            sizes: "384x384",
            type: "image/png",
            purpose: "any"
          },
          {
            src: "icons/icon-512x512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "any"
          },
          {
            src: "icons/icon-192x192.png",
            sizes: "192x192",
            type: "image/png",
            purpose: "maskable"
          },
          {
            src: "icons/icon-512x512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "maskable"
          }
        ],
      },
    }),
  ],
  base: "./", // Use relative paths for deployment flexibility
  build: {
    outDir: "dist",
    assetsDir: "assets",
  },
});
