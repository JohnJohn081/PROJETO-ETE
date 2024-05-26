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
let respondeu = false; // Variável para verificar se a pergunta foi respondida pro cara não flodar click e fazer varios pontos
let score = parseInt(localStorage.getItem('userScore')) || 0; // pega o valor de score e passa pra INT
let desafio1Finalizado = localStorage.getItem('desafio1Finalizado') === 'true'; // Variável para verificar se o desafio 1 foi finalizado
let acessoPag = localStorage.getItem('acessoPag') // variavel com a info se o user tem acesso dado quando clica em iniciar no index.html


// metodo para carregar pergunta facilita fazer outras paginas como está e assim fazer varias perguntas sem dificuldade

const questions = [
    {
        question: "Qual é o processo pelo qual uma substância passa diretamente do estado sólido para o gasoso, sem passar pelo estado líquido?",
        options: ["A) Sublimação", "B) Fusão", "C) Evaporação", "D) Condensação"],
        answer: "A"
    }
];

let currentQuestionIndex = 0;


// quando chamada ele carrega a lista questions no seu devido lugar
function loadQuestion() {
    respondeu = false; 
    const currentQuestion = questions[currentQuestionIndex];
    questionElement.textContent = currentQuestion.question;

    options.forEach((option, index) => {
        option.textContent = currentQuestion.options[index];
    });
}

// função pra checar a pergunta se ela é correta ou não

function checkAnswer(answer) {
    const currentQuestion = questions[currentQuestionIndex];
    const selectedOption = document.querySelector('.option-btn:hover');

    if (!respondeu) { // Verifica se o usuário já respondeu ant flood
        respondeu = true; // Define respondeu como true para flood
        if (answer === currentQuestion.answer) {
            selectedOption.classList.add('correto'); // quando ele adiciona a opção selecionada para correto a CSS da classe correto é verde então o botao fica verde
            score += 1; 
        } else {
            selectedOption.classList.add('errado');
        }

        localStorage.setItem('userScore', score); // Atualiza a pontuação no LocalStorage

        setTimeout(() => {
            selectedOption.classList.remove('correct', 'wrong');
            currentQuestionIndex++;
            if (currentQuestionIndex < questions.length) {
                loadQuestion();
            } else {
                // Quando todas as perguntas são respondidas, define desafio1Finalizado como true
                localStorage.setItem('desafio1Finalizado', 'true');
                window.location.href = '/desafios/desafio2/desafio2.html';
            }
        }, 2000);
    }
}

if (acessoPag === 'true'){
        if (desafio1Finalizado) {
        alert('Essa pergunta ja foi respondida, clique em OK para ir para proxima pergunta')
        window.location.href = '/desafios/desafio2/desafio2.html'; // Redireciona para o Desafio 2 se o Desafio 1 já foi concluído
    } else {
        // Adiciona event listeners aos botões de opção
        options.forEach(option => {
            option.addEventListener('click', () => {
                if (!respondeu) { // Verifica se a pergunta foi respondida
                    checkAnswer(option.textContent.charAt(0)); // Passa a letra da opção clicada para checkAnswer
                    respondeu = true; // Define respondeu como true
                }
            });
        });

        loadQuestion();
    }
}
else{
    alert('Voce ainda não tem acesso a essa pagina! Clique em OK para ir pro seu registro!!!')
    window.location.href = '/../../index.html'
}
