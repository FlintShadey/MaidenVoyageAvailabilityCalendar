/**
 * Service Worker Unregister Script
 * 
 * Run this in your browser console to completely remove the service worker
 * This forces the browser to load fresh content
 */

console.log('🔧 Unregistering all service workers...');

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.getRegistrations().then(function(registrations) {
    if (registrations.length === 0) {
      console.log('ℹ️  No service workers found');
    }
    
    for(let registration of registrations) {
      console.log('🗑️  Unregistering:', registration.scope);
      registration.unregister().then(function(success) {
        if (success) {
          console.log('✅ Service worker unregistered successfully');
        } else {
          console.log('❌ Failed to unregister service worker');
        }
      });
    }
  });
}

// Clear all caches
if ('caches' in window) {
  caches.keys().then(function(cacheNames) {
    if (cacheNames.length === 0) {
      console.log('ℹ️  No caches found');
    }
    
    return Promise.all(
      cacheNames.map(function(cacheName) {
        console.log('🗑️  Deleting cache:', cacheName);
        return caches.delete(cacheName);
      })
    );
  }).then(function() {
    console.log('✅ All caches cleared');
  });
}

console.log('\n✅ Cleanup complete!');
console.log('🔄 Now do a HARD REFRESH: Cmd+Shift+R (Mac) or Ctrl+Shift+F5 (Windows)');
console.log('   OR just close and reopen the browser tab');
