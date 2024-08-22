/*<!--
PROJETO TOTALMENTE ESTUDANTIL FEITO PARA FEIRA DE JOGOS DO ETE
# 
#Se voce é alguem olhando o codigo fonte, não faça algo que quebre o codigo e faça voce ter vantagem no 
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


// Configurações do Firebase, necessárias para inicializar o app e conectar ao Firestore
const firebaseConfig = {
    apiKey: "AIzaSyAj449IcN89Ga0ax__Soer1-mD7VVjd7oM", 
    authDomain: "ete-john.firebaseapp.com", 
    projectId: "ete-john", 
    storageBucket: "ete-john.appspot.com", 
    messagingSenderId: "242093850786", 
    appId: "1:242093850786:web:b41b6eb519a9b5668e17fb" 
};

// Inicializa o Firebase com a configuração fornecida
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore(); // Cria uma referência ao Firestore (banco de dados NoSQL do Firebase)

// Função para carregar o ranking do Firebase
const loadRanking = () => {
    // Obtém referências aos elementos do DOM onde o ranking e os pontos serão exibidos
    const rankingList = document.getElementById('rankingList');
    const pontoUser = document.getElementById('pontos');
    const userNameElement = document.getElementById('userName');
    const turmaUserElement = document.getElementById('turmaUser');
    const scoreElement = document.getElementById('score');

    // Limpa o conteúdo dos elementos antes de carregar novos dados
    rankingList.innerHTML = '';
    pontoUser.innerHTML = '';

    // Recupera as informações do usuário armazenadas no localStorage
    const userScore = localStorage.getItem('userScore');
    const userName = localStorage.getItem('userName');
    const turmaUser = localStorage.getItem('turmaUser');

    // Atualiza as informações do usuário na interface, truncando o nome se for muito longo
    userNameElement.textContent = userName.length > 23 ? userName.substring(0, 23) + '...' : userName;
    turmaUserElement.textContent = turmaUser;
    scoreElement.textContent = userScore;
    
    // Exibe a pontuação do usuário com uma mensagem de parabéns
    pontoUser.innerHTML = `<h2> Parabéns, você conseguiu ${userScore} pontos de 15!</h2>`; 

    // Consulta o ranking no Firestore, ordenando por pontuação e limitando a 10 resultados
    db.collection("ranking")
        .orderBy("score", "desc")
        .limit(10)
        .get()
        .then((querySnapshot) => {
            // Para cada documento no ranking, cria um elemento de lista e o adiciona ao rankingList
            querySnapshot.forEach((doc, index) => {
                let data = doc.data();
                let name = data.name.length > 15 ? data.name.substring(0, 16) + '...' : data.name;
                rankingList.innerHTML += `<h3> ${name} - ${data.class} | ${data.score}/15 Pontos</h3>`;
            });
        })
        .catch((error) => {
            // Exibe um erro no console se houver problemas ao recuperar os documentos
            console.error("Erro ao obter documentos: ", error);
        });

    console.log("Status resetado com sucesso!"); // Log no console para indicar que a função foi executada
};

// Carrega o ranking quando a página é carregada
window.onload 