
// SQL definitions for creating database tables

// SQL to create pages table
export const createPagesTableSQL = `
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
  
  -- Insert sample page if the table is empty
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
`;

// SQL to create services table
export const createServicesTableSQL = `
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
`;

// SQL to create testimonials table
export const createTestimonialsTableSQL = `
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
`;

// SQL to create blog_posts table
export const createBlogPostsTableSQL = `
  CREATE TABLE IF NOT EXISTS blog_posts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    excerpt TEXT,
    featured_image TEXT,
    content_blocks JSONB DEFAULT '[]'::jsonb,
    author UUID,
    categories TEXT[],
    tags TEXT[],
    is_published BOOLEAN DEFAULT false,
    published_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
  );
  
  -- Insert a sample blog post if the table is empty
  INSERT INTO blog_posts (title, slug, excerpt, is_published, content_blocks)
  SELECT 'Getting Started with Digital Marketing', 'getting-started-with-digital-marketing', 
    'Learn the basics of digital marketing and how to get started with your online strategy.', 
    true,
    '[{"id":"blog-1","type":"heading","content":{"text":"Getting Started with Digital Marketing","level":"h1"}},{"id":"blog-2","type":"paragraph","content":{"text":"Digital marketing is essential for businesses of all sizes in today''s online world."}}]'::jsonb
  WHERE NOT EXISTS (SELECT 1 FROM blog_posts LIMIT 1);
`;

// Setup RLS policies
export const setupRlsSQL = `
  -- Enable row level security
  ALTER TABLE IF EXISTS pages ENABLE ROW LEVEL SECURITY;
  ALTER TABLE IF EXISTS services ENABLE ROW LEVEL SECURITY;
  ALTER TABLE IF EXISTS testimonials ENABLE ROW LEVEL SECURITY;
  ALTER TABLE IF EXISTS blog_posts ENABLE ROW LEVEL SECURITY;
  
  -- Create policies for authenticated users if they don't exist
  DO $$
  BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'pages' AND policyname = 'Allow authenticated users full access to pages') THEN
      CREATE POLICY "Allow authenticated users full access to pages"
        ON pages
        FOR ALL
        TO authenticated
        USING (true)
        WITH CHECK (true);
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'services' AND policyname = 'Allow authenticated users full access to services') THEN
      CREATE POLICY "Allow authenticated users full access to services"
        ON services
        FOR ALL
        TO authenticated
        USING (true)
        WITH CHECK (true);
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'testimonials' AND policyname = 'Allow authenticated users full access to testimonials') THEN
      CREATE POLICY "Allow authenticated users full access to testimonials"
        ON testimonials
        FOR ALL
        TO authenticated
        USING (true)
        WITH CHECK (true);
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'blog_posts' AND policyname = 'Allow authenticated users full access to blog_posts') THEN
      CREATE POLICY "Allow authenticated users full access to blog_posts"
        ON blog_posts
        FOR ALL
        TO authenticated
        USING (true)
        WITH CHECK (true);
    END IF;
    
    -- Create policies for anonymous users if they don't exist
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'pages' AND policyname = 'Allow anonymous users to read published pages') THEN
      CREATE POLICY "Allow anonymous users to read published pages"
        ON pages
        FOR SELECT
        TO anon
        USING (is_published = true);
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'services' AND policyname = 'Allow anonymous users to read services') THEN
      CREATE POLICY "Allow anonymous users to read services"
        ON services
        FOR SELECT
        TO anon
        USING (true);
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'testimonials' AND policyname = 'Allow anonymous users to read testimonials') THEN
      CREATE POLICY "Allow anonymous users to read testimonials"
        ON testimonials
        FOR SELECT
        TO anon
        USING (true);
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'blog_posts' AND policyname = 'Allow anonymous users to read published blog posts') THEN
      CREATE POLICY "Allow anonymous users to read published blog posts"
        ON blog_posts
        FOR SELECT
        TO anon
        USING (is_published = true);
    END IF;
  END
  $$;
`;
