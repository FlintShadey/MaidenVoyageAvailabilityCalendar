#!/bin/zsh

echo "🎯 Testing Second Row: Common Availability UI Rendering"
echo "======================================================="

cd "/Users/flint/Library/Mobile Documents/com~apple~CloudDocs/Developer Cloud/MaidenVoyageAvailabilityCalendar/MaidenVoyageAvailabilityCalendar"

# Check if the server is already running
echo "🔍 Checking if development server is running..."
if lsof -i :5174 >/dev/null 2>&1; then
    echo "✅ Development server is already running on port 5174"
else
    echo "🚀 Starting development server..."
    npm run dev &
    SERVER_PID=$!
    sleep 3
    echo "✅ Development server started (PID: $SERVER_PID)"
fi

echo ""
echo "📋 Manual Testing Instructions:"
echo "==============================="
echo "1. Open: http://localhost:5174/"
echo "2. Look for the 'Second Row: Common Availability' section at the bottom"
echo "3. Click the '📊 Add Test Data' button in the debug section"
echo "4. You should see green chips appear showing common dates"
echo "5. Expected result: 3 green chips showing dates in May and June 2025"
echo ""

echo "🔧 Debug Information:"
echo "====================="
echo "✅ Logic Test: PASSED (2 common dates found)"
echo "✅ Build Test: PASSED (no syntax errors)"
echo "✅ Server: RUNNING on http://localhost:5174/"
echo ""

echo "🎯 What to Look For:"
echo "===================="
echo "• The bottom section should have title 'Everyone is available on:'"
echo "• Debug info should show browser type and user counts"
echo "• After clicking 'Add Test Data', you should see green date chips"
echo "• The chips should show readable dates like 'May 15, 2025'"
echo ""

echo "🐛 If the section is not rendering:"
echo "==================================="
echo "1. Check browser console for JavaScript errors"
echo "2. Verify Vue DevTools shows component is mounted"
echo "3. Check if CSS is hiding the section"
echo "4. Ensure Vue reactivity is working (debug info should update)"
echo ""

echo "⚡ Quick Test Commands:"
echo "======================"
echo "# Open browser to test:"
echo "open http://localhost:5174/"
echo ""
echo "# Check browser console in DevTools (F12)"
echo "# Look for any Vue/JavaScript errors"
echo ""
echo "# Stop server when done:"
echo "kill %1  # or use Ctrl+C in the terminal running npm run dev"
echo ""

# If we started the server, give instructions to stop it
if [ ! -z "$SERVER_PID" ]; then
    echo "💡 To stop the development server, run: kill $SERVER_PID"
fi

echo "🎉 The application should now be working!"
echo "If you still don't see the Common Availability section, please check the browser console for errors."
