import { createClient } from "@refinedev/supabase";

// QBMZ87LcFNeiWFw6

const SUPABASE_URL = "https://ezeyemegrlmndvfbzmut.supabase.co";
const SUPABASE_KEY =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImV6ZXllbWVncmxtbmR2ZmJ6bXV0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTAyNjc4NDYsImV4cCI6MjAwNTg0Mzg0Nn0.gfNeWZ0__3rGkBbx1vPZGce3OIRfkhJjPMy2SbxKKoc";

export const supabaseClient = createClient(SUPABASE_URL, SUPABASE_KEY, {
    db: {
        schema: "public",
    },
    auth: {
        persistSession: true,
    },
});
