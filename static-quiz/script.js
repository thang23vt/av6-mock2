// Lấy tham chiếu đến các phần tử DOM
const startScreen = document.getElementById('start-screen');
const quizHeader = document.getElementById('quiz-header');
const questionArea = document.getElementById('question-area');
const resultScreen = document.getElementById('result-screen');
const startButton = document.getElementById('start-button');
const restartButton = document.getElementById('restart-button');
const questionNumber = document.getElementById('question-number');
const scoreDisplay = document.getElementById('score-display');
const progressFill = document.getElementById('progress-fill');
const percentageDisplay = document.getElementById('percentage');
const resultMessage = document.getElementById('result-message');
const correctCount = document.getElementById('correct-count');
const incorrectCount = document.getElementById('incorrect-count');

// Admin panel elements
const adminToggle = document.getElementById('admin-toggle');
const adminControls = document.getElementById('admin-controls');
const questionSelect = document.getElementById('question-select');
const answerEditor = document.getElementById('answer-editor');
const saveChangesButton = document.getElementById('save-changes');

// State của ứng dụng
let currentQuestionIndex = 0;
let score = 0;
let answers = {};
let isAdminMode = false;
let quizData = getFromLocalStorage('quizData') || window.quizData;
let allQuestions = [...quizData.multipleChoice, ...quizData.dragDrop];

// Bắt đầu bài kiểm tra
startButton.addEventListener('click', startQuiz);
restartButton.addEventListener('click', restartQuiz);
adminToggle.addEventListener('click', toggleAdminMode);
saveChangesButton.addEventListener('click', saveChanges);
questionSelect.addEventListener('change', handleQuestionSelect);

// Shuffle mảng câu hỏi kéo thả
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

// Bắt đầu bài kiểm tra
function startQuiz() {
  startScreen.classList.add('hidden');
  quizHeader.classList.remove('hidden');
  questionArea.classList.remove('hidden');
  currentQuestionIndex = 0;
  score = 0;
  answers = {};
  renderQuestion();
  updateProgress();
}

// Khởi động lại bài kiểm tra
function restartQuiz() {
  resultScreen.classList.add('hidden');
  quizHeader.classList.remove('hidden');
  questionArea.classList.remove('hidden');
  currentQuestionIndex = 0;
  score = 0;
  answers = {};
  renderQuestion();
  updateProgress();
}

// Hiển thị câu hỏi hiện tại
function renderQuestion() {
  const question = allQuestions[currentQuestionIndex];
  
  questionArea.innerHTML = '';
  
  if (!question) {
    showResults();
    return;
  }
  
  const questionCard = document.createElement('div');
  questionCard.className = 'card question-card';
  
  // Tạo header của câu hỏi
  const questionHeader = document.createElement('div');
  questionHeader.className = 'question-header';
  
  const questionTitle = document.createElement('h3');
  questionTitle.textContent = `Câu hỏi ${question.id}`;
  
  questionHeader.appendChild(questionTitle);
  questionCard.appendChild(questionHeader);
  
  // Tạo phần nội dung câu hỏi
  const questionContent = document.createElement('div');
  questionContent.className = 'question-content';
  
  if (question.type === 'multipleChoice') {
    renderMultipleChoiceQuestion(question, questionContent);
  } else if (question.type === 'dragDrop') {
    renderDragDropQuestion(question, questionContent);
  }
  
  questionCard.appendChild(questionContent);
  questionArea.appendChild(questionCard);
}

// Hiển thị câu hỏi trắc nghiệm
function renderMultipleChoiceQuestion(question, container) {
  const questionText = document.createElement('p');
  questionText.className = 'question-text';
  questionText.textContent = question.question;
  container.appendChild(questionText);
  
  const optionsContainer = document.createElement('div');
  optionsContainer.className = 'options-container';
  
  question.options.forEach(option => {
    const optionElement = document.createElement('div');
    optionElement.className = 'option';
    optionElement.dataset.optionId = option.id;
    
    const optionId = document.createElement('span');
    optionId.className = 'option-id';
    optionId.textContent = option.id;
    
    const optionText = document.createElement('span');
    optionText.className = 'option-text';
    optionText.textContent = option.text;
    
    optionElement.appendChild(optionId);
    optionElement.appendChild(optionText);
    optionsContainer.appendChild(optionElement);
    
    // Thêm sự kiện click cho option
    optionElement.addEventListener('click', () => {
      // Kiểm tra xem đã có câu trả lời chưa
      if (container.querySelector('.feedback')) return;
      
      // Bỏ chọn tất cả các option khác
      const options = container.querySelectorAll('.option');
      options.forEach(opt => opt.classList.remove('selected'));
      
      // Chọn option hiện tại
      optionElement.classList.add('selected');
    });
  });
  
  container.appendChild(optionsContainer);
  
  // Thêm nút Check Answer
  const checkButton = document.createElement('button');
  checkButton.className = 'button';
  checkButton.textContent = 'Kiểm tra câu trả lời';
  checkButton.addEventListener('click', () => {
    const selectedOption = container.querySelector('.option.selected');
    if (!selectedOption) return;
    
    const selectedOptionId = selectedOption.dataset.optionId;
    const isCorrect = selectedOptionId === question.correctAnswer;
    
    // Hiển thị kết quả
    if (isCorrect) {
      score++;
      scoreDisplay.textContent = `Điểm: ${score}`;
    }
    
    answers[question.id] = {
      correct: isCorrect,
      selected: selectedOptionId,
      correctAnswer: question.correctAnswer
    };
    
    // Hiển thị phản hồi
    showFeedback(container, isCorrect, question);
  });
  
  container.appendChild(checkButton);
}

// Hiển thị câu hỏi kéo thả
function renderDragDropQuestion(question, container) {
  const instruction = document.createElement('p');
  instruction.className = 'question-text';
  instruction.textContent = question.instruction;
  container.appendChild(instruction);
  
  // Tạo câu cần điền
  const sentenceContainer = document.createElement('div');
  sentenceContainer.className = 'sentence-container';
  
  const parts = question.sentence.split('____');
  const dropTargetId = `drop-${question.id}`;
  
  let sentence = '';
  for (let i = 0; i < parts.length; i++) {
    sentence += parts[i];
    if (i < parts.length - 1) {
      if (question.sentence.includes('____')) {
        sentence += `<span id="${dropTargetId}" class="drop-target" data-index="${i}"></span>`;
      } else {
        sentence += '____';
      }
    }
  }
  
  sentenceContainer.innerHTML = sentence;
  container.appendChild(sentenceContainer);
  
  // Tạo khu vực chứa các item có thể kéo
  const draggableContainer = document.createElement('div');
  draggableContainer.className = 'draggable-container';
  
  // Lấy các options và đảo vị trí
  const options = [...question.options];
  shuffleArray(options);
  
  options.forEach((option, index) => {
    const draggableItem = document.createElement('div');
    draggableItem.className = 'draggable-item';
    draggableItem.textContent = option;
    draggableItem.draggable = true;
    draggableItem.id = `drag-${question.id}-${index}`;
    draggableItem.dataset.value = option;
    
    // Thêm các sự kiện drag and drop
    draggableItem.addEventListener('dragstart', handleDragStart);
    
    draggableContainer.appendChild(draggableItem);
  });
  
  container.appendChild(draggableContainer);
  
  // Thêm sự kiện drop cho drop target
  const dropTarget = document.getElementById(dropTargetId);
  if (dropTarget) {
    dropTarget.addEventListener('dragover', handleDragOver);
    dropTarget.addEventListener('dragleave', handleDragLeave);
    dropTarget.addEventListener('drop', (e) => handleDrop(e, question));
  }
  
  // Thêm nút Check Answer
  const checkButton = document.createElement('button');
  checkButton.className = 'button';
  checkButton.textContent = 'Kiểm tra câu trả lời';
  checkButton.addEventListener('click', () => {
    const dropTarget = document.getElementById(dropTargetId);
    if (!dropTarget.hasAttribute('data-dropped-value')) return;
    
    const droppedValue = dropTarget.getAttribute('data-dropped-value');
    const isCorrect = question.correctAnswer.includes(droppedValue);
    
    // Cập nhật điểm
    if (isCorrect) {
      score++;
      scoreDisplay.textContent = `Điểm: ${score}`;
    }
    
    answers[question.id] = {
      correct: isCorrect,
      selected: droppedValue,
      correctAnswer: question.correctAnswer
    };
    
    // Hiển thị phản hồi và cập nhật kiểu drop target
    dropTarget.classList.add(isCorrect ? 'correct' : 'incorrect');
    
    // Hiển thị phản hồi
    showFeedback(container, isCorrect, question);
  });
  
  container.appendChild(checkButton);
}

// Xử lý kéo bắt đầu
function handleDragStart(e) {
  e.dataTransfer.setData('text/plain', e.target.dataset.value);
  e.target.classList.add('dragging');
}

// Xử lý kéo qua
function handleDragOver(e) {
  e.preventDefault();
  e.currentTarget.classList.add('hover');
}

// Xử lý kéo ra ngoài
function handleDragLeave(e) {
  e.currentTarget.classList.remove('hover');
}

// Xử lý thả
function handleDrop(e, question) {
  e.preventDefault();
  const dropTarget = e.currentTarget;
  dropTarget.classList.remove('hover');
  
  // Lấy giá trị được kéo
  const droppedValue = e.dataTransfer.getData('text/plain');
  
  // Xóa bỏ class dragging từ tất cả các items
  document.querySelectorAll('.draggable-item').forEach(item => {
    item.classList.remove('dragging');
    
    // Ẩn item đã được thả vào
    if (item.dataset.value === droppedValue) {
      item.style.display = 'none';
    }
  });
  
  // Đánh dấu drop target đã được thả
  dropTarget.classList.add('filled');
  dropTarget.setAttribute('data-dropped-value', droppedValue);
  
  // Hiển thị giá trị đã thả
  const droppedItem = document.createElement('span');
  droppedItem.className = 'draggable-item';
  droppedItem.textContent = droppedValue;
  dropTarget.innerHTML = '';
  dropTarget.appendChild(droppedItem);
}

// Hiển thị phản hồi
function showFeedback(container, isCorrect, question) {
  // Kiểm tra xem đã có phản hồi chưa
  if (container.querySelector('.feedback')) return;
  
  // Tạo phần tử phản hồi
  const feedback = document.createElement('div');
  feedback.className = `feedback ${isCorrect ? 'correct' : 'incorrect'}`;
  
  const feedbackContent = document.createElement('div');
  
  if (isCorrect) {
    feedbackContent.innerHTML = '<span class="feedback-icon">✓</span> Chính xác! Rất tốt.';
  } else {
    let correctAnswer = '';
    
    if (question.type === 'multipleChoice') {
      const correctOption = question.options.find(option => option.id === question.correctAnswer);
      correctAnswer = correctOption ? `${question.correctAnswer}: ${correctOption.text}` : question.correctAnswer;
    } else if (question.type === 'dragDrop') {
      correctAnswer = question.correctAnswer[0];
    }
    
    feedbackContent.innerHTML = `<span class="feedback-icon">✗</span> Sai. Đáp án đúng là: <strong>${correctAnswer}</strong>`;
  }
  
  feedback.appendChild(feedbackContent);
  container.appendChild(feedback);
  
  // Thêm nút Next
  const nextButton = document.createElement('button');
  nextButton.className = 'button';
  nextButton.style.marginLeft = '8px';
  nextButton.textContent = 'Câu tiếp theo';
  nextButton.addEventListener('click', () => {
    currentQuestionIndex++;
    renderQuestion();
    updateProgress();
  });
  
  if (container.querySelector('button')) {
    container.querySelector('button').replaceWith(nextButton);
  } else {
    container.appendChild(nextButton);
  }
}

// Cập nhật thanh tiến trình
function updateProgress() {
  const progress = ((currentQuestionIndex) / allQuestions.length) * 100;
  progressFill.style.width = `${progress}%`;
  questionNumber.textContent = `Câu hỏi ${currentQuestionIndex + 1} / ${allQuestions.length}`;
  scoreDisplay.textContent = `Điểm: ${score}`;
}

// Hiển thị kết quả cuối cùng
function showResults() {
  quizHeader.classList.add('hidden');
  questionArea.classList.add('hidden');
  resultScreen.classList.remove('hidden');
  
  const totalQuestions = allQuestions.length;
  const correctAnswers = Object.values(answers).filter(answer => answer.correct).length;
  const incorrectAnswers = Object.values(answers).filter(answer => !answer.correct).length;
  const percentage = Math.round((correctAnswers / totalQuestions) * 100);
  
  percentageDisplay.textContent = `${percentage}%`;
  correctCount.textContent = correctAnswers;
  incorrectCount.textContent = incorrectAnswers;
  
  // Thông báo kết quả
  let message = '';
  if (percentage >= 90) {
    message = 'Xuất sắc! Bạn làm rất tốt!';
  } else if (percentage >= 70) {
    message = 'Giỏi! Bạn đã làm tốt!';
  } else if (percentage >= 50) {
    message = 'Cố gắng tốt! Tiếp tục luyện tập!';
  } else {
    message = 'Hãy tiếp tục học và thử lại!';
  }
  
  resultMessage.textContent = message;
}

// Bật/tắt chế độ Admin
function toggleAdminMode() {
  isAdminMode = !isAdminMode;
  
  if (isAdminMode) {
    adminToggle.textContent = 'Admin Mode: ON';
    adminToggle.classList.add('active');
    adminControls.classList.remove('hidden');
    
    // Populate question select
    populateQuestionSelect();
  } else {
    adminToggle.textContent = 'Admin Mode';
    adminToggle.classList.remove('active');
    adminControls.classList.add('hidden');
  }
}

// Điền các câu hỏi vào dropdown
function populateQuestionSelect() {
  questionSelect.innerHTML = '<option value="">Chọn câu hỏi để chỉnh sửa</option>';
  
  allQuestions.forEach(question => {
    const option = document.createElement('option');
    option.value = question.id;
    option.textContent = `Câu ${question.id}: ${question.type === 'multipleChoice' ? question.question.substring(0, 30) : question.instruction.substring(0, 30)}...`;
    questionSelect.appendChild(option);
  });
}

// Xử lý chọn câu hỏi để chỉnh sửa
function handleQuestionSelect() {
  const questionId = parseInt(questionSelect.value);
  
  if (!questionId) {
    answerEditor.classList.add('hidden');
    return;
  }
  
  const question = allQuestions.find(q => q.id === questionId);
  if (!question) return;
  
  answerEditor.classList.remove('hidden');
  renderAnswerEditor(question);
}

// Hiển thị editor cho câu trả lời
function renderAnswerEditor(question) {
  answerEditor.innerHTML = '';
  
  const label = document.createElement('label');
  label.textContent = 'Câu trả lời đúng:';
  answerEditor.appendChild(label);
  
  if (question.type === 'multipleChoice') {
    const select = document.createElement('select');
    select.id = 'correctAnswer';
    
    question.options.forEach(option => {
      const optElement = document.createElement('option');
      optElement.value = option.id;
      optElement.textContent = `${option.id}: ${option.text}`;
      optElement.selected = option.id === question.correctAnswer;
      select.appendChild(optElement);
    });
    
    answerEditor.appendChild(select);
  } else if (question.type === 'dragDrop') {
    const select = document.createElement('select');
    select.id = 'correctAnswer';
    
    question.options.forEach(option => {
      const optElement = document.createElement('option');
      optElement.value = option;
      optElement.textContent = option;
      optElement.selected = question.correctAnswer.includes(option);
      select.appendChild(optElement);
    });
    
    answerEditor.appendChild(select);
  }
}

// Lưu thay đổi
function saveChanges() {
  const questionId = parseInt(questionSelect.value);
  if (!questionId) return;
  
  const question = allQuestions.find(q => q.id === questionId);
  if (!question) return;
  
  const correctAnswerSelect = document.getElementById('correctAnswer');
  if (!correctAnswerSelect) return;
  
  const newCorrectAnswer = correctAnswerSelect.value;
  
  // Cập nhật câu trả lời đúng
  if (question.type === 'multipleChoice') {
    question.correctAnswer = newCorrectAnswer;
  } else if (question.type === 'dragDrop') {
    question.correctAnswer = [newCorrectAnswer];
  }
  
  // Cập nhật câu hỏi trong quizData
  const questionType = question.type === 'multipleChoice' ? 'multipleChoice' : 'dragDrop';
  const questionIndex = quizData[questionType].findIndex(q => q.id === questionId);
  
  if (questionIndex !== -1) {
    quizData[questionType][questionIndex] = question;
  }
  
  // Lưu vào localStorage
  saveToLocalStorage('quizData', quizData);
  
  // Hiển thị thông báo
  alert(`Câu trả lời cho câu ${questionId} đã được cập nhật thành công!`);
}

// Khởi tạo khi trang tải xong
window.addEventListener('DOMContentLoaded', () => {
  // Khởi tạo danh sách câu hỏi
  allQuestions = [...quizData.multipleChoice, ...quizData.dragDrop];
  allQuestions.sort((a, b) => a.id - b.id);
});