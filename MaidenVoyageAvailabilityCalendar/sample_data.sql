-- Sample test data for Maiden Voyage Availability Calendar
-- Run this SQL in your Supabase SQL Editor to populate some demo data

-- Clear existing data (optional)
DELETE FROM user_availability;

-- Insert sample availability data
-- Jessica's availability (weekends in May and some June dates)
INSERT INTO user_availability (user_name, selected_date) VALUES
('Jessica', '2025-05-03'),  -- Saturday
('Jessica', '2025-05-04'),  -- Sunday
('Jessica', '2025-05-10'),  -- Saturday
('Jessica', '2025-05-11'),  -- Sunday
('Jessica', '2025-05-17'),  -- Saturday
('Jessica', '2025-05-18'),  -- Sunday
('Jessica', '2025-05-24'),  -- Saturday
('Jessica', '2025-05-25'),  -- Sunday
('Jessica', '2025-05-31'),  -- Saturday
('Jessica', '2025-06-01'),  -- Sunday
('Jessica', '2025-06-07'),  -- Saturday
('Jessica', '2025-06-08'),  -- Sunday
('Jessica', '2025-06-14'),  -- Saturday
('Jessica', '2025-06-15');  -- Sunday

-- Flint's availability (mid-week dates and some overlaps with Jessica)
INSERT INTO user_availability (user_name, selected_date) VALUES
('Flint', '2025-05-06'),   -- Tuesday
('Flint', '2025-05-07'),   -- Wednesday
('Flint', '2025-05-08'),   -- Thursday
('Flint', '2025-05-10'),   -- Saturday (overlap with Jessica)
('Flint', '2025-05-11'),   -- Sunday (overlap with Jessica)
('Flint', '2025-05-13'),   -- Tuesday
('Flint', '2025-05-14'),   -- Wednesday
('Flint', '2025-05-15'),   -- Thursday
('Flint', '2025-05-20'),   -- Tuesday
('Flint', '2025-05-21'),   -- Wednesday
('Flint', '2025-05-22'),   -- Thursday
('Flint', '2025-06-03'),   -- Tuesday
('Flint', '2025-06-04'),   -- Wednesday
('Flint', '2025-06-05'),   -- Thursday
('Flint', '2025-06-07'),   -- Saturday (overlap with Jessica)
('Flint', '2025-06-08');   -- Sunday (overlap with Jessica)

-- Josh & Karen's availability (some long weekends)
INSERT INTO user_availability (user_name, selected_date) VALUES
('Josh & Karen', '2025-05-10'),  -- Saturday (overlap)
('Josh & Karen', '2025-05-11'),  -- Sunday (overlap)
('Josh & Karen', '2025-05-12'),  -- Monday
('Josh & Karen', '2025-05-23'),  -- Friday
('Josh & Karen', '2025-05-24'),  -- Saturday
('Josh & Karen', '2025-05-25'),  -- Sunday
('Josh & Karen', '2025-05-26'),  -- Monday
('Josh & Karen', '2025-06-06'),  -- Friday
('Josh & Karen', '2025-06-07'),  -- Saturday (overlap)
('Josh & Karen', '2025-06-08'),  -- Sunday (overlap)
('Josh & Karen', '2025-06-09'),  -- Monday
('Josh & Karen', '2025-06-20'),  -- Friday
('Josh & Karen', '2025-06-21'),  -- Saturday
('Josh & Karen', '2025-06-22'),  -- Sunday
('Josh & Karen', '2025-07-04'),  -- Friday
('Josh & Karen', '2025-07-05'),  -- Saturday
('Josh & Karen', '2025-07-06');  -- Sunday

-- Jeff & Mafalda's availability (scattered dates with some overlaps)
INSERT INTO user_availability (user_name, selected_date) VALUES
('Jeff & Mafalda', '2025-05-09'),   -- Friday
('Jeff & Mafalda', '2025-05-10'),   -- Saturday (overlap with all)
('Jeff & Mafalda', '2025-05-11'),   -- Sunday (overlap with all)
('Jeff & Mafalda', '2025-05-16'),   -- Friday
('Jeff & Mafalda', '2025-05-30'),   -- Friday
('Jeff & Mafalda', '2025-06-02'),   -- Monday
('Jeff & Mafalda', '2025-06-06'),   -- Friday
('Jeff & Mafalda', '2025-06-07'),   -- Saturday (overlap with all)
('Jeff & Mafalda', '2025-06-08'),   -- Sunday (overlap with all)
('Jeff & Mafalda', '2025-06-13'),   -- Friday
('Jeff & Mafalda', '2025-06-27'),   -- Friday
('Jeff & Mafalda', '2025-07-11'),   -- Friday
('Jeff & Mafalda', '2025-07-18'),   -- Friday
('Jeff & Mafalda', '2025-07-25');   -- Friday

-- The above data will create the following common availability dates:
-- - 2025-05-10 (Saturday) - All 4 users available
-- - 2025-05-11 (Sunday) - All 4 users available  
-- - 2025-06-07 (Saturday) - All 4 users available
-- - 2025-06-08 (Sunday) - All 4 users available

-- Verify the data was inserted
SELECT 
    user_name,
    COUNT(*) as total_dates,
    MIN(selected_date) as first_date,
    MAX(selected_date) as last_date
FROM user_availability 
GROUP BY user_name 
ORDER BY user_name;

-- Show common dates (dates where all 4 users are available)
SELECT 
    selected_date,
    COUNT(DISTINCT user_name) as user_count,
    STRING_AGG(user_name, ', ' ORDER BY user_name) as users
FROM user_availability 
GROUP BY selected_date 
HAVING COUNT(DISTINCT user_name) = 4
ORDER BY selected_date;
