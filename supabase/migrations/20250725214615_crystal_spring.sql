/*
  # Add multilingual support to services table

  1. Changes
    - Add `title_ar` column for Arabic title
    - Add `title_en` column for English title  
    - Add `description_ar` column for Arabic description
    - Add `description_en` column for English description
    - Update existing data to populate new columns

  2. Security
    - Maintain existing RLS policies
*/

-- Add multilingual columns to services table
DO $$
BEGIN
  -- Add title_ar column if it doesn't exist
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'services' AND column_name = 'title_ar'
  ) THEN
    ALTER TABLE services ADD COLUMN title_ar text;
  END IF;

  -- Add title_en column if it doesn't exist
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'services' AND column_name = 'title_en'
  ) THEN
    ALTER TABLE services ADD COLUMN title_en text;
  END IF;

  -- Add description_ar column if it doesn't exist
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'services' AND column_name = 'description_ar'
  ) THEN
    ALTER TABLE services ADD COLUMN description_ar text;
  END IF;

  -- Add description_en column if it doesn't exist
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'services' AND column_name = 'description_en'
  ) THEN
    ALTER TABLE services ADD COLUMN description_en text;
  END IF;
END $$;

-- Update existing records to populate new columns with current data
UPDATE services 
SET 
  title_ar = title,
  title_en = title,
  description_ar = description,
  description_en = description
WHERE title_ar IS NULL OR title_en IS NULL OR description_ar IS NULL OR description_en IS NULL;