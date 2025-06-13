let currentQuestionIndex = 0;
const totalScores = {
  mood: {},
  region: {},
  season: {},
  duration: {}
};

const questionText = document.querySelector(".quistion-text");
const answerOptions = document.querySelector(".answer-options");
const questionStatus = document.querySelector(".question-status");
const quizContainer = document.querySelector(".quiz-container");
const resultWrapper = document.querySelector(".result-container-wrapper");
const resultTitle = document.querySelector(".result-title");
const resultButton = document.querySelector(".see-quiz-result a");


showQuestion(currentQuestionIndex);

function showQuestion(index) {
  const q = questions[index];

  questionText.textContent = q.question;
  answerOptions.innerHTML = "";
  questionStatus.innerHTML = `<strong>${index + 1}</strong> of <strong>${questions.length}</strong> Questions`;

  q.options.forEach(option => {
    const li = document.createElement("li");
    li.className = "answer-option";
    li.innerHTML = `<p>${option.text}</p>`;

    li.addEventListener("click", () => {
      applyAnswerScores(option.scores);
      nextQuestion();
    });

    answerOptions.appendChild(li);
  });
}

function applyAnswerScores(scores) {
  for (let key in scores) {
    const subScores = scores[key];
    if (typeof subScores === "object") {
      for (let subKey in subScores) {
        if (!totalScores[key][subKey]) {
          totalScores[key][subKey] = 0;
        }
        totalScores[key][subKey] += subScores[subKey];
      }
    } else {
      
      totalScores[key][subScores] = (totalScores[key][subScores] || 0) + 1;
    }
  }
}

function nextQuestion() {
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    showQuestion(currentQuestionIndex);
  } else {
    showResult();
  }
}

function getTopScore(category) {
  const scores = totalScores[category];
  let max = 0;
  let topKey = null;
  for (let key in scores) {
    if (scores[key] > max) {
      max = scores[key];
      topKey = key;
    }
  }
  return topKey;
}

function showResult() {
  quizContainer.style.display = "none";
  resultWrapper.style.display = "flex";

  const finalResult = {
    mood: getTopScore("mood"),
    region: getTopScore("region"),
    season: getTopScore("season"),
    duration: getTopScore("duration")
  };

  console.log("Final result:", finalResult);

  fetch('http://localhost:3000/api/itineraries')
    .then(res => res.json())
    .then(itineraries => {
      if (!Array.isArray(itineraries) || itineraries.length === 0) {
        resultTitle.textContent = "No itineraries available.";
        return;
      }

      let bestScore = -1;
      let bestItinerary = null;

      
      itineraries.forEach(itinerary => {
        let score = 0;
        if (itinerary.mood?.toLowerCase() === finalResult.mood) score += 4;
        if (itinerary.region?.toLowerCase() === finalResult.region) score += 3;
        if (itinerary.season?.toLowerCase() === finalResult.season) score += 2;
        if (itinerary.duration?.toLowerCase() === finalResult.duration) score += 1;

        if (score > bestScore) {
          bestScore = score;
          bestItinerary = itinerary;
        }
      });

      if (!bestItinerary) {
        resultTitle.textContent = "No matching itinerary found.";
        return;
      }

      resultTitle.textContent = "Quiz Completed 🎉!";

      const container = document.getElementById('itinerary-container');
      container.innerHTML = `
        <h3>${bestItinerary.name}</h3>
        <p><strong>Mood:</strong> ${bestItinerary.mood}</p>
        <p><strong>Region:</strong> ${bestItinerary.region}</p>
        <p><strong>Season:</strong> ${bestItinerary.season}</p>
        <p><strong>Duration:</strong> ${bestItinerary.duration}</p>
        <ul>
          ${bestItinerary.days.map(day =>
            `<li><strong>${day.day}</strong>: ${day.schedule.map(s =>
              `${s[2]} – ${s[3]} (${s[4] || 'N/A'})`
            ).join(', ')}</li>`
          ).join('')}
        </ul>
      `;

      resultButton.style.display = "none";
    })
    .catch(err => {
      console.error("Error fetching itinerary:", err);
      resultTitle.textContent = "Error loading itinerary.";
    });
}
