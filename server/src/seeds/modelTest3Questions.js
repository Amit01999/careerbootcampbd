const modelTest3Questions = [
  // Part 1: Bangla Language & Literature (Questions 1-10)
  {
    questionText: "'গায়ক' শব্দের সঠিক সন্ধি বিচ্ছেদ কোনটি?",
    questionType: "mcq",
    subject: "Bangla",
    difficulty: "Medium",
    options: [
      "গা + অক",
      "গৈ + অক",
      "গায় + অক",
      "গৈ + যক"
    ],
    correctAnswer: 1,
    explanation: "'গায়ক' এর সন্ধি বিচ্ছেদ হলো গৈ + অক। নিয়ম: ঐ-কারের পর স্বরধ্বনি থাকলে ঐ-এর স্থানে 'আয়' হয় (গৈ + অক = গায়ক)।",
    marks: 1,
    negativeMarks: 0.25,
    tags: ["bangla grammar", "sandhi"],
    isActive: true,
    isVerified: true
  },
  {
    questionText: "'টিপয়' (Teapoy) কোন সমাসের উদাহরণ?",
    questionType: "mcq",
    subject: "Bangla",
    difficulty: "Medium",
    options: [
      "দ্বিগু সমাস",
      "কর্মধারয় সমাস",
      "বহুব্রীহি সমাস (সংখ্যাবাচক)",
      "অব্যয়ীভাব সমাস"
    ],
    correctAnswer: 2,
    explanation: "'টিপয়' বা তেপায়া অর্থ তিন পায়া যার। এটি একটি আসবাবপত্রকে বোঝায়, শুধু তিন পা-কে বোঝায় না। তাই এটি সংখ্যাবাচক বহুব্রীহি।",
    marks: 1,
    negativeMarks: 0.25,
    tags: ["bangla grammar", "samas"],
    isActive: true,
    isVerified: true
  },
  {
    questionText: "নিচের কোনটি শুদ্ধ বানান?",
    questionType: "mcq",
    subject: "Bangla",
    difficulty: "Easy",
    options: [
      "স্বায়ত্বশাসন",
      "সায়ত্বশাসন",
      "স্বায়ত্তশাসন",
      "সায়ত্ত্বশাসন"
    ],
    correctAnswer: 2,
    explanation: "সঠিক বানান 'স্বায়ত্তশাসন'। 'স্ব' (নিজ) + 'আয়ত্ত' + 'শাসন'।",
    marks: 1,
    negativeMarks: 0.25,
    tags: ["bangla spelling"],
    isActive: true,
    isVerified: true
  },
  {
    questionText: "'কচুবনের কালাচাঁদ' বাগধারাটির অর্থ কী?",
    questionType: "mcq",
    subject: "Bangla",
    difficulty: "Medium",
    options: [
      "অপদার্থ",
      "দুর্লভ বস্তু",
      "অমাবস্যার চাঁদ",
      "চাটুকার"
    ],
    correctAnswer: 0,
    explanation: "'কচুবনের কালাচাঁদ' বাগধারাটির অর্থ অপদার্থ বা অকেজো ব্যক্তি।",
    marks: 1,
    negativeMarks: 0.25,
    tags: ["bangla idioms"],
    isActive: true,
    isVerified: true
  },
  {
    questionText: "সৈয়দ মুজতবা আলী রচিত ভ্রমণকাহিনী কোনটি?",
    questionType: "mcq",
    subject: "Bangla",
    difficulty: "Medium",
    options: [
      "দৃষ্টিপাত",
      "দেশে-বিদেশে",
      "যাযাবর",
      "পথে প্রবাসে"
    ],
    correctAnswer: 1,
    explanation: "সৈয়দ মুজতবা আলীর বিখ্যাত ভ্রমণকাহিনী 'দেশে-বিদেশে' (১৯৪৮), যা কাবুলের পটভূমিতে রচিত।",
    marks: 1,
    negativeMarks: 0.25,
    tags: ["bangla literature", "authors"],
    isActive: true,
    isVerified: true
  },
  {
    questionText: "'পথিক, তুমি পথ হারাইয়াছ'—উক্তিটি বঙ্কিমচন্দ্রের কোন উপন্যাসের?",
    questionType: "mcq",
    subject: "Bangla",
    difficulty: "Medium",
    options: [
      "দুর্গেশনন্দিনী",
      "বিষবৃক্ষ",
      "কপালকুণ্ডলা",
      "রাজসিংহ"
    ],
    correctAnswer: 2,
    explanation: "বঙ্কিমচন্দ্র চট্টোপাধ্যায়ের 'কপালকুণ্ডলা' উপন্যাসে নবকুমার পথ হারালে কাপালিক কন্যা কপালকুণ্ডলা তাকে এই প্রশ্নটি করেছিলেন।",
    marks: 1,
    negativeMarks: 0.25,
    tags: ["bangla literature", "novels"],
    isActive: true,
    isVerified: true
  },
  {
    questionText: "'সূর্য' শব্দের সমার্থক শব্দ কোনটি?",
    questionType: "mcq",
    subject: "Bangla",
    difficulty: "Easy",
    options: [
      "আদিত্য",
      "শশাঙ্ক",
      "বিজন",
      "যামিনী"
    ],
    correctAnswer: 0,
    explanation: "সূর্যের সমার্থক শব্দগুলো হলো: আদিত্য, ভানু, রবি, দিবাকর, ভাস্কর ইত্যাদি। শশাঙ্ক = চাঁদ, যামিনী = রাত।",
    marks: 1,
    negativeMarks: 0.25,
    tags: ["bangla vocabulary", "synonyms"],
    isActive: true,
    isVerified: true
  },
  {
    questionText: "'বিসর্জন' এর বিপরীতার্থক শব্দ কোনটি?",
    questionType: "mcq",
    subject: "Bangla",
    difficulty: "Easy",
    options: [
      "আগমন",
      "আবাহন",
      "গ্রহণ",
      "বর্জন"
    ],
    correctAnswer: 1,
    explanation: "বিসর্জন (ত্যাগ করা/বিদায় দেওয়া) এর বিপরীত শব্দ আবাহন (ডাকা/আমন্ত্রণ জানানো)।",
    marks: 1,
    negativeMarks: 0.25,
    tags: ["bangla vocabulary", "antonyms"],
    isActive: true,
    isVerified: true
  },
  {
    questionText: "বাংলা ভাষার উদ্ভব হয়েছে কোন ভাষা থেকে?",
    questionType: "mcq",
    subject: "Bangla",
    difficulty: "Easy",
    options: [
      "সংস্কৃত",
      "পালি",
      "প্রাকৃত",
      "হিন্দি"
    ],
    correctAnswer: 2,
    explanation: "বাংলা ভাষার মূল উৎস ইন্দো-ইউরোপীয় হলেও, বাংলা সরাসরি 'প্রাকৃত' ও 'অপভ্রংশ' থেকে উদ্ভূত হয়েছে।",
    marks: 1,
    negativeMarks: 0.25,
    tags: ["bangla history", "linguistics"],
    isActive: true,
    isVerified: true
  },
  {
    questionText: "চর্যাপদের কোন পদটি খণ্ডিত আকারে (অর্ধেক) পাওয়া গেছে?",
    questionType: "mcq",
    subject: "Bangla",
    difficulty: "Medium",
    options: [
      "১০ নং পদ",
      "২৩ নং পদ",
      "২৪ নং পদ",
      "২৮ নং পদ"
    ],
    correctAnswer: 1,
    explanation: "চর্যাপদের ২৩ নং পদটি খণ্ডিত আকারে পাওয়া গেছে।",
    marks: 1,
    negativeMarks: 0.25,
    tags: ["bangla literature", "charyapada"],
    isActive: true,
    isVerified: true
  },

  // Part 2: English Language (Questions 11-20)
  {
    questionText: "What is the antonym of 'Dismantle'?",
    questionType: "mcq",
    subject: "English",
    difficulty: "Medium",
    options: [
      "Remake",
      "Assemble",
      "Clothe",
      "Strike"
    ],
    correctAnswer: 1,
    explanation: "'Dismantle' means to take apart. 'Assemble' means to put together, making it the antonym.",
    marks: 1,
    negativeMarks: 0.25,
    tags: ["antonyms", "vocabulary"],
    isActive: true,
    isVerified: true
  },
  {
    questionText: "Which word is a synonym for 'Indigent'?",
    questionType: "mcq",
    subject: "English",
    difficulty: "Medium",
    options: [
      "Angry",
      "Wealthy",
      "Poor/Destitute",
      "Native"
    ],
    correctAnswer: 2,
    explanation: "'Indigent' means poor or needy. The synonym is 'Poor/Destitute'.",
    marks: 1,
    negativeMarks: 0.25,
    tags: ["synonyms", "vocabulary"],
    isActive: true,
    isVerified: true
  },
  {
    questionText: "Complete the analogy: SYMPHONY : COMPOSER :: ?",
    questionType: "mcq",
    subject: "English",
    difficulty: "Hard",
    options: [
      "Leonardo : Music",
      "Fresco : Painter",
      "Colours : Pallet",
      "Art : Appreciation"
    ],
    correctAnswer: 1,
    explanation: "A Symphony is a work of art created by a Composer. A Fresco (a type of painting done on fresh plaster) is created by a Painter.",
    marks: 1,
    negativeMarks: 0.25,
    tags: ["analogy", "reasoning"],
    isActive: true,
    isVerified: true
  },
  {
    questionText: "Choose the correct active voice form for: 'He was being chased by the dogs.'",
    questionType: "mcq",
    subject: "English",
    difficulty: "Medium",
    options: [
      "The dogs chased him.",
      "The dogs were chasing him.",
      "The dogs are chasing him.",
      "The dogs chase him."
    ],
    correctAnswer: 1,
    explanation: "The passive sentence is in Past Continuous ('was being chased'). The active form maintains the same tense: 'The dogs were chasing him.'",
    marks: 1,
    negativeMarks: 0.25,
    tags: ["active-passive voice", "grammar"],
    isActive: true,
    isVerified: true
  },
  {
    questionText: "What is the meaning of the idiom 'Cap it all'?",
    questionType: "mcq",
    subject: "English",
    difficulty: "Medium",
    options: [
      "To seize everything",
      "To finish / To conclude",
      "To cover everything",
      "To occur"
    ],
    correctAnswer: 1,
    explanation: "The idiom 'To cap it all' refers to the final event in a series of events, often the finishing touch or the climax.",
    marks: 1,
    negativeMarks: 0.25,
    tags: ["idioms", "vocabulary"],
    isActive: true,
    isVerified: true
  },
  {
    questionText: "Fill in the blank (Third Conditional): 'Had the victim ______ able to find a telephone, she would have contacted authorities.'",
    questionType: "mcq",
    subject: "English",
    difficulty: "Hard",
    options: [
      "been",
      "would have been",
      "had been",
      "be"
    ],
    correctAnswer: 0,
    explanation: "This is a Third Conditional sentence using inversion (dropping 'If'). The structure is 'Had + Subject + V3 (Past Participle)'. So, 'Had the victim been able...'",
    marks: 1,
    negativeMarks: 0.25,
    tags: ["conditionals", "grammar"],
    isActive: true,
    isVerified: true
  },
  {
    questionText: "What is the antonym of 'Abate'?",
    questionType: "mcq",
    subject: "English",
    difficulty: "Medium",
    options: [
      "Enhance",
      "Decrease",
      "Deluge",
      "Exalt"
    ],
    correctAnswer: 0,
    explanation: "'Abate' means to become less intense or widespread (decrease). 'Enhance' or 'Increase' is the antonym.",
    marks: 1,
    negativeMarks: 0.25,
    tags: ["antonyms", "vocabulary"],
    isActive: true,
    isVerified: true
  },
  {
    questionText: "The phrase 'To cry wolf' means:",
    questionType: "mcq",
    subject: "English",
    difficulty: "Medium",
    options: [
      "To listen eagerly",
      "To give a false alarm",
      "To turn pale",
      "To keep off starvation"
    ],
    correctAnswer: 1,
    explanation: "Derived from the fable 'The Boy Who Cried Wolf,' it means to raise a false alarm.",
    marks: 1,
    negativeMarks: 0.25,
    tags: ["idioms", "vocabulary"],
    isActive: true,
    isVerified: true
  },
  {
    questionText: "One word substitution: 'One who is not easily pleased by anything.'",
    questionType: "mcq",
    subject: "English",
    difficulty: "Medium",
    options: [
      "Maiden",
      "Mediaeval",
      "Precarious",
      "Fastidious"
    ],
    correctAnswer: 3,
    explanation: "Fastidious means hard to please, very attentive to detail. Maiden means first attempt. Precarious means uncertain/dangerous.",
    marks: 1,
    negativeMarks: 0.25,
    tags: ["one-word substitution", "vocabulary"],
    isActive: true,
    isVerified: true
  },
  {
    questionText: "Identify the correct spelling:",
    questionType: "mcq",
    subject: "English",
    difficulty: "Easy",
    options: [
      "Bouquete",
      "Bouquet",
      "Boquet",
      "Bouquette"
    ],
    correctAnswer: 1,
    explanation: "The correct spelling is 'Bouquet' - an arrangement of flowers.",
    marks: 1,
    negativeMarks: 0.25,
    tags: ["spelling", "vocabulary"],
    isActive: true,
    isVerified: true
  },

  // Part 3: Mathematics & Analytical Ability (Questions 21-40)
  {
    questionText: "Bonnie has twice as many cousins as Robert. George has 5 cousins, which is 11 less than Bonnie has. How many cousins does Robert have?",
    questionType: "mcq",
    subject: "Mathematics",
    difficulty: "Medium",
    options: [
      "17",
      "21",
      "8",
      "10"
    ],
    correctAnswer: 2,
    explanation: "George = 5 cousins. Bonnie = 5 + 11 = 16 cousins. Bonnie has twice as many as Robert, so Robert = 16/2 = 8.",
    marks: 1,
    negativeMarks: 0.25,
    tags: ["word problems", "algebra"],
    isActive: true,
    isVerified: true
  },
  {
    questionText: "Sujan traveled 114 miles in 2 hours. At the same rate, how long will it take her to travel the remaining 285 miles?",
    questionType: "mcq",
    subject: "Mathematics",
    difficulty: "Easy",
    options: [
      "5 hours",
      "3 hours",
      "7 hours",
      "4 hours"
    ],
    correctAnswer: 0,
    explanation: "Speed = 114 miles / 2 hours = 57 mph. Time = 285 miles / 57 mph = 5 hours.",
    marks: 1,
    negativeMarks: 0.25,
    tags: ["speed-distance-time"],
    isActive: true,
    isVerified: true
  },
  {
    questionText: "Rahim wants to cut a rectangular board (18 inches x 30 inches) into identical square pieces. What is the least number of pieces he can cut without wasting board?",
    questionType: "mcq",
    subject: "Mathematics",
    difficulty: "Medium",
    options: [
      "6",
      "12",
      "15",
      "9"
    ],
    correctAnswer: 2,
    explanation: "Find HCF of 18 and 30, which is 6. Square size is 6×6. Number of pieces = (18×30)/(6×6) = 3×5 = 15.",
    marks: 1,
    negativeMarks: 0.25,
    tags: ["HCF-LCM", "geometry"],
    isActive: true,
    isVerified: true
  },
  {
    questionText: "What is the prime factorization of 84?",
    questionType: "mcq",
    subject: "Mathematics",
    difficulty: "Easy",
    options: [
      "2×2×3×7",
      "4×3×7",
      "2×6×7",
      "12×7"
    ],
    correctAnswer: 0,
    explanation: "84 = 2×2×3×7 (prime factorization uses only prime numbers).",
    marks: 1,
    negativeMarks: 0.25,
    tags: ["prime factorization", "number theory"],
    isActive: true,
    isVerified: true
  },
  {
    questionText: "A die is rolled and a coin is tossed. What is the probability that a 3 will be rolled AND a tail tossed?",
    questionType: "mcq",
    subject: "Mathematics",
    difficulty: "Medium",
    options: [
      "1/2",
      "1/6",
      "1/12",
      "1/8"
    ],
    correctAnswer: 2,
    explanation: "P(rolling 3) = 1/6, P(tail) = 1/2. P(both) = (1/6) × (1/2) = 1/12.",
    marks: 1,
    negativeMarks: 0.25,
    tags: ["probability"],
    isActive: true,
    isVerified: true
  },
  {
    questionText: "What is the angle between the hour and minute hands of a clock at 5:45?",
    questionType: "mcq",
    subject: "Mathematics",
    difficulty: "Hard",
    options: [
      "90°",
      "97.5°",
      "100°",
      "57.5°"
    ],
    correctAnswer: 1,
    explanation: "At 5:45, minute hand at 9 (270°), hour hand at 5.75 (172.5°). Difference = 270° - 172.5° = 97.5°.",
    marks: 1,
    negativeMarks: 0.25,
    tags: ["clock problems", "angles"],
    isActive: true,
    isVerified: true
  },
  {
    questionText: "In a game, chips are worth: Blue(1), Green(5), Purple(x), Red(11). The product of selected chips is 88,000. If Purple chips are worth more than Green but less than Red, how many Purple chips were selected?",
    questionType: "mcq",
    subject: "Mathematics",
    difficulty: "Hard",
    options: [
      "1",
      "2",
      "3",
      "4"
    ],
    correctAnswer: 1,
    explanation: "88,000 = 2^6 × 5^3 × 11. Purple value must be between 5 and 11, so Purple = 8 = 2^3. Two Purple chips (8×8 = 64) would give 2^6.",
    marks: 1,
    negativeMarks: 0.25,
    tags: ["prime factorization", "logical reasoning"],
    isActive: true,
    isVerified: true
  },
  {
    questionText: "How many integer solutions does the equation x+y=xy have?",
    questionType: "mcq",
    subject: "Mathematics",
    difficulty: "Hard",
    options: [
      "0",
      "1",
      "2",
      "Infinite"
    ],
    correctAnswer: 2,
    explanation: "Rearranging: xy - x - y = 0, (x-1)(y-1) = 1. Integer solutions: (x,y) = (0,0) and (2,2). So 2 solutions.",
    marks: 1,
    negativeMarks: 0.25,
    tags: ["algebra", "equations"],
    isActive: true,
    isVerified: true
  },
  {
    questionText: "A dress on sale is marked at price D. It is discounted by 15%, and staff get an additional 10% off. What price does a staff member pay?",
    questionType: "mcq",
    subject: "Mathematics",
    difficulty: "Medium",
    options: [
      "0.75D",
      "0.765D",
      "0.775D",
      "0.85D"
    ],
    correctAnswer: 1,
    explanation: "After 15% discount: 0.85D. After additional 10% off: 0.85D × 0.90 = 0.765D.",
    marks: 1,
    negativeMarks: 0.25,
    tags: ["percentage", "successive discounts"],
    isActive: true,
    isVerified: true
  },
  {
    questionText: "When a plot is sold for Tk 18,700, the owner loses 15%. At what price must it be sold to gain 15%?",
    questionType: "mcq",
    subject: "Mathematics",
    difficulty: "Medium",
    options: [
      "Tk 21,000",
      "Tk 22,500",
      "Tk 25,300",
      "Tk 25,800"
    ],
    correctAnswer: 2,
    explanation: "85% of CP = 18,700, so CP = 22,000. For 15% gain: SP = 115% of 22,000 = 25,300.",
    marks: 1,
    negativeMarks: 0.25,
    tags: ["profit-loss", "percentage"],
    isActive: true,
    isVerified: true
  },
  {
    questionText: "The length of the side of an equilateral triangle is 6 cm. What is its area?",
    questionType: "mcq",
    subject: "Mathematics",
    difficulty: "Medium",
    options: [
      "3√3",
      "9√3",
      "6√3",
      "9√2"
    ],
    correctAnswer: 1,
    explanation: "Area of equilateral triangle = (√3/4) × side². Area = (√3/4) × 6² = (√3/4) × 36 = 9√3.",
    marks: 1,
    negativeMarks: 0.25,
    tags: ["geometry", "triangles"],
    isActive: true,
    isVerified: true
  },
  {
    questionText: "Find the value of x if {3x-4}>20. Which of the following is NOT a possible value for x?",
    questionType: "mcq",
    subject: "Mathematics",
    difficulty: "Medium",
    options: [
      "8.1",
      "8.2",
      "-5.3",
      "-5.5"
    ],
    correctAnswer: 2,
    explanation: "3x - 4 > 20, so 3x > 24, x > 8. Therefore -5.3 is NOT a possible value (it's less than 8).",
    marks: 1,
    negativeMarks: 0.25,
    tags: ["inequalities", "algebra"],
    isActive: true,
    isVerified: true
  },
  {
    questionText: "Mass calculation: A boat sinks 0.015m when a man steps on it. The boat is 4m long and 1.5m wide. What is the mass of the man? (Water density = 1000 kg/m³)",
    questionType: "mcq",
    subject: "Mathematics",
    difficulty: "Hard",
    options: [
      "80 kg",
      "90 kg",
      "60 kg",
      "75 kg"
    ],
    correctAnswer: 1,
    explanation: "Volume displaced = 4 × 1.5 × 0.015 = 0.09 m³. Mass = density × volume = 1000 × 0.09 = 90 kg.",
    marks: 1,
    negativeMarks: 0.25,
    tags: ["physics", "density", "volume"],
    isActive: true,
    isVerified: true
  },
  {
    questionText: "In a factory, 40% are workers (income 390) and the rest are executives (income 420). What is the average income?",
    questionType: "mcq",
    subject: "Mathematics",
    difficulty: "Medium",
    options: [
      "405",
      "408",
      "410",
      "400"
    ],
    correctAnswer: 1,
    explanation: "Average = (40% × 390) + (60% × 420) = 156 + 252 = 408.",
    marks: 1,
    negativeMarks: 0.25,
    tags: ["weighted average", "percentage"],
    isActive: true,
    isVerified: true
  },
  {
    questionText: "Which number is a perfect square factor of 64?",
    questionType: "mcq",
    subject: "Mathematics",
    difficulty: "Easy",
    options: [
      "8",
      "12",
      "16",
      "24"
    ],
    correctAnswer: 2,
    explanation: "Factors of 64: 1, 2, 4, 8, 16, 32, 64. Perfect squares: 1, 4, 16, 64. Among options, 16 is a perfect square (4²).",
    marks: 1,
    negativeMarks: 0.25,
    tags: ["factors", "perfect squares"],
    isActive: true,
    isVerified: true
  },
  {
    questionText: "What is the compound interest on Tk 10,000 for 1 year at 8% per annum, compounded semi-annually?",
    questionType: "mcq",
    subject: "Mathematics",
    difficulty: "Medium",
    options: [
      "800",
      "816",
      "1600",
      "864"
    ],
    correctAnswer: 1,
    explanation: "Semi-annual rate = 4%. Amount = 10,000 × (1.04)² = 10,816. CI = 10,816 - 10,000 = 816.",
    marks: 1,
    negativeMarks: 0.25,
    tags: ["compound interest"],
    isActive: true,
    isVerified: true
  },
  {
    questionText: "If x²+Kx+5 has a factor (x+1), what is the value of K?",
    questionType: "mcq",
    subject: "Mathematics",
    difficulty: "Medium",
    options: [
      "5",
      "6",
      "-6",
      "-5"
    ],
    correctAnswer: 1,
    explanation: "If (x+1) is a factor, then x=-1 is a root. Substituting: (-1)² + K(-1) + 5 = 0. 1 - K + 5 = 0, K = 6.",
    marks: 1,
    negativeMarks: 0.25,
    tags: ["algebra", "factorization"],
    isActive: true,
    isVerified: true
  },
  {
    questionText: "The average of a, a+3, a+6, a+9, a+12 is 10. What is the value of a?",
    questionType: "mcq",
    subject: "Mathematics",
    difficulty: "Easy",
    options: [
      "1",
      "3",
      "4",
      "5"
    ],
    correctAnswer: 2,
    explanation: "Sum = 5a + 30. Average = (5a + 30)/5 = 10. So a + 6 = 10, a = 4.",
    marks: 1,
    negativeMarks: 0.25,
    tags: ["averages", "algebra"],
    isActive: true,
    isVerified: true
  },
  {
    questionText: "A bus has stops H, J, K, L, M in a circle. If 'K' is stop 3, which stop is immediately before 'L'?",
    questionType: "mcq",
    subject: "Analytical Reasoning",
    difficulty: "Medium",
    options: [
      "K",
      "M",
      "J",
      "H"
    ],
    correctAnswer: 0,
    explanation: "If K is stop 3, the circular sequence is: H(1), J(2), K(3), L(4), M(5). Stop immediately before L is K.",
    marks: 1,
    negativeMarks: 0.25,
    tags: ["logical reasoning", "sequences"],
    isActive: true,
    isVerified: true
  },
  {
    questionText: "1 Terabyte is equal to:",
    questionType: "mcq",
    subject: "ICT",
    difficulty: "Easy",
    options: [
      "10¹² Bytes",
      "10⁹ Bytes",
      "10⁶ Bytes",
      "10¹⁵ Bytes"
    ],
    correctAnswer: 0,
    explanation: "1 Terabyte (TB) = 10¹² Bytes or 1024⁴ bytes in binary.",
    marks: 1,
    negativeMarks: 0.25,
    tags: ["computer basics", "memory"],
    isActive: true,
    isVerified: true
  },

  // Part 4: General Knowledge, Science & ICT (Questions 41-60)
  {
    questionText: "What is the name of the Russian Space Agency?",
    questionType: "mcq",
    subject: "General Knowledge",
    difficulty: "Medium",
    options: [
      "Gazprom",
      "Roscosmos",
      "RSS",
      "Sputnik"
    ],
    correctAnswer: 1,
    explanation: "Roscosmos is the Russian space agency responsible for the country's space program.",
    marks: 1,
    negativeMarks: 0.25,
    tags: ["space", "international organizations"],
    isActive: true,
    isVerified: true
  },
  {
    questionText: "Who is the director of the acclaimed Bangladeshi movie 'Hawa'?",
    questionType: "mcq",
    subject: "General Knowledge",
    difficulty: "Medium",
    options: [
      "Mostofa Sarwar Farooki",
      "Mejbaur Rahman Sumon",
      "Chanchal Chowdhury",
      "Tareque Masud"
    ],
    correctAnswer: 1,
    explanation: "Mejbaur Rahman Sumon directed the acclaimed Bangladeshi film 'Hawa' (2022).",
    marks: 1,
    negativeMarks: 0.25,
    tags: ["bangladesh", "cinema", "current affairs"],
    isActive: true,
    isVerified: true
  },
  {
    questionText: "Which device is used to connect a computer to a telephone line for internet?",
    questionType: "mcq",
    subject: "ICT",
    difficulty: "Easy",
    options: [
      "Modem",
      "Router",
      "Switch",
      "Hub"
    ],
    correctAnswer: 0,
    explanation: "A Modem (modulator-demodulator) converts digital signals to analog for transmission over telephone lines.",
    marks: 1,
    negativeMarks: 0.25,
    tags: ["computer hardware", "networking"],
    isActive: true,
    isVerified: true
  },
  {
    questionText: "Which of the following is the strongest password format?",
    questionType: "mcq",
    subject: "ICT",
    difficulty: "Easy",
    options: [
      "123456",
      "Password",
      "SxXY59*&",
      "Admin123"
    ],
    correctAnswer: 2,
    explanation: "SxXY59*& is the strongest as it combines uppercase, lowercase, numbers, and special characters.",
    marks: 1,
    negativeMarks: 0.25,
    tags: ["cybersecurity", "passwords"],
    isActive: true,
    isVerified: true
  },
  {
    questionText: "Who killed Che Guevara?",
    questionType: "mcq",
    subject: "General Knowledge",
    difficulty: "Medium",
    options: [
      "Fidel Castro",
      "Mario Teran Salazar",
      "CIA agent",
      "Bolivian President"
    ],
    correctAnswer: 1,
    explanation: "Mario Teran Salazar, a Bolivian soldier, executed Che Guevara in 1967 on orders from the Bolivian government.",
    marks: 1,
    negativeMarks: 0.25,
    tags: ["history", "world affairs"],
    isActive: true,
    isVerified: true
  },
  {
    questionText: "Who was the first Finance Minister of Bangladesh?",
    questionType: "mcq",
    subject: "General Knowledge",
    difficulty: "Medium",
    options: [
      "Tajuddin Ahmed",
      "Captain Monsur Ali",
      "Syed Nazrul Islam",
      "AHM Quamruzzaman"
    ],
    correctAnswer: 1,
    explanation: "Captain M. Mansur Ali was the first Finance Minister of Bangladesh in the provisional government.",
    marks: 1,
    negativeMarks: 0.25,
    tags: ["bangladesh", "history"],
    isActive: true,
    isVerified: true
  },
  {
    questionText: "'Chandra Deep' is the ancient name of which region?",
    questionType: "mcq",
    subject: "General Knowledge",
    difficulty: "Medium",
    options: [
      "Chittagong",
      "Barisal",
      "Comilla",
      "Sylhet"
    ],
    correctAnswer: 1,
    explanation: "'Chandra Deep' or 'Chandradvipa' is the ancient name of the Barisal region.",
    marks: 1,
    negativeMarks: 0.25,
    tags: ["bangladesh", "history", "geography"],
    isActive: true,
    isVerified: true
  },
  {
    questionText: "Which was the first animal sent into space?",
    questionType: "mcq",
    subject: "General Knowledge",
    difficulty: "Easy",
    options: [
      "Dolly the sheep",
      "Laika the dog",
      "Albert the monkey",
      "Felicity the cat"
    ],
    correctAnswer: 1,
    explanation: "Laika, a Soviet dog, was the first animal sent into orbit in 1957 aboard Sputnik 2.",
    marks: 1,
    negativeMarks: 0.25,
    tags: ["space", "science history"],
    isActive: true,
    isVerified: true
  },
  {
    questionText: "The 2024 Summer Olympics was held in:",
    questionType: "mcq",
    subject: "General Knowledge",
    difficulty: "Easy",
    options: [
      "Los Angeles",
      "Paris",
      "Tokyo",
      "Brisbane"
    ],
    correctAnswer: 1,
    explanation: "The 2024 Summer Olympics were held in Paris, France.",
    marks: 1,
    negativeMarks: 0.25,
    tags: ["sports", "current affairs"],
    isActive: true,
    isVerified: true
  },
  {
    questionText: "Which month was recorded as the hottest ever on Earth in 2023?",
    questionType: "mcq",
    subject: "General Knowledge",
    difficulty: "Medium",
    options: [
      "June",
      "July",
      "August",
      "September"
    ],
    correctAnswer: 1,
    explanation: "July 2023 was recorded as the hottest month ever on Earth according to climate data.",
    marks: 1,
    negativeMarks: 0.25,
    tags: ["environment", "current affairs"],
    isActive: true,
    isVerified: true
  },
  {
    questionText: "Which Mobile Financial Service (MFS) is a subsidiary of the Bangladesh Post Office?",
    questionType: "mcq",
    subject: "General Knowledge",
    difficulty: "Medium",
    options: [
      "bKash",
      "Rocket",
      "Nagad",
      "Upay"
    ],
    correctAnswer: 2,
    explanation: "Nagad is operated by Bangladesh Post Office as a mobile financial service.",
    marks: 1,
    negativeMarks: 0.25,
    tags: ["bangladesh", "banking", "finance"],
    isActive: true,
    isVerified: true
  },
  {
    questionText: "Who is known as the 'Father of Modern Economics'?",
    questionType: "mcq",
    subject: "General Knowledge",
    difficulty: "Easy",
    options: [
      "Adam Smith",
      "Paul Samuelson",
      "Alfred Marshall",
      "Keynes"
    ],
    correctAnswer: 1,
    explanation: "Paul Samuelson is often called the 'Father of Modern Economics' for his contributions to economic theory. Note: Adam Smith is the 'Father of Economics'.",
    marks: 1,
    negativeMarks: 0.25,
    tags: ["economics", "history"],
    isActive: true,
    isVerified: true
  },
  {
    questionText: "The world's first Central Bank was established in which country?",
    questionType: "mcq",
    subject: "General Knowledge",
    difficulty: "Medium",
    options: [
      "England",
      "Sweden (Sveriges Riksbank)",
      "USA",
      "China"
    ],
    correctAnswer: 1,
    explanation: "Sveriges Riksbank in Sweden, established in 1668, is the world's first central bank.",
    marks: 1,
    negativeMarks: 0.25,
    tags: ["banking", "history"],
    isActive: true,
    isVerified: true
  },
  {
    questionText: "What is the currency of Ukraine?",
    questionType: "mcq",
    subject: "General Knowledge",
    difficulty: "Easy",
    options: [
      "Ruble",
      "Hryvnia",
      "Euro",
      "Lira"
    ],
    correctAnswer: 1,
    explanation: "The Hryvnia is the official currency of Ukraine.",
    marks: 1,
    negativeMarks: 0.25,
    tags: ["world geography", "currency"],
    isActive: true,
    isVerified: true
  },
  {
    questionText: "A market situation with only one buyer is called:",
    questionType: "mcq",
    subject: "General Knowledge",
    difficulty: "Medium",
    options: [
      "Monopoly",
      "Oligopoly",
      "Monopsony",
      "Duopoly"
    ],
    correctAnswer: 2,
    explanation: "Monopsony is a market situation where there is only one buyer. Monopoly refers to one seller.",
    marks: 1,
    negativeMarks: 0.25,
    tags: ["economics", "market structures"],
    isActive: true,
    isVerified: true
  },
  {
    questionText: "The World Trade Organization (WTO) was founded in:",
    questionType: "mcq",
    subject: "General Knowledge",
    difficulty: "Medium",
    options: [
      "1945",
      "1995",
      "1999",
      "2001"
    ],
    correctAnswer: 1,
    explanation: "The World Trade Organization (WTO) was founded on January 1, 1995.",
    marks: 1,
    negativeMarks: 0.25,
    tags: ["international organizations", "economics"],
    isActive: true,
    isVerified: true
  },
  {
    questionText: "In which year did the world experience the Great Depression for the first time?",
    questionType: "mcq",
    subject: "General Knowledge",
    difficulty: "Medium",
    options: [
      "1914",
      "1929",
      "1939",
      "1945"
    ],
    correctAnswer: 1,
    explanation: "The Great Depression began in 1929 with the stock market crash and lasted through the 1930s.",
    marks: 1,
    negativeMarks: 0.25,
    tags: ["history", "economics"],
    isActive: true,
    isVerified: true
  },
  {
    questionText: "The book 'Memories Never Die' was written as a tribute to:",
    questionType: "mcq",
    subject: "General Knowledge",
    difficulty: "Medium",
    options: [
      "Bangabandhu Sheikh Mujibur Rahman",
      "APJ Abdul Kalam",
      "Nelson Mandela",
      "Mother Teresa"
    ],
    correctAnswer: 1,
    explanation: "'Memories Never Die' is a tribute book dedicated to APJ Abdul Kalam.",
    marks: 1,
    negativeMarks: 0.25,
    tags: ["literature", "biography"],
    isActive: true,
    isVerified: true
  },
  {
    questionText: "In which year was Kabaddi adopted as the National Game of Bangladesh?",
    questionType: "mcq",
    subject: "General Knowledge",
    difficulty: "Medium",
    options: [
      "1971",
      "1972",
      "1974",
      "1980"
    ],
    correctAnswer: 1,
    explanation: "Kabaddi was adopted as the National Game of Bangladesh in 1972.",
    marks: 1,
    negativeMarks: 0.25,
    tags: ["bangladesh", "sports"],
    isActive: true,
    isVerified: true
  },
  {
    questionText: "The famous Buddhist temple 'Borobudur' is located in:",
    questionType: "mcq",
    subject: "General Knowledge",
    difficulty: "Easy",
    options: [
      "India",
      "Indonesia",
      "Thailand",
      "Nepal"
    ],
    correctAnswer: 1,
    explanation: "Borobudur, the world's largest Buddhist temple, is located in Central Java, Indonesia.",
    marks: 1,
    negativeMarks: 0.25,
    tags: ["world geography", "religion", "tourism"],
    isActive: true,
    isVerified: true
  }
];

export default modelTest3Questions;
