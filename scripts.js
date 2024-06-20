/*<!--
PROJETO TOTALMENTE ESTUDANTIL FEITO PARA FEIRA DE JOGOS DO ETE
# 
#Se voce é alguem olhando o codigo fonte, não faça algo que quebre o codigo e faça voce ter vantagem no 
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


// Config do banco de Dados que armazena o Ranking
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

// Função principal para adicionar ao ranking
function salvaDataUser(name, userClass) {
    localStorage.setItem('userScore', 0); 
    localStorage.setItem('userName', name);
    localStorage.setItem('turmaUser', userClass);
}

// Função para carregar o ranking do Firebase
const loadRanking = () => {
    const rankingList = document.getElementById('rankingList');
    rankingList.innerHTML = '';

    db.collection("ranking")
        .orderBy("score", "desc")
        .limit(10) // Limite do ranking até o 10º lugar
        .get()
        .then((querySnapshot) => {
            querySnapshot.forEach((doc, index) => {
                let data = doc.data();
                let name = data.name.length > 15 ? data.name.substring(0, 16) + '...' : data.name;
                rankingList.innerHTML += `<h3> ${name} - ${data.class} | ${data.score}/15 Pontos</h3>`;
                localStorage.setItem('userName', 'não modifique nada aqui, seja justo!')
                localStorage.setItem('turmaUser', 'turma Pendente')
                localStorage.setItem('acessoPag', 'false')
            });
        })
        .catch((error) => {
            console.error("Erro ao obter documentos: ", error);
        });
};

// Adiciona um eventListener no botão submitBtn
document.getElementById('submitBtn').addEventListener('click', (e) => {
    e.preventDefault();

    let name = document.getElementById('name').value.trim(); // Remove espaços em branco nas extremidades
    const userClass = document.getElementById('class').value;

    console.log('Nome:', name);
    console.log('Classe:', userClass);
    if (name === "") {
        name = "aluno sem nome1";
        console.log('Nome vazio ou espaço, definindo como:', name);
    }
    salvaDataUser(name, userClass); // Chama a função com os parâmetros atualizados
    localStorage.setItem('acessoPag', 'true'); // Dá o acesso para a página 1

    setTimeout(() => {
        window.location.href = '/desafios/desafios.html';
    }, 1000);
});

// Carrega o ranking quando a página é carregada
window.onload = loadRanking;
