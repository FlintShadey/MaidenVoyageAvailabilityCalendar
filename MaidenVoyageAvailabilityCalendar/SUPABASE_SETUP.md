# Supabase Database Setup Instructions

## 1. Create a Supabase Project

1. Go to [https://supabase.com](https://supabase.com)
2. Sign up or log in to your account
3. Click "New Project"
4. Choose your organization
5. Fill in project details:
   - Name: "maiden-voyage-calendar" (or any name you prefer)
   - Database Password: Create a strong password
   - Region: Choose the region closest to your users
6. Click "Create new project"

## 2. Get Your Project Credentials

1. Go to your project dashboard
2. Click on "Settings" in the left sidebar
3. Click on "API" under Settings
4. Copy the following values:
   - **Project URL** (under "Project URL")
   - **Public anon key** (under "Project API keys" - the `anon` `public` key)

## 3. Update Environment Variables

1. Open the `.env` file in your project root
2. Replace the placeholder values with your actual Supabase credentials:

```env
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here
```

## 4. Create the Database Table

1. In your Supabase dashboard, go to "SQL Editor" in the left sidebar
2. Click "New query"
3. Copy and paste the following SQL:

```sql
-- Create the user_availability table
CREATE TABLE user_availability (
  id SERIAL PRIMARY KEY,
  user_name VARCHAR(50) NOT NULL,
  selected_date DATE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_name, selected_date)
);

-- Enable Row Level Security (RLS)
ALTER TABLE user_availability ENABLE ROW LEVEL SECURITY;

-- Create a policy that allows all operations
-- Note: In production, you might want more restrictive policies
CREATE POLICY "Allow all operations for user_availability" ON user_availability
FOR ALL USING (true);

-- Create indexes for better performance
CREATE INDEX idx_user_availability_user_date ON user_availability(user_name, selected_date);
CREATE INDEX idx_user_availability_date ON user_availability(selected_date);

-- Enable real-time subscriptions for this table
ALTER PUBLICATION supabase_realtime ADD TABLE user_availability;
```

4. Click "RUN" to execute the SQL

## 5. Test the Connection

1. Start your development server: `npm run dev`
2. Open the application in your browser
3. The calendar should load user availability from the database
4. Try selecting dates for different users
5. Click "Submit to Database" to save changes
6. Open another browser tab/window to test real-time updates

## 6. Verify Real-time Updates

1. Open the app in two different browser tabs
2. Select a user in the first tab and choose some dates
3. Switch to the second tab and select the same user
4. You should see the dates automatically appear in real-time

## Database Schema

The `user_availability` table structure:

| Column          | Type        | Description                                              |
| --------------- | ----------- | -------------------------------------------------------- |
| `id`            | SERIAL      | Primary key                                              |
| `user_name`     | VARCHAR(50) | User name (Jessica, Flint, Josh & Karen, Jeff & Mafalda) |
| `selected_date` | DATE        | Available date in YYYY-MM-DD format                      |
| `created_at`    | TIMESTAMP   | When the record was created                              |
| `updated_at`    | TIMESTAMP   | When the record was last modified                        |

## Troubleshooting

### Connection Issues

- Verify your `.env` file has the correct credentials
- Make sure you're using the public anon key, not the service role key
- Check that your Supabase project is active

### Real-time Not Working

- Ensure you ran the `ALTER PUBLICATION` command to enable real-time
- Check the browser console for connection errors
- Verify your Supabase project has real-time enabled

### Date Issues

- All dates are stored in UTC format as YYYY-MM-DD
- The app automatically converts between Date objects and ISO strings

## Security Notes

The current setup uses a permissive RLS policy for simplicity. In a production environment, you should:

1. Implement proper authentication
2. Create more restrictive RLS policies
3. Use environment-specific credentials
4. Consider rate limiting for database operations
