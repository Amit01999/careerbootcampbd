import dotenv from 'dotenv';
import connectDB from '../config/database.js';
import {
  User, Question, Exam, Circular, Settings,
} from '../models/index.js';
import logger from '../config/logger.js';

dotenv.config();

const seed = async () => {
  try {
    await connectDB();

    logger.info('Seeding database...');

    // Clear existing data (CAUTION: This deletes all data!)
    await Promise.all([
      User.deleteMany({}),
      Question.deleteMany({}),
      Exam.deleteMany({}),
      Circular.deleteMany({}),
    ]);

    logger.info('Cleared existing data');

    // Create admin user
    const admin = await User.create({
      firstName: 'Admin',
      lastName: 'User',
      email: 'admin@bootcamp.com',
      phone: '+8801712345678',
      password: 'Admin@123',
      role: 'admin',
      isEmailVerified: true,
      isPhoneVerified: true,
    });

    logger.info('Admin user created: admin@bootcamp.com / Admin@123');

    // Create sample student
    const student = await User.create({
      firstName: 'John',
      lastName: 'Doe',
      email: 'student@bootcamp.com',
      phone: '+8801812345678',
      password: 'Student@123',
      role: 'student',
      isEmailVerified: true,
    });

    logger.info('Sample student created: student@bootcamp.com / Student@123');

    // Create sample questions
    const subjects = ['math', 'english', 'general_knowledge', 'banking', 'ict'];
    const difficulties = ['easy', 'medium', 'hard'];
    const sampleQuestions = [];

    for (let i = 0; i < 100; i += 1) {
      const subject = subjects[i % subjects.length];
      const difficulty = difficulties[i % difficulties.length];

      sampleQuestions.push({
        questionText: `Sample ${subject} question #${i + 1}: What is the answer to this ${difficulty} question?`,
        questionType: 'mcq',
        subject,
        difficulty,
        options: [
          { text: 'Option A', isCorrect: false },
          { text: 'Option B', isCorrect: false },
          { text: 'Option C (Correct)', isCorrect: true },
          { text: 'Option D', isCorrect: false },
        ],
        correctAnswer: 2,
        explanation: `This is the explanation for question #${i + 1}.`,
        marks: 1,
        isActive: true,
        isVerified: true,
        createdBy: admin._id,
        verifiedBy: admin._id,
        verifiedAt: new Date(),
      });
    }

    const questions = await Question.insertMany(sampleQuestions);
    logger.info(`Created ${questions.length} sample questions`);

    // Create sample exams
    const exams = [
      {
        title: 'General Banking Exam - Practice Test 1',
        titleBn: 'সাধারণ ব্যাংকিং পরীক্ষা - অনুশীলন পরীক্ষা ১',
        description: 'Comprehensive practice test covering all subjects for private bank job preparation.',
        examType: 'practice',
        category: 'general',
        sections: [
          {
            name: 'Mathematics',
            nameBn: 'গণিত',
            subject: 'math',
            questionsCount: 15,
            marksPerQuestion: 1,
            negativeMarking: { enabled: true, marksPerWrong: 0.25 },
            difficulty: 'mixed',
          },
          {
            name: 'English',
            nameBn: 'ইংরেজি',
            subject: 'english',
            questionsCount: 15,
            marksPerQuestion: 1,
            negativeMarking: { enabled: true, marksPerWrong: 0.25 },
            difficulty: 'mixed',
          },
          {
            name: 'General Knowledge',
            nameBn: 'সাধারণ জ্ঞান',
            subject: 'general_knowledge',
            questionsCount: 10,
            marksPerQuestion: 1,
            negativeMarking: { enabled: false },
            difficulty: 'mixed',
          },
          {
            name: 'Banking',
            nameBn: 'ব্যাংকিং',
            subject: 'banking',
            questionsCount: 10,
            marksPerQuestion: 1,
            negativeMarking: { enabled: true, marksPerWrong: 0.25 },
            difficulty: 'mixed',
          },
        ],
        totalQuestions: 50,
        totalMarks: 50,
        duration: 60,
        passingMarks: 30,
        pricing: {
          isFree: true,
        },
        availability: {
          isPublished: true,
          publishedAt: new Date(),
        },
        createdBy: admin._id,
      },
      {
        title: 'Mock Exam - Brac Bank 2024',
        description: 'Mock test simulating Brac Bank recruitment exam pattern.',
        examType: 'mock',
        category: 'bank_specific',
        targetBank: 'Brac Bank',
        sections: [
          {
            name: 'Quantitative Aptitude',
            subject: 'math',
            questionsCount: 20,
            marksPerQuestion: 1,
            negativeMarking: { enabled: true, marksPerWrong: 0.25 },
          },
          {
            name: 'English Proficiency',
            subject: 'english',
            questionsCount: 20,
            marksPerQuestion: 1,
            negativeMarking: { enabled: true, marksPerWrong: 0.25 },
          },
        ],
        totalQuestions: 40,
        totalMarks: 40,
        duration: 45,
        passingMarks: 25,
        pricing: {
          isFree: false,
          price: 100,
          currency: 'BDT',
        },
        availability: {
          isPublished: true,
          publishedAt: new Date(),
        },
        createdBy: admin._id,
      },
    ];

    const createdExams = await Exam.create(exams);
    logger.info(`Created ${createdExams.length} sample exams`);

    // Create sample circulars
    const circulars = [
      {
        title: 'Brac Bank Limited - Management Trainee Officer (MTO)',
        bankName: 'Brac Bank Limited',
        position: 'Management Trainee Officer',
        vacancies: 50,
        jobType: 'full_time',
        location: {
          isNationwide: true,
          divisions: ['Dhaka', 'Chittagong', 'Sylhet'],
        },
        salary: {
          min: 40000,
          max: 60000,
          currency: 'BDT',
        },
        eligibility: {
          education: {
            degree: ['BBA', 'MBA', 'BSc'],
            minimumCGPA: 3.0,
          },
          experience: {
            required: false,
            minimumYears: 0,
          },
          ageLimit: {
            max: 30,
          },
        },
        applicationDeadline: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days from now
        publishedDate: new Date(),
        description: 'Brac Bank is looking for dynamic and talented fresh graduates for MTO positions.',
        applicationProcess: 'Apply online through the official Brac Bank career portal.',
        applicationLink: 'https://www.bracbank.com/careers',
        status: 'published',
        priority: 'featured',
        category: 'private',
        createdBy: admin._id,
      },
      {
        title: 'Dutch-Bangla Bank - Senior Officer (Cash)',
        bankName: 'Dutch-Bangla Bank',
        position: 'Senior Officer (Cash)',
        vacancies: 100,
        jobType: 'full_time',
        location: {
          isNationwide: true,
        },
        applicationDeadline: new Date(Date.now() + 20 * 24 * 60 * 60 * 1000),
        publishedDate: new Date(),
        description: 'DBBL is seeking experienced candidates for Senior Officer positions.',
        applicationProcess: 'Send CV to career@dutchbanglabank.com',
        status: 'published',
        createdBy: admin._id,
      },
    ];

    const createdCirculars = await Circular.create(circulars);
    logger.info(`Created ${createdCirculars.length} sample circulars`);

    // Create system settings
    const settings = [
      {
        key: 'site_name',
        value: 'Private Bank Bootcamp',
        category: 'general',
        isPublic: true,
      },
      {
        key: 'default_exam_duration',
        value: 60,
        category: 'exam',
        description: 'Default exam duration in minutes',
      },
      {
        key: 'enable_negative_marking',
        value: true,
        category: 'exam',
      },
      {
        key: 'negative_mark_percentage',
        value: 0.25,
        category: 'exam',
      },
    ];

    await Settings.insertMany(settings);
    logger.info('Created system settings');

    logger.info('✅ Database seeded successfully!');
    logger.info('\nLogin Credentials:');
    logger.info('Admin: admin@bootcamp.com / Admin@123');
    logger.info('Student: student@bootcamp.com / Student@123');

    process.exit(0);
  } catch (error) {
    logger.error('Error seeding database:', error);
    process.exit(1);
  }
};

seed();
