import { createClient } from "@pankod/refine-supabase";

const SUPABASE_URL = "https://wbaapaukqqywvlpsfiev.supabase.co";
const SUPABASE_KEY =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndiYWFwYXVrcXF5d3ZscHNmaWV2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjkzNDc0OTksImV4cCI6MTk4NDkyMzQ5OX0.q8pGUmu6D0WXXsuquy7MLfgWq-tFMU9cZLACTSsT0Cg";

export const supabaseClient = createClient(SUPABASE_URL, SUPABASE_KEY);
