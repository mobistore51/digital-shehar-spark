
import { createClient } from '@supabase/supabase-js';

export const supabaseUrl = 'https://kfbpkblpinsorkttdrxi.supabase.co';
export const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtmYnBrYmxwaW5zb3JrdHRkcnhpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDA5NDk4MDQsImV4cCI6MjA1NjUyNTgwNH0.PSCgYe3X4RuEttWsTts6KHlU-mBukN7JJ7jgTW8h9LQ';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
