// Lista de palavras 

let palavraEDicas = [
    { palavra: "NUVEM", dica: "Armazena dados e serviços pela internet." },
    { palavra: "ROBOT", dica: "Máquina programada para executar tarefas." },
    { palavra: "LOGIN", dica: "Acesso com usuário e senha." },
    { palavra: "CLOUD", dica: "Termo em inglês para armazenamento online." },
    { palavra: "PIXEL", dica: "Menor unidade de uma imagem digital." },
    { palavra: "LINUX", dica: "Sistema operacional de código aberto." },
  
]


//Variáveis globais 

let faseAtual = 0; // começa na primeira palavra da lista
let palavraSecreta = palavraEDicas[faseAtual].palavra;  // Pega a palavra da fase
let tentativas = 0; // começa sem tentativas
let maxTentativas = 10; // Máximo de tentativas permitidas
let usadas = [];

function confirmar() {
    let input = document.getElementById('palpite'); // Pega a letra que o jogador digitou
    let letra = input.value.toUpperCase(); // Converte para maiúscula (ex: "a" vira "A")

    input.value = ''; //Limpa o input para o próximo palpite

    //Validações
    if(letra === '' || usadas.includes(letra)) return; // Se estiver vazio ou a letra já foi usada, não faz nada

    usadas.push(letra); // Adiciona a letra na lista de usadas
    tentativas++; //Soma mais uma tentativa

    //Atualiza o número de tentativas na tela 
    document.getElementById('tentativas').innerHTML = `<p><span> ${tentativas}</span> de ${maxTentativas} tentativas </p>`;

    //Atualizar as letras usadas na tela
    document.getElementById('usadas').innerHTML = usadas.join(' ');

    // Atualiza a dica
    atualizarDica();

    // Atualiza os cards das letras
    atualizarCards();

    // Verifica se o jogador ganhou
    verificarVitoria();

    atualizarLetrasUsadas(); 

    // Verifica se o jogador perdeu
    if(tentativas >= maxTentativas) {
        Swal.fire({
            title: 'Que pena!',
            text: `Você perdeu! A palavra era: ${palavraSecreta}`,
            icon: 'error',
            confirmButtonText: 'Tentar Outra'
          }).then(() => {
            resetarJogo();
          });
    }
}

function verificarVitoria() {
  let venceu = palavraSecreta.split('').every(letra => usadas.includes(letra));
  if(venceu) {
   
    Swal.fire({
        title: 'Parabéns!',
        text: 'Você acertou a palavra!',
        icon: 'success',
        confirmButtonText: 'Próxima Palavra'
      }).then(() => {
       avancarParaProximaPalavra();
      });
    

    //Avança para a próxima palavra 
    faseAtual = (faseAtual + 1) % palavraEDicas.length;
    palavraSecreta = palavraEDicas[faseAtual].palavra;

    resetarJogo();
    atualizarDica();
  }
}

function atualizarCards() {
    let cards = document.querySelectorAll('.card');
    palavraSecreta.split('').forEach((letra, index) => {
        if(usadas.includes(letra)) {
            cards[index].textContent = letra;
        }
    });
}

function atualizarDica() {
   document.getElementById('dica').textContent = palavraEDicas[faseAtual].dica;
}


function resetarJogo() {
    tentativas = 0;
    usadas = [];

    // Atualiza as tentativas na tela
    document.getElementById('tentativas').innerHTML = `<p><span> ${tentativas}</span> de ${maxTentativas} tentativas </p>`;

    document.getElementById('usadas').textContent = '';

    criarLetras();
}

function criarLetras() {
    let container = document.getElementById('palavra');
    container.innerHTML = ''; //Limpa tudo primeiro

    for(let i = 0; i < palavraSecreta.length; i++) {
        let div = document.createElement('div');
        div.classList.add('card');
        container.appendChild(div);
    }
}

function atualizarLetrasUsadas() {
 let usadasContainer = document.getElementById('usadas');
 usadasContainer.innerHTML = '';

 usadas.forEach(letra => {
    let div = document.createElement('div');
    div.classList.add('usadas');
    div.textContent = letra;
    usadasContainer.appendChild(div);
 });
}
