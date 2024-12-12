import { z } from 'zod';

// Zod schema for Lesson validation
const createLessonValidationSchema = z.object({
  lessonName: z
    .string()
    .trim() // Trims whitespace
    .min(1, 'Lesson name is required') // Ensures non-empty value
    .max(100, 'Lesson name must be less than or equal to 100 characters'),
  lessonNumber: z
    .string()
    .trim() // Trims whitespace
    .min(1, 'Lesson number is required'),
  vocabularyCount: z
    .number()
    .int('Vocabulary count must be an integer')
    .nonnegative('Vocabulary count must be a non-negative value')
    .optional(), // Optional as it defaults to 0
});
const updateLessonValidationSchema = z
  .object({
    lessonName: z
      .string()
      .trim()
      .min(1, 'Lesson name is required if provided')
      .max(100, 'Lesson name must be less than or equal to 100 characters')
      .optional(), // Optional for patch
    lessonNumber: z
      .string()
      .trim() // Trims whitespace
      .min(1, 'Lesson number is required')
      .optional(), // Optional for patch
    vocabularyCount: z
      .number()
      .int('Vocabulary count must be an integer')
      .nonnegative('Vocabulary count must be a non-negative value')
      .optional(), // Optional for patch
  })
  .partial(); // Makes all fields optional for patch updates

export const lessonValidationSchemas = {
  createLessonValidationSchema,
  updateLessonValidationSchema,
};
