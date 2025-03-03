
import { supabase } from './client';

// Execute SQL directly using RPC
export const executeSQL = async (sql: string) => {
  try {
    const { error } = await supabase.rpc('exec_sql', { sql_query: sql });
    if (error) throw error;
    return { success: true };
  } catch (error: any) {
    console.error('Error executing SQL:', error);
    return { success: false, error };
  }
};

// Create a SQL function to execute SQL if it doesn't exist
export const createExecSQLFunction = async () => {
  const sql = `
    CREATE OR REPLACE FUNCTION exec_sql(sql_query text) RETURNS void AS $$
    BEGIN
      EXECUTE sql_query;
    END;
    $$ LANGUAGE plpgsql SECURITY DEFINER;
  `;
  
  console.log('Creating exec_sql function...');
  
  try {
    // Try to create the exec_sql function
    const { error } = await supabase.rpc('exec_sql', { sql_query: sql });
    
    return { success: !error, error };
  } catch (error: any) {
    console.error('Error creating exec_sql function:', error);
    return { success: false, error };
  }
};
