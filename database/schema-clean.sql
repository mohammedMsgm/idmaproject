-- Clean Schema for IDMA Platform - Neon PostgreSQL
-- This file creates the database structure for the medical platform

-- Create users table
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    user_type VARCHAR(10) NOT NULL CHECK (user_type IN ('patient', 'doctor')),
    avatar VARCHAR(255),
    doctor_id INTEGER,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create doctor profiles table
CREATE TABLE IF NOT EXISTS doctor_profiles (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL,
    specialization VARCHAR(255) NOT NULL,
    license_number VARCHAR(100),
    experience_years INTEGER,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Add foreign key constraints after table creation
ALTER TABLE doctor_profiles ADD CONSTRAINT fk_doctor_profiles_user_id 
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE;

-- Insert sample doctors
INSERT INTO users (name, email, password, user_type, avatar) VALUES
('د. خالد العمري', 'khalid@example.com', '$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'doctor', '/doctor-avatar.jpg'),
('د. ليلى حسن', 'layla@example.com', '$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'doctor', '/doctor-avatar.jpg'),
('د. سيداني منير', 'sidani@example.com', '$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'doctor', '/doctor-avatar.jpg'),
('د. بورزق عائشة', 'aicha@example.com', '$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'doctor', '/doctor-avatar.jpg')
ON CONFLICT (email) DO NOTHING;

-- Insert doctor profiles
INSERT INTO doctor_profiles (user_id, specialization, experience_years) 
SELECT u.id, v.specialization, v.experience_years
FROM (VALUES
    ('khalid@example.com', 'طب نفسي', 10),
    ('layla@example.com', 'اخصائي اجتماعي', 8),
    ('sidani@example.com', 'اخصائي نفساني', 12),
    ('aicha@example.com', 'اخصائي اجتماعي', 6)
) AS v(email, specialization, experience_years)
JOIN users u ON u.email = v.email AND u.user_type = 'doctor'
ON CONFLICT DO NOTHING;

-- Insert sample patients
INSERT INTO users (name, email, password, user_type, avatar, doctor_id)
SELECT v.name, v.email, v.password, v.user_type, v.avatar, d.id
FROM (VALUES
    ('أحمد محمد', 'ahmed@example.com', '$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'patient', '/patient-avatar.jpg', 'khalid@example.com'),
    ('فاطمة علي', 'fatima@example.com', '$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'patient', '/patient-avatar.jpg', 'khalid@example.com'),
    ('محمد سالم', 'mohamed@example.com', '$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'patient', '/patient-avatar.jpg', 'layla@example.com'),
    ('نور الهدى', 'nour@example.com', '$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'patient', '/patient-avatar.jpg', 'sidani@example.com'),
    ('يوسف أحمد', 'youssef@example.com', '$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'patient', '/patient-avatar.jpg', 'aicha@example.com')
) AS v(name, email, password, user_type, avatar, doctor_email)
JOIN users d ON d.email = v.doctor_email AND d.user_type = 'doctor'
ON CONFLICT (email) DO NOTHING;

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_users_type ON users(user_type);
CREATE INDEX IF NOT EXISTS idx_users_doctor_id ON users(doctor_id);
CREATE INDEX IF NOT EXISTS idx_doctor_profiles_user_id ON doctor_profiles(user_id);
