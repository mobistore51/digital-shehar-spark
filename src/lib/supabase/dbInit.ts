
import { executeSQL, createExecSQLFunction } from './sqlUtils';
import { createTablesViaAPI } from './apiUtils';
import { 
  createPagesTableSQL, 
  createServicesTableSQL, 
  createTestimonialsTableSQL, 
  createBlogPostsTableSQL,
  setupRlsSQL
} from './tableSql';

// Initialize database tables if they don't exist
export const initializeTables = async () => {
  try {
    console.log('Starting database initialization...');
    
    // First try to create the exec_sql function
    const { error: funcError } = await createExecSQLFunction();
    
    // If function doesn't exist yet, use direct REST API to create tables
    if (funcError && funcError.message.includes('function exec_sql(text) does not exist')) {
      console.log('Exec_sql function does not exist, using direct API approach...');
      
      // Try direct API approach for creating tables
      await createTablesViaAPI();
      
      // Try again with the function creation now that tables may exist
      console.log('Retrying with function creation...');
      await createExecSQLFunction();
    }
    
    // Execute table creation SQL statements
    console.log('Creating pages table...');
    await executeSQL(createPagesTableSQL);
    
    console.log('Creating services table...');
    await executeSQL(createServicesTableSQL);
    
    console.log('Creating testimonials table...');
    await executeSQL(createTestimonialsTableSQL);
    
    console.log('Creating blog_posts table...');
    await executeSQL(createBlogPostsTableSQL);
    
    console.log('Setting up RLS policies...');
    await executeSQL(setupRlsSQL);
    
    console.log('Database initialization completed successfully');
    return { success: true };
    
  } catch (error) {
    console.error('Error initializing database tables:', error);
    return { success: false, error };
  }
};

// Initialize tables on import
initializeTables().catch(error => {
  console.error('Failed to initialize tables on import:', error);
});
