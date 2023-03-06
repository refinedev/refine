import { createClient } from "@refinedev/supabase";

const SUPABASE_URL = "https://grqowunuiqfxzvcurivl.supabase.co";
const SUPABASE_KEY =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTYzMzA3NjQ3MiwiZXhwIjoxOTQ4NjUyNDcyfQ.YpDFpBI8LAj3_5oxCMCxkWKdL5weoEe4Gh0wQwIudic";

export const supabaseClient = createClient(SUPABASE_URL, SUPABASE_KEY, {
    db: {
        schema: "public",
    },
    auth: {
        persistSession: true,
    },
});
