const modelTest2Questions = [
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
    questionText: "Choose the correct meaning of the idiom/phrase: 'To read between the lines'",
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
    explanation: "'To read between the lines' means to understand the hidden or implied meaning in what someone says or writes.",
    marks: 1,
    negativeMarks: 0.25,
    tags: ["idioms", "vocabulary"],
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
    explanation: "The correct spelling is 'Bureaucracy' - a system of government in which most decisions are made by state officials rather than by elected representatives.",
    marks: 1,
    negativeMarks: 0.25,
    tags: ["spelling", "vocabulary"],
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
    explanation: "The correct spelling is 'Questionnaire' - a set of printed or written questions with a choice of answers.",
    marks: 1,
    negativeMarks: 0.25,
    tags: ["spelling", "vocabulary"],
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
    explanation: "'Looking for' is the correct phrasal verb meaning to search for or seek something.",
    marks: 1,
    negativeMarks: 0.25,
    tags: ["prepositions", "grammar"],
    isActive: true,
    isVerified: true
  },
  {
    questionText: "Fill in the blank with appropriate preposition: The committee consists ______ ten members.",
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
    explanation: "'Consists of' is the correct phrase meaning to be composed or made up of.",
    marks: 1,
    negativeMarks: 0.25,
    tags: ["prepositions", "grammar"],
    isActive: true,
    isVerified: true
  },
  {
    questionText: "Synonym of 'Amicable'",
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
    explanation: "'Amicable' means friendly and peaceable. The synonym is 'Friendly'.",
    marks: 1,
    negativeMarks: 0.25,
    tags: ["synonyms", "vocabulary"],
    isActive: true,
    isVerified: true
  },
  {
    questionText: "Antonym of 'Obsolete'",
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
    explanation: "'Obsolete' means no longer in use or outdated. The antonym is 'Modern'.",
    marks: 1,
    negativeMarks: 0.25,
    tags: ["antonyms", "vocabulary"],
    isActive: true,
    isVerified: true
  },
  {
    questionText: "Synonym of 'Lucrative'",
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
    explanation: "'Lucrative' means profitable or producing a great deal of profit. The synonym is 'Profitable'.",
    marks: 1,
    negativeMarks: 0.25,
    tags: ["synonyms", "vocabulary"],
    isActive: true,
    isVerified: true
  },
  {
    questionText: "Sentence Correction: One of the boy is missing.",
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
    explanation: "The correct phrase is 'One of the boys' because 'one of' is always followed by a plural noun.",
    marks: 1,
    negativeMarks: 0.25,
    tags: ["grammar", "sentence correction"],
    isActive: true,
    isVerified: true
  },
  {
    questionText: "Sentence Correction: He is senior than me.",
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
    explanation: "The correct phrase is 'senior to' not 'senior than'. Senior, junior, inferior, and superior are always followed by 'to'.",
    marks: 1,
    negativeMarks: 0.25,
    tags: ["grammar", "sentence correction"],
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
    explanation: "A doctor uses a stethoscope as their primary tool, similarly a sculptor uses a chisel as their primary tool.",
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
    explanation: "A blind person cannot see light, similarly a dumb person cannot produce speech.",
    marks: 1,
    negativeMarks: 0.25,
    tags: ["analogy", "reasoning"],
    isActive: true,
    isVerified: true
  },
  {
    questionText: "One Word Substitution: A person who knows everything",
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
    explanation: "'Omniscient' means knowing everything or having unlimited knowledge.",
    marks: 1,
    negativeMarks: 0.25,
    tags: ["one-word substitution", "vocabulary"],
    isActive: true,
    isVerified: true
  },
  {
    questionText: "One Word Substitution: A handwriting that cannot be read",
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
    explanation: "'Illegible' means not clear enough to be read or deciphered.",
    marks: 1,
    negativeMarks: 0.25,
    tags: ["one-word substitution", "vocabulary"],
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
    explanation: "Speed = Distance/Time = 120m/6s = 20 m/s. To convert m/s to km/h, multiply by 18/5. Therefore: 20 × 18/5 = 72 km/h.",
    marks: 1,
    negativeMarks: 0.25,
    tags: ["speed-distance-time", "unit conversion"],
    isActive: true,
    isVerified: true
  },
  {
    questionText: "If x + 1/x = 3, find the value of x² + 1/x².",
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
    explanation: "Using the identity: if x + 1/x = n, then x² + 1/x² = n² - 2. Therefore: 3² - 2 = 9 - 2 = 7.",
    marks: 1,
    negativeMarks: 0.25,
    tags: ["algebra", "identities"],
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
    explanation: "Using the formula: LCM = HCF × (Product of Ratios). LCM = 4 × (3 × 4) = 4 × 12 = 48.",
    marks: 1,
    negativeMarks: 0.25,
    tags: ["HCF-LCM", "ratios"],
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
    explanation: "If 90% of CP = 450, then CP = 500. For 10% profit, selling price = 110% of CP = 110% of 500 = 550.",
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
    explanation: "20% of 30% of 500 = (20/100) × (30/100) × 500 = 1/5 × 150 = 30.",
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
    difficulty: "Easy",
    options: [
      "20",
      "21",
      "22",
      "24"
    ],
    correctAnswer: 2,
    explanation: "The average of consecutive numbers is the middle number. So the middle (3rd) number is 20. The sequence is: 18, 19, 20, 21, 22. The largest is 22.",
    marks: 1,
    negativeMarks: 0.25,
    tags: ["averages", "sequences"],
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
    explanation: "Let son's age = x, father's age = 3x. After 12 years: 3x + 12 = 2(x + 12). Solving: 3x + 12 = 2x + 24, therefore x = 12.",
    marks: 1,
    negativeMarks: 0.25,
    tags: ["age problems", "algebra"],
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
    explanation: "Using the formula A + B + AB/100 for percentage increase affecting both dimensions: 50 + 50 + (50×50)/100 = 100 + 25 = 125%.",
    marks: 1,
    negativeMarks: 0.25,
    tags: ["geometry", "percentage", "area"],
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
    explanation: "Using the formula (A×B)/(A-B): (20×12)/(20-12) = 240/8 = 30 days.",
    marks: 1,
    negativeMarks: 0.25,
    tags: ["time-and-work"],
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
    explanation: "Using 4xy = (x+y)² - (x-y)²: 4xy = 25² - 13² = 625 - 169 = 456. Therefore xy = 456/4 = 114.",
    marks: 1,
    negativeMarks: 0.25,
    tags: ["algebra", "equations"],
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
    correctAnswer: 0,
    explanation: "Numerator: 0.002 × 0.05 = 0.0001. Then 0.0001/0.01 = 0.01 = 1/10 = 0.1.",
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
    explanation: "Using harmonic mean formula 2xy/(x+y): (2×60×40)/(60+40) = 4800/100 = 48 km/h.",
    marks: 1,
    negativeMarks: 0.25,
    tags: ["averages", "speed-distance-time"],
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
    explanation: "Perimeter 2(L+W) = 40, so L+W = 20. Given L-W = 4. Adding: 2L = 24, so L = 12 and W = 8. Area = 12 × 8 = 96 sq cm.",
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
    explanation: "4^x = 8 can be written as (2²)^x = 2³. Therefore 2^(2x) = 2³, so 2x = 3, and x = 1.5.",
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
    explanation: "If 40% are girls, then 60% are boys. 60% of 60 = 0.6 × 60 = 36 boys.",
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
    explanation: "Gap is (20-16) = 4, Sold is 16. Profit = 4/16 × 100 = 1/4 × 100 = 25%.",
    marks: 1,
    negativeMarks: 0.25,
    tags: ["profit-loss", "percentage"],
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
    explanation: "Simple Interest = P × n × r = 5000 × 2 × 0.10 = 1000.",
    marks: 1,
    negativeMarks: 0.25,
    tags: ["simple interest"],
    isActive: true,
    isVerified: true
  },
  {
    questionText: "Which is the smallest fraction?",
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
    explanation: "Converting to decimals: 2/3 = 0.66, 3/5 = 0.60 (smallest), 5/8 = 0.625, 7/11 = 0.63.",
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
    explanation: "Coins ratio: 2:3:4. Value ratio: (2×1):(3×0.5):(4×0.25) = 2:1.5:1. Total value ratio = 4.5 units = Tk 90, so 1 unit = Tk 20. Number of 50-paisa coins (ratio 3): 3 × 20 = 60.",
    marks: 1,
    negativeMarks: 0.25,
    tags: ["ratios", "coins"],
    isActive: true,
    isVerified: true
  },
  {
    questionText: "Determine the value of log₁₀(1000).",
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
    explanation: "log₁₀(1000) = log₁₀(10³) = 3 × log₁₀(10) = 3 × 1 = 3.",
    marks: 1,
    negativeMarks: 0.25,
    tags: ["logarithms"],
    isActive: true,
    isVerified: true
  },

  // Section C: General Knowledge (Questions 36-50)
  {
    questionText: "Who is the current Governor of Bangladesh Bank? (As of late 2024/early 2025)",
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
    explanation: "Dr. Ahsan H. Mansur is the current Governor of Bangladesh Bank as of late 2024/early 2025.",
    marks: 1,
    negativeMarks: 0.25,
    tags: ["bangladesh", "current affairs", "banking"],
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
    explanation: "The World Bank headquarters is located in Washington D.C., United States.",
    marks: 1,
    negativeMarks: 0.25,
    tags: ["international organizations"],
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
    explanation: "Japan is known as the 'Land of the Rising Sun' because the sun rises in the east and Japan is located in the Far East.",
    marks: 1,
    negativeMarks: 0.25,
    tags: ["world geography"],
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
    explanation: "The Padma Bridge directly connects Munshiganj and Shariatpur districts in Bangladesh.",
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
    explanation: "Mujibnagar Day is observed on 17 April, commemorating the formation of the first government of Bangladesh in 1971.",
    marks: 1,
    negativeMarks: 0.25,
    tags: ["bangladesh", "history", "liberation war"],
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
    tags: ["bangladesh", "economy"],
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
    explanation: "The official currency of the United Kingdom is Pound Sterling (GBP).",
    marks: 1,
    negativeMarks: 0.25,
    tags: ["world geography", "currency"],
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
    explanation: "The Pacific Ocean is the largest ocean in the world, covering approximately 165.2 million square kilometers.",
    marks: 1,
    negativeMarks: 0.25,
    tags: ["world geography"],
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
    explanation: "COP29 (29th UN Climate Change Conference) was held in Baku, Azerbaijan in 2024.",
    marks: 1,
    negativeMarks: 0.25,
    tags: ["current affairs", "environment"],
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
    explanation: "Green Banking focuses on environment-friendly financial practices and sustainable development.",
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
    explanation: "Kiev (also spelled Kyiv) is the capital and largest city of Ukraine.",
    marks: 1,
    negativeMarks: 0.25,
    tags: ["world geography"],
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
    explanation: "There are 2 stock exchanges in Bangladesh: Dhaka Stock Exchange (DSE) and Chittagong Stock Exchange (CSE).",
    marks: 1,
    negativeMarks: 0.25,
    tags: ["bangladesh", "stock market"],
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
    explanation: "SWIFT (Society for Worldwide Interbank Financial Telecommunication) is a global messaging network used by banks for international money transfers.",
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
    explanation: "Bangladesh has 64 districts divided among 8 divisions.",
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
    explanation: "The CPU (Central Processing Unit) is called the 'brain' of the computer as it performs all processing operations.",
    marks: 1,
    negativeMarks: 0.25,
    tags: ["computer hardware"],
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
    explanation: "1 Gigabyte (GB) = 1024 Megabytes (MB) in binary system.",
    marks: 1,
    negativeMarks: 0.25,
    tags: ["computer basics", "memory"],
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
    explanation: "MS Excel is a spreadsheet software used for data organization, calculation, and analysis.",
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
    explanation: "Ctrl + Z is the keyboard shortcut for Undo, which reverses the last action performed.",
    marks: 1,
    negativeMarks: 0.25,
    tags: ["keyboard shortcuts"],
    isActive: true,
    isVerified: true
  },
  {
    questionText: "Find the next number in the series: 2, 5, 10, 17, 26, ?",
    questionType: "mcq",
    subject: "Analytical Reasoning",
    difficulty: "Medium",
    options: [
      "35",
      "36",
      "37",
      "38"
    ],
    correctAnswer: 2,
    explanation: "The pattern is adding consecutive odd numbers: +3, +5, +7, +9, +11. So 26 + 11 = 37.",
    marks: 1,
    negativeMarks: 0.25,
    tags: ["number series", "pattern recognition"],
    isActive: true,
    isVerified: true
  },
  {
    questionText: "If ROSE is coded as 6821, CHAIR is 73456, what is SEARCH?",
    questionType: "mcq",
    subject: "Analytical Reasoning",
    difficulty: "Hard",
    options: [
      "246173",
      "214673",
      "214763",
      "216473"
    ],
    correctAnswer: 1,
    explanation: "Each letter has a unique code: R=6, O=8, S=2, E=1, C=7, H=3, A=4, I=5. Therefore SEARCH = S(2) + E(1) + A(4) + R(6) + C(7) + H(3) = 214673.",
    marks: 1,
    negativeMarks: 0.25,
    tags: ["coding-decoding", "logical reasoning"],
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
    explanation: "RAM (Random Access Memory) is volatile memory, meaning it loses its data when power is turned off.",
    marks: 1,
    negativeMarks: 0.25,
    tags: ["computer hardware", "memory"],
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
    explanation: "URL stands for Uniform Resource Locator, which is the address of a resource on the internet.",
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
    explanation: "A worm is a type of malware that replicates itself to spread to other computers without human intervention.",
    marks: 1,
    negativeMarks: 0.25,
    tags: ["cybersecurity", "malware"],
    isActive: true,
    isVerified: true
  },
  {
    questionText: "Identify the odd one out:",
    questionType: "mcq",
    subject: "Analytical Reasoning",
    difficulty: "Easy",
    options: [
      "Monitor",
      "Printer",
      "Speaker",
      "Keyboard"
    ],
    correctAnswer: 3,
    explanation: "Keyboard is an input device, while Monitor, Printer, and Speaker are all output devices.",
    marks: 1,
    negativeMarks: 0.25,
    tags: ["logical reasoning", "computer hardware"],
    isActive: true,
    isVerified: true
  }
];

export default modelTest2Questions;
