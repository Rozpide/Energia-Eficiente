import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://csacakmorwvzszfkhyep.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNzYWNha21vcnd2enN6ZmtoeWVwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQzOTU5NDAsImV4cCI6MjA1OTk3MTk0MH0.C4p0p6S_zGCtuWifJIIfD2Q0pPhnU0Ohoff-YtEbTok";  // ⚠ Usa tu clave real

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
