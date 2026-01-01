import pdfParse from 'pdf-parse';
import xlsx from 'xlsx';
import fs from 'fs/promises';
import logger from '../config/logger.js';

/**
 * Parse PDF file to extract questions
 * This is a heuristic-based parser with common patterns
 */
export const parsePDF = async (filePath) => {
  try {
    const dataBuffer = await fs.readFile(filePath);
    const data = await pdfParse(dataBuffer);

    const result = {
      totalPages: data.numpages,
      extractedText: data.text,
      rawParsedQuestions: [],
    };

    // Split text by pages
    const pages = data.text.split('\f'); // Form feed character separates pages

    pages.forEach((pageText, pageIndex) => {
      const questions = extractQuestionsFromText(pageText, pageIndex + 1);
      result.rawParsedQuestions.push(...questions);
    });

    result.totalQuestions = result.rawParsedQuestions.length;

    return result;
  } catch (error) {
    logger.error('PDF parsing error:', error);
    throw new Error(`Failed to parse PDF: ${error.message}`);
  }
};

/**
 * Parse Excel file to extract questions
 */
export const parseExcel = async (filePath) => {
  try {
    const workbook = xlsx.readFile(filePath);
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];
    const data = xlsx.utils.sheet_to_json(worksheet);

    const result = {
      totalQuestions: data.length,
      rawParsedQuestions: [],
    };

    data.forEach((row, index) => {
      const question = parseExcelRow(row, index + 1);
      if (question) {
        result.rawParsedQuestions.push(question);
      }
    });

    return result;
  } catch (error) {
    logger.error('Excel parsing error:', error);
    throw new Error(`Failed to parse Excel: ${error.message}`);
  }
};

/**
 * Extract questions from text using pattern matching
 */
const extractQuestionsFromText = (text, pageNumber) => {
  const questions = [];

  // Pattern 1: Numbered questions (1., 2., etc.)
  const numberedPattern = /(\d+)\.\s*(.+?)(?=\n\d+\.|$)/gs;
  let match;

  while ((match = numberedPattern.exec(text)) !== null) {
    const questionNumber = match[1];
    const questionContent = match[2].trim();

    // Try to extract options (A., B., C., D. or a., b., c., d.)
    const optionPattern = /([A-Da-d])[.)]\s*(.+?)(?=[A-Da-d][.)]|$)/g;
    const options = [];
    let optionMatch;

    while ((optionMatch = optionPattern.exec(questionContent)) !== null) {
      options.push(optionMatch[2].trim());
    }

    // Try to detect correct answer (marked with * or (correct) or similar)
    const answerPattern = /(?:Answer|Ans|Correct)[:\s]*([A-Da-d])/i;
    const answerMatch = questionContent.match(answerPattern);
    let detectedAnswer = null;

    if (answerMatch) {
      detectedAnswer = answerMatch[1].toUpperCase();
    }

    // Extract question text (remove options and answer indication)
    let questionText = questionContent.split(/[A-Da-d][.)]/)[0].trim();

    if (questionText && options.length >= 2) {
      questions.push({
        pageNumber,
        questionNumber,
        questionText,
        options,
        detectedAnswer,
        confidence: options.length === 4 ? 0.8 : 0.5, // Higher confidence if 4 options
      });
    }
  }

  return questions;
};

/**
 * Parse a row from Excel file
 * Expected columns: Question, Option A, Option B, Option C, Option D, Correct Answer, Explanation, Subject, etc.
 */
const parseExcelRow = (row, rowNumber) => {
  // Common column name variations
  const questionText = row.Question || row.question || row.QUESTION || row.QuestionText;
  const optionA = row['Option A'] || row.A || row.OptionA || row.option_a;
  const optionB = row['Option B'] || row.B || row.OptionB || row.option_b;
  const optionC = row['Option C'] || row.C || row.OptionC || row.option_c;
  const optionD = row['Option D'] || row.D || row.OptionD || row.option_d;
  const correctAnswer = row['Correct Answer'] || row.Answer || row.CorrectAnswer || row.answer;
  const explanation = row.Explanation || row.explanation || null;
  const subject = row.Subject || row.subject || row.Category || row.category || null;

  if (!questionText) {
    return null;
  }

  const options = [optionA, optionB, optionC, optionD].filter(Boolean);

  if (options.length < 2) {
    return null;
  }

  return {
    questionNumber: rowNumber.toString(),
    questionText,
    options,
    detectedAnswer: correctAnswer ? correctAnswer.toString().toUpperCase() : null,
    explanation,
    subject,
    confidence: 0.9, // Excel data is usually more structured
  };
};

/**
 * Validate parsed questions
 */
export const validateParsedQuestions = (questions) => {
  const validated = [];
  const errors = [];

  questions.forEach((q, index) => {
    const validation = {
      index,
      isValid: true,
      errors: [],
    };

    if (!q.questionText || q.questionText.length < 10) {
      validation.isValid = false;
      validation.errors.push('Question text too short or missing');
    }

    if (!q.options || q.options.length < 2) {
      validation.isValid = false;
      validation.errors.push('Insufficient options (minimum 2 required)');
    }

    if (validation.isValid) {
      validated.push(q);
    } else {
      errors.push(validation);
    }
  });

  return { validated, errors };
};

/** * Parse question file based on file type */export const parseQuestionFile = async (filePath, fileType) => {  if (fileType === 'pdf') {    return parsePDF(filePath);  } else if (fileType === 'excel' || fileType === 'xlsx' || fileType === 'xls') {    return parseExcel(filePath);  } else {    throw new Error(`Unsupported file type: ${fileType}`);  }};
export default {
  parseQuestionFile,
  parsePDF,
  parseExcel,
  validateParsedQuestions,
};
