/*<!--
PROJETO TOTALMENTE ESTUDANTIL FEITO PARA FEIRA DE JOGOS DO ETE
# 
#INFORMAÇÕES UTIES: O site tem um sistema de segurança basico, utiliza meios do navegador para bloquear o acesso de algumas pagina antes da hora
#Se voce é alguem olhando o codigo fonte esse texto, não faça algo que quebre o codigo e faça voce ter vantagem no 
#ranking ou algo assim, não é legal nem justo!
#DESENVOLVIDO POR John 1 TDS "A" ESCOLA TECNICA ESTADUAL DE PALMARES
# DATA DE CRIAÇÃO: 24/05/2024
# DATA DA ULTIMA MODIFICAÇÃO: 26/05/2024
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
let dica = 'true';
let respondeu = false; 
let score = parseInt(localStorage.getItem('userScore')) || 0;
let desafio2Finalizado = localStorage.getItem('desafio2Finalizado') === 'true'; 
let desafio1Finalizado = localStorage.getItem('desafio1Finalizado') === 'true'; 
let timer; // Variável para armazenar o timer
let timeLeft = 60; // 1 minuto para cada pergunta

const questions = [
    {
        question: "Qual é a fórmula química da água?",
        options: ["A) CO2", "B) NaCl", "C) H2O", "D) CH4"],
        answer: "C",
        hint: "É composta por dois elementos químicos."
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

// Função para iniciar e atualizar o cronômetro a cada segundo
function startTimer() {
    clearInterval(timer);
    timerElement.textContent = timeLeft;
    timer = setInterval(() => {
        timeLeft--;
        timerElement.textContent = timeLeft;
        if (timeLeft <= 0) {
            clearInterval(timer);
            checkAnswer(null);                                                      // Se o tempo acabar, trata como resposta incorreta
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
            score += points;                                                     // Adiciona pontos se a resposta estiver correta
        } else {
            selectedOption.classList.add('errado');
        }

        localStorage.setItem('userScore', score); 

        setTimeout(() => {
            selectedOption.classList.remove('correct', 'wrong');
            currentQuestionIndex++;
            if (currentQuestionIndex < questions.length) {
                loadQuestion();
            } else {
                
                localStorage.setItem('desafio2Finalizado', 'true');
                window.location.href = '/desafios/desafio3/desafio3.html'; 
            }
        }, 3000);
    }
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
} else if (desafio2Finalizado) {
    alert('Essa pergunta já foi respondida. Clique em OK para ir para a próxima pergunta.');
    window.location.href = '/desafios/desafio3/desafio3.html'; 
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
