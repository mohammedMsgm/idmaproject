import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { query } from '../../lib/database.js';

const router = express.Router();

// Test route
router.get('/test', (req, res) => {
  res.json({ message: 'API is working', timestamp: new Date().toISOString() });
});

// Login endpoint
router.post('/login', async (req, res) => {
  try {
    const { email, password, userType } = req.body;

    if (!email || !password || !userType) {
      return res.status(400).json({
        success: false,
        message: 'جميع الحقول مطلوبة'
      });
    }

    // Get user from database
    const result = await query(
      'SELECT * FROM users WHERE email = $1 AND user_type = $2',
      [email, userType]
    );

    if (result.rows.length === 0) {
      return res.status(401).json({
        success: false,
        message: 'البريد الإلكتروني أو كلمة المرور غير صحيحة'
      });
    }

    const dbUser = result.rows[0];

    // Verify password
    const isPasswordValid = await bcrypt.compare(password, dbUser.password);
    
    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: 'البريد الإلكتروني أو كلمة المرور غير صحيحة'
      });
    }

    // Return user data (without password)
    const user = {
      id: dbUser.id.toString(),
      name: dbUser.name,
      email: dbUser.email,
      user_type: dbUser.user_type,
      avatar: dbUser.avatar,
      doctor_id: dbUser.doctor_id?.toString()
    };

    // Generate JWT token
    const token = jwt.sign(
      { userId: user.id, email: user.email, userType: user.user_type },
      process.env.JWT_SECRET || 'fallback-secret',
      { expiresIn: '24h' }
    );

    res.json({
      success: true,
      message: 'تم تسجيل الدخول بنجاح',
      user,
      token
    });

  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({
      success: false,
      message: 'حدث خطأ أثناء تسجيل الدخول'
    });
  }
});

// Register endpoint
router.post('/register', async (req, res) => {
  try {
    const { name, email, password, userType, doctorId } = req.body;

    if (!name || !email || !password || !userType) {
      return res.status(400).json({
        success: false,
        message: 'جميع الحقول مطلوبة'
      });
    }

    // Check if user already exists
    const existingUser = await query(
      'SELECT id FROM users WHERE email = $1',
      [email]
    );

    if (existingUser.rows.length > 0) {
      return res.status(409).json({
        success: false,
        message: 'المستخدم موجود بالفعل'
      });
    }

    // Hash password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Insert new user
    const insertResult = await query(
      `INSERT INTO users (name, email, password, user_type, doctor_id, avatar, created_at, updated_at) 
       VALUES ($1, $2, $3, $4, $5, $6, NOW(), NOW()) 
       RETURNING id, name, email, user_type, avatar, doctor_id`,
      [
        name,
        email,
        hashedPassword,
        userType,
        doctorId || null,
        userType === 'doctor' ? '/pfpdoc.png' : '/pfp.png'
      ]
    );

    const newUser = insertResult.rows[0];

    // If registering as doctor, create doctor profile
    if (userType === 'doctor') {
      await query(
        'INSERT INTO doctor_profiles (user_id, specialization, created_at) VALUES ($1, $2, NOW())',
        [newUser.id, 'تخصص عام']
      );
    }

    const user = {
      id: newUser.id.toString(),
      name: newUser.name,
      email: newUser.email,
      user_type: newUser.user_type,
      avatar: newUser.avatar,
      doctor_id: newUser.doctor_id?.toString()
    };

    // Generate JWT token
    const token = jwt.sign(
      { userId: user.id, email: user.email, userType: user.user_type },
      process.env.JWT_SECRET || 'fallback-secret',
      { expiresIn: '24h' }
    );

    res.status(201).json({
      success: true,
      message: 'تم إنشاء الحساب بنجاح',
      user,
      token
    });

  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({
      success: false,
      message: 'حدث خطأ أثناء إنشاء الحساب'
    });
  }
});

// Get doctors list
router.get('/doctors', async (req, res) => {
  try {
    const result = await query(
      `SELECT u.id, u.name, u.email, u.avatar, dp.specialization, dp.experience_years
       FROM users u
       JOIN doctor_profiles dp ON u.id = dp.user_id
       WHERE u.user_type = 'doctor'
       ORDER BY u.name`
    );

    res.json({
      success: true,
      doctors: result.rows
    });
  } catch (error) {
    console.error('Error fetching doctors:', error);
    res.status(500).json({
      success: false,
      message: 'حدث خطأ أثناء استرجاع قائمة الأطباء'
    });
  }
});

// Get patient's assigned doctor - FIXED VERSION
router.get('/patient-doctor/:patientId', async (req, res) => {
  try {
    const patientId = req.params.patientId;

    // Validate patientId is a number
    if (!patientId || isNaN(parseInt(patientId))) {
      return res.status(400).json({
        success: false,
        message: 'معرف المريض غير صحيح'
      });
    }

    // Get patient with their assigned doctor
    const patientResult = await query(
      `SELECT u.*, 
              d.name as doctor_name, 
              d.avatar as doctor_avatar,
              dp.specialization 
       FROM users u 
       LEFT JOIN users d ON u.doctor_id = d.id 
       LEFT JOIN doctor_profiles dp ON d.id = dp.user_id 
       WHERE u.id = $1 AND u.user_type = $2`,
      [parseInt(patientId), 'patient']
    );

    if (patientResult.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'المريض غير موجود'
      });
    }

    const patient = patientResult.rows[0];

    res.json({
      success: true,
      patient: {
        id: patient.id,
        name: patient.name,
        email: patient.email,
        avatar: patient.avatar,
        doctor: patient.doctor_id ? {
          id: patient.doctor_id,
          name: patient.doctor_name,
          avatar: patient.doctor_avatar,
          specialization: patient.specialization
        } : null
      }
    });

  } catch (error) {
    console.error('Error fetching patient doctor:', error);
    res.status(500).json({
      success: false,
      message: 'حدث خطأ أثناء استرجاع بيانات الطبيب'
    });
  }
});

export default router;
