
// This file re-exports everything from the new supabase module structure
// for backward compatibility
export {
  supabase,
  supabaseUrl,
  supabaseAnonKey,
  executeSQL,
  initializeTables,
  createTablesViaAPI
} from './supabase/index';

// Import and run initialization on import, same as before
import { initializeTables } from './supabase/dbInit';

// No need to call initializeTables() here as it's already being called in dbInit.ts
