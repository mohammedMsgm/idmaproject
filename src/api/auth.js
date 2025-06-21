import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { query } from '../../lib/database.js';

const router = express.Router();

// Login endpoint
router.post('/login', async (req, res) => {
  try {const { email, password, userType } = req.body;

    if (!email || !password || !userType) {
      return res.status(400).json({
        success: false,
        message: 'جميع الحقول مطلوبة'
      });
    }    // Get user from database
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

    const dbUser = result.rows[0];    // Verify password
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
      doctor_id: dbUser.doctor_id?.toString()    };

    // Generate JWT token
    const token = jwt.sign(
      { 
        userId: user.id, 
        email: user.email, 
        userType: user.user_type 
      },
      process.env.JWT_SECRET || 'your-secret-key',      { expiresIn: '24h' }
    );

    res.json({
      user,
      token,
      success: true,
      message: 'تم تسجيل الدخول بنجاح'
    });

  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({
      success: false,
      message: 'حدث خطأ أثناء تسجيل الدخول',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// Register endpoint
router.post('/register', async (req, res) => {
  try {const { name, email, password, userType, doctorId } = req.body;

    if (!name || !email || !password || !userType) {
      return res.status(400).json({
        success: false,
        message: 'جميع الحقول مطلوبة'
      });
    }

    // Check if user already exists
    const existingUser = await query(
      'SELECT * FROM users WHERE email = $1',
      [email]
    );

    if (existingUser.rows.length > 0) {
      return res.status(409).json({
        success: false,
        message: 'البريد الإلكتروني مستخدم بالفعل'
      });
    }    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);    // Handle doctor_id properly - only for patients and only if valid
    let doctorIdValue = null;
    if (userType === 'patient' && doctorId) {
      const parsedDoctorId = parseInt(doctorId);
      if (!isNaN(parsedDoctorId) && parsedDoctorId > 0) {
        // Verify that the doctor exists in the database
        const doctorExists = await query(
          'SELECT id FROM users WHERE id = $1 AND user_type = $2',
          [parsedDoctorId, 'doctor']
        );
        if (doctorExists.rows.length > 0) {
          doctorIdValue = parsedDoctorId;
        }
      }    }    console.log('🎨 Setting avatar for user type:', userType);
    
    // Insert new user
    const result = await query(
      'INSERT INTO users (name, email, password, user_type, avatar, doctor_id) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
      [
        name, 
        email, 
        hashedPassword, 
        userType, 
        userType === 'doctor' ? '/pfpdoc.png' : '/pfp.png',
        doctorIdValue
      ]
    );
    
    console.log('🖼️ Avatar set to:', userType === 'doctor' ? '/pfpdoc.png' : '/pfp.png');

    const newUser = result.rows[0];

    // If registering as doctor, create doctor profile
    if (userType === 'doctor') {
      await query(
        'INSERT INTO doctor_profiles (user_id, specialization, experience_years) VALUES ($1, $2, $3)',
        [newUser.id, 'تخصص عام', 0]
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

    res.status(201).json({
      user,
      success: true,
      message: 'تم إنشاء الحساب بنجاح'
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({
      success: false,
      message: 'حدث خطأ أثناء إنشاء الحساب',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// Get doctors endpoint
router.get('/doctors', async (req, res) => {
  try {
    const result = await query(
      `SELECT u.id, u.name, dp.specialization 
       FROM users u 
       LEFT JOIN doctor_profiles dp ON u.id = dp.user_id 
       WHERE u.user_type = 'doctor'`
    );

    const doctors = result.rows.map(row => ({
      id: row.id.toString(),
      name: row.name,
      specialization: row.specialization || 'تخصص عام'
    }));

    res.json(doctors);  } catch (error) {
    console.error('Error fetching doctors:', error);
    res.status(500).json({
      success: false,
      message: 'حدث خطأ أثناء استرجاع قائمة الأطباء'
    });
  }
});

// Get patient's assigned doctor and appointments
router.get('/patient/:patientId/doctor', async (req, res) => {
  try {
    const { patientId } = req.params;

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
      [patientId, 'patient']
    );

    if (patientResult.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'المريض غير موجود'
      });
    }

    const patient = patientResult.rows[0];

    // If patient has an assigned doctor, return doctor info
    if (patient.doctor_id) {
      const doctorInfo = {
        id: patient.doctor_id,
        name: patient.doctor_name,
        specialization: patient.specialization || 'غير محدد',
        avatar: patient.doctor_avatar
      };

      res.json({
        success: true,
        doctor: doctorInfo
      });
    } else {
      res.json({
        success: true,
        doctor: null,
        message: 'لم يتم تعيين طبيب للمريض بعد'
      });
    }

  } catch (error) {
    console.error('Error fetching patient doctor:', error);
    res.status(500).json({
      success: false,
      message: 'حدث خطأ أثناء استرجاع بيانات الطبيب'
    });
  }
});

export default router;
