
import { createClient } from '@supabase/supabase-js';

export const supabaseUrl = 'https://kfbpkblpinsorkttdrxi.supabase.co';
export const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtmYnBrYmxwaW5zb3JrdHRkcnhpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDA5NDk4MDQsImV4cCI6MjA1NjUyNTgwNH0.PSCgYe3X4RuEttWsTts6KHlU-mBukN7JJ7jgTW8h9LQ';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Initialize database tables if they don't exist
export const initializeTables = async () => {
  try {
    // Check if pages table exists
    const { error: checkError } = await supabase
      .from('pages')
      .select('id')
      .limit(1)
      .single();

    // If table doesn't exist, create it
    if (checkError && checkError.code === '42P01') {
      // Create pages table using SQL
      const { error: createError } = await supabase.rpc('init_pages_table');
      
      if (createError) {
        console.error('Error creating pages table:', createError);
        
        // Alternative approach: Create tables via REST API if RPC fails
        await createTablesViaAPI();
      }
    }

    // Initialize services table
    const { error: servicesCheckError } = await supabase
      .from('services')
      .select('id')
      .limit(1)
      .single();

    if (servicesCheckError && servicesCheckError.code === '42P01') {
      // Create services table using SQL
      const { error: servicesCreateError } = await supabase.rpc('init_services_table');
      
      if (servicesCreateError) {
        console.error('Error creating services table:', servicesCreateError);
      }
    }

    // Initialize testimonials table
    const { error: testimonialsCheckError } = await supabase
      .from('testimonials')
      .select('id')
      .limit(1)
      .single();

    if (testimonialsCheckError && testimonialsCheckError.code === '42P01') {
      // Create testimonials table using SQL
      const { error: testimonialsCreateError } = await supabase.rpc('init_testimonials_table');
      
      if (testimonialsCreateError) {
        console.error('Error creating testimonials table:', testimonialsCreateError);
      }
    }

    // Initialize blog_posts table
    const { error: blogPostsCheckError } = await supabase
      .from('blog_posts')
      .select('id')
      .limit(1)
      .single();

    if (blogPostsCheckError && blogPostsCheckError.code === '42P01') {
      // Create blog_posts table using SQL
      const { error: blogPostsCreateError } = await supabase.rpc('init_blog_posts_table');
      
      if (blogPostsCreateError) {
        console.error('Error creating blog_posts table:', blogPostsCreateError);
      }
    }

  } catch (error) {
    console.error('Error initializing database tables:', error);
  }
};

// Create tables via REST API if RPC method fails
const createTablesViaAPI = async () => {
  try {
    // Create pages table
    const createPagesResponse = await fetch(`${supabaseUrl}/rest/v1/pages`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'apikey': supabaseAnonKey,
        'Authorization': `Bearer ${supabaseAnonKey}`,
        'Prefer': 'return=representation'
      },
      body: JSON.stringify({
        id: '00000000-0000-0000-0000-000000000000',
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
        ],
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      })
    });

    // Check if table was created
    if (!createPagesResponse.ok) {
      console.error('Error creating pages table via API.');
    }
  } catch (error) {
    console.error('Error creating tables via API:', error);
  }
};

// Try to initialize tables on import
initializeTables();
