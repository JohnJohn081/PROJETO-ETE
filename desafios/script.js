/*<!--
PROJETO TOTALMENTE ESTUDANTIL FEITO PARA FEIRA DE JOGOS DO ETE
# 
#INFORMAÇÕES UTIES: O site tem um sistema de segurança basico, utiliza meios do navegador para bloquear o acesso de algumas pagina antes da hora
#Se voce é alguem olhando o codigo fonte esse texto, não faça algo que quebre o codigo e faça voce ter vantagem no 
#ranking ou algo assim, não é legal nem justo!
#DESENVOLVIDO POR John 1 TDS "A" ESCOLA TECNICA ESTADUAL DE PALMARES
# DATA DE CRIAÇÃO: 24/05/2024
# DATA DA ULTIMA MODIFICAÇÃO: 08/06/2024
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
const name = localStorage.getItem('userName');
const userClass = localStorage.getItem('turmaUser');
let acessoPag = localStorage.getItem('acessoPag', 'true') === 'true'; // dá o acesso para pagina1
let respondeu = false; 
let score = parseInt(localStorage.getItem('userScore')) || 0;
let desafioFinalizado = localStorage.getItem('desafioFinalizado') === 'true'; 
let timer; // Variável para armazenar o timer
let timeLeft = 60; // 1 minuto para cada pergunta

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
        question: "Qual é a principal fonte de energia para os seres vivos?",
        options: ["A) Carboidratos", "B) Lipídios", "C) Proteínas", "D) Vitaminas"],
        answer: "A",
        hint: "É um macronutriente conhecido como açúcar."
    },
    {
        question: "Quem propôs a teoria da evolução das espécies?",
        options: ["A) Isaac Newton", "B) Albert Einstein", "C) Charles Darwin", "D) Galileo Galilei"],
        answer: "C",
        hint: "Foi um naturalista britânico."
    },
    {
        question: "O que é fotossíntese?",
        options: ["A) Processo de respiração celular", "B) Formação de proteínas", "C) Quebra de açúcares", "D) Transformação de luz em energia química"],
        answer: "D",
        hint: "É um processo realizado pelas plantas."
    },
    {
        question: "O que é uma célula?",
        options: ["A) A menor unidade de um átomo", "B) A menor unidade funcional dos seres vivos", "C) Uma estrutura que apenas plantas possuem", "D) Um conjunto de tecidos"],
        answer: "B",
        hint: "É considerada a unidade básica da vida."
    },
    {
        question: "O que é um ecossistema?",
        options: ["A) Um grupo de células", "B) Conjunto de seres vivos e o ambiente onde vivem", "C) Apenas os organismos de uma determinada espécie", "D) A união de diferentes órgãos"],
        answer: "B",
        hint: "Inclui tanto os organismos vivos quanto os componentes não vivos."
    },
    {
        question: "O que é a teoria da biogênese?",
        options: ["A) Vida surge de matéria inanimada", "B) Vida surge de outros seres vivos", "C) Vida surgiu em condições extremas", "D) Vida é resultado de intervenção divina"],
        answer: "B",
        hint: "Esta teoria foi comprovada por Louis Pasteur."
    },
    {
        question: "O que é a teoria da abiogênese?",
        options: ["A) Vida surge de outros seres vivos", "B) Vida é uma criação espontânea de matéria inanimada", "C) Vida evolui de formas simples para complexas", "D) Vida é um fenômeno recente"],
        answer: "B",
        hint: "Também é conhecida como geração espontânea."
    },
    {
        question: "Como eram as condições da Terra primitiva?",
        options: ["A) Atmosfera rica em oxigênio", "B) Presença de organismos multicelulares", "C) Alta atividade vulcânica e raios", "D) Clima frio e estável"],
        answer: "C",
        hint: "As condições eram bastante inóspitas e instáveis."
    },
    {
        question: "Qual é a principal ideia da teoria de Oparin e Haldane?",
        options: ["A) Vida surgiu de outro planeta", "B) Vida surgiu de compostos orgânicos simples em condições primitivas", "C) Vida sempre existiu", "D) Vida surgiu pela intervenção de seres superiores"],
        answer: "B",
        hint: "A teoria sugere a formação de moléculas orgânicas complexas a partir de simples."
    },
    {
        question: "Qual experimento ajudou a comprovar a teoria da biogênese?",
        options: ["A) Experimento de Redi", "B) Experimento de Miller-Urey", "C) Experimento de Pasteur", "D) Experimento de Spallanzani"],
        answer: "C",
        hint: "Este experimento utilizou frascos de pescoço de cisne."
    },
    {
        question: "Qual foi o principal resultado do experimento de Miller-Urey?",
        options: ["A) Prova da biogênese", "B) Criação de vida a partir de matéria inanimada", "C) Formação de aminoácidos a partir de gases primitivos", "D) Demonstrar a presença de oxigênio na Terra primitiva"],
        answer: "C",
        hint: "Este experimento simulou as condições da Terra primitiva."
    }
    
    
];

let currentQuestionIndex = 0;

function loadQuestion() {
    respondeu = false; 
    timeLeft = 60; // Reinicia o tempo
    const currentQuestion = questions[currentQuestionIndex];
    questionElement.textContent = currentQuestion.question;
    hintElement.textContent = "";
    

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

function checkAnswer(answer) {
    const currentQuestion = questions[currentQuestionIndex];
    const selectedOption = document.querySelector('.option-btn:hover');
    clearInterval(timer); // Para o cronômetro quando uma resposta é verificada

    if (!respondeu) { 
        respondeu = true; 
        let points = Math.max(1 * (timeLeft)); // Calcula os pontos baseados no tempo restante

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
                localStorage.setItem('acessoPag', 'false');
                addToRanking(name, userClass, score);
                mostrarNotificacao("Pontuação registrada com Sucesso!");
            }
        }, 1000);
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
        //localStorage.setItem('userScore', '0');
        localStorage.setItem('userName', 'não modifique nada aqui, seja justo!')
        localStorage.setItem('turmaUser', 'turma Pendente')
        localStorage.setItem('acessoPag', 'false')
        window.location.href = '/../finalPage/home.html'; 
    }).catch((error) => {
        console.error("Erro ao adicionar pontuação: ", error);

    });
}    

function mostrarNotificacao(mensagem) {
    const notificacao = document.getElementById('notification');
    notificacao.innerText = mensagem;
    notificacao.className = 'notification show';
    setTimeout(() => {
        notificacao.className = notificacao.className.replace('show', '');
    }, 3000);
}



function getHint() {
        const currentQuestion = questions[currentQuestionIndex];
        hintElement.textContent = currentQuestion.hint; // Exibe a dica
        score -= 40;
        localStorage.setItem('userScore', score); // Atualiza o score no localStorage      
}

if (!acessoPag) {
    alert('Usuario já respondeu a pergunta, clique em OK para iniciar o quiz');
    window.location.href = '/../../index.html'; 
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