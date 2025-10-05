/**
 * Database User Migration Script
 * 
 * Run this script when you change user names in config.js
 * It will update existing database records to use the new names
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

// Old user name to new user name mapping
const USER_NAME_MAPPING = {
  "Flint": "Flint & Maryam",
  "Yanni": "Bryan & Marlene",
  "Mike": "Leslie & Manny",
  "Zack": "Molly & Hubby"
};

async function migrateUserNames() {
  console.log("🔄 Starting user name migration...");
  console.log("Old → New mappings:", USER_NAME_MAPPING);
  
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

    let migratedCount = 0;
    let skippedCount = 0;

    for (const record of allData) {
      const oldName = record.user_name;
      const newName = USER_NAME_MAPPING[oldName];

      if (newName) {
        console.log(`  Migrating: "${oldName}" → "${newName}"`);
        
        // Delete old record
        const { error: deleteError } = await supabase
          .from('user_availability')
          .delete()
          .eq('user_name', oldName)
          .eq('selected_date', record.selected_date);
        
        if (deleteError) throw deleteError;
        
        // Add new record with new name
        const { error: insertError } = await supabase
          .from('user_availability')
          .insert({
            user_name: newName,
            selected_date: record.selected_date,
            updated_at: new Date().toISOString()
          });
        
        if (insertError) throw insertError;
        
        migratedCount++;
      } else {
        console.log(`  Skipping: "${oldName}" (no mapping found)`);
        skippedCount++;
      }
    }

    console.log("\n✅ Migration complete!");
    console.log(`   Migrated: ${migratedCount} records`);
    console.log(`   Skipped: ${skippedCount} records`);
    console.log("\n🔄 Refresh your browser to see the changes!");

  } catch (error) {
    console.error("❌ Migration failed:", error);
    console.log("\nIf you want to start fresh instead, run: npm run db:clear");
  }
}

// Run migration
migrateUserNames();
