import { dataProvider as supabaseDataProvider } from "@refinedev/supabase";
import { supabaseClient } from "./supabaseClient";

export const dataProvider = supabaseDataProvider(supabaseClient);
