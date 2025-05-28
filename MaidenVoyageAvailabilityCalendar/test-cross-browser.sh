#!/bin/bash

# Cross-Browser Test Script for Maiden Voyage Availability Calendar
# This script helps verify that the cross-browser compatibility fix is working

echo "🌐 Cross-Browser Compatibility Test"
echo "=================================="
echo ""

# Check if the development server is running
if ! curl -s http://localhost:5181 > /dev/null; then
    echo "❌ Development server not running on localhost:5181"
    echo "   Please run: npm run dev"
    exit 1
fi

echo "✅ Development server is running"
echo ""

# Function to test browser compatibility
test_browser() {
    local browser_name="$1"
    local browser_command="$2"
    
    echo "🔍 Testing $browser_name..."
    
    if command -v "$browser_command" &> /dev/null; then
        echo "   ✅ $browser_name is available"
        echo "   📝 Manual test required:"
        echo "      1. Open http://localhost:5181 in $browser_name"
        echo "      2. Click 'Add Test Data' button"
        echo "      3. Verify common dates appear (should show 3 dates)"
        echo "      4. Check browser console for any errors"
        echo ""
    else
        echo "   ⚠️  $browser_name not found on system"
        echo ""
    fi
}

# Test available browsers
echo "🧪 Browser Availability Check:"
echo ""

test_browser "Chrome" "google-chrome"
test_browser "Chrome" "chrome"
test_browser "Firefox" "firefox"
test_browser "Safari" "safari"
test_browser "Edge" "microsoft-edge"

echo "📋 Automated Test Steps:"
echo "1. Open the application in each available browser"
echo "2. Open browser console (F12 or Cmd+Option+I)"
echo "3. Run: testCommonDates()"
echo "4. Look for test results in console"
echo ""

echo "🎯 Expected Results:"
echo "- All browsers should show the same common dates"
echo "- No JavaScript errors in console"
echo "- Debug panel should show correct counts"
echo "- Common dates should update when adding/removing dates"
echo ""

echo "📊 Debug Features Available:"
echo "- Debug panel with browser detection"
echo "- Test buttons for adding/clearing data"
echo "- Console logging for computation steps"
echo "- Manual refresh button for common dates"
echo ""

echo "🔧 If Issues Found:"
echo "1. Check browser console for errors"
echo "2. Try the 'Refresh' button in the common dates section"
echo "3. Use 'Add Test Data' to verify functionality"
echo "4. Check that all users have dates selected"
echo ""

echo "📖 Documentation:"
echo "- See CROSS_BROWSER_FIX.md for detailed fix information"
echo "- See V_CALENDAR_DEBUG.md for v-calendar specific issues"
echo "- See browser-compatibility-test.js for manual testing"
echo ""

echo "✅ Test script complete!"
echo "   Please manually test in each available browser."
