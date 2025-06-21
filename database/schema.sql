-- إنشاء قاعدة البيانات
CREATE DATABASE idma_platform;

-- الاتصال بقاعدة البيانات
\c idma_platform;

-- إنشاء جدول المستخدمين
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    user_type VARCHAR(10) NOT NULL CHECK (user_type IN ('patient', 'doctor')),
    avatar VARCHAR(255),
    doctor_id INTEGER REFERENCES users(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- إنشاء جدول الأطباء مع التخصصات
CREATE TABLE doctor_profiles (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    specialization VARCHAR(255) NOT NULL,
    license_number VARCHAR(100),
    experience_years INTEGER,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- إدراج بيانات الأطباء
INSERT INTO users (name, email, password, user_type, avatar) VALUES
('د. خالد العمري', 'khalid@example.com', '$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'doctor', '/doctor-avatar.jpg'),
('د. ليلى حسن', 'layla@example.com', '$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'doctor', '/doctor-avatar.jpg'),
('د. سيداني منير', 'sidani@example.com', '$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'doctor', '/doctor-avatar.jpg'),
('د. بورزق عائشة', 'aicha@example.com', '$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'doctor', '/doctor-avatar.jpg');

-- إدراج تخصصات الأطباء
INSERT INTO doctor_profiles (user_id, specialization, experience_years) VALUES
(1, 'طب نفسي', 10),
(2, 'اخصائي اجتماعي', 8),
(3, 'اخصائي نفساني', 12),
(4, 'اخصائي اجتماعي', 6);

-- إدراج بيانات المرضى
INSERT INTO users (name, email, password, user_type, avatar, doctor_id) VALUES
('أحمد محمد', 'ahmed@example.com', '$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'patient', '/patient-avatar.jpg', 1),
('فاطمة علي', 'fatima@example.com', '$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'patient', '/patient-avatar.jpg', 1),
('محمد سالم', 'mohamed@example.com', '$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'patient', '/patient-avatar.jpg', 2),
('نور الهدى', 'nour@example.com', '$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'patient', '/patient-avatar.jpg', 3),
('يوسف أحمد', 'youssef@example.com', '$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'patient', '/patient-avatar.jpg', 4);

-- إنشاء فهارس لتحسين الأداء
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_type ON users(user_type);
CREATE INDEX idx_doctor_profiles_user_id ON doctor_profiles(user_id);

-- ملاحظة: كلمة المرور المشفرة هنا تمثل "123456"
