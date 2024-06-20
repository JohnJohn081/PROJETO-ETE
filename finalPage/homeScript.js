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


// Função para carregar o ranking do firebase
const loadRanking = () => {
    const rankingList = document.getElementById('rankingList');
    const pontoUser = document.getElementById('pontos');
    const userNameElement = document.getElementById('userName');
    const turmaUserElement = document.getElementById('turmaUser');
    const scoreElement = document.getElementById('score');

    rankingList.innerHTML = '';
    pontoUser.innerHTML = '';

    const userScore = localStorage.getItem('userScore');
    const userName = localStorage.getItem('userName');
    const turmaUser = localStorage.getItem('turmaUser');

    // Atualiza as informações na lista 'ul'
    userNameElement.textContent = userName.length > 23 ? userName.substring(0, 23) + '...' : userName;
    turmaUserElement.textContent = turmaUser;
    scoreElement.textContent = userScore;
    pontoUser.innerHTML = `<h2> Parabéns, você conseguiu ${userScore} pontos de 15!</h2>`; // cria um h2 com o numero atual do Score do user 
    

    db.collection("ranking")
        .orderBy("score", "desc")
        .limit(10)
        .get()
        .then((querySnapshot) => {
            querySnapshot.forEach((doc, index) => {
                let data = doc.data();
                let name = data.name.length > 15 ? data.name.substring(0, 16) + '...' : data.name;
                rankingList.innerHTML += `<h3> ${name} - ${data.class} | ${data.score}/15 Pontos</h3>`;
            });
        })
        .catch((error) => {
            console.error("Erro ao obter documentos: ", error);
        });
        console.log("Status resetado com sucesso!");
};




window.onload = loadRanking;
