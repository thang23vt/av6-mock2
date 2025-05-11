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
        question: "1. Mi thinks they can recycle things in the bins.",
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
        question: "2. At book fairs, students can exchange their old books.",
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
        question: "3. Nam thinks students will save money if they go to school by bus.",
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
        question: "4. Students can exchange their used uniforms at uniform fairs.",
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
        question: "5. Linda's dream house is a __________.",
        options: [
          { id: "A", text: "palace" },
          { id: "B", text: "big villa" },
          { id: "C", text: "big flat" },
          { id: "D", text: "apartment" }
        ],
        correctAnswer: "B",
        instruction: null,
        sentence: null
      },
      {
        id: this.currentQuestionId++,
        type: "multipleChoice",
        question: "6. There's a swimming pool and a __________ around her house.",
        options: [
          { id: "A", text: "garden" },
          { id: "B", text: "robot" },
          { id: "C", text: "helicopter" },
          { id: "D", text: "computer" }
        ],
        correctAnswer: "A",
        instruction: null,
        sentence: null
      },
      {
        id: this.currentQuestionId++,
        type: "multipleChoice",
        question: "7. Nick's flat is in the __________.",
        options: [
          { id: "A", text: "country" },
          { id: "B", text: "island" },
          { id: "C", text: "city" },
          { id: "D", text: "Moon" }
        ],
        correctAnswer: "C",
        instruction: null,
        sentence: null
      },
      {
        id: this.currentQuestionId++,
        type: "multipleChoice",
        question: "8. He can watch __________ from other planets.",
        options: [
          { id: "A", text: "cartoons" },
          { id: "B", text: "news" },
          { id: "C", text: "comedies" },
          { id: "D", text: "films" }
        ],
        correctAnswer: "D",
        instruction: null,
        sentence: null
      },
      {
        id: this.currentQuestionId++,
        type: "multipleChoice",
        question: "9. In the future, we __________ live in a UFO.",
        options: [
          { id: "A", text: "don't" },
          { id: "B", text: "didn't" },
          { id: "C", text: "must" },
          { id: "D", text: "might" }
        ],
        correctAnswer: "D",
        instruction: null,
        sentence: null
      },
      {
        id: this.currentQuestionId++,
        type: "multipleChoice",
        question: "10. __________ they go to the beach last month?",
        options: [
          { id: "A", text: "Do" },
          { id: "B", text: "Did" },
          { id: "C", text: "Does" },
          { id: "D", text: "Are" }
        ],
        correctAnswer: "B",
        instruction: null,
        sentence: null
      },
      {
        id: this.currentQuestionId++,
        type: "multipleChoice",
        question: "11. A __________ can help us to wash and dry clothes.",
        options: [
          { id: "A", text: "dishwasher" },
          { id: "B", text: "smart clock" },
          { id: "C", text: "fridge" },
          { id: "D", text: "washing machine" }
        ],
        correctAnswer: "D",
        instruction: null,
        sentence: null
      },
      {
        id: this.currentQuestionId++,
        type: "multipleChoice",
        question: "12. __________ Moon is bright tonight.",
        options: [
          { id: "A", text: "A" },
          { id: "B", text: "An" },
          { id: "C", text: "The" },
          { id: "D", text: "Some" }
        ],
        correctAnswer: "C",
        instruction: null,
        sentence: null
      },
      {
        id: this.currentQuestionId++,
        type: "multipleChoice",
        question: "13. People need to breathe. If they don't breathe, they ______ die.",
        options: [
          { id: "A", text: "will" },
          { id: "B", text: "are" },
          { id: "C", text: "must" },
          { id: "D", text: "will not" }
        ],
        correctAnswer: "A",
        instruction: null,
        sentence: null
      },
      {
        id: this.currentQuestionId++,
        type: "multipleChoice",
        question: "14. If they breathe ______ air, they will have breathing problems and become ill.",
        options: [
          { id: "A", text: "clean" },
          { id: "B", text: "fresh" },
          { id: "C", text: "dirty" },
          { id: "D", text: "new" }
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
        type: "multipleChoice",
        question: "15. A lot of the things in our lives create harmful gases and ______ the air dirty.",
        options: [
          { id: "A", text: "make" },
          { id: "B", text: "get" },
          { id: "C", text: "give" },
          { id: "D", text: "do" }
        ],
        correctAnswer: "A",
        instruction: null,
        sentence: null
      },
      {
        id: this.currentQuestionId++,
        type: "multipleChoice",
        question: "16. Dirty air is called \"______ air\".",
        options: [
          { id: "A", text: "pollute" },
          { id: "B", text: "polluted" },
          { id: "C", text: "polluting" },
          { id: "D", text: "pollution" }
        ],
        correctAnswer: "B",
        instruction: null,
        sentence: null
      },
      {
        id: this.currentQuestionId++,
        type: "multipleChoice",
        question: "17. The house will be ________.",
        options: [
          { id: "A", text: "in the mountains" },
          { id: "B", text: "on an island" },
          { id: "C", text: "on the Moon" },
          { id: "D", text: "by the sea" }
        ],
        correctAnswer: "B",
        instruction: null,
        sentence: null
      },
      {
        id: this.currentQuestionId++,
        type: "multipleChoice",
        question: "18. There'll be a ________ in front of the house.",
        options: [
          { id: "A", text: "swimming pool" },
          { id: "B", text: "pond" },
          { id: "C", text: "big garden" },
          { id: "D", text: "lake" }
        ],
        correctAnswer: "A",
        instruction: null,
        sentence: null
      },
      {
        id: this.currentQuestionId++,
        type: "multipleChoice",
        question: "19. The house will have ________ robots.",
        options: [
          { id: "A", text: "many" },
          { id: "B", text: "a few" },
          { id: "C", text: "a lot of" },
          { id: "D", text: "some" }
        ],
        correctAnswer: "D",
        instruction: null,
        sentence: null
      },
      {
        id: this.currentQuestionId++,
        type: "multipleChoice",
        question: "20. The ________ will help me to feed the dogs and cats.",
        options: [
          { id: "A", text: "helicopter" },
          { id: "B", text: "smart phone" },
          { id: "C", text: "robot" },
          { id: "D", text: "super smart TV" }
        ],
        correctAnswer: "C",
        instruction: null,
        sentence: null
      },
      {
        id: this.currentQuestionId++,
        type: "dragDrop",
        question: null,
        options: ["was", "lazy", "so", "got"],
        correctAnswer: ["so"],
        instruction: "21. Find the underlined part that needs correction. Because Nam was lazy, so he got a bad mark.",
        sentence: "Because Nam was lazy, ____ he got a bad mark."
      },
      {
        id: this.currentQuestionId++,
        type: "dragDrop",
        question: null,
        options: ["younger", "is", "interested on", "watching"],
        correctAnswer: ["interested on"],
        instruction: "22. Find the underlined part that needs correction. My younger brother is interested on watching television.",
        sentence: "My younger brother is ____ watching television."
      }
    ];

    const allQuestions = [...multipleChoiceQuestions, ...dragDropQuestions];
    
    allQuestions.forEach(question => {
      // Ensure instruction and sentence are never undefined
      const fixedQuestion = {
        ...question,
        instruction: question.instruction ?? null,
        sentence: question.sentence ?? null
      };
      this.questions.set(question.id, fixedQuestion as QuizQuestion);
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
