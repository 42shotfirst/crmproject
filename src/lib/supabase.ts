import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error(
    "Missing Supabase credentials. Please set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY environment variables.",
  );
}

// Create Supabase client with custom fetch options
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true,
  },
  global: {
    fetch: (...args) => {
      // Add custom error handling for fetch requests
      return fetch(...args).catch((err) => {
        console.error("Supabase fetch error:", err);
        throw err;
      });
    },
  },
});

// Add error event listener
supabase.auth.onAuthStateChange((event, session) => {
  if (event === "SIGNED_OUT") {
    console.log("User signed out");
  } else if (event === "SIGNED_IN") {
    console.log("User signed in");
  } else if (event === "TOKEN_REFRESHED") {
    console.log("Token refreshed");
  } else if (event === "USER_UPDATED") {
    console.log("User updated");
  }
});
