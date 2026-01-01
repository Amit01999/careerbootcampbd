// i18n configuration for Bangla and English support
export const translations = {
  en: {
    nav: {
      home: 'Home',
      exams: 'Exams',
      circulars: 'Job Circulars',
      results: 'My Results',
      dashboard: 'Dashboard',
      profile: 'Profile',
      login: 'Login',
      signup: 'Sign Up',
      logout: 'Logout',
    },
    hero: {
      title: 'Ace Your Private Bank Job Exam',
      subtitle: 'Practice with real exam patterns. Get instant results. Track your progress.',
      cta: 'Start Free Demo',
      secondaryCta: 'Browse Exams',
    },
    dashboard: {
      welcome: 'Welcome back',
      stats: {
        examsCompleted: 'Exams Completed',
        avgScore: 'Average Score',
        timeSpent: 'Time Spent',
        rank: 'Your Rank',
      },
    },
    exam: {
      duration: 'Duration',
      questions: 'Questions',
      marks: 'Marks',
      negativeMarking: 'Negative Marking',
      start: 'Start Exam',
      submit: 'Submit Exam',
      timeRemaining: 'Time Remaining',
      question: 'Question',
      of: 'of',
    },
  },
  bn: {
    nav: {
      home: 'হোম',
      exams: 'পরীক্ষা',
      circulars: 'চাকরির বিজ্ঞপ্তি',
      results: 'আমার ফলাফল',
      dashboard: 'ড্যাশবোর্ড',
      profile: 'প্রোফাইল',
      login: 'লগইন',
      signup: 'সাইন আপ',
      logout: 'লগআউট',
    },
    hero: {
      title: 'প্রাইভেট ব্যাংক চাকরি পরীক্ষায় সফল হন',
      subtitle: 'বাস্তব পরীক্ষার ধরন অনুশীলন করুন। তাৎক্ষণিক ফলাফল পান। আপনার অগ্রগতি ট্র্যাক করুন।',
      cta: 'ফ্রি ডেমো শুরু করুন',
      secondaryCta: 'পরীক্ষা ব্রাউজ করুন',
    },
    dashboard: {
      welcome: 'স্বাগতম',
      stats: {
        examsCompleted: 'সম্পন্ন পরীক্ষা',
        avgScore: 'গড় স্কোর',
        timeSpent: 'ব্যয়িত সময়',
        rank: 'আপনার র‍্যাঙ্ক',
      },
    },
    exam: {
      duration: 'সময়কাল',
      questions: 'প্রশ্ন',
      marks: 'নম্বর',
      negativeMarking: 'নেগেটিভ মার্কিং',
      start: 'পরীক্ষা শুরু করুন',
      submit: 'পরীক্ষা জমা দিন',
      timeRemaining: 'অবশিষ্ট সময়',
      question: 'প্রশ্ন',
      of: 'এর',
    },
  },
};

export type Language = 'en' | 'bn';
export type TranslationKey = keyof typeof translations.en;
