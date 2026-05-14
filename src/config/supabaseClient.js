import { createClient } from '@supabase/supabase-js';

const supabaseUrl = "https://plegbhvcqrpdghmpmeez.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBsZWdiaHZjcXJwZGdobXBtZWV6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzgwNjYyNDksImV4cCI6MjA5MzY0MjI0OX0.iE1neE7D2S2Yr7YCfbdUDx7mkT95ilf6wgS3Sz6Zmko";

export const supabase = createClient(supabaseUrl, supabaseKey);