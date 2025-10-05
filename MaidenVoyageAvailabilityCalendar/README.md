## Availability Calendar

Collaborative date selection app (Vue 3 + Vuetify + VCalendar + optional Supabase). Pick dates per user, instantly see shared availability, and install as a PWA.

## Core Features
- Per‑user date selection (color coded)
- Shared availability list (min users threshold configurable)
- Real-time sync (Supabase) or local demo mode fallback
- Optimistic immediate add/remove with automatic DB sync & rollback on failure
- PWA installable (mobile & desktop)
- Resilient calendar (validation + auto recovery)

## Quick Start
```bash
npm install
npm run dev
```
Optional `.env` for Supabase:
```env
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
```
Build & deploy (GitHub Pages example):
```bash
npm run build
npm run deploy
```

## Usage
1. Select a user (left panel).
2. Click dates to toggle availability.
3. Shared section lists dates meeting minimum user count (default 2).
4. Each click syncs when DB available; failures mark pending.
5. Submit button acts as fallback batch sync.

### Renaming Users (Preserve Existing Dates)
Add a `previousNames` array to the updated user in `src/config.js` so old rows migrate automatically:
```js
{ name: "Flint & Maryam", previousNames: ["Flint"], color: "blue", availableDates: [] }
```
Migration runs at startup (idempotent). Remove `previousNames` after confirmation if desired.

## Database (Optional)
Schema (`user_availability`): id, user_name, selected_date, created_at, updated_at.
Essential SQL:
```sql
CREATE TABLE IF NOT EXISTS user_availability (
    id SERIAL PRIMARY KEY,
    user_name VARCHAR(50) NOT NULL,
    selected_date DATE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(user_name, selected_date)
);
ALTER TABLE user_availability ENABLE ROW LEVEL SECURITY;
CREATE POLICY "allow all" ON user_availability FOR ALL USING (true);
ALTER PUBLICATION supabase_realtime ADD TABLE user_availability;
```

## Project Structure
```
src/
    App.vue            # Core UI & logic
    config.js          # Users, calendar range, settings, version
    lib/database.js    # DB access layer
    lib/supabase.js    # Supabase client init
    plugins/vuetify.js # Vuetify setup
```

## Configuration
`src/config.js` contains:
- users[] (name, color, previousNames, availableDates placeholder)
- calendarConfig (minDate, maxDate; initialPage derived)
- appConfig (branding, minUsersForSharedAvailability, logo)
- appVersion (bump to force PWA cache refresh)

## PWA
Install via browser (Add to Home Screen / Install App). Bump `appVersion` to force update; hard refresh if stale.

## Troubleshooting (Condensed)
| Issue | Check |
|-------|-------|
| No data loads | Supabase env vars / console demo notice |
| Missing migrated dates | Added `previousNames` correctly? |
| Blank calendar | Date range valid; minDate <= maxDate |
| No realtime | Publication includes table; network/WebSocket ok |
| Stale assets | Increment appVersion + hard refresh |

## Reliability Notes
Resilience via: key rotation, defensive validation, debounced readiness, auto reset on v-calendar errors.

## License
Internal team utility.
