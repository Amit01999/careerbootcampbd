// Model Test 1 - 60 Questions
// Source: Model 1.pdf - Private Bank Model Question Set 1

const modelTest1Questions = [
  // Section A: English (Questions 1-15)
  {
    questionText: "Choose the correct meaning of the idiom/phrase: 'A white elephant'",
    questionType: "mcq",
    subject: "English",
    difficulty: "Medium",
    options: [
      "A rare item",
      "A costly but useless possession",
      "A symbol of royalty",
      "An albino elephant"
    ],
    correctAnswer: 1,
    explanation: "A 'white elephant' refers to a possession that is expensive to maintain but provides little value or utility.",
    marks: 1,
    negativeMarks: 0.25,
    tags: ["idioms", "vocabulary"],
    isActive: true,
    isVerified: true
  },
  {
    questionText: "Choose the correct meaning of the idiom: 'To read between the lines'",
    questionType: "mcq",
    subject: "English",
    difficulty: "Medium",
    options: [
      "To read carefully",
      "To suspect someone",
      "To understand the hidden meaning",
      "To read fast"
    ],
    correctAnswer: 2,
    explanation: "'To read between the lines' means to understand the implied or hidden meaning rather than just the literal meaning.",
    marks: 1,
    negativeMarks: 0.25,
    tags: ["idioms", "comprehension"],
    isActive: true,
    isVerified: true
  },
  {
    questionText: "Identify the correct spelling:",
    questionType: "mcq",
    subject: "English",
    difficulty: "Easy",
    options: [
      "Buraucracy",
      "Bureaucracy",
      "Beauraucracy",
      "Burocracy"
    ],
    correctAnswer: 1,
    explanation: "The correct spelling is 'Bureaucracy'.",
    marks: 1,
    negativeMarks: 0.25,
    tags: ["spelling"],
    isActive: true,
    isVerified: true
  },
  {
    questionText: "Identify the correct spelling:",
    questionType: "mcq",
    subject: "English",
    difficulty: "Easy",
    options: [
      "Questionnaire",
      "Questionaire",
      "Questionnare",
      "Questionnaiir"
    ],
    correctAnswer: 0,
    explanation: "The correct spelling is 'Questionnaire'.",
    marks: 1,
    negativeMarks: 0.25,
    tags: ["spelling"],
    isActive: true,
    isVerified: true
  },
  {
    questionText: "Fill in the blank with appropriate preposition: He is looking ______ a new job.",
    questionType: "mcq",
    subject: "English",
    difficulty: "Easy",
    options: [
      "at",
      "for",
      "into",
      "after"
    ],
    correctAnswer: 1,
    explanation: "The correct preposition is 'for'. 'Looking for' means searching for something.",
    marks: 1,
    negativeMarks: 0.25,
    tags: ["prepositions", "grammar"],
    isActive: true,
    isVerified: true
  },
  {
    questionText: "Fill in the blank: The committee consists ______ ten members.",
    questionType: "mcq",
    subject: "English",
    difficulty: "Easy",
    options: [
      "of",
      "in",
      "with",
      "by"
    ],
    correctAnswer: 0,
    explanation: "'Consist of' is the correct phrase. It means 'to be composed of'.",
    marks: 1,
    negativeMarks: 0.25,
    tags: ["prepositions", "grammar"],
    isActive: true,
    isVerified: true
  },
  {
    questionText: "Synonym of 'Amicable':",
    questionType: "mcq",
    subject: "English",
    difficulty: "Medium",
    options: [
      "Hostile",
      "Friendly",
      "Arrogant",
      "Shy"
    ],
    correctAnswer: 1,
    explanation: "'Amicable' means friendly or peaceable. The synonym is 'Friendly'.",
    marks: 1,
    negativeMarks: 0.25,
    tags: ["synonyms", "vocabulary"],
    isActive: true,
    isVerified: true
  },
  {
    questionText: "Antonym of 'Obsolete':",
    questionType: "mcq",
    subject: "English",
    difficulty: "Medium",
    options: [
      "Old",
      "Ancient",
      "Modern",
      "Extinct"
    ],
    correctAnswer: 2,
    explanation: "'Obsolete' means outdated or no longer in use. The antonym is 'Modern'.",
    marks: 1,
    negativeMarks: 0.25,
    tags: ["antonyms", "vocabulary"],
    isActive: true,
    isVerified: true
  },
  {
    questionText: "Synonym of 'Lucrative':",
    questionType: "mcq",
    subject: "English",
    difficulty: "Medium",
    options: [
      "Loss",
      "Profitable",
      "Risky",
      "Harmful"
    ],
    correctAnswer: 1,
    explanation: "'Lucrative' means profitable or money-making. The synonym is 'Profitable'.",
    marks: 1,
    negativeMarks: 0.25,
    tags: ["synonyms", "vocabulary"],
    isActive: true,
    isVerified: true
  },
  {
    questionText: "Sentence Correction: 'One of the boy is missing.' Choose the correction:",
    questionType: "mcq",
    subject: "English",
    difficulty: "Easy",
    options: [
      "boys",
      "boy's",
      "boys'",
      "No correction needed"
    ],
    correctAnswer: 0,
    explanation: "'One of the' must be followed by a plural noun. So it should be 'One of the boys'.",
    marks: 1,
    negativeMarks: 0.25,
    tags: ["grammar", "sentence-correction"],
    isActive: true,
    isVerified: true
  },
  {
    questionText: "Sentence Correction: 'He is senior than me.' Choose the correction:",
    questionType: "mcq",
    subject: "English",
    difficulty: "Easy",
    options: [
      "senior to",
      "senior from",
      "more senior than",
      "No correction needed"
    ],
    correctAnswer: 0,
    explanation: "The correct form is 'senior to', not 'senior than'. We say 'senior to' or 'junior to'.",
    marks: 1,
    negativeMarks: 0.25,
    tags: ["grammar", "sentence-correction"],
    isActive: true,
    isVerified: true
  },
  {
    questionText: "Analogy: Doctor : Stethoscope :: Sculptor : ?",
    questionType: "mcq",
    subject: "English",
    difficulty: "Medium",
    options: [
      "Stone",
      "Chisel",
      "Statue",
      "Art"
    ],
    correctAnswer: 1,
    explanation: "A doctor uses a stethoscope as their primary tool. Similarly, a sculptor uses a chisel as their primary tool.",
    marks: 1,
    negativeMarks: 0.25,
    tags: ["analogy", "reasoning"],
    isActive: true,
    isVerified: true
  },
  {
    questionText: "Analogy: Light : Blind :: Speech : ?",
    questionType: "mcq",
    subject: "English",
    difficulty: "Medium",
    options: [
      "Dumb",
      "Sound",
      "Tongue",
      "Vibration"
    ],
    correctAnswer: 0,
    explanation: "A blind person cannot see light. Similarly, a dumb person cannot produce speech.",
    marks: 1,
    negativeMarks: 0.25,
    tags: ["analogy", "reasoning"],
    isActive: true,
    isVerified: true
  },
  {
    questionText: "One Word Substitution: A person who knows everything:",
    questionType: "mcq",
    subject: "English",
    difficulty: "Medium",
    options: [
      "Omnipresent",
      "Omnipotent",
      "Omniscient",
      "Omnivorous"
    ],
    correctAnswer: 2,
    explanation: "'Omniscient' means all-knowing or having complete knowledge.",
    marks: 1,
    negativeMarks: 0.25,
    tags: ["vocabulary", "one-word-substitution"],
    isActive: true,
    isVerified: true
  },
  {
    questionText: "One Word Substitution: A handwriting that cannot be read:",
    questionType: "mcq",
    subject: "English",
    difficulty: "Medium",
    options: [
      "Illegal",
      "Illegible",
      "Ineligible",
      "Illogical"
    ],
    correctAnswer: 1,
    explanation: "'Illegible' means impossible to read or decipher.",
    marks: 1,
    negativeMarks: 0.25,
    tags: ["vocabulary", "one-word-substitution"],
    isActive: true,
    isVerified: true
  },

  // Section B: Mathematics (Questions 16-35)
  {
    questionText: "A train 120m long passes a standing man in 6 seconds. What is the speed of the train in km/h?",
    questionType: "mcq",
    subject: "Mathematics",
    difficulty: "Medium",
    options: [
      "60",
      "72",
      "80",
      "90"
    ],
    correctAnswer: 1,
    explanation: "Speed = Distance/Time = 120m/6s = 20 m/s. Converting to km/h: 20 × (18/5) = 72 km/h",
    marks: 1,
    negativeMarks: 0.25,
    tags: ["speed-distance-time", "conversion"],
    isActive: true,
    isVerified: true
  },
  {
    questionText: "If x + 1/x = 3, find the value of x² + 1/x²",
    questionType: "mcq",
    subject: "Mathematics",
    difficulty: "Medium",
    options: [
      "9",
      "7",
      "11",
      "6"
    ],
    correctAnswer: 1,
    explanation: "If x + 1/x = n, then x² + 1/x² = n² - 2. Here, 3² - 2 = 9 - 2 = 7",
    marks: 1,
    negativeMarks: 0.25,
    tags: ["algebra", "formula"],
    isActive: true,
    isVerified: true
  },
  {
    questionText: "The ratio of two numbers is 3:4 and their HCF is 4. What is their LCM?",
    questionType: "mcq",
    subject: "Mathematics",
    difficulty: "Medium",
    options: [
      "12",
      "16",
      "24",
      "48"
    ],
    correctAnswer: 3,
    explanation: "LCM = HCF × (Product of Ratios) = 4 × (3 × 4) = 4 × 12 = 48",
    marks: 1,
    negativeMarks: 0.25,
    tags: ["hcf-lcm", "ratios"],
    isActive: true,
    isVerified: true
  },
  {
    questionText: "A shopkeeper sells an item for Tk. 450 at a loss of 10%. At what price should he sell it to gain 10%?",
    questionType: "mcq",
    subject: "Mathematics",
    difficulty: "Medium",
    options: [
      "500",
      "540",
      "550",
      "600"
    ],
    correctAnswer: 2,
    explanation: "90% of CP = 450, so CP = 500. For 10% gain, SP = 110% of 500 = 550",
    marks: 1,
    negativeMarks: 0.25,
    tags: ["profit-loss", "percentage"],
    isActive: true,
    isVerified: true
  },
  {
    questionText: "What is 20% of 30% of 500?",
    questionType: "mcq",
    subject: "Mathematics",
    difficulty: "Easy",
    options: [
      "30",
      "50",
      "60",
      "150"
    ],
    correctAnswer: 0,
    explanation: "20% of 30% of 500 = (20/100) × (30/100) × 500 = (1/5) × 150 = 30",
    marks: 1,
    negativeMarks: 0.25,
    tags: ["percentage"],
    isActive: true,
    isVerified: true
  },
  {
    questionText: "The average of 5 consecutive numbers is 20. What is the largest number?",
    questionType: "mcq",
    subject: "Mathematics",
    difficulty: "Medium",
    options: [
      "20",
      "21",
      "22",
      "24"
    ],
    correctAnswer: 2,
    explanation: "The average of consecutive numbers is the middle number. So the numbers are 18, 19, 20, 21, 22. Largest is 22.",
    marks: 1,
    negativeMarks: 0.25,
    tags: ["average", "sequences"],
    isActive: true,
    isVerified: true
  },
  {
    questionText: "A father is 3 times as old as his son. After 12 years, he will be twice as old as his son. What is the son's present age?",
    questionType: "mcq",
    subject: "Mathematics",
    difficulty: "Medium",
    options: [
      "12",
      "15",
      "20",
      "24"
    ],
    correctAnswer: 0,
    explanation: "Let son's age = x, father's age = 3x. After 12 years: (3x + 12) = 2(x + 12). Solving: x = 12",
    marks: 1,
    negativeMarks: 0.25,
    tags: ["age-problems", "algebra"],
    isActive: true,
    isVerified: true
  },
  {
    questionText: "If the radius of a circle is increased by 50%, its area increases by:",
    questionType: "mcq",
    subject: "Mathematics",
    difficulty: "Medium",
    options: [
      "50%",
      "100%",
      "125%",
      "150%"
    ],
    correctAnswer: 2,
    explanation: "Using formula: A + B + (AB/100). Here 50 + 50 + (50×50/100) = 100 + 25 = 125%",
    marks: 1,
    negativeMarks: 0.25,
    tags: ["geometry", "percentage", "circles"],
    isActive: true,
    isVerified: true
  },
  {
    questionText: "A and B can do a work in 12 days. A alone can do it in 20 days. In how many days can B alone do it?",
    questionType: "mcq",
    subject: "Mathematics",
    difficulty: "Medium",
    options: [
      "25",
      "30",
      "35",
      "40"
    ],
    correctAnswer: 1,
    explanation: "Using formula: (A×B)/(A-B) = (20×12)/(20-12) = 240/8 = 30 days",
    marks: 1,
    negativeMarks: 0.25,
    tags: ["time-work"],
    isActive: true,
    isVerified: true
  },
  {
    questionText: "The sum of two numbers is 25 and their difference is 13. Find their product.",
    questionType: "mcq",
    subject: "Mathematics",
    difficulty: "Medium",
    options: [
      "104",
      "114",
      "325",
      "115"
    ],
    correctAnswer: 1,
    explanation: "4xy = (x+y)² - (x-y)². So 4xy = 25² - 13² = 625 - 169 = 456. Therefore xy = 114",
    marks: 1,
    negativeMarks: 0.25,
    tags: ["algebra"],
    isActive: true,
    isVerified: true
  },
  {
    questionText: "Calculate: (0.002 × 0.05) / 0.01 = ?",
    questionType: "mcq",
    subject: "Mathematics",
    difficulty: "Easy",
    options: [
      "0.1",
      "0.01",
      "0.001",
      "1"
    ],
    correctAnswer: 1,
    explanation: "0.002 × 0.05 = 0.0001. Then 0.0001 / 0.01 = 0.01",
    marks: 1,
    negativeMarks: 0.25,
    tags: ["decimals", "arithmetic"],
    isActive: true,
    isVerified: true
  },
  {
    questionText: "A man travels a certain distance at 60 km/h and returns at 40 km/h. What is his average speed?",
    questionType: "mcq",
    subject: "Mathematics",
    difficulty: "Medium",
    options: [
      "50 km/h",
      "48 km/h",
      "45 km/h",
      "52 km/h"
    ],
    correctAnswer: 1,
    explanation: "Harmonic mean formula: 2xy/(x+y) = 2×60×40/(60+40) = 4800/100 = 48 km/h",
    marks: 1,
    negativeMarks: 0.25,
    tags: ["average", "speed"],
    isActive: true,
    isVerified: true
  },
  {
    questionText: "The perimeter of a rectangle is 40 cm. If the length is 4 cm more than the width, what is the area?",
    questionType: "mcq",
    subject: "Mathematics",
    difficulty: "Medium",
    options: [
      "96 sq cm",
      "100 sq cm",
      "80 sq cm",
      "64 sq cm"
    ],
    correctAnswer: 0,
    explanation: "2(L+W) = 40, so L+W = 20. Given L-W = 4. Solving: L = 12, W = 8. Area = 12 × 8 = 96",
    marks: 1,
    negativeMarks: 0.25,
    tags: ["geometry", "mensuration"],
    isActive: true,
    isVerified: true
  },
  {
    questionText: "If 4^x = 8, what is x?",
    questionType: "mcq",
    subject: "Mathematics",
    difficulty: "Medium",
    options: [
      "2",
      "1.5",
      "3",
      "0.5"
    ],
    correctAnswer: 1,
    explanation: "4^x = 8 means (2²)^x = 2³. So 2^(2x) = 2³. Therefore 2x = 3, x = 1.5",
    marks: 1,
    negativeMarks: 0.25,
    tags: ["indices", "exponents"],
    isActive: true,
    isVerified: true
  },
  {
    questionText: "In a class of 60 students, 40% are girls. How many boys are there?",
    questionType: "mcq",
    subject: "Mathematics",
    difficulty: "Easy",
    options: [
      "24",
      "36",
      "30",
      "40"
    ],
    correctAnswer: 1,
    explanation: "If 40% are girls, then 60% are boys. 60% of 60 = 0.6 × 60 = 36",
    marks: 1,
    negativeMarks: 0.25,
    tags: ["percentage"],
    isActive: true,
    isVerified: true
  },
  {
    questionText: "Cost price of 20 articles is equal to the selling price of 16 articles. What is the profit percentage?",
    questionType: "mcq",
    subject: "Mathematics",
    difficulty: "Medium",
    options: [
      "20%",
      "25%",
      "30%",
      "16%"
    ],
    correctAnswer: 1,
    explanation: "Profit = (20-16)/16 × 100 = 4/16 × 100 = 25%",
    marks: 1,
    negativeMarks: 0.25,
    tags: ["profit-loss"],
    isActive: true,
    isVerified: true
  },
  {
    questionText: "The simple interest on Tk. 5000 for 2 years at 10% per annum is:",
    questionType: "mcq",
    subject: "Mathematics",
    difficulty: "Easy",
    options: [
      "500",
      "1000",
      "1500",
      "2000"
    ],
    correctAnswer: 1,
    explanation: "SI = P × R × T = 5000 × 0.10 × 2 = 1000",
    marks: 1,
    negativeMarks: 0.25,
    tags: ["simple-interest"],
    isActive: true,
    isVerified: true
  },
  {
    questionText: "Which is the smallest fraction? 2/3, 3/5, 5/8, 7/11",
    questionType: "mcq",
    subject: "Mathematics",
    difficulty: "Easy",
    options: [
      "2/3",
      "3/5",
      "5/8",
      "7/11"
    ],
    correctAnswer: 1,
    explanation: "Converting to decimals: 2/3 = 0.66, 3/5 = 0.60 (smallest), 5/8 = 0.625, 7/11 = 0.63",
    marks: 1,
    negativeMarks: 0.25,
    tags: ["fractions", "comparison"],
    isActive: true,
    isVerified: true
  },
  {
    questionText: "A bag contains 1-taka, 50-paisa, and 25-paisa coins in the ratio 2:3:4. If the total amount is Tk. 90, how many 50-paisa coins are there?",
    questionType: "mcq",
    subject: "Mathematics",
    difficulty: "Hard",
    options: [
      "60",
      "50",
      "40",
      "30"
    ],
    correctAnswer: 0,
    explanation: "Value ratio: (2×1):(3×0.5):(4×0.25) = 2:1.5:1. Total = 4.5 units = 90. So 1 unit = 20. Number of 50-paisa coins = 3×20 = 60",
    marks: 1,
    negativeMarks: 0.25,
    tags: ["ratios", "word-problems"],
    isActive: true,
    isVerified: true
  },
  {
    questionText: "Determine the value of log₁₀(1000)",
    questionType: "mcq",
    subject: "Mathematics",
    difficulty: "Easy",
    options: [
      "1",
      "2",
      "3",
      "10"
    ],
    correctAnswer: 2,
    explanation: "log₁₀(1000) = log₁₀(10³) = 3log₁₀(10) = 3 × 1 = 3",
    marks: 1,
    negativeMarks: 0.25,
    tags: ["logarithms"],
    isActive: true,
    isVerified: true
  },

  // Section C: General Knowledge (Questions 36-50)
  {
    questionText: "Who is the current Governor of Bangladesh Bank? (As of late 2024/early 2025 context)",
    questionType: "mcq",
    subject: "General Knowledge",
    difficulty: "Easy",
    options: [
      "Dr. Ahsan H. Mansur",
      "Abdur Rouf Talukder",
      "Fazle Kabir",
      "Atiur Rahman"
    ],
    correctAnswer: 0,
    explanation: "Dr. Ahsan H. Mansur is the current Governor of Bangladesh Bank (as of 2024).",
    marks: 1,
    negativeMarks: 0.25,
    tags: ["current-affairs", "bangladesh", "banking"],
    isActive: true,
    isVerified: true
  },
  {
    questionText: "The headquarters of the World Bank is located in:",
    questionType: "mcq",
    subject: "General Knowledge",
    difficulty: "Easy",
    options: [
      "New York",
      "Geneva",
      "Washington D.C.",
      "London"
    ],
    correctAnswer: 2,
    explanation: "The World Bank headquarters is in Washington D.C., United States.",
    marks: 1,
    negativeMarks: 0.25,
    tags: ["international-organizations"],
    isActive: true,
    isVerified: true
  },
  {
    questionText: "Which country is known as the 'Land of the Rising Sun'?",
    questionType: "mcq",
    subject: "General Knowledge",
    difficulty: "Easy",
    options: [
      "Japan",
      "Norway",
      "China",
      "Thailand"
    ],
    correctAnswer: 0,
    explanation: "Japan is known as the 'Land of the Rising Sun' because of its position in the far east.",
    marks: 1,
    negativeMarks: 0.25,
    tags: ["geography", "countries"],
    isActive: true,
    isVerified: true
  },
  {
    questionText: "The Padma Bridge connects which two districts directly?",
    questionType: "mcq",
    subject: "General Knowledge",
    difficulty: "Medium",
    options: [
      "Munshiganj & Shariatpur",
      "Dhaka & Faridpur",
      "Madaripur & Barishal",
      "Manikganj & Rajbari"
    ],
    correctAnswer: 0,
    explanation: "The Padma Bridge directly connects Munshiganj and Shariatpur districts.",
    marks: 1,
    negativeMarks: 0.25,
    tags: ["bangladesh", "infrastructure"],
    isActive: true,
    isVerified: true
  },
  {
    questionText: "Who wrote the national anthem of Bangladesh?",
    questionType: "mcq",
    subject: "General Knowledge",
    difficulty: "Easy",
    options: [
      "Kazi Nazrul Islam",
      "Rabindranath Tagore",
      "Jibanananda Das",
      "Jasim Uddin"
    ],
    correctAnswer: 1,
    explanation: "Rabindranath Tagore wrote 'Amar Sonar Bangla', the national anthem of Bangladesh.",
    marks: 1,
    negativeMarks: 0.25,
    tags: ["bangladesh", "history"],
    isActive: true,
    isVerified: true
  },
  {
    questionText: "'Mujibnagar Day' is observed on:",
    questionType: "mcq",
    subject: "General Knowledge",
    difficulty: "Medium",
    options: [
      "26 March",
      "16 December",
      "17 April",
      "7 March"
    ],
    correctAnswer: 2,
    explanation: "Mujibnagar Day is observed on 17 April, commemorating the formation of the Provisional Government of Bangladesh.",
    marks: 1,
    negativeMarks: 0.25,
    tags: ["bangladesh", "liberation-war"],
    isActive: true,
    isVerified: true
  },
  {
    questionText: "Which sector contributes most to the GDP of Bangladesh?",
    questionType: "mcq",
    subject: "General Knowledge",
    difficulty: "Medium",
    options: [
      "Agriculture",
      "Industry",
      "Service",
      "Remittance"
    ],
    correctAnswer: 2,
    explanation: "The Service sector contributes the most to Bangladesh's GDP.",
    marks: 1,
    negativeMarks: 0.25,
    tags: ["economics", "bangladesh"],
    isActive: true,
    isVerified: true
  },
  {
    questionText: "The currency of the United Kingdom is:",
    questionType: "mcq",
    subject: "General Knowledge",
    difficulty: "Easy",
    options: [
      "Dollar",
      "Euro",
      "Pound Sterling",
      "Yen"
    ],
    correctAnswer: 2,
    explanation: "The United Kingdom uses Pound Sterling (GBP) as its currency.",
    marks: 1,
    negativeMarks: 0.25,
    tags: ["geography", "currencies"],
    isActive: true,
    isVerified: true
  },
  {
    questionText: "Which is the largest ocean in the world?",
    questionType: "mcq",
    subject: "General Knowledge",
    difficulty: "Easy",
    options: [
      "Atlantic",
      "Indian",
      "Pacific",
      "Arctic"
    ],
    correctAnswer: 2,
    explanation: "The Pacific Ocean is the largest ocean in the world.",
    marks: 1,
    negativeMarks: 0.25,
    tags: ["geography"],
    isActive: true,
    isVerified: true
  },
  {
    questionText: "COP29 (Climate Conference 2024) was held in:",
    questionType: "mcq",
    subject: "General Knowledge",
    difficulty: "Medium",
    options: [
      "Dubai",
      "Baku",
      "Glasgow",
      "Sharm El-Sheikh"
    ],
    correctAnswer: 1,
    explanation: "COP29 was held in Baku, Azerbaijan in 2024.",
    marks: 1,
    negativeMarks: 0.25,
    tags: ["current-affairs", "environment"],
    isActive: true,
    isVerified: true
  },
  {
    questionText: "'Green Banking' focuses on:",
    questionType: "mcq",
    subject: "General Knowledge",
    difficulty: "Medium",
    options: [
      "Profit maximization",
      "Environment-friendly finance",
      "Online banking",
      "Islamic banking"
    ],
    correctAnswer: 1,
    explanation: "Green Banking focuses on environmentally-friendly financing and sustainable practices.",
    marks: 1,
    negativeMarks: 0.25,
    tags: ["banking", "environment"],
    isActive: true,
    isVerified: true
  },
  {
    questionText: "The capital of Ukraine is:",
    questionType: "mcq",
    subject: "General Knowledge",
    difficulty: "Easy",
    options: [
      "Moscow",
      "Kiev (Kyiv)",
      "Warsaw",
      "Minsk"
    ],
    correctAnswer: 1,
    explanation: "Kyiv (also spelled Kiev) is the capital of Ukraine.",
    marks: 1,
    negativeMarks: 0.25,
    tags: ["geography", "capitals"],
    isActive: true,
    isVerified: true
  },
  {
    questionText: "How many stock exchanges are there in Bangladesh?",
    questionType: "mcq",
    subject: "General Knowledge",
    difficulty: "Easy",
    options: [
      "1",
      "2",
      "3",
      "4"
    ],
    correctAnswer: 1,
    explanation: "Bangladesh has 2 stock exchanges: Dhaka Stock Exchange (DSE) and Chittagong Stock Exchange (CSE).",
    marks: 1,
    negativeMarks: 0.25,
    tags: ["bangladesh", "finance"],
    isActive: true,
    isVerified: true
  },
  {
    questionText: "'SWIFT' is related to:",
    questionType: "mcq",
    subject: "General Knowledge",
    difficulty: "Medium",
    options: [
      "Global Banking Transactions",
      "Car Manufacturing",
      "Internet Speed",
      "Stock Market"
    ],
    correctAnswer: 0,
    explanation: "SWIFT (Society for Worldwide Interbank Financial Telecommunication) is used for global banking transactions.",
    marks: 1,
    negativeMarks: 0.25,
    tags: ["banking", "finance"],
    isActive: true,
    isVerified: true
  },
  {
    questionText: "The number of districts in Bangladesh is:",
    questionType: "mcq",
    subject: "General Knowledge",
    difficulty: "Easy",
    options: [
      "60",
      "62",
      "64",
      "68"
    ],
    correctAnswer: 2,
    explanation: "Bangladesh has 64 districts.",
    marks: 1,
    negativeMarks: 0.25,
    tags: ["bangladesh", "geography"],
    isActive: true,
    isVerified: true
  },

  // Section D: Computer & Analytical (Questions 51-60)
  {
    questionText: "The 'Brain' of a computer is:",
    questionType: "mcq",
    subject: "ICT",
    difficulty: "Easy",
    options: [
      "RAM",
      "Hard Disk",
      "CPU",
      "Monitor"
    ],
    correctAnswer: 2,
    explanation: "The CPU (Central Processing Unit) is considered the 'brain' of the computer as it processes all instructions.",
    marks: 1,
    negativeMarks: 0.25,
    tags: ["computer-hardware"],
    isActive: true,
    isVerified: true
  },
  {
    questionText: "1 Gigabyte (GB) is equal to:",
    questionType: "mcq",
    subject: "ICT",
    difficulty: "Easy",
    options: [
      "1000 MB",
      "1024 MB",
      "1024 KB",
      "1000 KB"
    ],
    correctAnswer: 1,
    explanation: "1 Gigabyte (GB) = 1024 Megabytes (MB)",
    marks: 1,
    negativeMarks: 0.25,
    tags: ["computer-basics", "storage"],
    isActive: true,
    isVerified: true
  },
  {
    questionText: "Which of the following is a spreadsheet software?",
    questionType: "mcq",
    subject: "ICT",
    difficulty: "Easy",
    options: [
      "MS Word",
      "MS PowerPoint",
      "MS Excel",
      "MS Access"
    ],
    correctAnswer: 2,
    explanation: "MS Excel is spreadsheet software used for calculations and data analysis.",
    marks: 1,
    negativeMarks: 0.25,
    tags: ["software", "applications"],
    isActive: true,
    isVerified: true
  },
  {
    questionText: "'Ctrl + Z' is used for:",
    questionType: "mcq",
    subject: "ICT",
    difficulty: "Easy",
    options: [
      "Copy",
      "Paste",
      "Undo",
      "Redo"
    ],
    correctAnswer: 2,
    explanation: "'Ctrl + Z' is the keyboard shortcut for Undo operation.",
    marks: 1,
    negativeMarks: 0.25,
    tags: ["keyboard-shortcuts"],
    isActive: true,
    isVerified: true
  },
  {
    questionText: "Find the next number in the series: 2, 5, 10, 17, 26, ?",
    questionType: "mcq",
    subject: "Analytical Ability",
    difficulty: "Medium",
    options: [
      "35",
      "36",
      "37",
      "38"
    ],
    correctAnswer: 2,
    explanation: "Pattern: Add 3, 5, 7, 9, 11. Next number = 26 + 11 = 37",
    marks: 1,
    negativeMarks: 0.25,
    tags: ["number-series", "patterns"],
    isActive: true,
    isVerified: true
  },
  {
    questionText: "If ROSE is coded as 6821, CHAIR is 73456, what is SEARCH?",
    questionType: "mcq",
    subject: "Analytical Ability",
    difficulty: "Hard",
    options: [
      "246173",
      "214673",
      "214763",
      "216473"
    ],
    correctAnswer: 1,
    explanation: "Decode: R=6, O=8, S=2, E=1, C=7, H=3, A=4, I=5. SEARCH = 2 1 4 6 7 3",
    marks: 1,
    negativeMarks: 0.25,
    tags: ["coding-decoding"],
    isActive: true,
    isVerified: true
  },
  {
    questionText: "Which is a volatile memory?",
    questionType: "mcq",
    subject: "ICT",
    difficulty: "Medium",
    options: [
      "ROM",
      "RAM",
      "HDD",
      "SSD"
    ],
    correctAnswer: 1,
    explanation: "RAM (Random Access Memory) is volatile memory that loses data when power is off.",
    marks: 1,
    negativeMarks: 0.25,
    tags: ["computer-memory"],
    isActive: true,
    isVerified: true
  },
  {
    questionText: "What does 'URL' stand for?",
    questionType: "mcq",
    subject: "ICT",
    difficulty: "Easy",
    options: [
      "Uniform Resource Locator",
      "Universal Resource Link",
      "Uniform Reference Link",
      "Universal Resource Locator"
    ],
    correctAnswer: 0,
    explanation: "URL stands for Uniform Resource Locator - the address of a webpage.",
    marks: 1,
    negativeMarks: 0.25,
    tags: ["internet", "terminology"],
    isActive: true,
    isVerified: true
  },
  {
    questionText: "A virus that replicates itself is called a:",
    questionType: "mcq",
    subject: "ICT",
    difficulty: "Medium",
    options: [
      "Bug",
      "Worm",
      "Spyware",
      "Spam"
    ],
    correctAnswer: 1,
    explanation: "A Worm is a type of malware that self-replicates and spreads to other computers.",
    marks: 1,
    negativeMarks: 0.25,
    tags: ["cybersecurity", "malware"],
    isActive: true,
    isVerified: true
  },
  {
    questionText: "Identify the odd one out: Monitor, Printer, Speaker, Keyboard",
    questionType: "mcq",
    subject: "Analytical Ability",
    difficulty: "Easy",
    options: [
      "Monitor",
      "Printer",
      "Speaker",
      "Keyboard"
    ],
    correctAnswer: 3,
    explanation: "Keyboard is an input device, while Monitor, Printer, and Speaker are output devices.",
    marks: 1,
    negativeMarks: 0.25,
    tags: ["logical-reasoning", "classification"],
    isActive: true,
    isVerified: true
  }
];

export default modelTest1Questions;
