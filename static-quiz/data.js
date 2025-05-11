// Dữ liệu câu hỏi trắc nghiệm
const quizData = {
  multipleChoice: [
    {
      id: 1,
      type: "multipleChoice",
      question: "1. Mi thinks they can recycle things in the bins.",
      options: [
        { id: "A", text: "True" },
        { id: "B", text: "False" }
      ],
      correctAnswer: "A"
    },
    {
      id: 2,
      type: "multipleChoice",
      question: "2. At book fairs, students can exchange their old books.",
      options: [
        { id: "A", text: "True" },
        { id: "B", text: "False" }
      ],
      correctAnswer: "A"
    },
    {
      id: 3,
      type: "multipleChoice",
      question: "3. Nam thinks students will save money if they go to school by bus.",
      options: [
        { id: "A", text: "True" },
        { id: "B", text: "False" }
      ],
      correctAnswer: "A"
    },
    {
      id: 4,
      type: "multipleChoice",
      question: "4. Students can exchange their used uniforms at uniform fairs.",
      options: [
        { id: "A", text: "True" },
        { id: "B", text: "False" }
      ],
      correctAnswer: "A"
    },
    {
      id: 5,
      type: "multipleChoice",
      question: "5. Linda's dream house is a __________.",
      options: [
        { id: "A", text: "palace" },
        { id: "B", text: "big villa" },
        { id: "C", text: "big flat" },
        { id: "D", text: "apartment" }
      ],
      correctAnswer: "B"
    },
    {
      id: 6,
      type: "multipleChoice",
      question: "6. There's a swimming pool and a __________ around her house.",
      options: [
        { id: "A", text: "garden" },
        { id: "B", text: "robot" },
        { id: "C", text: "helicopter" },
        { id: "D", text: "computer" }
      ],
      correctAnswer: "A"
    },
    {
      id: 7,
      type: "multipleChoice",
      question: "7. Nick's flat is in the __________.",
      options: [
        { id: "A", text: "country" },
        { id: "B", text: "island" },
        { id: "C", text: "city" },
        { id: "D", text: "Moon" }
      ],
      correctAnswer: "C"
    },
    {
      id: 8,
      type: "multipleChoice",
      question: "8. He can watch __________ from other planets.",
      options: [
        { id: "A", text: "cartoons" },
        { id: "B", text: "news" },
        { id: "C", text: "comedies" },
        { id: "D", text: "films" }
      ],
      correctAnswer: "D"
    },
    {
      id: 9,
      type: "multipleChoice",
      question: "9. In the future, we __________ live in a UFO.",
      options: [
        { id: "A", text: "don't" },
        { id: "B", text: "didn't" },
        { id: "C", text: "must" },
        { id: "D", text: "might" }
      ],
      correctAnswer: "D"
    },
    {
      id: 10,
      type: "multipleChoice",
      question: "10. __________ they go to the beach last month?",
      options: [
        { id: "A", text: "Do" },
        { id: "B", text: "Did" },
        { id: "C", text: "Does" },
        { id: "D", text: "Are" }
      ],
      correctAnswer: "B"
    },
    {
      id: 11,
      type: "multipleChoice",
      question: "11. A __________ can help us to wash and dry clothes.",
      options: [
        { id: "A", text: "dishwasher" },
        { id: "B", text: "smart clock" },
        { id: "C", text: "fridge" },
        { id: "D", text: "washing machine" }
      ],
      correctAnswer: "D"
    },
    {
      id: 12,
      type: "multipleChoice",
      question: "12. __________ Moon is bright tonight.",
      options: [
        { id: "A", text: "A" },
        { id: "B", text: "An" },
        { id: "C", text: "The" },
        { id: "D", text: "Some" }
      ],
      correctAnswer: "C"
    },
    {
      id: 13,
      type: "multipleChoice",
      question: "13. People need to breathe. If they don't breathe, they ______ die.",
      options: [
        { id: "A", text: "will" },
        { id: "B", text: "are" },
        { id: "C", text: "must" },
        { id: "D", text: "will not" }
      ],
      correctAnswer: "A"
    },
    {
      id: 14,
      type: "multipleChoice",
      question: "14. If they breathe ______ air, they will have breathing problems and become ill.",
      options: [
        { id: "A", text: "clean" },
        { id: "B", text: "fresh" },
        { id: "C", text: "dirty" },
        { id: "D", text: "new" }
      ],
      correctAnswer: "C"
    },
    {
      id: 15,
      type: "multipleChoice",
      question: "15. A lot of the things in our lives create harmful gases and ______ the air dirty.",
      options: [
        { id: "A", text: "make" },
        { id: "B", text: "get" },
        { id: "C", text: "give" },
        { id: "D", text: "do" }
      ],
      correctAnswer: "A"
    },
    {
      id: 16,
      type: "multipleChoice",
      question: "16. Dirty air is called \"______ air\".",
      options: [
        { id: "A", text: "pollute" },
        { id: "B", text: "polluted" },
        { id: "C", text: "polluting" },
        { id: "D", text: "pollution" }
      ],
      correctAnswer: "B"
    },
    {
      id: 17,
      type: "multipleChoice",
      question: "17. The house will be ________.",
      options: [
        { id: "A", text: "in the mountains" },
        { id: "B", text: "on an island" },
        { id: "C", text: "on the Moon" },
        { id: "D", text: "by the sea" }
      ],
      correctAnswer: "B"
    },
    {
      id: 18,
      type: "multipleChoice",
      question: "18. There'll be a ________ in front of the house.",
      options: [
        { id: "A", text: "swimming pool" },
        { id: "B", text: "pond" },
        { id: "C", text: "big garden" },
        { id: "D", text: "lake" }
      ],
      correctAnswer: "A"
    },
    {
      id: 19,
      type: "multipleChoice",
      question: "19. The house will have ________ robots.",
      options: [
        { id: "A", text: "many" },
        { id: "B", text: "a few" },
        { id: "C", text: "a lot of" },
        { id: "D", text: "some" }
      ],
      correctAnswer: "D"
    },
    {
      id: 20,
      type: "multipleChoice",
      question: "20. The ________ will help me to feed the dogs and cats.",
      options: [
        { id: "A", text: "helicopter" },
        { id: "B", text: "smart phone" },
        { id: "C", text: "robot" },
        { id: "D", text: "super smart TV" }
      ],
      correctAnswer: "C"
    }
  ],
  
  dragDrop: [
    {
      id: 21,
      type: "dragDrop",
      instruction: "21. Find the underlined part that needs correction. Because Nam was lazy, so he got a bad mark.",
      sentence: "Because Nam was lazy, ____ he got a bad mark.",
      options: ["was", "lazy", "so", "got"],
      correctAnswer: ["so"]
    },
    {
      id: 22,
      type: "dragDrop",
      instruction: "22. Find the underlined part that needs correction. My younger brother is interested on watching television.",
      sentence: "My younger brother is ____ watching television.",
      options: ["younger", "is", "interested on", "watching"],
      correctAnswer: ["interested on"]
    },
    {
      id: 23,
      type: "dragDrop",
      instruction: "23. Find the underlined part that needs correction. In the future, home robots will to do all our housework.",
      sentence: "In the future, home robots will ____ all our housework.",
      options: ["In", "home robots", "to do", "housework"],
      correctAnswer: ["to do"]
    },
    {
      id: 24,
      type: "dragDrop",
      instruction: "24. Find the underlined part that needs correction. Did your brother went to school by bike last year?",
      sentence: "Did your brother ____ to school by bike last year?",
      options: ["your", "went", "to", "by"],
      correctAnswer: ["went"]
    },
    {
      id: 25,
      type: "dragDrop",
      instruction: "25. Complete the sentence with the same meaning. Hoi An is quieter than Ho Chi Minh City.",
      sentence: "Ho Chi Minh City is ____ Hoi An.",
      options: ["noisier than", "more noisy than", "less quiet than", "not as quiet as"],
      correctAnswer: ["noisier than"]
    },
    {
      id: 26,
      type: "dragDrop",
      instruction: "26. Complete the sentence with the same meaning. Nam studies very hard, so he always gets good marks.",
      sentence: "Nam always gets good marks ____ he studies very hard.",
      options: ["because of", "because", "as", "since"],
      correctAnswer: ["because"]
    },
    {
      id: 27,
      type: "dragDrop",
      instruction: "27. Complete the sentence with the same meaning. Lan likes badminton best.",
      sentence: "Lan's favourite ____ badminton.",
      options: ["sport is", "game is", "hobby is", "activity is"],
      correctAnswer: ["sport is"]
    },
    {
      id: 28,
      type: "dragDrop",
      instruction: "28. Complete the sentence with the same meaning. We plant more trees. The air is fresher.",
      sentence: "If ____ more trees, the air will be fresher.",
      options: ["we can plant", "we plant", "we will plant", "we are planting"],
      correctAnswer: ["we plant"]
    },
    {
      id: 29,
      type: "dragDrop",
      instruction: "29. Make a sentence using the given words: My house might / have / smart TV / ten robots.",
      sentence: "My house ____ ____ ____ ____ ____.",
      options: ["might", "have", "a smart TV", "and", "ten robots"],
      correctAnswer: ["might", "have", "a smart TV", "and", "ten robots"]
    },
    {
      id: 30,
      type: "dragDrop",
      instruction: "30. Make a sentence using the given words: Mark / go / swimming / his friends / last Sunday.",
      sentence: "____ ____ ____ ____ ____ ____.",
      options: ["Mark", "went", "swimming", "with", "his friends", "last Sunday"],
      correctAnswer: ["Mark", "went", "swimming", "with", "his friends", "last Sunday"]
    },
    {
      id: 31,
      type: "dragDrop",
      instruction: "31. Make a sentence using the given words: How often / you / go / the library?",
      sentence: "____ ____ ____ ____ ____ ____?",
      options: ["How often", "do", "you", "go", "to", "the library"],
      correctAnswer: ["How often", "do", "you", "go", "to", "the library"]
    },
    {
      id: 32,
      type: "dragDrop",
      instruction: "32. Make a sentence using the given words: I / visit / London / my vacation / next year.",
      sentence: "____ ____ ____ ____ ____ ____ ____.",
      options: ["I", "will", "visit", "London", "during", "my vacation", "next year"],
      correctAnswer: ["I", "will", "visit", "London", "during", "my vacation", "next year"]
    }
  ]
};

// Hàm lưu dữ liệu vào localStorage
function saveToLocalStorage(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}

// Hàm lấy dữ liệu từ localStorage
function getFromLocalStorage(key) {
  const data = localStorage.getItem(key);
  return data ? JSON.parse(data) : null;
}

// Kiểm tra xem đã có dữ liệu lưu trong localStorage chưa
if (!getFromLocalStorage('quizData')) {
  saveToLocalStorage('quizData', quizData);
}