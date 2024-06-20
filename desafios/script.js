/*<!--
PROJETO TOTALMENTE ESTUDANTIL FEITO PARA FEIRA DE JOGOS DO ETE
# 
#Se voce é alguem olhando o codigo fonte, não faça algo que quebre o codigo e faça voce ter vantagem no 
#ranking ou algo assim, não é legal nem justo!
#DESENVOLVIDO POR John 1 TDS "A" ESCOLA TECNICA ESTADUAL DE PALMARES
# DATA DE CRIAÇÃO: 24/05/2024
# DATA DA ULTIMA MODIFICAÇÃO: 09/06/2024
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
let timer; // Variável para armazenar o timer
let timeLeft = 60; // 1 minuto para cada pergunta
let dicas = 3; // quantidade de dicas
let usouDica = 'false'; // variavel utilizado na função getHint(Dica)

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


// Respostas do quiz e o sistema que carrega ele, facilmente acessado pelo Aluno caso tenha conhecimento necessario para tal ato
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
        options: ["A) Vida surge de matéria inanimada", "B) Vida surgiu em condições extremas ", "C) Vida surge de outros seres vivos", "D) Vida é resultado de intervenção divina"],
        answer: "C",
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
        options: ["A) Alta atividade vulcânica e raios", "B) Presença de organismos multicelulares", "C) Atmosfera rica em oxigênio", "D) Clima frio e estável"],
        answer: "A",
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
        options: ["A) Experimento de Redi", "B) Experimento de Miller-Urey", "C) Experimento de Spallanzani", "D) Experimento de Pasteur"],
        answer: "D",
        hint: "Este experimento utilizou frascos de pescoço de cisne."
    },
    {
        question: "Qual foi o principal resultado do experimento de Miller-Urey?",
        options: ["A) Formação de aminoácidos a partir de gases primitivos", "B) Criação de vida a partir de matéria inanimada", "C) Prova da biogênese", "D) Demonstrar a presença de oxigênio na Terra primitiva"],
        answer: "A",
        hint: "Este experimento simulou as condições da Terra primitiva."
    },
    {
        question: "Qual é o papel do DNA?",
        options: ["A) Catalisar reações químicas", "B) Transportar oxigênio", "C) Armazenar informação genética", "D) Regular a pressão sanguínea"],
        answer: "C",
        hint: "Ele contém as instruções genéticas usadas no desenvolvimento e funcionamento de todos os organismos vivos."
    },
    {
        question: "Qual é o principal componente da parede celular das plantas?",
        options: ["A) Celulose", "B) Quitina", "C) Glicogênio", "D) Amido"],
        answer: "A",
        hint: "É um polissacarídeo que confere rigidez à parede celular."
    },
    {
        question: "O que propõe a teoria endossimbiótica?",
        options: ["A) Evolução de órgãos complexos a partir de simples", "B) Origem da vida a partir de compostos orgânicos", "C) Origem das células eucarióticas a partir de procarióticas", "D) Evolução das espécies por seleção natural"],
        answer: "C",
        hint: "Sugere que organelas como mitocôndrias e cloroplastos eram organismos independentes."
    },
    {
        question: "O que é uma mutação genética?",
        options: ["A) Um tipo de seleção natural", "B) Uma mudança na sequência de DNA", "C) Um processo de divisão celular", "D) Um mecanismo de defesa imunológica"],
        answer: "B",
        hint: "Pode ocorrer de forma espontânea ou ser induzida por fatores externos."
    }
    
    
];

let currentQuestionIndex = 0;

// Função que carrega a proxima pergunta
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
            setTimeout(() => {
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
    }, 1000);
}

// função que verifica se a resposta é certa ou não
function checkAnswer(answer) {
    const currentQuestion = questions[currentQuestionIndex];
    const selectedOption = document.querySelector('.option-btn:hover');
    clearInterval(timer); // Para o cronômetro quando uma resposta é verificada

    if (!respondeu) { 
        respondeu = true; 

        if (answer === currentQuestion.answer) {
            selectedOption.classList.add('correto');
            score += 1; // Adiciona pontos se a resposta estiver correta
            usouDica = 'false';
        } else {
            selectedOption.classList.add('errado');
            usouDica = 'false';
        }

        localStorage.setItem('userScore', score); 

        setTimeout(() => {
            selectedOption.classList.remove('correto', 'errado');
            currentQuestionIndex++;
            if (currentQuestionIndex < questions.length) {
                loadQuestion(); // chama a função que carrega a proxima pergunta
                mostrarNotificacao(currentQuestionIndex + "/15")                
            } else {
                localStorage.setItem('acessoPag', 'false');
                addToRanking(name, userClass, score);
                mostrarNotificacao("Pontuação registrada com Sucesso!");
            }
        }, 1000);
    }
}

// não utilize "/" dentro do seu userName pois isso vai causar um erro de document no firebase!
// função pra adicionar o User e seu Score na firebase. 
function addToRanking(name, userClass, score) {
    localStorage.setItem('userName', name);
    localStorage.setItem('turmaUser', userClass);
   db.collection("ranking").doc(name).set({ 
        name: name,
        class: userClass,
        score: score
    }).then((docRef) => {
        console.log("Pontuação adicionada com sucesso!");

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


// função para dicas ()
function getHint() {
    if (usouDica === 'false'){
         if (dicas > 0){
            const currentQuestion = questions[currentQuestionIndex];
            hintElement.textContent = currentQuestion.hint; // Exibe a dica
            usouDica = 'true'; // variavel pra ele não flodar dica e perder todas as dicas
            dicas -= 1; // variavel dica sendo modificada para o valor atual
            mostrarNotificacao('Dicas' + dicas + '/3') 
            localStorage.setItem('userScore', score); // Atualiza o score no localStorage      
        }
        else{
            mostrarNotificacao("Voce já utilizou todas as dicas");
        }
    }
    else{
        console.log('voce ja utilizou dica');
    }
}


// verificação basica verificar acesso que só é consedido após o usuario clicar no botão iniciar submitBtn
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

window.onload = localStorage.setItem('userScore', 0), score = 0; // Atualiza o score no localStorage     