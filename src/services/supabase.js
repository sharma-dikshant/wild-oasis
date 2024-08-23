import { createClient } from "@supabase/supabase-js";
export const supabaseUrl = "https://sxbkfaftsxzluboyxvmo.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InN4YmtmYWZ0c3h6bHVib3l4dm1vIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjQwMzY1NzcsImV4cCI6MjAzOTYxMjU3N30.8BZ6yUxNNM4ARwpdd_D7weYP_9oSZVwAPDf8gWV2Os8";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
