-- Enable OAuth providers in auth.providers
-- This migration ensures that GitHub and Google OAuth providers are enabled

-- Check if the auth schema exists
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1
    FROM pg_namespace
    WHERE nspname = 'auth'
  ) THEN
    RAISE NOTICE 'auth schema does not exist, skipping provider configuration';
    RETURN;
  END IF;
  
  -- Enable GitHub provider if it exists in the auth.providers table
  IF EXISTS (
    SELECT 1
    FROM information_schema.tables
    WHERE table_schema = 'auth'
    AND table_name = 'providers'
  ) THEN
    UPDATE auth.providers
    SET enabled = true
    WHERE provider_id IN ('github', 'google');
    
    RAISE NOTICE 'OAuth providers (GitHub, Google) have been enabled';
  ELSE
    RAISE NOTICE 'auth.providers table does not exist, skipping provider configuration';
  END IF;
END $$;

-- Create a trigger to handle OAuth user profiles
CREATE OR REPLACE FUNCTION public.handle_new_oauth_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.user_profiles (id, email, role, created_at)
  VALUES (
    NEW.id,
    NEW.email,
    'user',
    NOW()
  )
  ON CONFLICT (id) DO NOTHING;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Drop the trigger if it exists
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;

-- Create the trigger
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_oauth_user();
