/*
  # Fix All RLS Policies for Dashboard Access

  1. Security Changes
    - Drop existing restrictive policies
    - Create comprehensive policies for authenticated users
    - Allow full CRUD operations for admin dashboard
    - Maintain public read access where appropriate

  2. Tables Updated
    - blog_posts: Full access for authenticated users
    - pages: Full access for authenticated users  
    - site_settings: Full access for authenticated users
    - media_files: Full access for authenticated users
    - content_sections: Full access for authenticated users
    - chatbot_responses: Full access for authenticated users
    - contact_messages: Full access for authenticated users
*/

-- Drop existing policies that might be too restrictive
DROP POLICY IF EXISTS "Authenticated users can manage blog posts" ON blog_posts;
DROP POLICY IF EXISTS "Public can read published blog posts" ON blog_posts;
DROP POLICY IF EXISTS "Allow anon insert blog posts" ON blog_posts;

DROP POLICY IF EXISTS "Authenticated users can manage pages" ON pages;
DROP POLICY IF EXISTS "Public can read published pages" ON pages;

DROP POLICY IF EXISTS "Authenticated users can manage site settings" ON site_settings;
DROP POLICY IF EXISTS "Public can read public site settings" ON site_settings;
DROP POLICY IF EXISTS "Allow anon insert site settings" ON site_settings;
DROP POLICY IF EXISTS "Allow anon update site settings" ON site_settings;

DROP POLICY IF EXISTS "Authenticated users can manage media files" ON media_files;
DROP POLICY IF EXISTS "Allow anon insert media files" ON media_files;

DROP POLICY IF EXISTS "Authenticated users can manage content sections" ON content_sections;
DROP POLICY IF EXISTS "Public can read active content sections" ON content_sections;

DROP POLICY IF EXISTS "Authenticated users can manage chatbot responses" ON chatbot_responses;
DROP POLICY IF EXISTS "Public can read active chatbot responses" ON chatbot_responses;

DROP POLICY IF EXISTS "Authenticated users can manage contact messages" ON contact_messages;
DROP POLICY IF EXISTS "Anyone can insert contact messages" ON contact_messages;

-- Create comprehensive policies for blog_posts
CREATE POLICY "Full access for authenticated users" ON blog_posts
  FOR ALL TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Public read published posts" ON blog_posts
  FOR SELECT TO anon
  USING (status = 'published');

-- Create comprehensive policies for pages
CREATE POLICY "Full access for authenticated users" ON pages
  FOR ALL TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Public read published pages" ON pages
  FOR SELECT TO anon
  USING (status = 'published');

-- Create comprehensive policies for site_settings
CREATE POLICY "Full access for authenticated users" ON site_settings
  FOR ALL TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Public read public settings" ON site_settings
  FOR SELECT TO anon
  USING (is_public = true);

-- Create comprehensive policies for media_files
CREATE POLICY "Full access for authenticated users" ON media_files
  FOR ALL TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Public read media files" ON media_files
  FOR SELECT TO anon
  USING (true);

-- Create comprehensive policies for content_sections
CREATE POLICY "Full access for authenticated users" ON content_sections
  FOR ALL TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Public read active sections" ON content_sections
  FOR SELECT TO anon
  USING (is_active = true);

-- Create comprehensive policies for chatbot_responses
CREATE POLICY "Full access for authenticated users" ON chatbot_responses
  FOR ALL TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Public read active responses" ON chatbot_responses
  FOR SELECT TO anon
  USING (is_active = true);

-- Create comprehensive policies for contact_messages
CREATE POLICY "Full access for authenticated users" ON contact_messages
  FOR ALL TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Anyone can insert messages" ON contact_messages
  FOR INSERT TO anon, authenticated
  WITH CHECK (true);

-- Ensure all tables have RLS enabled
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE pages ENABLE ROW LEVEL SECURITY;
ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE media_files ENABLE ROW LEVEL SECURITY;
ALTER TABLE content_sections ENABLE ROW LEVEL SECURITY;
ALTER TABLE chatbot_responses ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;

-- Grant necessary permissions to authenticated role
GRANT ALL ON blog_posts TO authenticated;
GRANT ALL ON pages TO authenticated;
GRANT ALL ON site_settings TO authenticated;
GRANT ALL ON media_files TO authenticated;
GRANT ALL ON content_sections TO authenticated;
GRANT ALL ON chatbot_responses TO authenticated;
GRANT ALL ON contact_messages TO authenticated;

-- Grant select permissions to anon role for public data
GRANT SELECT ON blog_posts TO anon;
GRANT SELECT ON pages TO anon;
GRANT SELECT ON site_settings TO anon;
GRANT SELECT ON media_files TO anon;
GRANT SELECT ON content_sections TO anon;
GRANT SELECT ON chatbot_responses TO anon;
GRANT INSERT ON contact_messages TO anon;