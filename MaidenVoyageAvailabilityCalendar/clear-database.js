/**
 * Clear All Database Records
 * 
 * This script will delete ALL user availability records from the database.
 * Use this when you want to start fresh with new users.
 * 
 * ⚠️ WARNING: This cannot be undone!
 */

import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

// Load environment variables
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
dotenv.config({ path: join(__dirname, '.env') });

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY;

async function clearAllData() {
  console.log("⚠️  WARNING: This will delete ALL availability data from the database!");
  console.log("⚠️  This action cannot be undone!");
  console.log("");
  
  if (!supabaseUrl || !supabaseKey) {
    console.error("❌ Database configuration not found in .env file.");
    console.log("See SUPABASE_SETUP.md for configuration instructions.");
    return;
  }

  const supabase = createClient(supabaseUrl, supabaseKey);

  try {
    // Get all existing data
    const { data: allData, error: fetchError } = await supabase
      .from('user_availability')
      .select('*');
    
    if (fetchError) throw fetchError;
    
    console.log(`📊 Found ${allData.length} records in database`);
    
    if (allData.length === 0) {
      console.log("✅ Database is already empty!");
      return;
    }

    console.log("\n🗑️  Deleting all records...");

    let deletedCount = 0;

    // Group by user name
    const userRecords = {};
    allData.forEach(record => {
      if (!userRecords[record.user_name]) {
        userRecords[record.user_name] = [];
      }
      userRecords[record.user_name].push(record.selected_date);
    });

    // Delete all records for each user
    for (const [userName, dates] of Object.entries(userRecords)) {
      console.log(`  Deleting ${dates.length} records for user: ${userName}`);
      
      for (const date of dates) {
        const { error: deleteError } = await supabase
          .from('user_availability')
          .delete()
          .eq('user_name', userName)
          .eq('selected_date', date);
        
        if (deleteError) throw deleteError;
        deletedCount++;
      }
    }

    console.log("\n✅ All data cleared!");
    console.log(`   Deleted: ${deletedCount} records`);
    console.log("\n🔄 Refresh your browser - you'll see a clean slate!");
    console.log("\n📝 Your users from config.js are ready to use:");
    console.log("   - Flint & Maryam (blue)");
    console.log("   - Bryan & Marlene (green)");
    console.log("   - Leslie & Manny (orange)");
    console.log("   - Molly & Hubby (purple)");

  } catch (error) {
    console.error("❌ Clear operation failed:", error);
  }
}

// Run clear operation
clearAllData();
