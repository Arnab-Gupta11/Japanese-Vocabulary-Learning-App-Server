import { z } from 'zod';

const createVocabularyValidationSchema = z.object({
  word: z.string().min(1, 'Word is required'), // Word must be a non-empty string
  pronunciation: z.string().min(1, 'Pronunciation is required'), // Pronunciation must be a non-empty string
  whenToSay: z.string().min(1, 'When to say is required'), // WhenToSay must be a non-empty string
  lessonNo: z
    .string()
    .trim() // Trims whitespace
    .min(1, 'Lesson number is required'),
  adminEmail: z.string().email('Invalid email format'), // Email must be a valid email format
});

const updateVocabularyValidationSchema = z.object({
  word: z.string().min(1, 'Word is required').optional(), // Optional word field
  pronunciation: z.string().min(1, 'Pronunciation is required').optional(), // Optional pronunciation field
  whenToSay: z.string().min(1, 'When to say is required').optional(), // Optional whenToSay field
  lessonNo: z
    .string()
    .trim() // Trims whitespace
    .min(1, 'Lesson number is required')
    .optional(), // Optional lessonNo field
  adminEmail: z.string().email('Invalid email format').optional(), // Optional adminEmail field
});
export const VocabularyValidations = {
  createVocabularyValidationSchema,
  updateVocabularyValidationSchema,
};
