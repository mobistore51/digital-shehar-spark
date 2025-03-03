
import { supabase } from './client';

// Create tables via REST API if RPC method fails
export const createTablesViaAPI = async () => {
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
