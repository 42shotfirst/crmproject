-- Fix the dummy user credentials

-- First, update the auth.users table with a working password
-- The password hash below is for 'password123'
UPDATE auth.users
SET encrypted_password = '$2a$10$Hl5tHDSl8P5WvQlPQAs9.OUX9KYUTrSx0.LrxmTjLIFe4YKhOcQHC'
WHERE email = 'demo@example.com';

-- Make sure the user exists in both tables
INSERT INTO auth.users (id, email, encrypted_password, email_confirmed_at, created_at, updated_at)
VALUES 
('00000000-0000-0000-0000-000000000000', 'demo@example.com', '$2a$10$Hl5tHDSl8P5WvQlPQAs9.OUX9KYUTrSx0.LrxmTjLIFe4YKhOcQHC', now(), now(), now())
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.user_profiles (id, email, role, created_at)
VALUES 
('00000000-0000-0000-0000-000000000000', 'demo@example.com', 'admin', now())
ON CONFLICT (id) DO NOTHING;
