import { createClient } from "@refinedev/supabase";

const SUPABASE_URL = "https://lmcyrmyitobrgnsfwiud.supabase.co";

const SUPABASE_KEY =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTYzMzA3MjAyMiwiZXhwIjoxOTQ4NjQ4MDIyfQ.jZq8Ty93ry0EljYsIbcj-pAzPlGbHC5vfjuLKjnNtQg";

export const supabaseClient = createClient(SUPABASE_URL, SUPABASE_KEY, {
    db: {
        schema: "public",
    },
    auth: {
        persistSession: true,
    },
});
