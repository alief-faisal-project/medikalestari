-- Create doctors table
CREATE TABLE doctors (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  specialty VARCHAR(100) NOT NULL,
  image_url TEXT,
  experience_years INTEGER,
  bio TEXT,
  phone VARCHAR(20),
  email VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create schedules table
CREATE TABLE schedules (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  doctor_id UUID NOT NULL REFERENCES doctors(id) ON DELETE CASCADE,
  day_of_week VARCHAR(20) NOT NULL,
  start_time TIME NOT NULL,
  end_time TIME NOT NULL,
  is_available BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create admin_users table (for authentication)
CREATE TABLE admin_users (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  role VARCHAR(50) DEFAULT 'admin',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes for better performance
CREATE INDEX idx_doctors_specialty ON doctors(specialty);
CREATE INDEX idx_schedules_doctor_id ON schedules(doctor_id);
CREATE INDEX idx_admin_users_email ON admin_users(email);

-- Enable Row Level Security (RLS)
ALTER TABLE doctors ENABLE ROW LEVEL SECURITY;
ALTER TABLE schedules ENABLE ROW LEVEL SECURITY;
ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;

-- Create policies for doctors (public read)
CREATE POLICY "Allow public read doctors" ON doctors
  FOR SELECT USING (true);

-- Create policies for schedules (public read)
CREATE POLICY "Allow public read schedules" ON schedules
  FOR SELECT USING (true);

-- Create policies for admin_users (authenticated users only)
CREATE POLICY "Allow authenticated users to read admin_users" ON admin_users
  FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY "Allow inserts to admin_users" ON admin_users
  FOR INSERT WITH CHECK (auth.role() = 'authenticated');

-- Create storage bucket for doctor images
INSERT INTO storage.buckets (id, name, public)
VALUES ('doctors', 'doctors', true);

-- Create policy for storage bucket
CREATE POLICY "Allow public read doctors storage" ON storage.objects
  FOR SELECT USING (bucket_id = 'doctors');

CREATE POLICY "Allow authenticated upload doctors storage" ON storage.objects
  FOR INSERT WITH CHECK (bucket_id = 'doctors' AND auth.role() = 'authenticated');
