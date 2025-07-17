/*
  # Fix RLS Policies for Anonymous Access

  1. Policy Updates
    - Allow anonymous users to read published content
    - Allow anonymous users to insert contact messages
    - Fix policies for proper public access

  2. Security
    - Maintain security while allowing necessary public operations
    - Ensure authenticated users have full access
*/

-- Update pages policies to allow anonymous read access to published pages
DROP POLICY IF EXISTS "Public can read published pages" ON pages;
CREATE POLICY "Public can read published pages"
  ON pages
  FOR SELECT
  TO anon, authenticated
  USING (status = 'published');

-- Update blog posts policies
DROP POLICY IF EXISTS "Public can read published blog posts" ON blog_posts;
CREATE POLICY "Public can read published blog posts"
  ON blog_posts
  FOR SELECT
  TO anon, authenticated
  USING (status = 'published');

-- Update content sections policies
DROP POLICY IF EXISTS "Public can read active content sections" ON content_sections;
CREATE POLICY "Public can read active content sections"
  ON content_sections
  FOR SELECT
  TO anon, authenticated
  USING (is_active = true);

-- Update site settings policies
DROP POLICY IF EXISTS "Public can read public site settings" ON site_settings;
CREATE POLICY "Public can read public site settings"
  ON site_settings
  FOR SELECT
  TO anon, authenticated
  USING (is_public = true);

-- Update chatbot responses policies
DROP POLICY IF EXISTS "Public can read active chatbot responses" ON chatbot_responses;
CREATE POLICY "Public can read active chatbot responses"
  ON chatbot_responses
  FOR SELECT
  TO anon, authenticated
  USING (is_active = true);

-- Allow anonymous users to insert contact messages
DROP POLICY IF EXISTS "Anyone can insert contact messages" ON contact_messages;
CREATE POLICY "Anyone can insert contact messages"
  ON contact_messages
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

-- Allow anonymous users to insert analytics data
DROP POLICY IF EXISTS "Anyone can insert analytics data" ON analytics_data;
CREATE POLICY "Anyone can insert analytics data"
  ON analytics_data
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);