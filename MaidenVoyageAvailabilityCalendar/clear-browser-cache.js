/**
 * Browser Cache Clear Script
 * 
 * Run this in your browser console (F12 → Console tab) to force clear all cached data
 * Copy and paste this entire script and press Enter
 */

console.log('🧹 Clearing all browser storage...');

// Clear localStorage
if (localStorage) {
  const itemCount = localStorage.length;
  localStorage.clear();
  console.log(`✅ Cleared ${itemCount} items from localStorage`);
}

// Clear sessionStorage
if (sessionStorage) {
  const itemCount = sessionStorage.length;
  sessionStorage.clear();
  console.log(`✅ Cleared ${itemCount} items from sessionStorage`);
}

// Clear IndexedDB
if (window.indexedDB) {
  indexedDB.databases().then(databases => {
    databases.forEach(db => {
      console.log(`🗑️  Deleting IndexedDB: ${db.name}`);
      indexedDB.deleteDatabase(db.name);
    });
  });
}

// Clear Service Worker caches
if ('caches' in window) {
  caches.keys().then(cacheNames => {
    cacheNames.forEach(cacheName => {
      console.log(`🗑️  Deleting cache: ${cacheName}`);
      caches.delete(cacheName);
    });
  });
}

// Unregister service workers
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.getRegistrations().then(registrations => {
    registrations.forEach(registration => {
      console.log('🗑️  Unregistering service worker');
      registration.unregister();
    });
  });
}

console.log('\n✅ All storage cleared!');
console.log('🔄 Now reload the page: Cmd+R (Mac) or Ctrl+R (Windows)');
console.log('\n📋 You should now see:');
console.log('   - Flint & Maryam (blue)');
console.log('   - Bryan & Marlene (green)');
console.log('   - Leslie & Manny (orange)');
console.log('   - Molly & Hubby (purple)');
