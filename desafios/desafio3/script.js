/*<!--
PROJETO TOTALMENTE ESTUDANTIL FEITO PARA FEIRA DE JOGOS DO ETE
# 
#INFORMAÇÕES UTIES: O site tem um sistema de segurança basico, utiliza meios do navegador para bloquear o acesso de algumas pagina antes da hora
#Se voce é alguem olhando o codigo fonte esse texto, não faça algo que quebre o codigo e faça voce ter vantagem no 
#ranking ou algo assim, não é legal nem justo!
#DESENVOLVIDO POR John 1 TDS "A" ESCOLA TECNICA ESTADUAL DE PALMARES
# DATA DE CRIAÇÃO: 24/05/2024
# DATA DA ULTIMA MODIFICAÇÃO: 30/05/2024
# OUTROS PROJETOS EM: https://github.com/JohnJohn081
# ▄▄▄▄▄▄▄▄▄▄▄  ▄▄▄▄▄▄▄▄▄▄▄  ▄▄▄▄▄▄▄▄▄▄▄       ▄▄▄▄▄▄▄▄▄▄▄  ▄▄▄▄▄▄▄▄▄▄   ▄▄▄▄▄▄▄▄▄▄▄ 
#▐░░░░░░░░░░░▌▐░░░░░░░░░░░▌▐░░░░░░░░░░░▌     ▐░░░░░░░░░░░▌▐░░░░░░░░░░▌ ▐░░░░░░░░░░░▌
#▐░█▀▀▀▀▀▀▀▀▀  ▀▀▀▀█░█▀▀▀▀ ▐░█▀▀▀▀▀▀▀▀▀       ▀▀▀▀█░█▀▀▀▀ ▐░█▀▀▀▀▀▀▀█░▌▐░█▀▀▀▀▀▀▀▀▀ 
#▐░▌               ▐░▌     ▐░▌                    ▐░▌     ▐░▌       ▐░▌▐░▌          
#▐░█▄▄▄▄▄▄▄▄▄      ▐░▌     ▐░█▄▄▄▄▄▄▄▄▄           ▐░▌     ▐░▌       ▐░▌▐░█▄▄▄▄▄▄▄▄▄ 
#▐░░░░░░░░░░░▌     ▐░▌     ▐░░░░░░░░░░░▌          ▐░▌     ▐░▌       ▐░▌▐░░░░░░░░░░░▌
#▐░█▀▀▀▀▀▀▀▀▀      ▐░▌     ▐░█▀▀▀▀▀▀▀▀▀           ▐░▌     ▐░▌       ▐░▌ ▀▀▀▀▀▀▀▀▀█░▌
#▐░▌               ▐░▌     ▐░▌                    ▐░▌     ▐░▌       ▐░▌          ▐░▌
#▐░█▄▄▄▄▄▄▄▄▄      ▐░▌     ▐░█▄▄▄▄▄▄▄▄▄           ▐░▌     ▐░█▄▄▄▄▄▄▄█░▌ ▄▄▄▄▄▄▄▄▄█░▌
#▐░░░░░░░░░░░▌     ▐░▌     ▐░░░░░░░░░░░▌          ▐░▌     ▐░░░░░░░░░░▌ ▐░░░░░░░░░░░▌
# ▀▀▀▀▀▀▀▀▀▀▀       ▀       ▀▀▀▀▀▀▀▀▀▀▀            ▀       ▀▀▀▀▀▀▀▀▀▀   ▀▀▀▀▀▀▀▀▀▀▀  

-->*/




const questionElement = document.getElementById('question');
const options = document.querySelectorAll('.option-btn');
const timerElement = document.getElementById('timer');
const hintElement = document.getElementById('hint');

let respondeu = false; 
let score = parseInt(localStorage.getItem('userScore')) || 0;
let desafio1Finalizado = localStorage.getItem('desafio1Finalizado') === 'true';  
let desafio2Finalizado = localStorage.getItem('desafio2Finalizado') === 'true';  
let desafio3Finalizado = localStorage.getItem('desafio3Finalizado') === 'true';  
const name = localStorage.getItem('userName');
const userClass = localStorage.getItem('turmaUser');
let timer; // Variável para armazenar o timer
let timeLeft = 60; // 1 minuto para cada pergunta
let dica = 'true';


const firebaseConfig = {
    apiKey: "AIzaSyAj449IcN89Ga0ax__Soer1-mD7VVjd7oM",
    authDomain: "ete-john.firebaseapp.com",
    projectId: "ete-john",
    storageBucket: "ete-john.appspot.com",
    messagingSenderId: "242093850786",
    appId: "1:242093850786:web:b41b6eb519a9b5668e17fb"
  };


firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

const questions = [
    {
        question: "Qual é o termo usado para descrever a capacidade de uma substância para se dissolver em outra?",
        options: ["A) Ionização", "B) Combustão", "C) Decomposição", "D) Solubilidade"],
        answer: "D",
        hint: "Pense no que acontece quando você mistura sal ou açúcar na água."
    }
];

let currentQuestionIndex = 0;

function loadQuestion() {
    respondeu = false; 
    timeLeft = 60; // Reinicia o tempo

    const currentQuestion = questions[currentQuestionIndex];
    questionElement.textContent = currentQuestion.question;

    options.forEach((option, index) => {
        option.textContent = currentQuestion.options[index];
    });
    startTimer();
}


function startTimer() {
    clearInterval(timer);
    timerElement.textContent = timeLeft;
    timer = setInterval(() => {
        timeLeft--;
        timerElement.textContent = timeLeft;
        if (timeLeft <= 0) {
            clearInterval(timer);
            checkAnswer(null);                                                     // Se o tempo acabar, trata como resposta incorreta
        }
    }, 1000);
}


function checkAnswer(answer) {
    const currentQuestion = questions[currentQuestionIndex];
    const selectedOption = document.querySelector('.option-btn:hover');
    clearInterval(timer);                                                       // Para o cronômetro quando uma resposta é verificada

    if (!respondeu) {
        respondeu = true;
        let points = Math.max(1 * (timeLeft));                     // Calcula os pontos baseados no tempo restante

        if (answer === currentQuestion.answer) {
            selectedOption.classList.add('correto');
            score += points;
        } else {
            selectedOption.classList.add('errado');
        }

        localStorage.setItem('userScore', score); 
        localStorage.setItem('desafio3Finalizado', 'true');
        addToRanking(name, userClass, score);

        setTimeout(() => {
            selectedOption.classList.remove('correct', 'wrong');
            currentQuestionIndex++;
            if (currentQuestionIndex < questions.length) {
                loadQuestion();
            } else {
                window.location.href = '/../../finalPage/home.html'; 
            }
        }, 3000);
    }
}

function addToRanking(name, userClass, score) {


    localStorage.setItem('userName', name);
    localStorage.setItem('turmaUser', userClass);

   db.collection("ranking").doc(name).set({ 
        name: name,
        class: userClass,
        score: score
    }).then((docRef) => {
        console.log("Pontuação adicionada com sucesso!");
        localStorage.setItem('desafio1Finalizado', 'false');
        localStorage.setItem('desafio2Finalizado', 'false');
        localStorage.setItem('desafio3Finalizado', 'false');
        //localStorage.setItem('userScore', '0');
        localStorage.setItem('userName', 'não modifique nada aqui, seja justo!')
        localStorage.setItem('turmaUser', 'turma Pendente')
        localStorage.setItem('acessoPag', 'false')
        
    }).catch((error) => {
        console.error("Erro ao adicionar pontuação: ", error);
    });
}    

function getHint() {
    if (dica === 'true'){
        const currentQuestion = questions[currentQuestionIndex];
        hintElement.textContent = currentQuestion.hint; // Exibe a dica
        score = (score - 5);
        localStorage.setItem('userScore', score); // Atualiza o score no localStorage      
        dica = 'false';  
    }
}

if (!desafio1Finalizado) {
    alert('Você não tem acesso a essa pergunta ainda. Clique em OK para ir para a pergunta atual.');
    window.location.href = '/desafios/desafio1/desafio1.html'; 
} else if (!desafio2Finalizado) {
    alert('Você não tem acesso a essa pergunta ainda. Clique em OK para ir para a pergunta atual.');
    window.location.href = '/desafios/desafio2/desafio2.html'; 
} else if (desafio3Finalizado) {
    alert('Essa pergunta já foi respondida. Clique em OK para ir para a próxima pergunta.');
    window.location.href = '/../../finalPage/home.html'; 
} else {
    options.forEach(option => {
        option.addEventListener('click', () => {
            if (!respondeu) { 
                checkAnswer(option.textContent.charAt(0)); 
                respondeu = true; 
            }
        });
    });

    loadQuestion();
}
