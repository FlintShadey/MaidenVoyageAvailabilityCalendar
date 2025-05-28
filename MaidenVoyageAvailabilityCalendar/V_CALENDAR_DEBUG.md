# V-Calendar Debug Guide

This guide helps troubleshoot and debug v-calendar issues in the Maiden Voyage Availability Calendar.

## Common V-Calendar Issues

### 1. `dayIndex` Errors

**Symptoms:**

```
TypeError: Cannot read properties of undefined (reading 'dayIndex')
```

**Causes:**

- Rapid reactive data changes
- Invalid date objects in attributes
- Stale component state during updates
- Memory leaks in event handlers

**Solutions Implemented:**

- ✅ Calendar key rotation for forced re-renders
- ✅ Debounced updates (100ms delay)
- ✅ Enhanced date validation
- ✅ Global error handlers with auto-recovery

### 2. Calendar Not Updating

**Symptoms:**

- Calendar shows old data after user switch
- Dates don't highlight properly
- Inconsistent state between users

**Solutions Implemented:**

- ✅ Watch-based user switching
- ✅ Force re-render on user change
- ✅ Safe attribute computation
- ✅ Array validation in computed properties

### 3. Performance Issues

**Symptoms:**

- Slow calendar rendering
- Memory leaks over time
- Browser freezing during updates

**Solutions Implemented:**

- ✅ Cleanup timers on unmount
- ✅ Debounced calendar updates
- ✅ Efficient date filtering
- ✅ Proper subscription management

## Debugging Steps

### 1. Check Console Errors

Open browser DevTools and look for:

- `dayIndex` errors
- Date parsing warnings
- Calendar attribute errors
- Supabase connection issues

### 2. Verify Data Integrity

Run in browser console:

```javascript
// Check user data structure
console.log("Users:", window.$app?.users?.value);

// Check calendar state
console.log("Calendar Ready:", window.$app?.calendarReady?.value);
console.log("Calendar Error:", window.$app?.calendarError?.value);

// Check dates
const user = window.$app?.users?.value?.find((u) => u.name === "Jessica");
console.log("Jessica dates:", user?.availableDates);
```

### 3. Test Calendar Reset

If calendar is misbehaving:

1. Click the "Reset Calendar" button in error state
2. Or run in console: `window.$app?.resetCalendar()`
3. Check if error clears and calendar re-renders

### 4. Monitor Network Requests

Check DevTools Network tab for:

- Supabase API calls
- Real-time subscription events
- Failed database operations

## Error Recovery Features

### Automatic Recovery

The app includes several automatic recovery mechanisms:

1. **Global Error Handler**

   - Catches unhandled v-calendar errors
   - Automatically resets calendar state
   - Prevents app crashes

2. **Calendar Error State**

   - Shows fallback UI when calendar fails
   - Provides manual reset option
   - Preserves user data

3. **Debounced Updates**
   - Prevents rapid state changes
   - Reduces error likelihood
   - Improves performance

### Manual Recovery

If automatic recovery fails:

1. **Refresh Page**: Simple but effective
2. **Reset Calendar**: Use the reset button
3. **Clear Browser Cache**: For persistent issues
4. **Check Environment**: Verify Supabase configuration

## Configuration Checks

### Environment Variables

Verify `.env` file:

```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
```

### Database Schema

Verify table structure in Supabase:

```sql
CREATE TABLE user_availability (
  id SERIAL PRIMARY KEY,
  user_name TEXT NOT NULL,
  selected_date DATE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_name, selected_date)
);
```

### Real-time Subscriptions

Check if real-time is enabled:

1. Go to Supabase Dashboard
2. Navigate to Database > Replication
3. Ensure `user_availability` table is enabled

## Testing Calendar Stability

Use the test script to verify fixes:

```bash
# In project root
node test-calendar.js
```

Or run in browser console:

```javascript
// Test rapid user switching
for (let i = 0; i < 10; i++) {
  setTimeout(() => {
    const users = ["Jessica", "Flint", "Josh & Karen", "Jeff & Mafalda"];
    window.$app.selectedUser.value = users[i % users.length];
  }, i * 100);
}
```

## Performance Monitoring

### Key Metrics to Watch

1. **Calendar Render Time**: Should be < 100ms
2. **Memory Usage**: Should not increase over time
3. **Error Frequency**: Should be near zero
4. **Database Response**: Should be < 500ms

### Monitoring Tools

- Browser DevTools Performance tab
- Vue DevTools for component state
- Network tab for API calls
- Console for error tracking

## Known Limitations

1. **V-Calendar Version**: Using v3 which has some stability issues
2. **Date Range**: Limited to May-July 2025 to prevent edge cases
3. **User Count**: Optimized for 4 users (can handle more)
4. **Browser Support**: Modern browsers only (ES6+ required)

## Support and Issues

If you encounter issues not covered here:

1. Check the browser console for specific error messages
2. Verify Supabase configuration and connectivity
3. Test in incognito mode to rule out cache issues
4. Try the manual reset procedures listed above
5. Check network connectivity and Supabase status

## Future Improvements

Potential upgrades for even better stability:

1. **Alternative Calendar Library**: Consider switching to a more stable calendar
2. **Virtual Scrolling**: For handling larger date ranges
3. **Caching Layer**: To reduce database calls
4. **Offline Support**: For better reliability
5. **Error Analytics**: To track and prevent issues
