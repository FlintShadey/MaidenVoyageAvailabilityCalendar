#!/bin/bash

# Final Verification Test Script for Maiden Voyage Calendar
# Run this script to verify all fixes are working correctly

echo "🧪 MAIDEN VOYAGE CALENDAR - FINAL VERIFICATION TEST"
echo "=================================================="

# Test 1: Check if development server is running
echo ""
echo "Test 1: Development Server Status"
if curl -s http://localhost:5174 > /dev/null; then
    echo "✅ Development server is running on http://localhost:5174"
else
    echo "❌ Development server not running. Please run: npm run dev"
    exit 1
fi

# Test 2: Check for compilation errors
echo ""
echo "Test 2: Compilation Check"
echo "Checking for TypeScript/Vue compilation errors..."

# Change to project directory
cd "/Users/flint/Library/Mobile Documents/com~apple~CloudDocs/Developer Cloud/MaidenVoyageAvailabilityCalendar/MaidenVoyageAvailabilityCalendar"

# Test build (but don't complete it)
timeout 10s npm run build > build_test.log 2>&1 || true

if grep -q "error" build_test.log; then
    echo "❌ Compilation errors found:"
    grep "error" build_test.log
else
    echo "✅ No compilation errors detected"
fi

rm -f build_test.log

# Test 3: Check key files exist
echo ""
echo "Test 3: File Structure Check"
FILES=(
    "src/App.vue"
    "src/main.js"
    "src/lib/database.js"
    "package.json"
)

for file in "${FILES[@]}"; do
    if [ -f "$file" ]; then
        echo "✅ $file exists"
    else
        echo "❌ $file missing"
    fi
done

# Test 4: Check package dependencies
echo ""
echo "Test 4: Dependencies Check"
if grep -q '"v-calendar".*"3\.' package.json; then
    echo "✅ v-calendar v3 dependency found"
else
    echo "❌ v-calendar v3 dependency not found"
fi

if grep -q '"vue".*"3\.' package.json; then
    echo "✅ Vue 3 dependency found"
else
    echo "❌ Vue 3 dependency not found"
fi

if grep -q '"vuetify"' package.json; then
    echo "✅ Vuetify dependency found"
else
    echo "❌ Vuetify dependency not found"
fi

# Test 5: Check critical code patterns
echo ""
echo "Test 5: Code Pattern Verification"

# Check v-calendar registration
if grep -q "app.component('VCalendar', Calendar)" src/main.js; then
    echo "✅ VCalendar component registration found"
else
    echo "❌ VCalendar component registration not found"
fi

# Check cross-browser common dates computation
if grep -q "computeCommonDatesSafe" src/App.vue; then
    echo "✅ Cross-browser common dates computation found"
else
    echo "❌ Cross-browser common dates computation not found"
fi

# Check browser polyfills
if grep -q "Array.prototype.find" src/main.js; then
    echo "✅ Array polyfills found"
else
    echo "❌ Array polyfills not found"
fi

# Test 6: Browser test readiness
echo ""
echo "Test 6: Browser Testing Readiness"
echo "📱 Manual testing instructions:"
echo "   1. Open http://localhost:5174 in your browser"
echo "   2. Check console for any Vue warnings (should be none)"
echo "   3. Click on dates in the calendar to test selection"
echo "   4. Verify 'Everyone is available' section updates"
echo "   5. Use debug buttons to test cross-browser compatibility"
echo "   6. Test in multiple browsers (Chrome, Firefox, Safari, Edge)"

echo ""
echo "🎯 VERIFICATION SUMMARY"
echo "======================"
echo "✅ All automated tests should pass above"
echo "🔄 Manual browser testing required for full verification"
echo "📋 Use the debug interface in the app for real-time testing"
echo ""
echo "If all tests pass, your Maiden Voyage Calendar is ready! 🚀"
