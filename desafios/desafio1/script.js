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
let respondeu = false; // Variável para verificar se a pergunta foi respondida pro cara não flodar click e fazer varios pontos
let score = parseInt(localStorage.getItem('userScore')) || 0; // pega o valor de score e passa pra INT
let desafio1Finalizado = localStorage.getItem('desafio1Finalizado') === 'true'; // Variável para verificar se o desafio 1 foi finalizado
let acessoPag = localStorage.getItem('acessoPag'); // variavel com a info se o user tem acesso dado quando clica em iniciar no index.html
let currentQuestionIndex = 0; // Índice da questão atual
let timer; // Variável para armazenar o timer
let timeLeft = 60; // 1 minuto para cada pergunta
let dica = 'true';

// Lista de perguntas
const questions = [
    {
        question: "Qual é o processo pelo qual uma substância passa diretamente do estado sólido para o gasoso, sem passar pelo estado líquido?",
        options: ["A) Sublimação", "B) Fusão", "C) Evaporação", "D) Condensação"],
        answer: "A",
        hint: "Este processo é comum em substâncias como o naftaleno, usado em bolas de naftalina."

    }
];

// Função para carregar uma nova pergunta
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
            checkAnswer(null); // Se o tempo acabar, trata como resposta incorreta
        }
    }, 1000);
}

// Função para verificar a resposta
function checkAnswer(answer) {
    const currentQuestion = questions[currentQuestionIndex];
    const selectedOption = document.querySelector('.option-btn:hover');
    clearInterval(timer); // Para o cronômetro quando uma resposta é verificada

    if (!respondeu) {
        respondeu = true;
        let points = Math.max(1 * (timeLeft));                     // Calcula os pontos baseados no tempo restante

        if (answer === currentQuestion.answer) {
            selectedOption.classList.add('correto');
            score += points; // Adiciona pontos se a resposta estiver correta
        } else {
            selectedOption.classList.add('errado');
        }

        localStorage.setItem('userScore', score);

        setTimeout(() => {
            selectedOption.classList.remove('correto', 'errado');
            currentQuestionIndex++;
            if (currentQuestionIndex < questions.length) {
                loadQuestion();
            } else {
                localStorage.setItem('desafio1Finalizado', 'true');
                window.location.href = '/desafios/desafio2/desafio2.html';
            }
        }, 1000);
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
// Inicialização do quiz
if (acessoPag === 'true') {
    if (desafio1Finalizado) {
        alert('Essa pergunta já foi respondida, clique em OK para ir para a próxima pergunta');
        window.location.href = '/desafios/desafio2/desafio2.html';
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
} else {
    alert('Você ainda não tem acesso a essa página! Clique em OK para ir para seu registro!!!');
    window.location.href = '/../../index.html';
}
