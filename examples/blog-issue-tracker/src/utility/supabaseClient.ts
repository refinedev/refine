import { createClient } from "@refinedev/supabase";

const SUPABASE_URL = "https://yoeyvdyjpiilbuzxcaij.supabase.co";
const SUPABASE_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTYzNTg1NzA5MSwiZXhwIjoxOTUxNDMzMDkxfQ.9-Ur4JqvpQTOr7O4moTWhFu-Hjs2hBY-GV95zz76shY";

export const supabaseClient = createClient(SUPABASE_URL, SUPABASE_KEY, {
  db: {
    schema: "public",
  },
  auth: {
    persistSession: true,
  },
});
