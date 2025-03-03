
import { createClient } from '@supabase/supabase-js';

export const supabaseUrl = 'https://kfbpkblpinsorkttdrxi.supabase.co';
export const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtmYnBrYmxwaW5zb3JrdHRkcnhpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDA5NDk4MDQsImV4cCI6MjA1NjUyNTgwNH0.PSCgYe3X4RuEttWsTts6KHlU-mBukN7JJ7jgTW8h9LQ';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Execute SQL directly to create tables
const executeSQL = async (sql: string) => {
  try {
    const { error } = await supabase.rpc('exec_sql', { sql_query: sql });
    if (error) throw error;
    return { success: true };
  } catch (error: any) {
    console.error('Error executing SQL:', error);
    return { success: false, error };
  }
};

// Initialize database tables if they don't exist
export const initializeTables = async () => {
  try {
    console.log('Starting database initialization...');
    
    // SQL to create pages table
    const createPagesTable = `
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
    const createServicesTable = `
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
    const createTestimonialsTable = `
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
    const createBlogPostsTable = `
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
    
    // Enable RLS and create policies
    const setupRLS = `
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
    
    // Create a SQL function to execute SQL if it doesn't exist
    const createExecSQLFunction = `
      CREATE OR REPLACE FUNCTION exec_sql(sql_query text) RETURNS void AS $$
      BEGIN
        EXECUTE sql_query;
      END;
      $$ LANGUAGE plpgsql SECURITY DEFINER;
    `;
    
    console.log('Creating exec_sql function...');
    
    // First try to create the exec_sql function
    const { error: funcError } = await supabase.rpc('exec_sql', { 
      sql_query: createExecSQLFunction 
    });
    
    // If function doesn't exist yet, use direct REST API to create tables
    if (funcError && funcError.message.includes('function exec_sql(text) does not exist')) {
      console.log('Exec_sql function does not exist, using direct API approach...');
      
      // Try direct API approach for creating tables
      await createTablesViaAPI();
      
      // Try again with the function creation now that tables may exist
      console.log('Retrying with function creation...');
      await executeSQL(createExecSQLFunction);
    }
    
    // Execute table creation SQL statements
    console.log('Creating pages table...');
    await executeSQL(createPagesTable);
    
    console.log('Creating services table...');
    await executeSQL(createServicesTable);
    
    console.log('Creating testimonials table...');
    await executeSQL(createTestimonialsTable);
    
    console.log('Creating blog_posts table...');
    await executeSQL(createBlogPostsTable);
    
    console.log('Setting up RLS policies...');
    await executeSQL(setupRLS);
    
    console.log('Database initialization completed successfully');
    return { success: true };
    
  } catch (error) {
    console.error('Error initializing database tables:', error);
    return { success: false, error };
  }
};

// Try to initialize tables on import
initializeTables().catch(error => {
  console.error('Failed to initialize tables on import:', error);
});

// Create tables via REST API if RPC method fails
const createTablesViaAPI = async () => {
  try {
    // Note: We cannot directly execute SQL via the REST API
    // Instead, we'll create individual records as a fallback mechanism
    
    // Create a sample page
    console.log('Attempting to create sample page via API...');
    const { error: pagesError } = await supabase
      .from('pages')
      .insert({
        title: 'Welcome',
        slug: 'welcome',
        description: 'Welcome to DigitalShehar',
        keywords: 'digital, marketing, website',
        layout: 'default',
        is_published: true,
        content_blocks: [
          {
            id: 'welcome-1',
            type: 'heading',
            content: { text: 'Welcome to DigitalShehar', level: 'h1' }
          },
          {
            id: 'welcome-2',
            type: 'paragraph',
            content: { text: 'This is your first page. Edit or delete it to get started.' }
          }
        ]
      });
    
    if (pagesError) {
      if (pagesError.code === '42P01') { // Table doesn't exist
        console.log('Pages table does not exist yet.');
      } else {
        console.error('Error creating sample page:', pagesError);
      }
    }
    
    // Try to create a sample service
    console.log('Attempting to create sample service via API...');
    const { error: servicesError } = await supabase
      .from('services')
      .insert({
        title: 'Web Development',
        slug: 'web-development',
        description: 'Custom website development for businesses of all sizes.',
        icon: 'Code',
        is_featured: true,
        order_index: 1
      });
    
    if (servicesError) {
      if (servicesError.code === '42P01') { // Table doesn't exist
        console.log('Services table does not exist yet.');
      } else {
        console.error('Error creating sample service:', servicesError);
      }
    }
    
    // Try to create a sample testimonial
    console.log('Attempting to create sample testimonial via API...');
    const { error: testimonialError } = await supabase
      .from('testimonials')
      .insert({
        client_name: 'John Doe',
        client_title: 'CEO',
        client_company: 'Example Corp',
        content: 'Working with DigitalShehar was a great experience. They delivered our website on time and on budget.',
        rating: 5,
        is_featured: true
      });
    
    if (testimonialError) {
      if (testimonialError.code === '42P01') { // Table doesn't exist
        console.log('Testimonials table does not exist yet.');
      } else {
        console.error('Error creating sample testimonial:', testimonialError);
      }
    }
    
    // Try to create a sample blog post
    console.log('Attempting to create sample blog post via API...');
    const { error: blogError } = await supabase
      .from('blog_posts')
      .insert({
        title: 'Getting Started with Digital Marketing',
        slug: 'getting-started-with-digital-marketing',
        excerpt: 'Learn the basics of digital marketing and how to get started with your online strategy.',
        is_published: true,
        content_blocks: [
          {
            id: 'blog-1',
            type: 'heading',
            content: { text: 'Getting Started with Digital Marketing', level: 'h1' }
          },
          {
            id: 'blog-2',
            type: 'paragraph',
            content: { text: 'Digital marketing is essential for businesses of all sizes in today\'s online world.' }
          }
        ]
      });
    
    if (blogError) {
      if (blogError.code === '42P01') { // Table doesn't exist
        console.log('Blog posts table does not exist yet.');
      } else {
        console.error('Error creating sample blog post:', blogError);
      }
    }
    
    console.log('Completed API-based table creation attempts');
  } catch (error) {
    console.error('Error in API-based table creation:', error);
  }
};
