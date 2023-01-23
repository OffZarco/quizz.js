

// Quizz.html
fetch('/data2.json')
    .then(res => res.json())
    .then(quizz => { // je déclare ma fonction quizz
        // On affiche de manière aléatoire
        quizz.sort(() => Math.random() - 0.5); // fonction de comparaison (math.random entre 0 et 1)


        let placeholder = document.querySelector("#quizz_page");
        let out = "";

        // On créer une boucle en déclarant une variable data afin de répéter l'actions par le nombre de données dans le json dans la fonction quizz
        for (question of quizz) {
            out += `
            <div id="blockAnswers">
                <h2>${question['question']}</h2>
                <form class="blockQues">

                    <div class="response">
                        <label id="ques_1" class="inputLabel ques_1">
                            <input name="group1" for="ques_1" type="radio"> ${question['answers'][0]['res_a']}
                        </label>
                        <h3>Réponse A</h3>
                    </div>

                    <div class="response">
                        <label id="ques_2" class="inputLabel ques_2">
                            <input name="group1" for="ques_2" type="radio"> ${question['answers'][0]['res_b']}
                        </label>
                        <h3>Réponse B</h3>
                    </div>

                    <div class="response">
                        <label id="ques_3" class="inputLabel ques_3">
                            <input name="group1" for="ques_3" type="radio"> ${question['answers'][0]['res_c']}
                        </label>
                        <h3>Réponse C</h3>
                    </div>

                    <button class="checkBtn" id="verifBtn" data-correct="${question['correctAnswer']}">Vérifier</button>

                </form>
            </div>
            `
        }
        placeholder.innerHTML += out; // On affiche dans le html les élément de la variable out

        let checkBtns = document.querySelectorAll('.checkBtn');
        for (let btn of checkBtns) {
            btn.addEventListener("click", function (e) {
                let selectedOption = document.querySelector('input[name="group1"]:checked').id;
                if (selectedOption === e.target.dataset.correct) {
                    responseMessage.innerHTML = "Bonne réponse !";
                } else {
                    responseMessage.innerHTML = "Mauvaise réponse !";
                }
            });
        }
    });

