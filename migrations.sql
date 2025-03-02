
-- Create pages table
CREATE TABLE IF NOT EXISTS pages (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  description TEXT,
  keywords TEXT,
  layout TEXT DEFAULT 'default',
  is_published BOOLEAN DEFAULT false,
  content_blocks JSONB DEFAULT '[]'::jsonb,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create services table
CREATE TABLE IF NOT EXISTS services (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  description TEXT,
  icon TEXT,
  image_url TEXT,
  is_featured BOOLEAN DEFAULT false,
  content JSONB,
  order_index INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create testimonials table
CREATE TABLE IF NOT EXISTS testimonials (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  client_name TEXT NOT NULL,
  client_title TEXT,
  client_company TEXT,
  client_image TEXT,
  content TEXT NOT NULL,
  rating INTEGER DEFAULT 5,
  is_featured BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create blog_posts table
CREATE TABLE IF NOT EXISTS blog_posts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  excerpt TEXT,
  featured_image TEXT,
  content_blocks JSONB DEFAULT '[]'::jsonb,
  author UUID REFERENCES auth.users(id),
  categories TEXT[],
  tags TEXT[],
  is_published BOOLEAN DEFAULT false,
  published_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create stored procedures for table initialization
CREATE OR REPLACE FUNCTION init_pages_table()
RETURNS void
LANGUAGE plpgsql
AS $$
BEGIN
  -- Create pages table if it doesn't exist
  CREATE TABLE IF NOT EXISTS pages (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    description TEXT,
    keywords TEXT,
    layout TEXT DEFAULT 'default',
    is_published BOOLEAN DEFAULT false,
    content_blocks JSONB DEFAULT '[]'::jsonb,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
  );
  
  -- Insert a sample page if the table is empty
  INSERT INTO pages (title, slug, description, keywords, layout, is_published, content_blocks)
  SELECT 
    'Welcome', 
    'welcome', 
    'Welcome to DigitalShehar', 
    'digital, marketing, website', 
    'default', 
    true, 
    '[{"id":"welcome-1","type":"heading","content":{"text":"Welcome to DigitalShehar","level":"h1"}},{"id":"welcome-2","type":"paragraph","content":{"text":"This is your first page. Edit or delete it to get started."}}]'::jsonb
  WHERE NOT EXISTS (SELECT 1 FROM pages LIMIT 1);
END;
$$;

CREATE OR REPLACE FUNCTION init_services_table()
RETURNS void
LANGUAGE plpgsql
AS $$
BEGIN
  -- Create services table if it doesn't exist
  CREATE TABLE IF NOT EXISTS services (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    description TEXT,
    icon TEXT,
    image_url TEXT,
    is_featured BOOLEAN DEFAULT false,
    content JSONB,
    order_index INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
  );
  
  -- Insert sample services if the table is empty
  INSERT INTO services (title, slug, description, icon, is_featured, order_index)
  SELECT 'Web Development', 'web-development', 'Custom website development for businesses of all sizes.', 'Code', true, 1
  WHERE NOT EXISTS (SELECT 1 FROM services LIMIT 1);
  
  INSERT INTO services (title, slug, description, icon, is_featured, order_index)
  SELECT 'Digital Marketing', 'digital-marketing', 'Grow your online presence with our digital marketing services.', 'BarChart', true, 2
  WHERE NOT EXISTS (SELECT 1 FROM services WHERE slug = 'digital-marketing');
  
  INSERT INTO services (title, slug, description, icon, is_featured, order_index)
  SELECT 'SEO Optimization', 'seo-optimization', 'Improve your search rankings and drive more traffic to your website.', 'Search', true, 3
  WHERE NOT EXISTS (SELECT 1 FROM services WHERE slug = 'seo-optimization');
END;
$$;

CREATE OR REPLACE FUNCTION init_testimonials_table()
RETURNS void
LANGUAGE plpgsql
AS $$
BEGIN
  -- Create testimonials table if it doesn't exist
  CREATE TABLE IF NOT EXISTS testimonials (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    client_name TEXT NOT NULL,
    client_title TEXT,
    client_company TEXT,
    client_image TEXT,
    content TEXT NOT NULL,
    rating INTEGER DEFAULT 5,
    is_featured BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
  );
  
  -- Insert a sample testimonial if the table is empty
  INSERT INTO testimonials (client_name, client_title, client_company, content, rating, is_featured)
  SELECT 'John Doe', 'CEO', 'Example Corp', 'Working with DigitalShehar was a great experience. They delivered our website on time and on budget.', 5, true
  WHERE NOT EXISTS (SELECT 1 FROM testimonials LIMIT 1);
END;
$$;

CREATE OR REPLACE FUNCTION init_blog_posts_table()
RETURNS void
LANGUAGE plpgsql
AS $$
BEGIN
  -- Create blog_posts table if it doesn't exist
  CREATE TABLE IF NOT EXISTS blog_posts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    excerpt TEXT,
    featured_image TEXT,
    content_blocks JSONB DEFAULT '[]'::jsonb,
    author UUID REFERENCES auth.users(id),
    categories TEXT[],
    tags TEXT[],
    is_published BOOLEAN DEFAULT false,
    published_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
  );
END;
$$;

-- Enable row level security
ALTER TABLE pages ENABLE ROW LEVEL SECURITY;
ALTER TABLE services ENABLE ROW LEVEL SECURITY;
ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;

-- Create policies for authenticated users
CREATE POLICY "Allow authenticated users full access to pages"
  ON pages
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Allow authenticated users full access to services"
  ON services
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Allow authenticated users full access to testimonials"
  ON testimonials
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Allow authenticated users full access to blog_posts"
  ON blog_posts
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Create policies for anonymous users to read published content
CREATE POLICY "Allow anonymous users to read published pages"
  ON pages
  FOR SELECT
  TO anon
  USING (is_published = true);

CREATE POLICY "Allow anonymous users to read services"
  ON services
  FOR SELECT
  TO anon
  USING (true);

CREATE POLICY "Allow anonymous users to read testimonials"
  ON testimonials
  FOR SELECT
  TO anon
  USING (true);

CREATE POLICY "Allow anonymous users to read published blog posts"
  ON blog_posts
  FOR SELECT
  TO anon
  USING (is_published = true);
