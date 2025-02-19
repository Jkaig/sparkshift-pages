import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || process.env.EXPO_PUBLIC_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true
});

if (!openai.apiKey) {
  console.warn('OpenAI API key is missing. Make sure to set OPENAI_API_KEY in your environment variables.');
}

export interface TestQuestion {
  question: string;
  options: string[];
  correctAnswer: number; // Index of the correct answer
  explanation: string;
}

export interface TestGenerationParams {
  subject: string;
  difficulty: 'easy' | 'medium' | 'hard';
  numberOfQuestions: number;
  topics?: string[];
  timeLimit?: number; // in minutes
}

export const generateTest = async (params: TestGenerationParams): Promise<TestQuestion[]> => {
  try {
    const prompt = `Generate a ${params.difficulty} difficulty test for ${params.subject} with ${params.numberOfQuestions} multiple choice questions.
    ${params.topics ? `Focus on these topics: ${params.topics.join(', ')}` : ''}
    ${params.timeLimit ? `This test should take approximately ${params.timeLimit} minutes.` : ''}
    
    Format each question as a JSON object with these fields:
    - question: The question text
    - options: Array of 4 possible answers
    - correctAnswer: Index of the correct answer (0-3)
    - explanation: Brief explanation of why the answer is correct
    
    Return the questions as a JSON array.`;

    const completion = await openai.chat.completions.create({
      messages: [{ role: "user", content: prompt }],
      model: "gpt-4", // Using GPT-4 for better test generation
      temperature: 0.7, // Balanced between creativity and consistency
      max_tokens: 2000, // Adjust based on test length
    });

    const response = completion.choices[0]?.message?.content;
    if (!response) throw new Error('No response from OpenAI');

    try {
      const questions: TestQuestion[] = JSON.parse(response);
      return questions.map(q => validateTestQuestion(q));
    } catch (e) {
      console.error('Error parsing OpenAI response:', e);
      throw new Error('Invalid response format from OpenAI');
    }
  } catch (error) {
    console.error('Error generating test:', error);
    throw error;
  }
};

// Validate and sanitize test question
const validateTestQuestion = (question: any): TestQuestion => {
  if (!question.question || !Array.isArray(question.options) || 
      question.options.length !== 4 || typeof question.correctAnswer !== 'number' ||
      !question.explanation) {
    throw new Error('Invalid question format');
  }

  return {
    question: String(question.question),
    options: question.options.map(String),
    correctAnswer: Math.min(Math.max(0, Math.floor(question.correctAnswer)), 3),
    explanation: String(question.explanation)
  };
};

export { openai };
