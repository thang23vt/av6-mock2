import { pgTable, text, serial, integer, boolean, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const quizQuestions = pgTable("quiz_questions", {
  id: serial("id").primaryKey(),
  type: text("type").notNull(), // 'multipleChoice' or 'dragDrop'
  question: text("question").notNull(),
  options: jsonb("options").notNull(), // Array of options
  correctAnswer: jsonb("correct_answer").notNull(), // String or array of strings
  instruction: text("instruction"), // For drag-drop questions
  sentence: text("sentence"), // For drag-drop questions
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export const insertQuestionSchema = createInsertSchema(quizQuestions).omit({
  id: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type QuizQuestion = typeof quizQuestions.$inferSelect;
export type InsertQuizQuestion = z.infer<typeof insertQuestionSchema>;
