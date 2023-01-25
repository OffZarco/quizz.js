const quizContainer = document.getElementById('quizz_page');
const resultsContainer = document.getElementById('results');
const checkBtn = document.getElementById('check');
const prevBtn = document.getElementById('prev-button');
const nextBtn = document.getElementById('next-button');

let currentQuestion = 0;
let quizzData;
let correctAnswers = {};
let randomIndex;

// Fonction pour afficher le quizz en cours
function showQuizz() {
    fetch('/data-quizz.json')
        .then(response => response.json())
        .then(data => {
            quizzData = data;

            quizzData.forEach(quizz => {
                correctAnswers[quizz.id] = quizz.correctAnswers;
            });

            const randomIndex = Math.floor(Math.random() * quizzData.length);
            const currentQuizz = quizzData[randomIndex];
            const questionDiv = document.createElement('div');
            questionDiv.classList.add('question');

            const questionText = document.createElement('p');
            questionText.innerText = currentQuizz.question;
            questionDiv.appendChild(questionText);

            // Boucle pour créer les réponses possibles pour la question courante
            Object.values(currentQuizz.answers[0]).forEach((answer, key) => {
                const answerDiv = document.createElement('div');
                answerDiv.classList.add('answer');

                const answerInput = document.createElement('input');
                answerInput.type = 'radio';
                answerInput.name = 'question_' + currentQuizz.id;
                answerInput.value = key;

                const answerLabel = document.createElement('label');
                answerLabel.innerText = answer;

                answerDiv.appendChild(answerInput);
                answerDiv.appendChild(answerLabel);

                questionDiv.appendChild(answerDiv);
            });
            quizContainer.innerHTML = "";
            quizContainer.appendChild(questionDiv);
        });
}

let score = 0;
const scoreContainer = document.getElementById('score');

// Fonction pour afficher les résultats
function showResults() {
    const selectedAnswers = document.querySelectorAll('input:checked');
    let score = 0;
    const currentQuizz = quizzData[currentQuestion];

    // Boucle pour vérifier les réponses sélectionnées et les comparer aux réponses correctes
    selectedAnswers.forEach(answerInput => {
        const answerId = answerInput.value;
        if (correctAnswers[currentQuizz.id].includes(answerId)) {
            score++;
            answerInput.parentElement.classList.add("correct");
        } else {
            answerInput.parentElement.classList.add("incorrect");
        }
    });
    // Si c'est la dernière question, affiche le score total, sinon affiche le score pour la question courante
    if (currentQuestion === quizzData.length - 1) {
        resultsContainer.innerText = 'Vous avez obtenu ' +
            score + ' bonne(s) réponse(s) sur ' + selectedAnswers.length + ' questions. Score total : ' + score;
    } else {
        resultsContainer.innerText = 'Vous avez obtenu ' + score + ' bonne(s) réponse(s) sur cette question. Score total : ' + score;
    }
    scoreContainer.innerText = score;
}

prevBtn.addEventListener('click', () => {
    if (currentQuestion > 0) {
        currentQuestion--;
        showQuizz();
    }
});

nextBtn.addEventListener('click', () => {
    // On vérifie si une réponse a été sélectionnée pour la question courante
    if (document.querySelector('input[name="question_' + quizzData[currentQuestion].id + '"]:checked')) {
        if (currentQuestion < quizzData.length - 1) {
            currentQuestion++;
            showQuizz();
        } else {
            showResults();
        }
    }
});

checkBtn.addEventListener('click', showResults);
showQuizz();