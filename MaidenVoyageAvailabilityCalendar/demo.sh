#!/bin/bash

# Maiden Voyage Availability Calendar - Demo Setup Script
# This script helps set up sample data for demonstrating the application

echo "🚢 Maiden Voyage Availability Calendar Demo Setup"
echo "================================================="
echo ""

# Check if .env file exists
if [ ! -f ".env" ]; then
    echo "⚠️  No .env file found!"
    echo "The app will run in DEMO MODE (data won't persist)."
    echo ""
    echo "To enable database persistence:"
    echo "1. Create a .env file with your Supabase credentials:"
    echo "   VITE_SUPABASE_URL=https://your-project-id.supabase.co"
    echo "   VITE_SUPABASE_ANON_KEY=your-anon-key-here"
    echo ""
    echo "2. See SUPABASE_SETUP.md for detailed instructions."
    echo ""
    echo "Press Enter to continue in demo mode, or Ctrl+C to exit and set up Supabase first..."
    read -r
fi

if [ -f ".env" ]; then
    echo "✅ Environment file found - database mode enabled"
else
    echo "🎭 Running in demo mode - data will not persist"
fi

# Check if node_modules exists
if [ ! -d "node_modules" ]; then
    echo "📦 Installing dependencies..."
    npm install
else
    echo "✅ Dependencies already installed"
fi

echo ""
echo "🎯 Demo Features to Test:"
echo "------------------------"
echo "1. Multi-user selection (Jessica, Flint, Josh & Karen, Jeff & Mafalda)"
echo "2. Click calendar dates to select/deselect availability"
echo "3. Color-coded date highlighting for each user"
echo "4. Common availability display (dates when ALL users are available)"
echo "5. Real-time sync between browser tabs (if database enabled)"
echo "6. Submit to Database functionality"
echo ""

echo "🚀 Starting development server..."
echo "The app will open at http://localhost:5173 (or next available port)"
echo ""
echo "💡 Pro Tips:"
echo "- Open multiple browser tabs to test real-time sync (database mode only)"
echo "- Try selecting overlapping dates for different users"
echo "- Watch the 'Everyone is available on:' section update automatically"
echo "- Look for the 'Demo Mode' alert if database isn't configured"
echo ""

# Start the development server
npm run dev
