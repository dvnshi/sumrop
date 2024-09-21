import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://pzvwpramnetbdzfpxjht.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB6dndwcmFtbmV0YmR6ZnB4amh0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjIwNTE1NjksImV4cCI6MjAzNzYyNzU2OX0.XidTaGZe1MFtXnNuD7SBvWj0N7dR_KNvhywtqYlFZBk';

const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
