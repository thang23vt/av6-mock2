import { 
  users, 
  type User, 
  type InsertUser, 
  quizQuestions, 
  type QuizQuestion, 
  type InsertQuizQuestion 
} from "@shared/schema";

export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  getQuestions(): Promise<QuizQuestion[]>;
  getQuestion(id: number): Promise<QuizQuestion | undefined>;
  createQuestion(question: InsertQuizQuestion): Promise<QuizQuestion>;
  updateQuestion(id: number, question: Partial<InsertQuizQuestion>): Promise<QuizQuestion | undefined>;
  deleteQuestion(id: number): Promise<boolean>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private questions: Map<number, QuizQuestion>;
  private currentUserId: number;
  private currentQuestionId: number;

  constructor() {
    this.users = new Map();
    this.questions = new Map();
    this.currentUserId = 1;
    this.currentQuestionId = 1;
    this.initializeQuestions();
  }

  private initializeQuestions() {
    // Initialize with mock test data
    // Multiple choice questions
    const multipleChoiceQuestions = [
      {
        id: this.currentQuestionId++,
        type: "multipleChoice",
        question: "Mi thinks they can recycle things in the bins.",
        options: [
          { id: "A", text: "True" },
          { id: "B", text: "False" }
        ],
        correctAnswer: "A",
        instruction: null,
        sentence: null
      },
      {
        id: this.currentQuestionId++,
        type: "multipleChoice",
        question: "At book fairs, students can exchange the bins.",
        options: [
          { id: "A", text: "True" },
          { id: "B", text: "False" }
        ],
        correctAnswer: "B",
        instruction: null,
        sentence: null
      },
      {
        id: this.currentQuestionId++,
        type: "multipleChoice",
        question: "Nam thinks students will save money if they go to school by bus.",
        options: [
          { id: "A", text: "True" },
          { id: "B", text: "False" }
        ],
        correctAnswer: "A",
        instruction: null,
        sentence: null
      },
      {
        id: this.currentQuestionId++,
        type: "multipleChoice",
        question: "Students can exchange their used uniforms at uniform fairs.",
        options: [
          { id: "A", text: "True" },
          { id: "B", text: "False" }
        ],
        correctAnswer: "B",
        instruction: null,
        sentence: null
      },
      {
        id: this.currentQuestionId++,
        type: "multipleChoice",
        question: "Linda's dream house is a big villa ____ the sea.",
        options: [
          { id: "A", text: "by" },
          { id: "B", text: "in" },
          { id: "C", text: "on" },
          { id: "D", text: "at" }
        ],
        correctAnswer: "B",
        instruction: null,
        sentence: null
      },
      {
        id: this.currentQuestionId++,
        type: "multipleChoice",
        question: "Linda's dream house has a view of the ____.",
        options: [
          { id: "A", text: "garden" },
          { id: "B", text: "sea" },
          { id: "C", text: "pool" },
          { id: "D", text: "villa" }
        ],
        correctAnswer: "A",
        instruction: null,
        sentence: null
      },
      {
        id: this.currentQuestionId++,
        type: "multipleChoice",
        question: "Linda's dream house has a swimming pool and a ____.",
        options: [
          { id: "A", text: "sea" },
          { id: "B", text: "villa" },
          { id: "C", text: "garden" },
          { id: "D", text: "view" }
        ],
        correctAnswer: "C",
        instruction: null,
        sentence: null
      },
      {
        id: this.currentQuestionId++,
        type: "multipleChoice",
        question: "Nick's dream house is ____ Linda's.",
        options: [
          { id: "A", text: "similar to" },
          { id: "B", text: "different from" },
          { id: "C", text: "the same as" },
          { id: "D", text: "bigger than" }
        ],
        correctAnswer: "D",
        instruction: null,
        sentence: null
      },
      {
        id: this.currentQuestionId++,
        type: "multipleChoice",
        question: "I ____ an English test tomorrow.",
        options: [
          { id: "A", text: "have" },
          { id: "B", text: "has" },
          { id: "C", text: "had" },
          { id: "D", text: "will have" }
        ],
        correctAnswer: "D",
        instruction: null,
        sentence: null
      },
      {
        id: this.currentQuestionId++,
        type: "multipleChoice",
        question: "They will ____ rubbish at the park next week.",
        options: [
          { id: "A", text: "plant" },
          { id: "B", text: "use" },
          { id: "C", text: "pick up" },
          { id: "D", text: "save" }
        ],
        correctAnswer: "C",
        instruction: null,
        sentence: null
      }
    ];

    // Drag and drop questions
    const dragDropQuestions = [
      {
        id: this.currentQuestionId++,
        type: "dragDrop",
        question: null,
        options: ["and", "but", "so", "because"],
        correctAnswer: ["but"],
        instruction: "Complete the sentence by dragging the correct word into the blank.",
        sentence: "My sister is good at school, ____ I'm not."
      },
      {
        id: this.currentQuestionId++,
        type: "dragDrop",
        question: null,
        options: ["him", "she", "her", "hers"],
        correctAnswer: ["hers"],
        instruction: "Complete the sentence by dragging the correct word into the blank.",
        sentence: "This pen isn't mine. It's ____."
      },
      {
        id: this.currentQuestionId++,
        type: "dragDrop",
        question: null,
        options: ["viewers", "characters", "channels", "comedies"],
        correctAnswer: ["viewers"],
        instruction: "Complete the sentence by dragging the correct word into the blank.",
        sentence: "VTV1 is a popular TV channel in Viet Nam. It attracts many ____ because it has interesting programmes."
      },
      {
        id: this.currentQuestionId++,
        type: "dragDrop",
        question: null,
        options: ["sports", "animal", "game show", "talent show"],
        correctAnswer: ["animal"],
        instruction: "Complete the sentence by dragging the correct word into the blank.",
        sentence: "The ____ programmes show tigers and giraffes in nature."
      }
    ];

    const allQuestions = [...multipleChoiceQuestions, ...dragDropQuestions];
    
    allQuestions.forEach(question => {
      this.questions.set(question.id, question as QuizQuestion);
    });
  }

  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentUserId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async getQuestions(): Promise<QuizQuestion[]> {
    return Array.from(this.questions.values());
  }

  async getQuestion(id: number): Promise<QuizQuestion | undefined> {
    return this.questions.get(id);
  }

  async createQuestion(question: InsertQuizQuestion): Promise<QuizQuestion> {
    const id = this.currentQuestionId++;
    const newQuestion: QuizQuestion = { ...question, id };
    this.questions.set(id, newQuestion);
    return newQuestion;
  }

  async updateQuestion(id: number, questionUpdate: Partial<InsertQuizQuestion>): Promise<QuizQuestion | undefined> {
    const question = this.questions.get(id);
    if (!question) return undefined;

    const updatedQuestion = { ...question, ...questionUpdate };
    this.questions.set(id, updatedQuestion);
    return updatedQuestion;
  }

  async deleteQuestion(id: number): Promise<boolean> {
    return this.questions.delete(id);
  }
}

export const storage = new MemStorage();
