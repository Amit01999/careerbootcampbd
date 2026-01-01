export interface BankData {
  id: string;
  name: string;
  shortName: string;
  logo: string;
  color: string;
  bgColor: string;
  description: string;
  positions: string[];
  overview: string;
  eligibility: string[];
  stages: RecruitmentStage[];
  resources: {
    mockTests: Resource[];
    previousYears: Resource[];
    books: Resource[];
  };
}

export interface RecruitmentStage {
  number: number;
  title: string;
  description: string;
  duration: string;
  tips: string[];
}

export interface Resource {
  id: number;
  title: string;
  questions?: number;
  duration?: string;
  year?: number;
  author?: string;
}

export const banksData: BankData[] = [
  {
    id: 'mtb',
    name: 'Mutual Trust Bank',
    shortName: 'MTB',
    logo: '🏦',
    color: '#2E81F7',
    bgColor: 'bg-blue-50',
    description: 'One of Bangladesh\'s leading private commercial banks',
    positions: ['Management Trainee Officer (MTO)'],
    overview: 'The Mutual Trust Bank Management Trainee Officer (MTO) program is designed to develop future banking leaders. MTOs undergo comprehensive training across various departments and are fast-tracked for managerial positions.',
    eligibility: [
      'Bachelor\'s degree in any discipline with minimum CGPA 3.0',
      'No third division/class in academic career',
      'Age limit: Maximum 27 years',
      'Excellent communication skills in English and Bangla',
    ],
    stages: [
      {
        number: 1,
        title: 'Application Submission',
        description: 'Submit your application through MTB\'s official career portal. Ensure all required documents are uploaded including your CV, academic certificates, and national ID.',
        duration: '2 weeks',
        tips: [
          'Double-check all information before submission',
          'Use a professional email address',
          'Keep your CV concise and relevant (max 2 pages)',
        ],
      },
      {
        number: 2,
        title: 'Written Examination',
        description: 'MCQ-based test covering General Knowledge, English, Mathematics, Analytical Ability, and Banking Awareness. The exam typically consists of 100 questions to be completed in 90 minutes.',
        duration: '1 day',
        tips: [
          'Practice time management - allocate 50 seconds per question',
          'Focus on current affairs and Bangladesh banking sector',
          'Review basic math formulas and shortcuts',
        ],
      },
      {
        number: 3,
        title: 'Viva Voce',
        description: 'Face-to-face interview with a panel of senior MTB executives. Topics include your background, banking knowledge, current affairs, and behavioral questions.',
        duration: '15-20 minutes',
        tips: [
          'Research MTB\'s recent initiatives and financial performance',
          'Prepare answers for common behavioral questions',
          'Dress professionally and arrive 15 minutes early',
        ],
      },
      {
        number: 4,
        title: 'Final Selection',
        description: 'Successful candidates will receive an offer letter via email and phone call. Medical examination and background verification will be conducted before joining.',
        duration: '2-3 weeks',
        tips: [
          'Keep your phone and email accessible',
          'Prepare all original documents for verification',
          'Be ready to join within the specified timeframe',
        ],
      },
    ],
    resources: {
      mockTests: [
        { id: 1, title: 'MTB MTO Full Mock Test 2025', questions: 100, duration: '90 min' },
        { id: 2, title: 'Banking Awareness Practice Set', questions: 50, duration: '45 min' },
        { id: 3, title: 'Analytical Ability Test', questions: 40, duration: '40 min' },
      ],
      previousYears: [
        { id: 1, title: 'MTB MTO Question 2024', year: 2024 },
        { id: 2, title: 'MTB MTO Question 2023', year: 2023 },
        { id: 3, title: 'MTB MTO Question 2022', year: 2022 },
      ],
      books: [
        { id: 1, title: 'Banking Recruitment Guide Bangladesh', author: 'Prof. Rahman' },
        { id: 2, title: 'Competitive Exam Preparation', author: 'Dr. Ahmed' },
        { id: 3, title: 'Current Affairs 2025', author: 'BankPrep Editorial' },
      ],
    },
  },
  {
    id: 'brac-bank',
    name: 'BRAC Bank',
    shortName: 'BRAC',
    logo: '🏢',
    color: '#4CAF50',
    bgColor: 'bg-green-50',
    description: 'Leading SME-focused commercial bank in Bangladesh',
    positions: ['Young Leaders Program (YLP)'],
    overview: 'BRAC Bank\'s Young Leaders Program (YLP) is a flagship initiative to nurture the next generation of banking professionals. The program offers comprehensive training, mentorship, and accelerated career growth opportunities.',
    eligibility: [
      'Bachelor\'s or Master\'s degree from a reputed university',
      'Minimum CGPA 3.5 out of 4.0',
      'Age limit: Maximum 26 years',
      'Strong leadership and communication skills',
    ],
    stages: [
      {
        number: 1,
        title: 'Online Application',
        description: 'Apply through BRAC Bank\'s career portal with your detailed CV, academic transcripts, and a cover letter explaining your interest in banking.',
        duration: '3 weeks',
        tips: [
          'Highlight leadership experiences and achievements',
          'Tailor your cover letter to BRAC Bank\'s values',
          'Include extracurricular activities and community involvement',
        ],
      },
      {
        number: 2,
        title: 'Aptitude Test',
        description: 'Comprehensive test assessing numerical, verbal, and logical reasoning abilities. Also includes sections on banking awareness and current affairs.',
        duration: '2 hours',
        tips: [
          'Practice online aptitude tests beforehand',
          'Stay updated on financial sector news',
          'Review BRAC Bank\'s recent achievements and CSR activities',
        ],
      },
      {
        number: 3,
        title: 'Assessment Center',
        description: 'Group discussions, case studies, and individual presentations to evaluate teamwork, problem-solving, and communication skills.',
        duration: '1 full day',
        tips: [
          'Be an active listener and respectful team player',
          'Support your arguments with data and examples',
          'Demonstrate critical thinking and creativity',
        ],
      },
      {
        number: 4,
        title: 'Final Interview',
        description: 'One-on-one interview with senior management focusing on cultural fit, career aspirations, and banking knowledge.',
        duration: '30-45 minutes',
        tips: [
          'Be authentic and show genuine passion for banking',
          'Prepare questions about the YLP program',
          'Demonstrate awareness of BRAC Bank\'s mission and vision',
        ],
      },
    ],
    resources: {
      mockTests: [
        { id: 1, title: 'BRAC YLP Aptitude Test 2025', questions: 120, duration: '120 min' },
        { id: 2, title: 'Logical Reasoning Practice', questions: 60, duration: '60 min' },
        { id: 3, title: 'Banking Sector Knowledge Test', questions: 50, duration: '45 min' },
      ],
      previousYears: [
        { id: 1, title: 'BRAC YLP Question 2024', year: 2024 },
        { id: 2, title: 'BRAC YLP Question 2023', year: 2023 },
      ],
      books: [
        { id: 1, title: 'Leadership in Banking', author: 'Dr. Karim' },
        { id: 2, title: 'Financial Services in Bangladesh', author: 'Prof. Hasan' },
        { id: 3, title: 'Aptitude Test Mastery', author: 'BankPrep Team' },
      ],
    },
  },
  {
    id: 'ebl',
    name: 'Eastern Bank Limited',
    shortName: 'EBL',
    logo: '🏛️',
    color: '#FF9800',
    bgColor: 'bg-orange-50',
    description: 'Premier banking institution with a focus on innovation',
    positions: ['Future Leader', 'Trainee Assistant Officer (TAO)'],
    overview: 'Eastern Bank Limited\'s Future Leader program aims to build a pipeline of talented professionals who will drive the bank\'s growth and digital transformation. The program combines rigorous training with hands-on experience.',
    eligibility: [
      'Bachelor\'s degree with minimum CGPA 3.25',
      'No third division in academic records',
      'Age limit: Maximum 28 years',
      'Proficiency in English (written and spoken)',
    ],
    stages: [
      {
        number: 1,
        title: 'Application & Screening',
        description: 'Submit application with all academic credentials, professional references, and a statement of purpose.',
        duration: '2-3 weeks',
        tips: [
          'Write a compelling statement of purpose',
          'Choose references who can vouch for your skills',
          'Ensure all documents are properly scanned and labeled',
        ],
      },
      {
        number: 2,
        title: 'Written Test',
        description: 'Comprehensive exam covering quantitative aptitude, English proficiency, general knowledge, and banking fundamentals.',
        duration: '90 minutes',
        tips: [
          'Practice previous years\' question papers',
          'Brush up on economic indicators and financial terms',
          'Time management is crucial - don\'t spend too long on any single question',
        ],
      },
      {
        number: 3,
        title: 'Interview',
        description: 'Panel interview assessing technical knowledge, personality traits, and fit with EBL\'s culture.',
        duration: '20-30 minutes',
        tips: [
          'Study EBL\'s digital banking initiatives',
          'Prepare examples demonstrating your problem-solving skills',
          'Show enthusiasm for continuous learning',
        ],
      },
    ],
    resources: {
      mockTests: [
        { id: 1, title: 'EBL Future Leader Mock Test', questions: 100, duration: '90 min' },
        { id: 2, title: 'English Proficiency Test', questions: 50, duration: '45 min' },
      ],
      previousYears: [
        { id: 1, title: 'EBL Question Paper 2024', year: 2024 },
        { id: 2, title: 'EBL Question Paper 2023', year: 2023 },
      ],
      books: [
        { id: 1, title: 'Digital Banking Revolution', author: 'Prof. Islam' },
        { id: 2, title: 'Bank Exam Success Guide', author: 'Dr. Chowdhury' },
      ],
    },
  },
  {
    id: 'ific',
    name: 'IFIC Bank',
    shortName: 'IFIC',
    logo: '💼',
    color: '#9C27B0',
    bgColor: 'bg-purple-50',
    description: 'Trusted banking partner with a strong retail presence',
    positions: ['Trainee Support Officer (TSO)'],
    overview: 'IFIC Bank\'s Trainee Support Officer program provides entry-level banking professionals with foundational knowledge and practical skills to excel in customer service and operations.',
    eligibility: [
      'Bachelor\'s degree in any discipline',
      'Minimum CGPA 3.0 out of 4.0',
      'Age limit: Maximum 26 years',
      'Good communication and interpersonal skills',
    ],
    stages: [
      {
        number: 1,
        title: 'Application',
        description: 'Complete online application form with CV and educational certificates.',
        duration: '2 weeks',
        tips: [
          'Fill out all fields accurately',
          'Highlight customer service experience if any',
          'Mention language proficiency (English and Bangla)',
        ],
      },
      {
        number: 2,
        title: 'Written Exam',
        description: 'MCQ test on general banking, mathematics, English, and general knowledge.',
        duration: '60 minutes',
        tips: [
          'Review basic banking terminology',
          'Practice mental math calculations',
          'Stay updated on current national and international events',
        ],
      },
      {
        number: 3,
        title: 'Viva',
        description: 'Interview to assess communication skills and cultural fit.',
        duration: '15 minutes',
        tips: [
          'Be confident and courteous',
          'Show willingness to work in different branches',
          'Express interest in learning about banking operations',
        ],
      },
    ],
    resources: {
      mockTests: [
        { id: 1, title: 'IFIC TSO Practice Test', questions: 80, duration: '60 min' },
      ],
      previousYears: [
        { id: 1, title: 'IFIC TSO Question 2024', year: 2024 },
      ],
      books: [
        { id: 1, title: 'Banking Basics', author: 'Prof. Alam' },
      ],
    },
  },
  {
    id: 'mercantile',
    name: 'Mercantile Bank',
    shortName: 'MBL',
    logo: '🏦',
    color: '#00BCD4',
    bgColor: 'bg-cyan-50',
    description: 'Dynamic bank serving corporate and retail clients',
    positions: ['Management Trainee Officer (MTO)'],
    overview: 'Mercantile Bank\'s MTO program is designed to groom talented individuals for leadership roles through structured training and mentorship.',
    eligibility: [
      'Bachelor\'s or Master\'s degree with minimum CGPA 3.0',
      'No third division/class in SSC, HSC, or graduation',
      'Age limit: Maximum 27 years',
    ],
    stages: [
      {
        number: 1,
        title: 'Application',
        description: 'Online application with CV and supporting documents.',
        duration: '2 weeks',
        tips: ['Be precise and concise in your application'],
      },
      {
        number: 2,
        title: 'Written Test',
        description: 'Test on aptitude, English, and general knowledge.',
        duration: '90 minutes',
        tips: ['Focus on speed and accuracy'],
      },
      {
        number: 3,
        title: 'Interview',
        description: 'Panel interview to evaluate suitability.',
        duration: '20 minutes',
        tips: ['Research the bank\'s services and market position'],
      },
    ],
    resources: {
      mockTests: [
        { id: 1, title: 'MBL MTO Full Test', questions: 100, duration: '90 min' },
      ],
      previousYears: [
        { id: 1, title: 'MBL Question 2024', year: 2024 },
      ],
      books: [
        { id: 1, title: 'Bank Recruitment Preparation', author: 'Dr. Roy' },
      ],
    },
  },
  {
    id: 'modhumoti',
    name: 'Modhumoti Bank',
    shortName: 'Modhumoti',
    logo: '🏢',
    color: '#3F51B5',
    bgColor: 'bg-indigo-50',
    description: 'Growing bank with a focus on SME and retail banking',
    positions: ['Management Trainee Officer (MTO)'],
    overview: 'Modhumoti Bank\'s MTO program offers exciting opportunities for fresh graduates to kickstart their banking careers.',
    eligibility: [
      'Bachelor\'s degree with minimum CGPA 3.0',
      'Age limit: Maximum 27 years',
    ],
    stages: [
      {
        number: 1,
        title: 'Application',
        description: 'Submit application online.',
        duration: '2 weeks',
        tips: ['Complete all sections of the application form'],
      },
      {
        number: 2,
        title: 'Written Test',
        description: 'Aptitude and knowledge test.',
        duration: '90 minutes',
        tips: ['Prepare well for general knowledge section'],
      },
      {
        number: 3,
        title: 'Interview',
        description: 'Face-to-face interview.',
        duration: '15-20 minutes',
        tips: ['Be honest and confident'],
      },
    ],
    resources: {
      mockTests: [
        { id: 1, title: 'Modhumoti MTO Test', questions: 100, duration: '90 min' },
      ],
      previousYears: [
        { id: 1, title: 'Modhumoti Question 2024', year: 2024 },
      ],
      books: [
        { id: 1, title: 'Banking Preparation Guide', author: 'Prof. Sen' },
      ],
    },
  },
  {
    id: 'one-bank',
    name: 'One Bank PLC',
    shortName: 'One Bank',
    logo: '💼',
    color: '#E91E63',
    bgColor: 'bg-pink-50',
    description: 'Innovative bank with a customer-first approach',
    positions: ['Special Cadre Officer (SCO)'],
    overview: 'One Bank\'s Special Cadre Officer program is tailored for high-potential individuals who aspire to make a significant impact in the banking industry.',
    eligibility: [
      'Master\'s degree preferred, Bachelor\'s with excellent results',
      'Minimum CGPA 3.5',
      'Age limit: Maximum 28 years',
    ],
    stages: [
      {
        number: 1,
        title: 'Application',
        description: 'Apply with detailed CV and transcripts.',
        duration: '3 weeks',
        tips: ['Emphasize academic excellence and leadership roles'],
      },
      {
        number: 2,
        title: 'Assessment',
        description: 'Written test and psychometric assessment.',
        duration: '2 hours',
        tips: ['Be prepared for both technical and personality assessments'],
      },
      {
        number: 3,
        title: 'Interview',
        description: 'Competency-based interview.',
        duration: '30 minutes',
        tips: ['Use the STAR method to answer behavioral questions'],
      },
    ],
    resources: {
      mockTests: [
        { id: 1, title: 'One Bank SCO Test', questions: 120, duration: '120 min' },
      ],
      previousYears: [
        { id: 1, title: 'One Bank Question 2024', year: 2024 },
      ],
      books: [
        { id: 1, title: 'Advanced Banking Concepts', author: 'Dr. Khan' },
      ],
    },
  },
  {
    id: 'trust-bank',
    name: 'Trust Bank PLC',
    shortName: 'Trust Bank',
    logo: '🏛️',
    color: '#795548',
    bgColor: 'bg-amber-50',
    description: 'Reliable banking partner for businesses and individuals',
    positions: ['Management Trainee Officer (MTO)'],
    overview: 'Trust Bank\'s MTO program provides comprehensive training and development opportunities for aspiring banking professionals.',
    eligibility: [
      'Bachelor\'s degree with minimum CGPA 3.0',
      'Age limit: Maximum 27 years',
    ],
    stages: [
      {
        number: 1,
        title: 'Application',
        description: 'Online application submission.',
        duration: '2 weeks',
        tips: ['Submit before the deadline'],
      },
      {
        number: 2,
        title: 'Written Test',
        description: 'MCQ test covering various subjects.',
        duration: '90 minutes',
        tips: ['Practice time management'],
      },
      {
        number: 3,
        title: 'Viva',
        description: 'Interview with panel members.',
        duration: '20 minutes',
        tips: ['Dress formally and be punctual'],
      },
    ],
    resources: {
      mockTests: [
        { id: 1, title: 'Trust Bank MTO Test', questions: 100, duration: '90 min' },
      ],
      previousYears: [
        { id: 1, title: 'Trust Bank Question 2024', year: 2024 },
      ],
      books: [
        { id: 1, title: 'Banking Success Manual', author: 'Prof. Das' },
      ],
    },
  },
  {
    id: 'padma-bank',
    name: 'Padma Bank PLC',
    shortName: 'Padma Bank',
    logo: '🏦',
    color: '#D946EF',
    bgColor: 'bg-fuchsia-50',
    description: 'Progressive private commercial bank focused on customer service and digital innovation.',
    positions: ['Various Banking Positions'],
    overview: 'Padma Bank PLC recruitment process involves submitting an application with CV and photograph via email or online portal, followed by shortlisting and interviews. Final selection is based on qualifications and performance.',
    eligibility: [
      'Relevant educational qualifications from recognized institutions',
      'Good communication skills in English and Bangla',
      'Computer proficiency',
      'Willingness to work anywhere in Bangladesh'
    ],
    stages: [
      {
        number: 1,
        title: 'Application Submission',
        description: 'Submit application online through Padma Bank career page or via email (hrd@padmabankbd.com or career@padmabankbd.com) with CV and recent photograph. Physical applications can be sent to Corporate Head Office at Lotus Kamal Tower-2, Gulshan-1, Dhaka.',
        duration: '2-3 weeks',
        tips: [
          'Ensure all information is accurate and complete',
          'Use a professional email address',
          'Attach a recent passport-size photograph'
        ]
      },
      {
        number: 2,
        title: 'Shortlisting and Interview',
        description: 'Bank reviews applications and shortlists candidates who meet requirements. Shortlisted candidates are called for personal interviews at Corporate Head Office, which may include written tests for some roles.',
        duration: '2-3 weeks',
        tips: [
          'Prepare for both written and oral components',
          'Review banking fundamentals and current affairs',
          'Bring all original documents for verification'
        ]
      },
      {
        number: 3,
        title: 'Selection and Offer',
        description: 'Final selection based on qualifications, experience, and interview performance. Salary and benefits are competitive and commensurate with experience. New employees undergo a probationary period (typically one year) before confirmation.',
        duration: '1-2 weeks',
        tips: [
          'Be prepared to negotiate salary based on your experience',
          'Understand the probationary period requirements',
          'Ask about career growth opportunities'
        ]
      }
    ],
    resources: {
      mockTests: [
        { id: 1, title: 'Padma Bank General Banking Test', questions: 100, duration: '90 min' },
        { id: 2, title: 'Banking Aptitude Practice', questions: 50, duration: '45 min' }
      ],
      previousYears: [
        { id: 1, title: 'Padma Bank Questions 2024', year: 2024 },
        { id: 2, title: 'Padma Bank Questions 2023', year: 2023 }
      ],
      books: [
        { id: 1, title: 'Banking Career Guide Bangladesh', author: 'Prof. Rahman' },
        { id: 2, title: 'Bank Exam Success Manual', author: 'Dr. Ahmed' }
      ]
    }
  },
  {
    id: 'premier-bank',
    name: 'Premier Bank PLC',
    shortName: 'Premier Bank',
    logo: '🏦',
    color: '#10B981',
    bgColor: 'bg-emerald-50',
    description: 'Leading private commercial bank with strong focus on technology and customer service.',
    positions: ['Management Trainee Officer (MTO)', 'Various Officer Positions'],
    overview: 'Premier Bank PLC recruitment involves multi-stage selection including online application, CV screening, written test, multiple interviews, medical examination, and final job offer.',
    eligibility: [
      '4-year graduation or post-graduation with minimum CGPA 3.00/4.00',
      'Minimum GPA 4.50/5.00 in both SSC and HSC',
      'Strong communication skills in Bengali and English',
      'Proficiency in MS Office',
      'Age should not exceed 32 years',
      'Willingness to work anywhere in Bangladesh'
    ],
    stages: [
      {
        number: 1,
        title: 'Inviting Applications',
        description: 'Job openings advertised on official careers website, Bdjobs.com, and Facebook. Submit online application with scanned photograph and educational certificates by deadline.',
        duration: '2-3 weeks',
        tips: [
          'Check official website regularly for new openings',
          'Prepare all documents in advance',
          'Submit before the deadline'
        ]
      },
      {
        number: 2,
        title: 'CV Screening',
        description: 'HR division screens submitted CVs to shortlist eligible candidates meeting academic and experience requirements.',
        duration: '1-2 weeks',
        tips: [
          'Ensure CV highlights relevant qualifications',
          'Keep CV concise and professional',
          'Double-check all information for accuracy'
        ]
      },
      {
        number: 3,
        title: 'Written Test',
        description: 'Shortlisted candidates take written test covering English, Bengali, mathematics, and general knowledge/banking.',
        duration: '1 day',
        tips: [
          'Practice previous years question papers',
          'Focus on time management',
          'Review banking terminology and current affairs'
        ]
      },
      {
        number: 4,
        title: 'Face-to-Face Interviews',
        description: 'Candidates passing written test undergo 2-3 rounds of interviews with HR and management.',
        duration: '2-3 weeks',
        tips: [
          'Research Premier Bank\'s recent initiatives',
          'Prepare for behavioral questions',
          'Dress professionally and be punctual'
        ]
      },
      {
        number: 5,
        title: 'Medical Examination & Joining',
        description: 'Successful candidates receive offer letter, complete medical examination, and join with probation period (e.g., one year for MTOs).',
        duration: '2-3 weeks',
        tips: [
          'Complete medical examination promptly',
          'Prepare original documents for verification',
          'Understand probation requirements'
        ]
      }
    ],
    resources: {
      mockTests: [
        { id: 1, title: 'Premier Bank MTO Mock Test 2025', questions: 100, duration: '90 min' },
        { id: 2, title: 'Banking Knowledge Test', questions: 50, duration: '45 min' }
      ],
      previousYears: [
        { id: 1, title: 'Premier Bank Question 2024', year: 2024 },
        { id: 2, title: 'Premier Bank Question 2023', year: 2023 }
      ],
      books: [
        { id: 1, title: 'Banking Preparation Guide', author: 'Prof. Sen' },
        { id: 2, title: 'Competitive Banking Exams', author: 'Dr. Roy' }
      ]
    }
  },
  {
    id: 'prime-bank',
    name: 'Prime Bank PLC',
    shortName: 'Prime Bank',
    logo: '🏦',
    color: '#EF4444',
    bgColor: 'bg-red-50',
    description: 'One of Bangladesh\'s premier private commercial banks with innovative banking solutions.',
    positions: ['Management Trainee', 'Officer Positions'],
    overview: 'Prime Bank recruitment includes written test, preliminary interviews, assessment center, final interview and medical examination. Process begins with application screening and progresses through multiple selection stages.',
    eligibility: [
      'Master\'s degree or minimum 4-year graduation',
      'Strong academic record with minimum CGPA requirements',
      'Good communication and analytical skills',
      'Computer proficiency',
      'Age within specified limit'
    ],
    stages: [
      {
        number: 1,
        title: 'Application and Screening',
        description: 'Submit applications online and screening of CVs to create shortlist of candidates based on qualifications.',
        duration: '2-3 weeks',
        tips: [
          'Complete application form accurately',
          'Highlight relevant qualifications and experience',
          'Submit all required documents'
        ]
      },
      {
        number: 2,
        title: 'Written Test',
        description: 'Comprehensive test including multiple-choice questions, math, essay, and translation sections to assess basic knowledge.',
        duration: '2-3 hours',
        tips: [
          'Practice MCQ and math problems',
          'Improve English writing skills',
          'Review banking and economic concepts'
        ]
      },
      {
        number: 3,
        title: 'Preliminary Interview',
        description: 'First-round viva voce to assess interest, qualifications, and basic information about candidates.',
        duration: '15-20 minutes',
        tips: [
          'Be clear about your career goals',
          'Know basic banking concepts',
          'Show genuine interest in Prime Bank'
        ]
      },
      {
        number: 4,
        title: 'Assessment Center',
        description: 'Candidates grouped for case study analysis and presentation, evaluating teamwork and problem-solving skills.',
        duration: 'Half day',
        tips: [
          'Practice case study analysis',
          'Work collaboratively with team members',
          'Communicate ideas clearly'
        ]
      },
      {
        number: 5,
        title: 'Final Interview',
        description: 'In-depth interview covering questions on why you should be hired, macro-economics, and banking industry knowledge.',
        duration: '30-45 minutes',
        tips: [
          'Prepare for behavioral questions',
          'Study macro-economic trends',
          'Research Prime Bank\'s market position'
        ]
      },
      {
        number: 6,
        title: 'Medical & Joining',
        description: 'Final selection, offer letter, mandatory medical check, and official joining.',
        duration: '2-3 weeks',
        tips: [
          'Complete medical promptly',
          'Verify all documents',
          'Prepare for orientation'
        ]
      }
    ],
    resources: {
      mockTests: [
        { id: 1, title: 'Prime Bank Full Mock Test', questions: 100, duration: '120 min' },
        { id: 2, title: 'Case Study Practice Set', questions: 5, duration: '60 min' }
      ],
      previousYears: [
        { id: 1, title: 'Prime Bank Question 2024', year: 2024 },
        { id: 2, title: 'Prime Bank Question 2023', year: 2023 }
      ],
      books: [
        { id: 1, title: 'Banking Excellence Guide', author: 'Prof. Khan' },
        { id: 2, title: 'Case Study Analysis', author: 'Dr. Hasan' }
      ]
    }
  },
  {
    id: 'pubali-bank',
    name: 'Pubali Bank PLC',
    shortName: 'Pubali Bank',
    logo: '🏦',
    color: '#059669',
    bgColor: 'bg-green-50',
    description: 'One of the oldest and largest commercial banks in Bangladesh with extensive branch network.',
    positions: ['Various Banking Positions'],
    overview: 'Pubali Bank recruitment involves online application through career portal, followed by written test and/or interview for shortlisted candidates. Applicants must meet specific academic and professional requirements.',
    eligibility: [
      'Minimum GPA/CGPA in SSC, HSC, and Honors/Masters degrees',
      'Some roles require previous banking or relevant experience',
      'Proficiency in MS Office and computer literacy',
      'Strong communication skills with good command of English',
      'Foreign degree holders must provide equivalence certificate from UGC Bangladesh'
    ],
    stages: [
      {
        number: 1,
        title: 'Online Application',
        description: 'Apply through Pubali Bank career portal with scanned passport-size photograph and signature. Receive Applicant Identification Number after submission. Note specific deadline for each vacancy.',
        duration: '2-3 weeks',
        tips: [
          'Keep your Applicant ID safe',
          'Upload clear scanned documents',
          'Apply before deadline'
        ]
      },
      {
        number: 2,
        title: 'Screening',
        description: 'Only shortlisted candidates contacted for further stages based on eligibility criteria.',
        duration: '1-2 weeks',
        tips: [
          'Monitor email and phone regularly',
          'Prepare documents for next stage',
          'Review job requirements thoroughly'
        ]
      },
      {
        number: 3,
        title: 'Written Test & Interview',
        description: 'Written test followed by viva-voce (interview) with panel asking questions on relevant subjects. All documents verified for discrepancies.',
        duration: '1 day for test, 2-3 weeks for interview',
        tips: [
          'Bring all original certificates',
          'Review banking fundamentals',
          'Prepare for panel interview format'
        ]
      },
      {
        number: 4,
        title: 'Probation and Confirmation',
        description: 'Selected candidates placed on one-year probation. After successful completion, confirmed in position.',
        duration: '1 year',
        tips: [
          'Perform consistently during probation',
          'Learn banking operations thoroughly',
          'Build good relationships with colleagues'
        ]
      }
    ],
    resources: {
      mockTests: [
        { id: 1, title: 'Pubali Bank Practice Test', questions: 100, duration: '90 min' },
        { id: 2, title: 'Banking Operations Test', questions: 50, duration: '45 min' }
      ],
      previousYears: [
        { id: 1, title: 'Pubali Bank Question 2024', year: 2024 },
        { id: 2, title: 'Pubali Bank Question 2023', year: 2023 }
      ],
      books: [
        { id: 1, title: 'Complete Banking Guide', author: 'Prof. Alam' },
        { id: 2, title: 'Bank Recruitment Success', author: 'Dr. Das' }
      ]
    }
  },
  {
    id: 'south-bangla-bank',
    name: 'South Bangla Agriculture and Commercial Bank PLC',
    shortName: 'SBAC Bank',
    logo: '🏦',
    color: '#F59E0B',
    bgColor: 'bg-amber-50',
    description: 'Specialized bank focusing on agriculture and commercial banking services.',
    positions: ['Officer Positions', 'Support Staff'],
    overview: 'South Bangla Agriculture and Commerce Bank recruitment involves online application through career website, followed by shortlisting, written examination for shortlisted applicants, and interviews for successful candidates.',
    eligibility: [
      'Minimum of one 1st division and no 3rd division in any academic level',
      'Complete application without misrepresentation',
      'No canvassing allowed',
      'Specific qualifications vary by position'
    ],
    stages: [
      {
        number: 1,
        title: 'Online Application',
        description: 'Apply through official career portal with detailed resume and recent photograph.',
        duration: '2-3 weeks',
        tips: [
          'Provide accurate information',
          'Upload clear photograph',
          'Complete all required fields'
        ]
      },
      {
        number: 2,
        title: 'Shortlisting',
        description: 'Bank reviews applications and selects most qualified candidates. Only shortlisted candidates contacted.',
        duration: '1-2 weeks',
        tips: [
          'Ensure qualifications meet requirements',
          'Highlight relevant experience',
          'Wait for official notification'
        ]
      },
      {
        number: 3,
        title: 'Written Examination',
        description: 'Shortlisted candidates called for written exam to test knowledge and aptitude.',
        duration: '1 day',
        tips: [
          'Review general banking knowledge',
          'Practice aptitude tests',
          'Manage time effectively during exam'
        ]
      },
      {
        number: 4,
        title: 'Interview',
        description: 'Candidates successfully passing written exam called for further interviews.',
        duration: '2-3 weeks',
        tips: [
          'Prepare for behavioral questions',
          'Know about SBAC Bank operations',
          'Dress professionally'
        ]
      },
      {
        number: 5,
        title: 'Final Selection',
        description: 'Final selection made based on candidates\' performance throughout the process.',
        duration: '1-2 weeks',
        tips: [
          'Be patient during final review',
          'Prepare documents for offer',
          'Stay accessible for communication'
        ]
      }
    ],
    resources: {
      mockTests: [
        { id: 1, title: 'SBAC Bank Mock Test', questions: 80, duration: '90 min' },
        { id: 2, title: 'Agriculture Banking Test', questions: 40, duration: '45 min' }
      ],
      previousYears: [
        { id: 1, title: 'SBAC Question 2024', year: 2024 },
        { id: 2, title: 'SBAC Question 2023', year: 2023 }
      ],
      books: [
        { id: 1, title: 'Agricultural Banking Guide', author: 'Prof. Islam' },
        { id: 2, title: 'Commercial Banking Essentials', author: 'Dr. Ahmed' }
      ]
    }
  },
  {
    id: 'southeast-bank',
    name: 'Southeast Bank PLC',
    shortName: 'Southeast Bank',
    logo: '🏦',
    color: '#3B82F6',
    bgColor: 'bg-blue-50',
    description: 'Progressive commercial bank with focus on technology and customer satisfaction.',
    positions: ['Various Banking Positions'],
    overview: 'Southeast Bank recruitment involves online application, shortlisting, and selection process including written test and/or interview. Candidates must meet specific criteria and successful candidates placed on probation.',
    eligibility: [
      'Excellent communication and interpersonal skills',
      'Good command of English language',
      'Basic computer and ICT skills including MS Office',
      'Hard-working, self-driven, able to work under pressure',
      'Strong analytical and problem-solving skills'
    ],
    stages: [
      {
        number: 1,
        title: 'Application and Screening',
        description: 'Apply online through career portal or specific job application links. Only shortlisted candidates contacted. Application may be rejected if discrepancies found between online resume and original documents.',
        duration: '2-3 weeks',
        tips: [
          'Ensure consistency in all documents',
          'Apply through official channels only',
          'Keep copies of submitted documents'
        ]
      },
      {
        number: 2,
        title: 'Written Test',
        description: 'Common part of selection process to assess knowledge and aptitude.',
        duration: '1 day',
        tips: [
          'Review banking fundamentals',
          'Practice English and math',
          'Study current affairs'
        ]
      },
      {
        number: 3,
        title: 'Interview',
        description: 'Candidates passing written test called for interview to assess skills and cultural fit.',
        duration: '2-3 weeks',
        tips: [
          'Show willingness for different branch locations',
          'Express interest in banking operations',
          'Be confident and courteous'
        ]
      },
      {
        number: 4,
        title: 'Probation',
        description: 'Successful candidates on probation for period (e.g., one year) before permanent role.',
        duration: '1 year',
        tips: [
          'Perform consistently',
          'Learn continuously',
          'Demonstrate commitment'
        ]
      }
    ],
    resources: {
      mockTests: [
        { id: 1, title: 'Southeast Bank Practice Test', questions: 100, duration: '90 min' },
        { id: 2, title: 'ICT Skills Assessment', questions: 50, duration: '45 min' }
      ],
      previousYears: [
        { id: 1, title: 'Southeast Bank Question 2024', year: 2024 },
        { id: 2, title: 'Southeast Bank Question 2023', year: 2023 }
      ],
      books: [
        { id: 1, title: 'Modern Banking Practice', author: 'Prof. Karim' },
        { id: 2, title: 'ICT in Banking', author: 'Dr. Rahman' }
      ]
    }
  },
  {
    id: 'standard-bank',
    name: 'Standard Bank PLC',
    shortName: 'Standard Bank',
    logo: '🏦',
    color: '#16A34A',
    bgColor: 'bg-green-50',
    description: 'Leading commercial bank committed to excellence and innovation in banking services.',
    positions: ['Various Banking Positions'],
    overview: 'Standard Bank follows five-step recruitment: application, screening, online assessment, interviews, and selection/onboarding. Process designed to systematically evaluate candidates for role suitability.',
    eligibility: [
      'Relevant educational qualifications',
      'Strong communication and technical skills',
      'Ability to work under pressure',
      'Willingness for professional development'
    ],
    stages: [
      {
        number: 1,
        title: 'Application',
        description: 'Create online profile, search and apply to relevant openings by attaching CV. Set up job alerts for new roles.',
        duration: '2-3 weeks',
        tips: [
          'Create comprehensive profile',
          'Tailor CV to specific role',
          'Set up job alerts'
        ]
      },
      {
        number: 2,
        title: 'Screening',
        description: 'Talent acquisition team reviews applications matching skills and experience with role requirements.',
        duration: '1-2 weeks',
        tips: [
          'Ensure CV highlights relevant experience',
          'Match skills to job description',
          'Be patient during review process'
        ]
      },
      {
        number: 3,
        title: 'Online Assessment',
        description: 'Shortlisted candidates complete online assessments including technical tests, personality questionnaires, or other evaluations.',
        duration: '1-2 days',
        tips: [
          'Prepare for technical and personality tests',
          'Find quiet environment for assessment',
          'Be honest in personality tests'
        ]
      },
      {
        number: 4,
        title: 'Interviews',
        description: 'Multiple interviews ranging from technical/competency-based questions to formal discussions with management. May include case study or presentation.',
        duration: '2-4 weeks',
        tips: [
          'Prepare for different interview formats',
          'Research Standard Bank initiatives',
          'Practice case study presentations'
        ]
      },
      {
        number: 5,
        title: 'Selection and Onboarding',
        description: 'Successful candidate offered position and goes through onboarding process.',
        duration: '2-3 weeks',
        tips: [
          'Complete onboarding requirements promptly',
          'Prepare for orientation',
          'Ask questions about role expectations'
        ]
      }
    ],
    resources: {
      mockTests: [
        { id: 1, title: 'Standard Bank Assessment Practice', questions: 100, duration: '90 min' },
        { id: 2, title: 'Personality & Aptitude Test', questions: 60, duration: '60 min' }
      ],
      previousYears: [
        { id: 1, title: 'Standard Bank Question 2024', year: 2024 },
        { id: 2, title: 'Standard Bank Question 2023', year: 2023 }
      ],
      books: [
        { id: 1, title: 'Banking Assessment Guide', author: 'Prof. Sen' },
        { id: 2, title: 'Interview Success Strategy', author: 'Dr. Khan' }
      ]
    }
  },
  {
    id: 'ucb',
    name: 'The United Commercial Bank PLC',
    shortName: 'UCB',
    logo: '🏦',
    color: '#DC2626',
    bgColor: 'bg-red-50',
    description: 'Trusted commercial bank with strong focus on customer service and innovation.',
    positions: ['Probationary Officer', 'Various Banking Positions'],
    overview: 'UCB recruitment involves multi-stage selection starting with online application. Candidates meeting criteria shortlisted for competitive written exam covering English, math, and general knowledge. Successful candidates undergo rigorous training before confirmation.',
    eligibility: [
      'Relevant educational qualifications',
      'Strong academic record',
      'Good communication skills',
      'Ability to work in team environment'
    ],
    stages: [
      {
        number: 1,
        title: 'Application and Screening',
        description: 'Apply online through UCB careers page or job portals like bdjobs.com. HR screens applications creating shortlist based on qualifications.',
        duration: '2-3 weeks',
        tips: [
          'Apply through official channels',
          'Ensure qualifications match requirements',
          'Prepare complete application'
        ]
      },
      {
        number: 2,
        title: 'Written Test',
        description: 'Shortlisted candidates take competitive written test covering English, math, and general knowledge.',
        duration: '1 day',
        tips: [
          'Practice previous questions',
          'Review English grammar and vocabulary',
          'Brush up on math fundamentals'
        ]
      },
      {
        number: 3,
        title: 'Interview (Viva)',
        description: 'Candidates passing written test called for interview to assess suitability and character.',
        duration: '2-3 weeks',
        tips: [
          'Prepare for behavioral questions',
          'Know UCB\'s services and values',
          'Dress professionally'
        ]
      },
      {
        number: 4,
        title: 'Probation and Training',
        description: 'Successful candidates undergo rigorous training program (e.g., one year) with both classroom and on-the-job training before confirmation as regular employee with increased benefits.',
        duration: '1 year',
        tips: [
          'Commit to training program fully',
          'Learn from experienced colleagues',
          'Maintain good performance'
        ]
      },
      {
        number: 5,
        title: 'Confirmation and Bond',
        description: 'Upon successful probation completion, confirmed with increased salary and benefits. Required to sign service bond for minimum period (e.g., 3 years).',
        duration: 'Ongoing',
        tips: [
          'Understand bond requirements',
          'Plan long-term career with UCB',
          'Continue professional development'
        ]
      }
    ],
    resources: {
      mockTests: [
        { id: 1, title: 'UCB Probationary Officer Test', questions: 100, duration: '90 min' },
        { id: 2, title: 'General Knowledge Practice', questions: 50, duration: '45 min' }
      ],
      previousYears: [
        { id: 1, title: 'UCB Question 2024', year: 2024 },
        { id: 2, title: 'UCB Question 2023', year: 2023 }
      ],
      books: [
        { id: 1, title: 'UCB Success Guide', author: 'Prof. Islam' },
        { id: 2, title: 'Banking Training Manual', author: 'Dr. Chowdhury' }
      ]
    }
  },
  {
    id: 'uttara-bank',
    name: 'Uttara Bank PLC',
    shortName: 'Uttara Bank',
    logo: '🏦',
    color: '#0891B2',
    bgColor: 'bg-cyan-50',
    description: 'Well-established commercial bank with wide branch network across Bangladesh.',
    positions: ['Various Banking Positions'],
    overview: 'Uttara Bank recruitment involves online applications followed by initial screening based on academic qualifications. Shortlisted candidates called for Viva-voce and potentially other selection tests. Candidates must meet specific GPA/CGPA requirements.',
    eligibility: [
      'Minimum academic qualifications (GPA/CGPA requirements)',
      'Age within specified limits',
      'Required documents: academic certificates, NID photocopy, passport photographs'
    ],
    stages: [
      {
        number: 1,
        title: 'Application',
        description: 'Submit applications online through bank website or as directed in job circular. Ensure all required documents ready including academic certificates, NID, and photographs.',
        duration: '2-3 weeks',
        tips: [
          'Read job circular carefully',
          'Prepare all documents in advance',
          'Apply before deadline'
        ]
      },
      {
        number: 2,
        title: 'Screening and Selection',
        description: 'Bank reviews all applications checking eligibility and academic qualifications against requirements. Shortlisted candidates selected for next stage.',
        duration: '1-2 weeks',
        tips: [
          'Ensure qualifications meet minimum criteria',
          'Wait for official communication',
          'Keep phone and email accessible'
        ]
      },
      {
        number: 3,
        title: 'Viva-Voce (Interview)',
        description: 'Shortlisted candidates called for interview. Depending on applicants, may be other selection tests before or after this stage. Bank makes final decision based on performance in all recruitment stages.',
        duration: '2-3 weeks',
        tips: [
          'Prepare thoroughly for interview',
          'Bring all original documents',
          'Be confident and articulate'
        ]
      },
      {
        number: 4,
        title: 'Probation and Confirmation',
        description: 'Period of probation or training required after hiring, followed by confirmation in permanent position.',
        duration: '6-12 months',
        tips: [
          'Perform consistently during probation',
          'Learn banking operations',
          'Build professional relationships'
        ]
      }
    ],
    resources: {
      mockTests: [
        { id: 1, title: 'Uttara Bank Mock Test', questions: 100, duration: '90 min' },
        { id: 2, title: 'Banking Viva Preparation', questions: 50, duration: '45 min' }
      ],
      previousYears: [
        { id: 1, title: 'Uttara Bank Question 2024', year: 2024 },
        { id: 2, title: 'Uttara Bank Question 2023', year: 2023 }
      ],
      books: [
        { id: 1, title: 'Bank Interview Guide', author: 'Prof. Hasan' },
        { id: 2, title: 'Banking Fundamentals', author: 'Dr. Roy' }
      ]
    }
  },
  {
    id: 'islami-bank',
    name: 'Islami Bank PLC',
    shortName: 'Islami Bank',
    logo: '🏦',
    color: '#16A34A',
    bgColor: 'bg-green-50',
    description: 'Leading Islamic bank in Bangladesh providing Shariah-compliant banking services.',
    positions: ['Various Islamic Banking Positions'],
    overview: 'Islami Bank recruitment involves online application via career website, followed by CV screening, written tests, and interviews/vivas. Only shortlisted candidates contacted via email or SMS. Candidates must meet specific academic and age requirements.',
    eligibility: [
      'Minimum academic qualifications with GPA requirements',
      'Age limit as specified in circular',
      'Knowledge of Islamic banking principles preferred',
      'Strong communication skills'
    ],
    stages: [
      {
        number: 1,
        title: 'Online Application',
        description: 'Apply online through official career website (www.career.islamibankbd.com/career.php). Fill out application form accurately and submit electronically by deadline. Physical, postal, or courier submissions not accepted.',
        duration: '2-3 weeks',
        tips: [
          'Read job circular details carefully',
          'Apply only through official website',
          'Complete all required fields accurately'
        ]
      },
      {
        number: 2,
        title: 'CV Screening',
        description: 'Bank screens applications to shortlist candidates meeting eligibility criteria.',
        duration: '1-2 weeks',
        tips: [
          'Ensure CV meets all requirements',
          'Highlight Islamic banking knowledge if any',
          'Wait for official notification'
        ]
      },
      {
        number: 3,
        title: 'Written/Skill Test',
        description: 'Shortlisted candidates called for written or skills-based examination to test knowledge and competencies.',
        duration: '1 day',
        tips: [
          'Review Islamic banking principles',
          'Practice aptitude tests',
          'Study current Islamic finance trends'
        ]
      },
      {
        number: 4,
        title: 'Interview/Viva-Voce',
        description: 'Candidates passing previous stages invited for interview or viva-voce. All correspondence regarding next steps sent via email or SMS.',
        duration: '2-3 weeks',
        tips: [
          'Prepare for Shariah-based questions',
          'Know Islami Bank\'s products and services',
          'Demonstrate ethical values'
        ]
      }
    ],
    resources: {
      mockTests: [
        { id: 1, title: 'Islamic Banking Practice Test', questions: 100, duration: '90 min' },
        { id: 2, title: 'Shariah Principles Test', questions: 50, duration: '45 min' }
      ],
      previousYears: [
        { id: 1, title: 'Islami Bank Question 2024', year: 2024 },
        { id: 2, title: 'Islami Bank Question 2023', year: 2023 }
      ],
      books: [
        { id: 1, title: 'Islamic Banking Guide', author: 'Prof. Karim' },
        { id: 2, title: 'Shariah Banking Principles', author: 'Dr. Ahmed' }
      ]
    }
  },
  {
    id: 'al-arafah-bank',
    name: 'Al-Arafah Islami Bank PLC',
    shortName: 'Al-Arafah',
    logo: '🏦',
    color: '#059669',
    bgColor: 'bg-emerald-50',
    description: 'Prominent Islamic bank committed to Shariah-based banking excellence.',
    positions: ['Various Islamic Banking Positions'],
    overview: 'Al-Arafah Islami Bank manages recruitment through official online career portal. Typical process involves online application, shortlisting, written test, interviews, and final approval for entry-level positions.',
    eligibility: [
      'Minimum GPA/CGPA requirements as specified',
      'Age limit compliance',
      'Knowledge of Islamic banking preferred',
      'Strong academic background'
    ],
    stages: [
      {
        number: 1,
        title: 'Application Process',
        description: 'Apply online through career.al-arafahbank.com. Submit online form with personal and academic details. Upload scanned photograph and educational certificates. Meet specific academic requirements (minimum GPA/CGPA) and age limits.',
        duration: '2-3 weeks',
        tips: [
          'Check career portal regularly',
          'Prepare clear scanned documents',
          'Meet all eligibility criteria'
        ]
      },
      {
        number: 2,
        title: 'Sorting Applications',
        description: 'HR division reviews applications and shortlists potential candidates based on job requirements.',
        duration: '1-2 weeks',
        tips: [
          'Ensure application is complete',
          'Highlight relevant qualifications',
          'Wait for official communication'
        ]
      },
      {
        number: 3,
        title: 'Written Test',
        description: 'Entry-level positions require written test administered by external impartial institutions like IBA, University of Dhaka to ensure transparency and meritocracy. Admit cards issued through career portal or courier.',
        duration: '1 day',
        tips: [
          'Prepare for comprehensive test',
          'Review Islamic banking concepts',
          'Practice time management'
        ]
      },
      {
        number: 4,
        title: 'Interview',
        description: 'Candidates passing written test called for interview. Formal conversation to evaluate suitability, knowledge, and soft skills.',
        duration: '2-3 weeks',
        tips: [
          'Demonstrate Islamic banking knowledge',
          'Show commitment to Shariah principles',
          'Be professional and confident'
        ]
      },
      {
        number: 5,
        title: 'Final Approval & Medical',
        description: 'Selection decision made followed by final approval by competent authority and physical medical examination. Successful candidates receive job offer with appointment letter and placement details.',
        duration: '2-3 weeks',
        tips: [
          'Complete medical examination promptly',
          'Prepare for placement',
          'Review offer details carefully'
        ]
      }
    ],
    resources: {
      mockTests: [
        { id: 1, title: 'Al-Arafah Bank Mock Test', questions: 100, duration: '90 min' },
        { id: 2, title: 'Islamic Finance Test', questions: 50, duration: '45 min' }
      ],
      previousYears: [
        { id: 1, title: 'Al-Arafah Question 2024', year: 2024 },
        { id: 2, title: 'Al-Arafah Question 2023', year: 2023 }
      ],
      books: [
        { id: 1, title: 'Al-Arafah Banking Guide', author: 'Prof. Islam' },
        { id: 2, title: 'Shariah Compliance Manual', author: 'Dr. Hasan' }
      ]
    }
  },
  {
    id: 'fsibl',
    name: 'First Security Islami Bank PLC',
    shortName: 'FSIBL',
    logo: '🏦',
    color: '#1E40AF',
    bgColor: 'bg-blue-50',
    description: 'Leading Islamic bank providing comprehensive Shariah-compliant financial solutions.',
    positions: ['Probationary Officer', 'Trainee Assistant Officer', 'Various Positions'],
    overview: 'FSIBL follows structured multi-stage recruitment managed by HR division. Process includes advertisement, online application, assessment test, interview, background checks, medical assessment, and job offer with bond signing.',
    eligibility: [
      'Relevant educational qualifications',
      'Minimum GPA/CGPA as specified',
      'Age within limits',
      'Computer and communication skills'
    ],
    stages: [
      {
        number: 1,
        title: 'Advertisement/Job Posting',
        description: 'FSIBL advertises openings on official website, print media, and online job portals like Bdjobs.com. Advertisements outline eligibility, key dates, and application process.',
        duration: '2-3 weeks',
        tips: [
          'Monitor official website regularly',
          'Read requirements carefully',
          'Note application deadlines'
        ]
      },
      {
        number: 2,
        title: 'Online Application',
        description: 'Submit applications through bank website providing necessary information and uploading required documents. Applications screened by HR department.',
        duration: '2-3 weeks',
        tips: [
          'Complete application thoroughly',
          'Upload all required documents',
          'Double-check information'
        ]
      },
      {
        number: 3,
        title: 'Assessment Test/Written Exam',
        description: 'Shortlisted candidates undergo written examination or aptitude test evaluating quantitative ability, reasoning, English proficiency, and banking knowledge.',
        duration: '1 day',
        tips: [
          'Practice aptitude tests',
          'Review banking fundamentals',
          'Manage time during exam'
        ]
      },
      {
        number: 4,
        title: 'Interview',
        description: 'Candidates passing written exam called for personal interview where panel assesses communication skills, character, and fit for position.',
        duration: '2-3 weeks',
        tips: [
          'Prepare for competency questions',
          'Research FSIBL values',
          'Dress professionally'
        ]
      },
      {
        number: 5,
        title: 'Background Checks & Medical',
        description: 'Bank conducts background and reference checks to verify candidate information. Medical test required to ensure physical fitness.',
        duration: '1-2 weeks',
        tips: [
          'Provide accurate references',
          'Complete medical promptly',
          'Prepare documents for verification'
        ]
      },
      {
        number: 6,
        title: 'Job Offer and Bond',
        description: 'Successful candidates issued offer letter detailing terms and conditions. New employees may sign bond committing to certain service period.',
        duration: '1-2 weeks',
        tips: [
          'Review offer carefully',
          'Understand bond requirements',
          'Prepare for joining'
        ]
      }
    ],
    resources: {
      mockTests: [
        { id: 1, title: 'FSIBL Aptitude Test', questions: 100, duration: '90 min' },
        { id: 2, title: 'Islamic Banking Knowledge', questions: 50, duration: '45 min' }
      ],
      previousYears: [
        { id: 1, title: 'FSIBL Question 2024', year: 2024 },
        { id: 2, title: 'FSIBL Question 2023', year: 2023 }
      ],
      books: [
        { id: 1, title: 'FSIBL Success Guide', author: 'Prof. Rahman' },
        { id: 2, title: 'Islamic Banking Practice', author: 'Dr. Khan' }
      ]
    }
  },
  {
    id: 'global-islami-bank',
    name: 'Global Islami Bank PLC',
    shortName: 'Global Islami Bank',
    logo: '🕌',
    color: '#F59E0B',
    bgColor: 'bg-amber-50',
    description: 'Shariah-based banking services with a focus on ethical finance and community development.',
    positions: ['Probationary Officer', 'Assistant Officer', 'Various Positions'],
    overview: 'Global Islami Bank PLC recruitment involves checking job circulars, applying with detailed CV via email, and moving through written tests and interviews with specific qualifications varying by role.',
    eligibility: [
      'Minimum graduation with 4-year Honors degree',
      'Specific GPA requirements for different disciplines',
      'No 3rd Division/Class or below GPA 2.5 in any examination',
      'Age limit specified in circular (typically up to 52 years for certain positions)',
      'Proficiency in both Bangla and English',
      'Computer literacy required'
    ],
    stages: [
      {
        number: 1,
        title: 'Job Circular & Application',
        description: 'Check Global Islami Bank PLC career page and Bdjobs.com for current circulars. Send detailed CV with recent photograph to career@globalislamibankbd.com.',
        duration: '2-3 weeks',
        tips: [
          'Ensure applications are complete and submitted correctly',
          'Incomplete or improperly submitted applications may be rejected',
          'Follow all instructions in the job circular carefully'
        ]
      },
      {
        number: 2,
        title: 'Initial Screening',
        description: 'Applications are screened based on eligibility criteria and quality of submitted CV.',
        duration: '1-2 weeks',
        tips: [
          'Ensure CV highlights relevant qualifications',
          'Meet all minimum requirements stated in circular',
          'Provide accurate contact information'
        ]
      },
      {
        number: 3,
        title: 'Written Test',
        description: 'Depending on the position, a written test may include multiple-choice questions (MCQ) covering general knowledge, banking awareness, and analytical skills.',
        duration: '2-3 hours',
        tips: [
          'Prepare for MCQ format questions',
          'Review general knowledge and banking basics',
          'Practice time management during tests'
        ]
      },
      {
        number: 4,
        title: 'Interview',
        description: 'Candidates who pass the written test proceed to interviews where professional suitability and Islamic banking knowledge are assessed.',
        duration: '30-45 minutes',
        tips: [
          'Research Islamic banking principles',
          'Prepare examples from your experience',
          'Demonstrate ethical values and commitment'
        ]
      },
      {
        number: 5,
        title: 'Final Selection & Probation',
        description: 'Selected candidates undergo a probationary period before being confirmed in their roles.',
        duration: 'Variable',
        tips: [
          'Maintain high performance during probation',
          'Learn organizational culture and values',
          'Seek feedback and continuous improvement'
        ]
      }
    ],
    resources: {
      mockTests: [
        { id: 1, title: 'Islamic Banking MCQ Test', questions: 80, duration: '60 min' },
        { id: 2, title: 'General Banking Aptitude', questions: 100, duration: '90 min' }
      ],
      previousYears: [
        { id: 1, title: 'Global Islami Bank Question 2024', year: 2024 },
        { id: 2, title: 'Global Islami Bank Question 2023', year: 2023 }
      ],
      books: [
        { id: 1, title: 'Islamic Banking Principles', author: 'Dr. Ahmed' },
        { id: 2, title: 'Shariah Compliance Guide', author: 'Prof. Karim' }
      ]
    }
  },
  {
    id: 'icb-islamic-bank',
    name: 'ICB Islamic Bank PLC',
    shortName: 'ICB Islamic Bank',
    logo: '🏦',
    color: '#3B82F6',
    bgColor: 'bg-blue-50',
    description: 'Islamic banking institution offering Shariah-compliant financial services and investment solutions.',
    positions: ['Entry Level Positions', 'Experienced Banking Professionals'],
    overview: 'ICB Islamic Bank PLC recruitment is online through their recruitment system or job portals, involving written and viva voce interviews for shortlisted candidates.',
    eligibility: [
      "Bachelor's degree required for most positions",
      'No 3rd Division/Class or equivalent in any academic stage',
      'Strong command of spoken and written Bangla and English',
      'Computer literacy (MS Office) required',
      'Strong interpersonal skills',
      'Hardworking attitude and ability to work under pressure'
    ],
    stages: [
      {
        number: 1,
        title: 'Job Search & Online Application',
        description: 'Find career opportunities on ICB Online Recruitment System and Bdjobs.com. Submit application electronically through specified online portal.',
        duration: '2-3 weeks',
        tips: [
          'Check both recruitment system and job boards regularly',
          'Complete online application accurately',
          'Submit before deadline'
        ]
      },
      {
        number: 2,
        title: 'Shortlisting',
        description: 'Bank reviews applications and shortlists candidates who meet basic requirements.',
        duration: '1-2 weeks',
        tips: [
          'Ensure all requirements are met',
          'Provide complete information',
          'Wait for official communication'
        ]
      },
      {
        number: 3,
        title: 'Written Interview',
        description: 'Shortlisted candidates participate in written examination assessing banking knowledge, analytical ability, and general awareness.',
        duration: '2-3 hours',
        tips: [
          'Prepare for written assessments',
          'Review banking fundamentals',
          'Practice analytical problems'
        ]
      },
      {
        number: 4,
        title: 'Viva Voce (Oral Interview)',
        description: 'Candidates who pass written stage are invited to oral interviews to assess communication skills and professional readiness.',
        duration: '30-45 minutes',
        tips: [
          'Demonstrate language proficiency',
          'Show understanding of Islamic banking',
          'Be confident and professional'
        ]
      },
      {
        number: 5,
        title: 'Job Offer',
        description: 'Successful candidates receive job offers and begin their banking career.',
        duration: 'Variable',
        tips: [
          'Review offer terms carefully',
          'Prepare for onboarding',
          'Maintain professional standards'
        ]
      }
    ],
    resources: {
      mockTests: [
        { id: 1, title: 'ICB Banking Aptitude Test', questions: 100, duration: '90 min' },
        { id: 2, title: 'Islamic Finance Quiz', questions: 50, duration: '45 min' }
      ],
      previousYears: [
        { id: 1, title: 'ICB Question Paper 2024', year: 2024 },
        { id: 2, title: 'ICB Question Paper 2023', year: 2023 }
      ],
      books: [
        { id: 1, title: 'Banking Career Guide', author: 'Prof. Hassan' },
        { id: 2, title: 'Islamic Finance Basics', author: 'Dr. Zaman' }
      ]
    }
  },
  {
    id: 'shahjalal-islamic-bank',
    name: 'Shahjalal Islamic Bank PLC',
    shortName: 'Shahjalal Islami Bank',
    logo: '🏛️',
    color: '#059669',
    bgColor: 'bg-emerald-50',
    description: 'Premier Islamic bank offering Shariah-compliant banking with merit-based recruitment and transparent processes.',
    positions: ['Probationary Officer', 'Management Trainee', 'Various Banking Positions'],
    overview: 'Shahjalal Islami Bank PLC recruitment involves online application, written test, and two phases of rigorous interviews in a purely merit-based selection process.',
    eligibility: [
      'Post-graduation degree from reputable university',
      'No third class/division in academic career',
      'Willingness to work anywhere in Bangladesh',
      'Merit-based selection criteria',
      'Strong academic background required'
    ],
    stages: [
      {
        number: 1,
        title: 'Application',
        description: 'Candidates apply online through Bdjobs.com/sjibl or official SJIBL website when vacancy is announced.',
        duration: '2-3 weeks',
        tips: [
          'Check official website regularly',
          'Prepare all documents in advance',
          'Apply before deadline'
        ]
      },
      {
        number: 2,
        title: 'Screening & Shortlisting',
        description: 'Applications are reviewed and only shortlisted candidates proceed to next stage.',
        duration: '1-2 weeks',
        tips: [
          'Ensure academic credentials are strong',
          'Meet all eligibility criteria',
          'Provide accurate information'
        ]
      },
      {
        number: 3,
        title: 'Written Test',
        description: 'Shortlisted candidates sit for competitive written examination that is purely merit-based.',
        duration: '2-3 hours',
        tips: [
          'Prepare thoroughly for written exam',
          'Focus on banking knowledge and aptitude',
          'Practice time management'
        ]
      },
      {
        number: 4,
        title: 'Two-Phase Interview',
        description: 'Successful candidates from written test are called for two rounds of rigorous interviews for final selection.',
        duration: '2-3 weeks',
        tips: [
          'Prepare for multiple interview rounds',
          'Research Islamic banking principles',
          'Be ready for challenging questions'
        ]
      },
      {
        number: 5,
        title: 'Final Selection & Bond',
        description: 'Selected candidates receive offer and must execute a bond (e.g., 5 years for Probationary Officer positions).',
        duration: 'Variable',
        tips: [
          'Understand service bond requirements',
          'Be prepared for long-term commitment',
          'Review all terms and conditions'
        ]
      }
    ],
    resources: {
      mockTests: [
        { id: 1, title: 'SJIBL Probationary Officer Mock Test', questions: 100, duration: '120 min' },
        { id: 2, title: 'Islamic Banking Principles Test', questions: 80, duration: '90 min' }
      ],
      previousYears: [
        { id: 1, title: 'SJIBL Question 2024', year: 2024 },
        { id: 2, title: 'SJIBL Question 2023', year: 2023 }
      ],
      books: [
        { id: 1, title: 'Islamic Banking Complete Guide', author: 'Dr. Rahman' },
        { id: 2, title: 'Banking Job Preparation', author: 'Prof. Ali' }
      ]
    }
  },
  {
    id: 'social-islamic-bank',
    name: 'Social Islami Bank PLC',
    shortName: 'Social Islami Bank',
    logo: '🕌',
    color: '#DC2626',
    bgColor: 'bg-red-50',
    description: 'Islamic banking institution focused on social responsibility and Shariah-compliant financial services.',
    positions: ['Assistant Officer (Cash)', 'Various Banking Positions'],
    overview: 'Social Islami Bank PLC recruitment involves online applications followed by multi-stage selection including written test, interviews, and sometimes psychometric tests.',
    eligibility: [
      'Specific academic qualifications based on position',
      'Age limits stipulated in job circular',
      'Strong academic track record required',
      'No criminal record',
      'Physical and psychological fitness'
    ],
    stages: [
      {
        number: 1,
        title: 'Online Application',
        description: 'Check Social Islami Bank PLC Career page for available jobs. Submit applications online following circular instructions.',
        duration: '2-3 weeks',
        tips: [
          'Monitor official career portal regularly',
          'Also check Bdjobs.com for postings',
          'Prepare all required documents'
        ]
      },
      {
        number: 2,
        title: 'Initial Screening',
        description: 'Applications screened based on specified academic qualifications, age limits, and experience requirements.',
        duration: '1-2 weeks',
        tips: [
          'Meet all minimum criteria',
          'Provide complete information',
          'Ensure accuracy of all details'
        ]
      },
      {
        number: 3,
        title: 'Written Test',
        description: 'Shortlisted candidates take written examination covering basic aptitude, mathematics, and English.',
        duration: '2-3 hours',
        tips: [
          'Prepare for aptitude tests',
          'Review math and English basics',
          'Practice under time constraints'
        ]
      },
      {
        number: 4,
        title: 'Psychometric Test',
        description: 'For certain positions, psychometric test assesses personality and emotional intelligence.',
        duration: '1-2 hours',
        tips: [
          'Be honest in your responses',
          'Understand the purpose of assessment',
          'Stay calm and focused'
        ]
      },
      {
        number: 5,
        title: 'Interviews',
        description: 'One or more rounds of interviews including preliminary interview and final interview with senior management.',
        duration: '2-4 weeks',
        tips: [
          'Prepare for multiple interview rounds',
          'Show commitment to Islamic banking',
          'Demonstrate professional competence'
        ]
      },
      {
        number: 6,
        title: 'Probation & Training',
        description: 'Selected candidates undergo probation period (e.g., one year) with mandatory training at SIBL Training Institute.',
        duration: '1 year',
        tips: [
          'Take training seriously',
          'Perform well during probation',
          'Understand service bond requirements (e.g., 5 years)'
        ]
      }
    ],
    resources: {
      mockTests: [
        { id: 1, title: 'SIBL Assistant Officer Mock Test', questions: 100, duration: '90 min' },
        { id: 2, title: 'Banking Aptitude Test', questions: 80, duration: '75 min' }
      ],
      previousYears: [
        { id: 1, title: 'SIBL Question 2024', year: 2024 },
        { id: 2, title: 'SIBL Question 2023', year: 2023 }
      ],
      books: [
        { id: 1, title: 'Social Islamic Banking Guide', author: 'Prof. Mahmud' },
        { id: 2, title: 'Banking Success Manual', author: 'Dr. Hasan' }
      ]
    }
  },
  {
    id: 'union-bank',
    name: 'Union Bank PLC',
    shortName: 'Union Bank',
    logo: '💼',
    color: '#7C3AED',
    bgColor: 'bg-purple-50',
    description: 'Progressive commercial bank with comprehensive recruitment process including written and computer tests.',
    positions: ['General/Unreserved Positions', 'Reserved Category Positions'],
    overview: 'Union Bank PLC recruitment involves application through website, written and computer tests, followed by personal interviews with merit-based final selection.',
    eligibility: [
      'Minimum qualifying marks in written tests required',
      'English language test mandatory (qualifying only)',
      'Computer knowledge test with 50 marks',
      'Must be Bangladeshi citizen',
      'Specific educational qualifications per position'
    ],
    stages: [
      {
        number: 1,
        title: 'Application & Screening',
        description: 'Submit application through Union Bank PLC website. Human Resources Division screens applications based on suitability.',
        duration: '2-3 weeks',
        tips: [
          'Complete online application accurately',
          'Provide all required information',
          'Submit before deadline'
        ]
      },
      {
        number: 2,
        title: 'Written & Computer Tests',
        description: 'Candidates must pass minimum qualifying marks to proceed. Includes English language test and computer knowledge test (30 min, 50 marks).',
        duration: '3-4 hours',
        tips: [
          'Prepare for English language test',
          'Practice computer skills and MS Office',
          'Minimum 50% required (45% for reserved)'
        ]
      },
      {
        number: 3,
        title: 'Interview Selection',
        description: 'Candidates selected for interview based on written test performance. Ratio typically 1:3 for General/Unreserved, 1:5 for Reserved Categories.',
        duration: '1-2 weeks',
        tips: [
          'Bank reserves right to change interview ratio',
          'Only high performers are called',
          'Prepare thoroughly for interview'
        ]
      },
      {
        number: 4,
        title: 'Personal Interview',
        description: 'Interview assesses professional competence, communication skills, and suitability for banking role.',
        duration: '30-45 minutes',
        tips: [
          'Bring all original documents',
          'Research Union Bank operations',
          'Be professional and confident'
        ]
      },
      {
        number: 5,
        title: 'Final Selection',
        description: 'Merit ranking based on objective test marks plus interview marks. Final appointments based on highest scorers.',
        duration: 'Variable',
        tips: [
          'Perform well in all stages',
          'Understand merit-based selection',
          'Prepare for joining formalities'
        ]
      }
    ],
    resources: {
      mockTests: [
        { id: 1, title: 'Union Bank Aptitude Test', questions: 100, duration: '90 min' },
        { id: 2, title: 'Computer Knowledge Test', questions: 50, duration: '30 min' }
      ],
      previousYears: [
        { id: 1, title: 'Union Bank Question 2024', year: 2024 },
        { id: 2, title: 'Union Bank Question 2023', year: 2023 }
      ],
      books: [
        { id: 1, title: 'Banking Recruitment Guide', author: 'Prof. Khan' },
        { id: 2, title: 'Computer Skills for Banking', author: 'Dr. Amin' }
      ]
    }
  },
  {
    id: 'ab-bank',
    name: 'AB Bank Limited',
    shortName: 'AB Bank',
    logo: '🏦',
    color: '#EF4444',
    bgColor: 'bg-red-50',
    description: 'Leading commercial bank with structured, competitive recruitment for Management Trainee Officers and other positions.',
    positions: ['Management Trainee Officer (MTO)', 'Core Banking Cadre', 'Various Positions'],
    overview: 'AB Bank PLC recruitment is structured with online application, shortlisting, written test, interviews, and medical examination in a rigorous multi-stage process.',
    eligibility: [
      'MBA, MBM, or Masters degree with minimum CGPA (3.0 or 3.5)',
      'Age limit specified in circular (generally below 30 years)',
      'Essential computer skills required',
      'Willingness to work anywhere in Bangladesh',
      'Strong academic background'
    ],
    stages: [
      {
        number: 1,
        title: 'Application Submission',
        description: 'Apply online through official AB Bank PLC career portal (www.abbl.com/career) adhering to circular deadlines.',
        duration: '2-3 weeks',
        tips: [
          'Check website regularly for circulars',
          'Apply before deadline',
          'Ensure all information is accurate'
        ]
      },
      {
        number: 2,
        title: 'Shortlisting & Screening',
        description: 'Only applicants meeting academic qualifications and criteria are shortlisted. Eligibility includes minimum CGPA, age limits, and computer skills.',
        duration: '1-2 weeks',
        tips: [
          'Meet all minimum requirements',
          'Provide complete academic records',
          'Wait for official communication'
        ]
      },
      {
        number: 3,
        title: 'Written Test',
        description: 'Competitive written exam assessing banking knowledge, analytical skills, and general awareness.',
        duration: '2-3 hours',
        tips: [
          'Prepare for comprehensive written exam',
          'Review banking fundamentals',
          'Practice analytical problems'
        ]
      },
      {
        number: 4,
        title: 'Competency-Based Interview',
        description: 'Face-to-face interviews evaluate skills, attitude, and professional readiness for banking work.',
        duration: '30-45 minutes',
        tips: [
          'Prepare for behavioral questions',
          'Show professional attitude',
          'Demonstrate banking interest'
        ]
      },
      {
        number: 5,
        title: 'Medical Examination',
        description: 'Physical and medical test conducted to ensure health readiness for banking work environments.',
        duration: '1 week',
        tips: [
          'Complete medical examination promptly',
          'Ensure fitness for role',
          'Submit all required reports'
        ]
      },
      {
        number: 6,
        title: 'Final Selection & Training',
        description: 'Successful candidates receive offer letter and join structured two-year MTO training program leading to Core Banking Cadre.',
        duration: '2 years',
        tips: [
          'Commit to training program',
          'Learn through rotations in different departments',
          'Understand career progression path'
        ]
      }
    ],
    resources: {
      mockTests: [
        { id: 1, title: 'AB Bank MTO Mock Test 2025', questions: 100, duration: '120 min' },
        { id: 2, title: 'Banking Aptitude Assessment', questions: 80, duration: '90 min' }
      ],
      previousYears: [
        { id: 1, title: 'AB Bank Question 2024', year: 2024 },
        { id: 2, title: 'AB Bank Question 2023', year: 2023 }
      ],
      books: [
        { id: 1, title: 'MTO Preparation Guide', author: 'Prof. Hossain' },
        { id: 2, title: 'Banking Career Success', author: 'Dr. Islam' }
      ]
    }
  },
  {
    id: 'bangladesh-commerce-bank',
    name: 'Bangladesh Commerce Bank Limited',
    shortName: 'BCB',
    logo: '🏛️',
    color: '#2563EB',
    bgColor: 'bg-blue-50',
    description: 'Methodical, transparent recruitment aimed at both fresh graduates and experienced professionals for various banking roles.',
    positions: ['Probationary Officer', 'Mid-to-Senior Management', 'Various Banking Positions'],
    overview: 'Bangladesh Commerce Bank Ltd recruitment is transparent with job announcement, online application, written test, viva-voce, and final selection with probation period.',
    eligibility: [
      '4-year Honours or Masters degree from recognized institution',
      'Minimum CGPA 3.00/4.00 and two first division results in SSC/HSC',
      'Age limit 22-32 years for Probationary Officer',
      'No canvassing or influence attempts allowed',
      'Merit-based selection'
    ],
    stages: [
      {
        number: 1,
        title: 'Job Announcement',
        description: 'Vacancies announced through bank official website, job portals (bdjobs.com/bcbl), and national newspapers.',
        duration: '2-3 weeks',
        tips: [
          'Monitor official website regularly',
          'Check job portals frequently',
          'Note application deadlines carefully'
        ]
      },
      {
        number: 2,
        title: 'Application Submission',
        description: 'Apply online submitting detailed CV, passport-size photograph, and academic certificates by announced deadline.',
        duration: '2-3 weeks',
        tips: [
          'Complete online application accurately',
          'Upload all required documents',
          'Submit before deadline'
        ]
      },
      {
        number: 3,
        title: 'Initial Screening',
        description: 'Bank rigorously evaluates academic qualifications and professional experience. Only qualified candidates proceed.',
        duration: '1-2 weeks',
        tips: [
          'Ensure academic credentials meet requirements',
          'Provide complete information',
          'Wait for official notification'
        ]
      },
      {
        number: 4,
        title: 'Written Test',
        description: 'Competitive written exam covering Analytical Ability (20), Banking Knowledge (20), General Knowledge (20), Bengali & English (40) for 100 marks total.',
        duration: '2-3 hours',
        tips: [
          'Prepare across all four sections',
          'Focus on language skills (40% weightage)',
          'Practice analytical problems'
        ]
      },
      {
        number: 5,
        title: 'Viva-Voce/Interview',
        description: 'Candidates performing well on written exam are called for face-to-face interview to assess analytical skills and professional attitude.',
        duration: '30-45 minutes',
        tips: [
          'Bring all original documents',
          'Prepare for professional questions',
          'Demonstrate banking suitability'
        ]
      },
      {
        number: 6,
        title: 'Final Selection & Probation',
        description: 'Successful candidates receive conditional offers, must verify original documents, and join one-year probation before confirmation as Senior Officer.',
        duration: '1 year',
        tips: [
          'Perform well during probation',
          'Complete all training requirements',
          'Understand confirmation criteria'
        ]
      }
    ],
    resources: {
      mockTests: [
        { id: 1, title: 'BCB Probationary Officer Mock Test', questions: 100, duration: '120 min' },
        { id: 2, title: 'Comprehensive Banking Test', questions: 80, duration: '90 min' }
      ],
      previousYears: [
        { id: 1, title: 'BCB Question 2024', year: 2024 },
        { id: 2, title: 'BCB Question 2023', year: 2023 }
      ],
      books: [
        { id: 1, title: 'Banking Job Preparation', author: 'Prof. Sen' },
        { id: 2, title: 'Complete Banking Guide', author: 'Dr. Roy' }
      ]
    }
  },
  {
    id: 'bank-asia',
    name: 'Bank Asia PLC',
    shortName: 'Bank Asia',
    logo: '💼',
    color: '#0EA5E9',
    bgColor: 'bg-sky-50',
    description: 'Comprehensive merit-based recruitment for Management Trainee, Teller, and experienced banking positions.',
    positions: ['Management Trainee Officer (MTO)', 'Teller', 'Assistant Officer', 'Experienced Positions'],
    overview: 'Bank Asia PLC follows comprehensive recruitment with online application, screening, written test, viva-voce interviews, and final selection with training.',
    eligibility: [
      "Master's degree or minimum 4-year graduation",
      'Minimum CGPA 3.00/4.00 or equivalent',
      'Age limit specified in circular',
      'Both fresh graduates and experienced considered',
      'Strong communication and IT skills'
    ],
    stages: [
      {
        number: 1,
        title: 'Job Announcement & Application',
        description: 'Vacancies posted on Bank Asia official website (www.bankasia-bd.com/about/career) and leading job portals. Apply online before deadline.',
        duration: '2-3 weeks',
        tips: [
          'Check official website regularly',
          'Read circular requirements carefully',
          'Submit application before last date'
        ]
      },
      {
        number: 2,
        title: 'Screening & Shortlisting',
        description: 'Applications screened per job circular requirements including CGPA, age limits, and specific qualifications.',
        duration: '1-2 weeks',
        tips: [
          'Ensure all requirements are met',
          'Provide accurate information',
          'Wait for shortlist notification'
        ]
      },
      {
        number: 3,
        title: 'Written Test',
        description: 'Competitive written examination evaluating general aptitude, banking knowledge, analytical skills, and language abilities.',
        duration: '2-3 hours',
        tips: [
          'Prepare for comprehensive exam',
          'Review banking fundamentals',
          'Practice analytical reasoning'
        ]
      },
      {
        number: 4,
        title: 'Interview (Viva-Voce)',
        description: 'Candidates passing exam proceed to one or two interview phases assessing professional attitude, communication, and readiness.',
        duration: '2-3 weeks',
        tips: [
          'Bring original certificates for verification',
          'Prepare for multiple interview rounds',
          'Demonstrate professional competence'
        ]
      },
      {
        number: 5,
        title: 'Final Selection & Training',
        description: 'Selected candidates receive appointment letters. Entry-level recruits undergo orientation and structured training before confirmation.',
        duration: 'Variable (up to 6 months for MTO)',
        tips: [
          'Complete training program successfully',
          'Understand probation requirements',
          'Focus on learning and development'
        ]
      }
    ],
    resources: {
      mockTests: [
        { id: 1, title: 'Bank Asia MTO Mock Test', questions: 100, duration: '90 min' },
        { id: 2, title: 'Banking Aptitude Test', questions: 80, duration: '75 min' }
      ],
      previousYears: [
        { id: 1, title: 'Bank Asia Question 2024', year: 2024 },
        { id: 2, title: 'Bank Asia Question 2023', year: 2023 }
      ],
      books: [
        { id: 1, title: 'Banking Career Guide', author: 'Prof. Ahmed' },
        { id: 2, title: 'MTO Success Manual', author: 'Dr. Kamal' }
      ]
    }
  },
  {
    id: 'city-bank',
    name: 'The City Bank Limited',
    shortName: 'City Bank',
    logo: '🏙️',
    color: '#06B6D4',
    bgColor: 'bg-cyan-50',
    description: 'Systematic recruitment with three-stage knockout assessment for Management Trainee Officers and professional roles.',
    positions: ['Management Trainee Officer (MTO)', 'Professional Roles', 'Various Positions'],
    overview: 'City Bank Ltd recruitment systematically identifies and assesses candidates through online application, screening, three-stage assessment, and onboarding.',
    eligibility: [
      '4-year graduation or postgraduation',
      'Minimum CGPA 3.00/4.00 or first class from UGC-approved university',
      'Age limits as stated in circulars',
      'Relevant skills and experiences',
      'No canvassing or repeated applications within 6 months'
    ],
    stages: [
      {
        number: 1,
        title: 'Job Announcement & Application',
        description: 'Jobs posted via careers portal (citybankplc.com/career), internal circulars, and external advertisements. Apply online or via email (recruitment@thecitybank.com).',
        duration: '2-3 weeks',
        tips: [
          'Check career portal regularly',
          'Upload CV on careers portal',
          'Apply according to instructions'
        ]
      },
      {
        number: 2,
        title: 'Screening & Shortlisting',
        description: 'HR screens applications matching minimum requirements: 4-year degree, CGPA 3.00/4.00, age limits, and relevant skills.',
        duration: '1-2 weeks',
        tips: [
          'Ensure academic credentials are strong',
          'Meet all stated criteria',
          'Provide complete information'
        ]
      },
      {
        number: 3,
        title: 'Stage 1: Group Case Discussion',
        description: 'Candidates work in groups to solve real-world business cases, demonstrating teamwork, analytical skill, and communication. Only top performers advance.',
        duration: '2-3 hours',
        tips: [
          'Prepare for group discussions',
          'Demonstrate teamwork skills',
          'Contribute meaningfully to discussions'
        ]
      },
      {
        number: 4,
        title: 'Stage 2: Presentation & Role Play',
        description: 'Individual presentations on assigned topics and managerial role-plays evaluate problem-solving and leadership skills.',
        duration: '2-3 hours',
        tips: [
          'Prepare presentation skills',
          'Practice role-play scenarios',
          'Show leadership potential'
        ]
      },
      {
        number: 5,
        title: 'Stage 3: Final Interview',
        description: 'Those clearing assessment attend final interview with senior management testing strategic thinking, personal fit, and leadership potential.',
        duration: '30-45 minutes',
        tips: [
          'Bring original documents for verification',
          'Research City Bank strategy',
          'Demonstrate strategic thinking'
        ]
      },
      {
        number: 6,
        title: 'Selection & Onboarding',
        description: 'Successful candidates notified and must present original documents. Probation periods apply before confirmation.',
        duration: 'Variable',
        tips: [
          'Verify all documents',
          'Understand probation terms',
          'Complete onboarding successfully'
        ]
      }
    ],
    resources: {
      mockTests: [
        { id: 1, title: 'City Bank MTO Assessment', questions: 100, duration: '120 min' },
        { id: 2, title: 'Case Study Practice', questions: 5, duration: '90 min' }
      ],
      previousYears: [
        { id: 1, title: 'City Bank Question 2024', year: 2024 },
        { id: 2, title: 'City Bank Question 2023', year: 2023 }
      ],
      books: [
        { id: 1, title: 'Banking Assessment Guide', author: 'Prof. Rahman' },
        { id: 2, title: 'Case Study Mastery', author: 'Dr. Hassan' }
      ]
    }
  },
  {
    id: 'dhaka-bank',
    name: 'Dhaka Bank PLC',
    shortName: 'Dhaka Bank',
    logo: '🏦',
    color: '#8B5CF6',
    bgColor: 'bg-violet-50',
    description: 'Structured recruitment for fresh graduates and experienced professionals with transparent, merit-based multi-stage process.',
    positions: ['Management Trainee Officer', 'Probationary Officer', 'Lateral Entries', 'Interns'],
    overview: 'Dhaka Bank PLC follows structured recruitment with online application, screening, written test (often by IBA), interview, document verification, and final selection.',
    eligibility: [
      '4-year graduation or postgraduation',
      'Minimum CGPA specified in circular',
      'Age below 30 for fresh graduate positions',
      'Essential computer skills',
      'Willingness to work anywhere in Bangladesh'
    ],
    stages: [
      {
        number: 1,
        title: 'Job Announcement & Application',
        description: 'Vacancies advertised via Dhaka Bank website, job portals (bdjobs.com), and newspapers. Apply online following circular instructions.',
        duration: '2-3 weeks',
        tips: [
          'Monitor official website regularly',
          'Follow application instructions carefully',
          'Submit all required documents'
        ]
      },
      {
        number: 2,
        title: 'Initial Screening',
        description: 'HR reviews applications to select candidates meeting required qualifications (degree, CGPA, age).',
        duration: '1-2 weeks',
        tips: [
          'Ensure all requirements are met',
          'Provide accurate information',
          'Wait for official communication'
        ]
      },
      {
        number: 3,
        title: 'Written Test',
        description: 'Competitive written exam often managed by IBA for MTO/Probationary Officer posts, covering analytical ability, English, and banking knowledge.',
        duration: '2-3 hours',
        tips: [
          'Prepare for IBA-style questions',
          'Review analytical and verbal skills',
          'Practice time management'
        ]
      },
      {
        number: 4,
        title: 'Interview (Viva-Voce)',
        description: 'Candidates passing written exam invited to interviews assessing professional aptitude, attitude, and role suitability.',
        duration: '30-45 minutes',
        tips: [
          'Bring all original certificates',
          'Prepare for professional questions',
          'Show banking career commitment'
        ]
      },
      {
        number: 5,
        title: 'Document Verification',
        description: 'Original educational, experience, and other certificates verified during final interview stages.',
        duration: '1 week',
        tips: [
          'Organize all original documents',
          'Ensure certificates are authentic',
          'Provide any additional requested documents'
        ]
      },
      {
        number: 6,
        title: 'Final Selection & Probation',
        description: 'Successful candidates receive appointment letters and begin probation period. Probationary Officers confirmed as Officers after one year.',
        duration: '1 year',
        tips: [
          'Understand probation terms',
          'Perform well during probation',
          'Complete all training requirements'
        ]
      }
    ],
    resources: {
      mockTests: [
        { id: 1, title: 'Dhaka Bank MTO Mock Test', questions: 100, duration: '120 min' },
        { id: 2, title: 'IBA-Style Banking Test', questions: 80, duration: '90 min' }
      ],
      previousYears: [
        { id: 1, title: 'Dhaka Bank Question 2024', year: 2024 },
        { id: 2, title: 'Dhaka Bank Question 2023', year: 2023 }
      ],
      books: [
        { id: 1, title: 'IBA Banking Preparation', author: 'Prof. Chowdhury' },
        { id: 2, title: 'Banking Success Guide', author: 'Dr. Mahmud' }
      ]
    }
  },
  {
    id: 'dutch-bangla-bank',
    name: 'Dutch-Bangla Bank PLC',
    shortName: 'DBBL',
    logo: '🏛️',
    color: '#10B981',
    bgColor: 'bg-emerald-50',
    description: 'Systematic multi-stage recruitment ensuring only most qualified candidates for Probationary Officer and specialized roles.',
    positions: ['Probationary Officer', 'Management Trainee', 'Specialized Roles'],
    overview: 'Dutch-Bangla Bank PLC uses systematic recruitment with online application, written test (IBA/BIBM), interviews, background checks, medical exam, and probation.',
    eligibility: [
      "Minimum three first-class/division results with no third division",
      'Proficiency in both Bangla and English',
      'Computer literacy required',
      'Willingness to work anywhere in Bangladesh',
      "Master's, MBM, or four-year Bachelor's degree (age up to 30-32)"
    ],
    stages: [
      {
        number: 1,
        title: 'Job Announcement & Application',
        description: 'Vacancies posted on DBBL career site (app.dutchbanglabank.com) and newspapers. Apply online uploading photograph and certificates before deadline.',
        duration: '2-3 weeks',
        tips: [
          'Check career site regularly',
          'Upload all required documents',
          'Apply before stated deadline'
        ]
      },
      {
        number: 2,
        title: 'Initial Screening',
        description: 'HR reviews applications ensuring basic requirements met. Only shortlisted candidates contacted for next stage.',
        duration: '1-2 weeks',
        tips: [
          'Meet all eligibility criteria',
          'Provide complete information',
          'Wait for official notification'
        ]
      },
      {
        number: 3,
        title: 'Written Test',
        description: 'Shortlisted applicants take written aptitude test managed by external institution (IBA or BIBM) assessing general aptitude, analytical ability, and banking knowledge.',
        duration: '2-3 hours',
        tips: [
          'Prepare for external institution test',
          'Review general aptitude and banking',
          'Practice analytical problems'
        ]
      },
      {
        number: 4,
        title: 'Interview',
        description: 'Structured interview including group discussion, panel interview, and communication/problem-solving skills assessment.',
        duration: '2-3 hours',
        tips: [
          'Prepare for group discussions',
          'Practice communication skills',
          'Show problem-solving abilities'
        ]
      },
      {
        number: 5,
        title: 'Background & Medical Checks',
        description: 'Finalists undergo police/background checks, medical examinations, and document verification.',
        duration: '1-2 weeks',
        tips: [
          'Ensure clean background',
          'Complete medical exam promptly',
          'Verify all documents are authentic'
        ]
      },
      {
        number: 6,
        title: 'Offer & Probation',
        description: 'Successful candidates receive appointment letters and join probationary period before confirmation. Performance reviewed for cultural fit.',
        duration: 'Variable',
        tips: [
          'Understand probation requirements',
          'Complete training successfully',
          'Demonstrate cultural fit'
        ]
      }
    ],
    resources: {
      mockTests: [
        { id: 1, title: 'DBBL Probationary Officer Test', questions: 100, duration: '120 min' },
        { id: 2, title: 'IBA/BIBM Style Test', questions: 80, duration: '90 min' }
      ],
      previousYears: [
        { id: 1, title: 'DBBL Question 2024', year: 2024 },
        { id: 2, title: 'DBBL Question 2023', year: 2023 }
      ],
      books: [
        { id: 1, title: 'DBBL Career Guide', author: 'Prof. Das' },
        { id: 2, title: 'Banking Excellence', author: 'Dr. Saha' }
      ]
    }
  },
  {
    id: 'jamuna-bank',
    name: 'Jamuna Bank Limited',
    shortName: 'Jamuna Bank',
    logo: '💼',
    color: '#4F46E5',
    bgColor: 'bg-indigo-50',
    description: 'Structured, merit-based recruitment for Probationary Officers, Management Trainees, and entry-level positions with comprehensive training.',
    positions: ['Probationary Officer', 'Management Trainee', 'Trainee Junior Officer', 'Trainee Teller'],
    overview: 'Jamuna Bank Limited follows structured process with online application, screening, written exam (IBA/BIBM), interviews, certificate verification, medical examination, and probation.',
    eligibility: [
      'Must be Bangladeshi citizen',
      'Specific educational qualifications per position',
      'No criminal record',
      'Physical and psychological fitness',
      'One-year probation period required'
    ],
    stages: [
      {
        number: 1,
        title: 'Manpower Planning & Job Analysis',
        description: 'HR and department heads assess annual manpower needs, create detailed job descriptions and specifications.',
        duration: '2-3 months',
        tips: [
          'Monitor official career portal',
          'Check for periodic job announcements',
          'Understand position requirements'
        ]
      },
      {
        number: 2,
        title: 'Application Submission',
        description: 'Apply online via Jamuna Bank Career Portal (career.jamunabank.com.bd). Upload scanned photo (max 30 KB), educational certificate (PDF). Deadlines are strict.',
        duration: '2-3 weeks',
        tips: [
          'Apply only through official portal',
          'Ensure all documents meet specifications',
          'Submit before deadline'
        ]
      },
      {
        number: 3,
        title: 'Preliminary Screening',
        description: 'HR reviews applications filtering by degree, CGPA, age, and "no 3rd division". Initial interview assesses efficiency and basic fit.',
        duration: '1-2 weeks',
        tips: [
          'Meet all basic criteria',
          'Provide accurate contact information',
          'Wait for admit card notification'
        ]
      },
      {
        number: 4,
        title: 'Written Examination',
        description: 'Competitive test by IBA-DU or BIBM covering general knowledge, mathematics, English, management, economics, banking. Minimum 60% required.',
        duration: '90 minutes',
        tips: [
          'Prepare across all subjects',
          'Practice time management',
          'Aim for above 60% score'
        ]
      },
      {
        number: 5,
        title: 'Employment Tests & Interview',
        description: 'Qualified candidates complete detailed application form and undergo aptitude, skill, and personality tests. Panel interview follows.',
        duration: '3-4 hours',
        tips: [
          'Complete application accurately',
          'Prepare for multiple test types',
          'Show professional attitude in interview'
        ]
      },
      {
        number: 6,
        title: 'Background Checks & Medical',
        description: 'HR verifies academic records with universities, checks references and employment history. Medical examination at empanelled center required.',
        duration: '1-2 weeks',
        tips: [
          'Ensure authentic credentials',
          'Provide accurate references',
          'Complete medical exam promptly'
        ]
      },
      {
        number: 7,
        title: 'Final Selection & Probation',
        description: 'Successful candidates receive job offer and sign service bond. One-year probation with performance monitoring before confirmation.',
        duration: '1 year',
        tips: [
          'Understand service bond terms',
          'Perform well during probation',
          'Complete all training requirements'
        ]
      }
    ],
    resources: {
      mockTests: [
        { id: 1, title: 'Jamuna Bank PO Mock Test', questions: 100, duration: '90 min' },
        { id: 2, title: 'IBA-Style Banking Test', questions: 80, duration: '75 min' }
      ],
      previousYears: [
        { id: 1, title: 'Jamuna Bank Question 2024', year: 2024 },
        { id: 2, title: 'Jamuna Bank Question 2023', year: 2023 }
      ],
      books: [
        { id: 1, title: 'Banking Job Success', author: 'Prof. Alam' },
        { id: 2, title: 'JBL Career Guide', author: 'Dr. Noor' }
      ]
    }
  },
  {
    id: 'meghna-bank',
    name: 'Meghna Bank PLC',
    shortName: 'Meghna Bank',
    logo: '🏛️',
    color: '#8B5CF6',
    bgColor: 'bg-purple-50',
    description: 'Rigorous merit-based recruitment focused on attracting qualified professionals with anti-fraud verification and comprehensive training.',
    positions: ['Management Trainee Officer (MTO)', 'Relationship Officer', 'Junior Officer'],
    overview: 'Meghna Bank PLC recruitment emphasizes merit with online application, aptitude tests, interviews, rigorous certificate verification, medical checks, and induction training.',
    eligibility: [
      "Bachelor's degree with minimum CGPA 3.0 for MTOs",
      'No 3rd division/class or below GPA 2.5',
      'Age should not exceed 30 years for entry-level',
      'Must be Bangladeshi citizen',
      'No criminal record'
    ],
    stages: [
      {
        number: 1,
        title: 'Work-force Planning',
        description: 'HR and divisional heads forecast vacancies every 2-3 months based on growth, expansion, and succession planning.',
        duration: '2-3 months',
        tips: [
          'Monitor career portal regularly',
          'Check for job announcements',
          'Understand position requirements'
        ]
      },
      {
        number: 2,
        title: 'Application Submission',
        description: 'Apply online via career.meghnabank.com.bd. Upload CV, photo (≤ 50 KB), academic certificates. Deadlines typically 3-4 weeks.',
        duration: '3-4 weeks',
        tips: [
          'Read circular carefully before applying',
          'Ensure all documents meet specifications',
          'Apply before deadline'
        ]
      },
      {
        number: 3,
        title: 'Pre-screening & Shortlisting',
        description: 'ATS short-lists by CGPA, age, branch preference. Only shortlisted candidates notified by email/SMS of test date.',
        duration: '1-2 weeks',
        tips: [
          'Meet all basic criteria',
          'Provide accurate contact information',
          'Wait for official notification'
        ]
      },
      {
        number: 4,
        title: 'Assessment Tests',
        description: 'Written exams/aptitude tests (90-120 min) by IBA-DU or BIBM: English, quantitative, analytical, general & banking knowledge. Minimum 45-50% required.',
        duration: '90-120 minutes',
        tips: [
          'Prepare for comprehensive test',
          'Practice all test sections',
          'Aim for above minimum score'
        ]
      },
      {
        number: 5,
        title: 'Interview',
        description: 'Panel interview (Head-HR, functional head, GM/DMD) with behavioural, situational, and ethical questions.',
        duration: '30-45 minutes',
        tips: [
          'Prepare for behavioral questions',
          'Show ethical values',
          'Demonstrate professional competence'
        ]
      },
      {
        number: 6,
        title: 'Background & Certificate Verification',
        description: 'Critical anti-fraud step: HR verifies certificates manually and technically, contacts universities for confirmation.',
        duration: '1-2 weeks',
        tips: [
          'Ensure all certificates are authentic',
          'Provide accurate references',
          'Be prepared for thorough verification'
        ]
      },
      {
        number: 7,
        title: 'Medical Examination',
        description: 'Pre-employment medical checkup by authorized providers (blood tests, urine exams, chest X-rays, physician summary).',
        duration: '1 week',
        tips: [
          'Complete medical exam promptly',
          'Ensure fitness for role',
          'Submit all required reports'
        ]
      },
      {
        number: 8,
        title: 'Offer & Induction Training',
        description: 'Successful candidates receive appointment after board approval. Induction covers bank policies, job-specific training, ethics. Starting salary BDT 50,000 for MTOs.',
        duration: 'Variable',
        tips: [
          'Sign service bond (3 years)',
          'Complete induction training',
          'Understand probation requirements'
        ]
      }
    ],
    resources: {
      mockTests: [
        { id: 1, title: 'Meghna Bank MTO Mock Test', questions: 100, duration: '120 min' },
        { id: 2, title: 'Banking Aptitude Assessment', questions: 80, duration: '90 min' }
      ],
      previousYears: [
        { id: 1, title: 'Meghna Bank Question 2024', year: 2024 },
        { id: 2, title: 'Meghna Bank Question 2023', year: 2023 }
      ],
      books: [
        { id: 1, title: 'MTO Success Guide', author: 'Prof. Islam' },
        { id: 2, title: 'Banking Career Manual', author: 'Dr. Khan' }
      ]
    }
  },
  {
    id: 'midland-bank',
    name: 'Midland Bank PLC',
    shortName: 'Midland Bank',
    logo: '💼',
    color: '#DC2626',
    bgColor: 'bg-red-50',
    description: 'Transparent multi-stage recruitment for fresh graduates and experienced professionals emphasizing fairness and skill.',
    positions: ['Various Banking Roles', 'Fresh Graduate Positions', 'Experienced Positions'],
    overview: 'Midland Bank PLC uses transparent recruitment with online application, screening, initial interview, written test/in-person interview, pre-employment checks, and final offer.',
    eligibility: [
      "Master's or 4-year Honours degree (any discipline)",
      'Age limit within circular specifications',
      'Both freshers and experienced may apply',
      'Understanding of bank mission and ethical standards encouraged',
      'No falsified information allowed'
    ],
    stages: [
      {
        number: 1,
        title: 'Job Announcement & Application',
        description: 'Vacancies advertised on career portal (midlandbankbd.net/career), job sites, and newspapers. Apply online with detailed CV, cover letter, and documents.',
        duration: '2-3 weeks',
        tips: [
          'Check career portal regularly',
          'Follow application instructions',
          'Submit all required documents'
        ]
      },
      {
        number: 2,
        title: 'Screening & Shortlisting',
        description: 'HR reviews and shortlists applications based on stated requirements and merit. Only shortlisted candidates contacted.',
        duration: '1-2 weeks',
        tips: [
          'Meet all requirements',
          'Provide complete information',
          'Wait for official communication'
        ]
      },
      {
        number: 3,
        title: 'Initial Interview',
        description: 'Shortlisted candidates may have initial phone or online interview with HR to review career history, motivation, and fit.',
        duration: '20-30 minutes',
        tips: [
          'Be prepared for phone screening',
          'Have resume handy',
          'Show enthusiasm for role'
        ]
      },
      {
        number: 4,
        title: 'Written Test & In-Person Interview',
        description: 'Selected candidates invited for written test and/or in-person interviews (several rounds possible) focusing on technical, behavioral competencies, and values alignment.',
        duration: '2-4 weeks',
        tips: [
          'Prepare for multiple rounds',
          'Research Midland Bank values',
          'Show teamwork and innovation skills'
        ]
      },
      {
        number: 5,
        title: 'Pre-Employment Checks',
        description: 'Finalists undergo background, reference, and identity verification, as well as medical screening before appointment.',
        duration: '1-2 weeks',
        tips: [
          'Provide accurate references',
          'Complete medical screening',
          'Verify all documentation'
        ]
      },
      {
        number: 6,
        title: 'Final Offer & Onboarding',
        description: 'Successful candidates issued appointment letters and complete onboarding and training. Probationary periods apply with performance reviews for confirmation.',
        duration: 'Variable',
        tips: [
          'Understand probation terms',
          'Complete training programs',
          'Demonstrate commitment to bank objectives'
        ]
      }
    ],
    resources: {
      mockTests: [
        { id: 1, title: 'Midland Bank Aptitude Test', questions: 100, duration: '90 min' },
        { id: 2, title: 'Banking Knowledge Test', questions: 80, duration: '75 min' }
      ],
      previousYears: [
        { id: 1, title: 'Midland Bank Question 2024', year: 2024 },
        { id: 2, title: 'Midland Bank Question 2023', year: 2023 }
      ],
      books: [
        { id: 1, title: 'Banking Career Success', author: 'Prof. Haque' },
        { id: 2, title: 'Professional Banking Guide', author: 'Dr. Uddin' }
      ]
    }
  },
  {
    id: 'national-bank',
    name: 'National Bank Limited',
    shortName: 'National Bank',
    logo: '🏦',
    color: '#059669',
    bgColor: 'bg-green-50',
    description: 'Structured merit-based recruitment for entry-level and experienced banking roles with rigorous assessment standards.',
    positions: ['Management Trainee', 'Experienced Positions', 'Top-Level Positions'],
    overview: 'National Bank Ltd conducts structured recruitment with online application, screening, written test (65% qualifying), interview, background/medical checks, and final offer.',
    eligibility: [
      'MBA/MBM or equivalent from reputed institution',
      'Minimum CGPA 3.00 or 10 points in academic career',
      'No third division/class at any level',
      'Age limits specified per position',
      'No canvassing or misrepresentation'
    ],
    stages: [
      {
        number: 1,
        title: 'Job Announcement & Application',
        description: 'Openings announced via career portal (nblbd.com) and major job sites/newspapers. Apply online filling prescribed forms and uploading documents.',
        duration: '2-3 weeks',
        tips: [
          'Monitor career portal regularly',
          'Follow application instructions carefully',
          'Submit all required documents'
        ]
      },
      {
        number: 2,
        title: 'Screening & Shortlisting',
        description: 'HR and selection panel review applications matching required qualifications and experience. Shortlisted candidates proceed.',
        duration: '1-2 weeks',
        tips: [
          'Meet all stated requirements',
          'Provide accurate information',
          'Wait for official notification'
        ]
      },
      {
        number: 3,
        title: 'Written Test',
        description: 'Competitive written examination covering analytical ability, English, mathematics, and general knowledge. Qualifying mark: 65%.',
        duration: '2-3 hours',
        tips: [
          'Prepare for comprehensive exam',
          'Aim for above 65% score',
          'Practice all subject areas'
        ]
      },
      {
        number: 4,
        title: 'Interview',
        description: 'Successful candidates attend interviews assessing technical knowledge, behavioral skills, and professional fit. Original certificates verified.',
        duration: '30-45 minutes',
        tips: [
          'Bring all original certificates',
          'Prepare for professional questions',
          'Demonstrate banking knowledge'
        ]
      },
      {
        number: 5,
        title: 'Background & Medical Checks',
        description: 'Selection panel reviews background and references. Medical test conducted before final offer.',
        duration: '1-2 weeks',
        tips: [
          'Provide accurate references',
          'Complete medical exam promptly',
          'Ensure clean background'
        ]
      },
      {
        number: 6,
        title: 'Final Offer & Appointment',
        description: 'Selected candidates receive appointment letters. Newly recruited employees typically begin with probation/training period with performance evaluation for confirmation.',
        duration: 'Variable',
        tips: [
          'Understand appointment terms',
          'Complete training successfully',
          'Perform well during probation'
        ]
      }
    ],
    resources: {
      mockTests: [
        { id: 1, title: 'National Bank Management Trainee Test', questions: 100, duration: '120 min' },
        { id: 2, title: 'Banking Aptitude Test', questions: 80, duration: '90 min' }
      ],
      previousYears: [
        { id: 1, title: 'National Bank Question 2024', year: 2024 },
        { id: 2, title: 'National Bank Question 2023', year: 2023 }
      ],
      books: [
        { id: 1, title: 'Banking Excellence Guide', author: 'Prof. Aziz' },
        { id: 2, title: 'Management Trainee Success', author: 'Dr. Kabir' }
      ]
    }
  },
  {
    id: 'ncc-bank',
    name: 'NCC Bank Limited',
    shortName: 'NCC Bank',
    logo: '💼',
    color: '#F59E0B',
    bgColor: 'bg-amber-50',
    description: 'Systematic transparent recruitment for MTO, Assistant Officer, and Junior Officer with MCQ-based tests and viva voce.',
    positions: ['Management Trainee Officer (MTO)', 'Assistant Officer', 'Junior Officer'],
    overview: 'NCC Bank Ltd employs systematic recruitment with online application, screening, written/online MCQ tests, viva voce interviews, and medical/background checks.',
    eligibility: [
      'Minimum 16 years of schooling (preferably commerce/economics/business/bank management)',
      'At least 3 first divisions/classes/equivalent CGPA',
      'No third division/class',
      'Age limit 21-32 years (clearly mentioned in circular)',
      'No canvassing or false information'
    ],
    stages: [
      {
        number: 1,
        title: 'Job Announcement & Application',
        description: 'Recruitment notices posted on NCC Bank career portal (www.nccbank.com.bd/career), newspapers, and online platforms. Submit detailed online applications.',
        duration: '2-3 weeks',
        tips: [
          'Check career portal regularly',
          'Ensure all certificates ready',
          'Submit before deadline'
        ]
      },
      {
        number: 2,
        title: 'Screening & Shortlisting',
        description: 'Applications screened by HR according to academic, experience, and eligibility criteria. Only shortlisted candidates invited.',
        duration: '1-2 weeks',
        tips: [
          'Meet all criteria',
          'Provide complete information',
          'Wait for invitation'
        ]
      },
      {
        number: 3,
        title: 'Written & Online Tests',
        description: 'MCQ-based aptitude tests followed by written exam focusing on analytical ability, English, mathematics, and general knowledge.',
        duration: '2-3 hours',
        tips: [
          'Prepare for MCQ format',
          'Review all subject areas',
          'Practice time management'
        ]
      },
      {
        number: 4,
        title: 'Interview & Viva Voce',
        description: 'Candidates passing written stages invited for viva/interviews with HR and technical panels. For MTOs, behavioral competencies and job-specific skills evaluated.',
        duration: '30-45 minutes',
        tips: [
          'Bring all original documents',
          'Prepare for behavioral questions',
          'Show banking suitability'
        ]
      },
      {
        number: 5,
        title: 'Medical & Background Checks',
        description: 'Shortlisted finalists must pass medical screening and reference checks before receiving offer.',
        duration: '1-2 weeks',
        tips: [
          'Complete medical promptly',
          'Provide accurate references',
          'Verify all credentials'
        ]
      },
      {
        number: 6,
        title: 'Final Selection & Training',
        description: 'Successful candidates receive appointment letters and start with probationary/training period, confirmed upon satisfactory performance.',
        duration: 'Variable',
        tips: [
          'Understand probation terms',
          'Complete training programs',
          'Demonstrate commitment'
        ]
      }
    ],
    resources: {
      mockTests: [
        { id: 1, title: 'NCC Bank MTO Mock Test', questions: 100, duration: '120 min' },
        { id: 2, title: 'MCQ Banking Test', questions: 80, duration: '90 min' }
      ],
      previousYears: [
        { id: 1, title: 'NCC Bank Question 2024', year: 2024 },
        { id: 2, title: 'NCC Bank Question 2023', year: 2023 }
      ],
      books: [
        { id: 1, title: 'NCC Banking Guide', author: 'Prof. Siddiqui' },
        { id: 2, title: 'MCQ Mastery', author: 'Dr. Ashraf' }
      ]
    }
  },
  {
    id: 'nrb-bank',
    name: 'NRB Bank PLC',
    shortName: 'NRB Bank',
    logo: '🏛️',
    color: '#3B82F6',
    bgColor: 'bg-blue-50',
    description: 'Transparent step-by-step recruitment for Trainee positions with focus on digital literacy and communication skills.',
    positions: ['Management Trainee Officer (MTO)', 'Trainee Officer (TO)', 'Trainee Assistant Officer (TAO)'],
    overview: 'NRB Bank PLC conducts transparent recruitment with online application, screening, written exam/assessment, interview, final selection with one-year probation.',
    eligibility: [
      'Four-year Bachelor or Master from UGC-approved university',
      'Minimum CGPA 3.00/4.00',
      'No third division/class in academic history',
      'Age must not exceed 32 years (as stated)',
      'Strong interpersonal, digital literacy, and communication skills'
    ],
    stages: [
      {
        number: 1,
        title: 'Job Announcement & Application',
        description: 'Vacancies published on career portal (www.nrbbankbd.com/career) and newspapers. Apply online by filling form and uploading documents per circular.',
        duration: '2-3 weeks',
        tips: [
          'Check career portal regularly',
          'Read circular instructions carefully',
          'Upload all required documents'
        ]
      },
      {
        number: 2,
        title: 'Screening & Shortlisting',
        description: 'Applications reviewed and only those meeting eligibility criteria shortlisted. Incomplete or inaccurate applications disqualified.',
        duration: '1-2 weeks',
        tips: [
          'Ensure completeness of application',
          'Provide accurate information',
          'Wait for shortlist notification'
        ]
      },
      {
        number: 3,
        title: 'Written Exam/Assessment',
        description: 'Shortlisted candidates called for written test or online assessment covering analytical ability, English, problem-solving, and banking knowledge.',
        duration: '2-3 hours',
        tips: [
          'Check SMS/email for test details',
          'Prepare for comprehensive assessment',
          'Review banking basics'
        ]
      },
      {
        number: 4,
        title: 'Interview',
        description: 'Candidates passing exam proceed to face-to-face interviews with HR and department panels for qualifications, attitude, skill fit assessment.',
        duration: '30-45 minutes',
        tips: [
          'Verify original certificates',
          'Prepare for professional questions',
          'Show digital literacy'
        ]
      },
      {
        number: 5,
        title: 'Final Selection & Probation',
        description: 'After assessments and reference checks, selected candidates receive appointment letters. One-year probation at set salary before permanent confirmation.',
        duration: '1 year',
        tips: [
          'Understand probation salary',
          'Perform well during probation',
          'Complete mandatory onboarding'
        ]
      }
    ],
    resources: {
      mockTests: [
        { id: 1, title: 'NRB Bank Trainee Officer Test', questions: 100, duration: '90 min' },
        { id: 2, title: 'Digital Banking Assessment', questions: 50, duration: '60 min' }
      ],
      previousYears: [
        { id: 1, title: 'NRB Bank Question 2024', year: 2024 },
        { id: 2, title: 'NRB Bank Question 2023', year: 2023 }
      ],
      books: [
        { id: 1, title: 'Trainee Officer Guide', author: 'Prof. Begum' },
        { id: 2, title: 'Digital Banking Basics', author: 'Dr. Talukder' }
      ]
    }
  },
  {
    id: 'nrb-commercial-bank',
    name: 'NRB Commercial Bank PLC',
    shortName: 'NRB Commercial',
    logo: '💼',
    color: '#10B981',
    bgColor: 'bg-emerald-50',
    description: 'Transparent merit-based recruitment for entry-level and experienced positions with focus on equal opportunity.',
    positions: ['Entry-Level Positions', 'Experienced Banking Professionals'],
    overview: 'NRB Commercial Bank PLC follows transparent recruitment with online application, screening, written test/interview, final selection with probation/training.',
    eligibility: [
      'Bangladeshi citizenship required',
      'Minimum age requirements (often at least 18)',
      "Relevant academic qualifications (Bachelor's or Master's degree)",
      'LLB/LLM preferred for legal posts',
      'Fresh graduates and experienced candidates eligible'
    ],
    stages: [
      {
        number: 1,
        title: 'Job Announcement & Application',
        description: 'Vacancies posted on career portal (nrbcommercialbank.com/career) and newspapers. Apply online filling application forms per circular specifications.',
        duration: '2-3 weeks',
        tips: [
          'Monitor career portal regularly',
          'Follow application instructions',
          'Submit all required documents'
        ]
      },
      {
        number: 2,
        title: 'Screening & Shortlisting',
        description: 'HR carefully screens applications for minimum qualification and eligibility before shortlisting for further testing.',
        duration: '1-2 weeks',
        tips: [
          'Meet minimum qualifications',
          'Provide complete information',
          'Wait for official communication'
        ]
      },
      {
        number: 3,
        title: 'Written Test/Interview',
        description: 'Shortlisted candidates invited for written exam and/or interview depending on position. Test evaluates analytical ability and subject knowledge.',
        duration: '2-3 hours',
        tips: [
          'Prepare for written assessment',
          'Bring original documents to interview',
          'Show professional suitability'
        ]
      },
      {
        number: 4,
        title: 'Final Selection & Training',
        description: 'After reference checks and document verification, suitable candidates receive appointment letters. Probation/training periods precede confirmation.',
        duration: 'Variable',
        tips: [
          'Verify all certificates',
          'Complete training successfully',
          'Understand probation requirements'
        ]
      }
    ],
    resources: {
      mockTests: [
        { id: 1, title: 'NRB Commercial Banking Test', questions: 100, duration: '90 min' },
        { id: 2, title: 'General Aptitude Test', questions: 80, duration: '75 min' }
      ],
      previousYears: [
        { id: 1, title: 'NRB Commercial Question 2024', year: 2024 },
        { id: 2, title: 'NRB Commercial Question 2023', year: 2023 }
      ],
      books: [
        { id: 1, title: 'Commercial Banking Guide', author: 'Prof. Miah' },
        { id: 2, title: 'Banking Career Path', author: 'Dr. Sultana' }
      ]
    }
  },
];
