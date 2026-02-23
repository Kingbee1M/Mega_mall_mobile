import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://dvquzlmoejxgbfkvtvcp.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImR2cXV6bG1vZWp4Z2Jma3Z0dmNwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzEyNDcxNTQsImV4cCI6MjA4NjgyMzE1NH0.OXIgBCq51Wsr7OTXyvXfZacSoGGkAk6Anteeh1J6jvg";

export const supabase = createClient(
  supabaseUrl,
  supabaseAnonKey
);
