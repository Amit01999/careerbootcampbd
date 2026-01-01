import mongoose from 'mongoose';
import Question from '../models/Question.js';
import Exam from '../models/Exam.js';
import User from '../models/User.js';
import modelTest1Questions from './modelTest1Questions.js';
import modelTest2Questions from './modelTest2Questions.js';
import modelTest3Questions from './modelTest3Questions.js';
import modelTest4Questions from './modelTest4Questions.js';
import dotenv from 'dotenv';

dotenv.config();

// Subject mapping to match schema enum values
const subjectMap = {
  'English': 'english',
  'Mathematics': 'math',
  'General Knowledge': 'general_knowledge',
  'ICT': 'ict',
  'Bangla': 'bangla',
  'Banking': 'banking',
  'Reasoning': 'reasoning',
  'Viva': 'viva',
  'Analytical Ability': 'reasoning',
  'Mental Ability': 'reasoning',
  'Analytical Reasoning': 'reasoning',
  'Logical Reasoning': 'reasoning'
};

// Transform questions to match the schema
const transformQuestion = (q, createdBy) => {
  return {
    questionText: q.questionText,
    questionTextBn: q.questionTextBn,
    questionType: q.questionType || 'mcq',
    subject: subjectMap[q.subject] || q.subject.toLowerCase(),
    topic: q.topic,
    difficulty: q.difficulty.toLowerCase(),
    options: q.options.map((opt, index) => ({
      text: opt,
      isCorrect: index === q.correctAnswer
    })),
    correctAnswer: q.correctAnswer, // Required field, will be updated by pre-save hook
    explanation: q.explanation,
    explanationBn: q.explanationBn,
    marks: q.marks || 1,
    negativeMarks: q.negativeMarks || 0,
    tags: q.tags || [],
    isActive: q.isActive !== undefined ? q.isActive : true,
    isVerified: q.isVerified !== undefined ? q.isVerified : true,
    createdBy
  };
};

const seedModelTests = async () => {
  try {
    // Connect to MongoDB
    console.log('Connecting to MongoDB...');
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✓ Connected to MongoDB');

    // Create or find system admin user
    console.log('\nSetting up system admin user...');
    let systemAdmin = await User.findOne({ email: 'system@privatebankbootcamp.com' });
    if (!systemAdmin) {
      systemAdmin = await User.create({
        firstName: 'System',
        lastName: 'Admin',
        email: 'system@privatebankbootcamp.com',
        phone: '+8801700000000',
        password: 'SystemAdmin@123',
        role: 'super_admin',
        isEmailVerified: true,
        isPhoneVerified: true,
        isActive: true
      });
      console.log('✓ Created system admin user');
    } else {
      console.log('✓ Found existing system admin user');
    }

    // Clear existing data
    console.log('\nClearing existing model test data...');
    await Question.deleteMany({ tags: { $in: ['model-test-1', 'model-test-2', 'model-test-3', 'model-test-4'] } });
    await Exam.deleteMany({ title: { $regex: /^Model Test/i } });
    console.log('✓ Cleared existing model test data');

    // Seed Model Test 1
    console.log('\nSeeding Model Test 1 questions...');
    const test1QuestionsWithTags = modelTest1Questions.map(q => transformQuestion({
      ...q,
      tags: [...(q.tags || []), 'model-test-1']
    }, systemAdmin._id));
    const insertedTest1Questions = await Question.insertMany(test1QuestionsWithTags);
    console.log(`✓ Inserted ${insertedTest1Questions.length} questions for Model Test 1`);

    const exam1 = await Exam.create({
      title: 'Model Test 1 - Bank Job Preparation',
      description: 'Complete model test covering English, Mathematics, General Knowledge, and ICT. Based on Bank Job recruitment exam pattern with 60 questions across multiple subjects.',
      examType: 'mock',
      category: 'general',
      sections: [
        {
          name: 'English',
          subject: 'english',
          questionsCount: 15,
          marksPerQuestion: 1,
          negativeMarking: { enabled: true, marksPerWrong: 0.25 },
          difficulty: 'mixed',
          tags: ['model-test-1']
        },
        {
          name: 'Mathematics',
          subject: 'math',
          questionsCount: 20,
          marksPerQuestion: 1,
          negativeMarking: { enabled: true, marksPerWrong: 0.25 },
          difficulty: 'mixed',
          tags: ['model-test-1']
        },
        {
          name: 'General Knowledge',
          subject: 'general_knowledge',
          questionsCount: 15,
          marksPerQuestion: 1,
          negativeMarking: { enabled: true, marksPerWrong: 0.25 },
          difficulty: 'mixed',
          tags: ['model-test-1']
        },
        {
          name: 'ICT',
          subject: 'ict',
          questionsCount: 10,
          marksPerQuestion: 1,
          negativeMarking: { enabled: true, marksPerWrong: 0.25 },
          difficulty: 'mixed',
          tags: ['model-test-1']
        }
      ],
      totalQuestions: 60,
      totalMarks: 60,
      passingMarks: 33,
      duration: 60,
      instructions: 'Read each question carefully before answering.\nEach question carries 1 mark.\nThere is negative marking of 0.25 marks for each wrong answer.\nThe exam must be completed within 60 minutes.\nDo not refresh the page during the exam.\nAll questions are mandatory.',
      pricing: {
        isFree: false,
        price: 149,
        currency: 'BDT'
      },
      availability: {
        isPublished: true,
        publishedAt: new Date()
      },
      tags: ['model-test', 'bank-job-preparation'],
      isActive: true,
      createdBy: systemAdmin._id
    });
    console.log(`✓ Created Exam: ${exam1.title}`);

    // Seed Model Test 2
    console.log('\nSeeding Model Test 2 questions...');
    const test2QuestionsWithTags = modelTest2Questions.map(q => transformQuestion({
      ...q,
      tags: [...(q.tags || []), 'model-test-2']
    }, systemAdmin._id));
    const insertedTest2Questions = await Question.insertMany(test2QuestionsWithTags);
    console.log(`✓ Inserted ${insertedTest2Questions.length} questions for Model Test 2`);

    const exam2 = await Exam.create({
      title: 'Model Test 2 - Bank Job Preparation',
      description: 'Comprehensive model test featuring detailed mathematical solutions and explanations. Covers English, Mathematics, General Knowledge, and ICT with focus on bank recruitment patterns.',
      examType: 'mock',
      category: 'general',
      sections: [
        {
          name: 'English',
          subject: 'english',
          questionsCount: 15,
          marksPerQuestion: 1,
          negativeMarking: { enabled: true, marksPerWrong: 0.25 },
          difficulty: 'mixed',
          tags: ['model-test-2']
        },
        {
          name: 'Mathematics',
          subject: 'math',
          questionsCount: 20,
          marksPerQuestion: 1,
          negativeMarking: { enabled: true, marksPerWrong: 0.25 },
          difficulty: 'mixed',
          tags: ['model-test-2']
        },
        {
          name: 'General Knowledge',
          subject: 'general_knowledge',
          questionsCount: 15,
          marksPerQuestion: 1,
          negativeMarking: { enabled: true, marksPerWrong: 0.25 },
          difficulty: 'mixed',
          tags: ['model-test-2']
        },
        {
          name: 'ICT',
          subject: 'ict',
          questionsCount: 10,
          marksPerQuestion: 1,
          negativeMarking: { enabled: true, marksPerWrong: 0.25 },
          difficulty: 'mixed',
          tags: ['model-test-2']
        }
      ],
      totalQuestions: 60,
      totalMarks: 60,
      passingMarks: 33,
      duration: 60,
      instructions: 'Read each question carefully before answering.\nEach question carries 1 mark.\nThere is negative marking of 0.25 marks for each wrong answer.\nThe exam must be completed within 60 minutes.\nDo not refresh the page during the exam.\nAll questions are mandatory.',
      pricing: {
        isFree: false,
        price: 149,
        currency: 'BDT'
      },
      availability: {
        isPublished: true,
        publishedAt: new Date()
      },
      tags: ['model-test', 'bank-job-preparation'],
      isActive: true,
      createdBy: systemAdmin._id
    });
    console.log(`✓ Created Exam: ${exam2.title}`);

    // Seed Model Test 3
    console.log('\nSeeding Model Test 3 questions...');
    const test3QuestionsWithTags = modelTest3Questions.map(q => transformQuestion({
      ...q,
      tags: [...(q.tags || []), 'model-test-3']
    }, systemAdmin._id));
    const insertedTest3Questions = await Question.insertMany(test3QuestionsWithTags);
    console.log(`✓ Inserted ${insertedTest3Questions.length} questions for Model Test 3`);

    const exam3 = await Exam.create({
      title: 'Model Test 3 - Bank Job Preparation',
      description: 'Bilingual model test with both Bangla and English sections. Comprehensive coverage of all subjects with focus on analytical ability and reasoning skills.',
      examType: 'mock',
      category: 'general',
      sections: [
        {
          name: 'Bangla',
          subject: 'bangla',
          questionsCount: 10,
          marksPerQuestion: 1,
          negativeMarking: { enabled: true, marksPerWrong: 0.25 },
          difficulty: 'mixed',
          tags: ['model-test-3']
        },
        {
          name: 'English',
          subject: 'english',
          questionsCount: 10,
          marksPerQuestion: 1,
          negativeMarking: { enabled: true, marksPerWrong: 0.25 },
          difficulty: 'mixed',
          tags: ['model-test-3']
        },
        {
          name: 'Mathematics',
          subject: 'math',
          questionsCount: 20,
          marksPerQuestion: 1,
          negativeMarking: { enabled: true, marksPerWrong: 0.25 },
          difficulty: 'mixed',
          tags: ['model-test-3']
        },
        {
          name: 'General Knowledge',
          subject: 'general_knowledge',
          questionsCount: 20,
          marksPerQuestion: 1,
          negativeMarking: { enabled: true, marksPerWrong: 0.25 },
          difficulty: 'mixed',
          tags: ['model-test-3']
        }
      ],
      totalQuestions: 60,
      totalMarks: 60,
      passingMarks: 33,
      duration: 60,
      instructions: 'Read each question carefully before answering.\nEach question carries 1 mark.\nThere is negative marking of 0.25 marks for each wrong answer.\nThe exam must be completed within 60 minutes.\nDo not refresh the page during the exam.\nAll questions are mandatory.',
      pricing: {
        isFree: false,
        price: 149,
        currency: 'BDT'
      },
      availability: {
        isPublished: true,
        publishedAt: new Date()
      },
      tags: ['model-test', 'bank-job-preparation', 'bilingual'],
      isActive: true,
      createdBy: systemAdmin._id
    });
    console.log(`✓ Created Exam: ${exam3.title}`);

    // Seed Model Test 4
    console.log('\nSeeding Model Test 4 questions...');
    const test4QuestionsWithTags = modelTest4Questions.map(q => transformQuestion({
      ...q,
      tags: [...(q.tags || []), 'model-test-4']
    }, systemAdmin._id));
    const insertedTest4Questions = await Question.insertMany(test4QuestionsWithTags);
    console.log(`✓ Inserted ${insertedTest4Questions.length} questions for Model Test 4`);

    const exam4 = await Exam.create({
      title: 'Model Test 4 - Bank Job Preparation',
      description: 'Advanced model test with challenging questions across all subjects. Includes current affairs, banking awareness, and analytical reasoning questions based on latest exam patterns.',
      examType: 'mock',
      category: 'general',
      sections: [
        {
          name: 'English',
          subject: 'english',
          questionsCount: 10,
          marksPerQuestion: 1,
          negativeMarking: { enabled: true, marksPerWrong: 0.25 },
          difficulty: 'mixed',
          tags: ['model-test-4']
        },
        {
          name: 'Bangla',
          subject: 'bangla',
          questionsCount: 10,
          marksPerQuestion: 1,
          negativeMarking: { enabled: true, marksPerWrong: 0.25 },
          difficulty: 'mixed',
          tags: ['model-test-4']
        },
        {
          name: 'Mathematics',
          subject: 'math',
          questionsCount: 20,
          marksPerQuestion: 1,
          negativeMarking: { enabled: true, marksPerWrong: 0.25 },
          difficulty: 'mixed',
          tags: ['model-test-4']
        },
        {
          name: 'General Knowledge',
          subject: 'general_knowledge',
          questionsCount: 20,
          marksPerQuestion: 1,
          negativeMarking: { enabled: true, marksPerWrong: 0.25 },
          difficulty: 'mixed',
          tags: ['model-test-4']
        }
      ],
      totalQuestions: 60,
      totalMarks: 60,
      passingMarks: 33,
      duration: 60,
      instructions: 'Read each question carefully before answering.\nEach question carries 1 mark.\nThere is negative marking of 0.25 marks for each wrong answer.\nThe exam must be completed within 60 minutes.\nDo not refresh the page during the exam.\nAll questions are mandatory.',
      pricing: {
        isFree: false,
        price: 149,
        currency: 'BDT'
      },
      availability: {
        isPublished: true,
        publishedAt: new Date()
      },
      tags: ['model-test', 'bank-job-preparation', 'bilingual', 'advanced'],
      isActive: true,
      createdBy: systemAdmin._id
    });
    console.log(`✓ Created Exam: ${exam4.title}`);

    // Summary
    console.log('\n' + '='.repeat(60));
    console.log('DATABASE SEEDING COMPLETED SUCCESSFULLY');
    console.log('='.repeat(60));
    console.log(`Total Questions Inserted: ${
      insertedTest1Questions.length +
      insertedTest2Questions.length +
      insertedTest3Questions.length +
      insertedTest4Questions.length
    }`);
    console.log(`Total Exams Created: 4`);
    console.log('\nExam Details:');
    console.log(`  1. ${exam1.title} (${exam1.totalQuestions} questions)`);
    console.log(`  2. ${exam2.title} (${exam2.totalQuestions} questions)`);
    console.log(`  3. ${exam3.title} (${exam3.totalQuestions} questions)`);
    console.log(`  4. ${exam4.title} (${exam4.totalQuestions} questions)`);
    console.log('='.repeat(60));

    // Close connection
    await mongoose.connection.close();
    console.log('\n✓ Database connection closed');
    process.exit(0);
  } catch (error) {
    console.error('\n❌ Error seeding database:', error);
    console.error(error.stack);
    process.exit(1);
  }
};

// Run the seeding script
if (import.meta.url === `file://${process.argv[1]}`.replace(/\\/g, '/')) {
  console.log('\n' + '='.repeat(60));
  console.log('STARTING DATABASE SEED: MODEL TESTS');
  console.log('='.repeat(60));
  seedModelTests();
}

export default seedModelTests;
