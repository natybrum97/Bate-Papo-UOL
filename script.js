function fornecerNome (){
const desaparecediv = document.querySelector(".nome1")
if (desaparecediv.value != ""){
nome = document.querySelector(".maior");
nome.classList.add("display");
} else {
   nome = document.querySelector(".maior");
   nome.classList.remove("display");
}
}

function sidebarAparece () {
   const aparece = document.querySelector(".transparencia");
   aparece.classList.toggle("display")

   const sidebar1 = document.querySelector(".sidebar")
   sidebar1.style.right = "0px";
}

function voltarMensagens () {
   const voltar = document.querySelector(".transparencia");
   voltar.classList.add("display");

   const sidebar2 = document.querySelector(".sidebar")
   sidebar2.style.right = "-259px";
}
function selecionarVisibilidade(elemento) {
    const publico = document.querySelector('.publico');
    const reservado = document.querySelector('.reservado');
    const checkIcons = document.querySelectorAll('.check');
   const checkIconPublico = publico.querySelector('.check');
   const checkIconReservado = reservado.querySelector('.check');
  
    // Remove a classe 'selecionado' de todos os ícones de check
   checkIcons.forEach(icon => icon.classList.remove('selecionado'));
  
    // Adiciona a classe 'selecionado' ao ícone de check do elemento clicado
    console.log(event)
   if (elemento.classList.contains('publico')) {
     checkIconPublico.classList.add('selecionado');
   } else {
     checkIconReservado.classList.add('selecionado');
   }
 }

axios.defaults.headers.common['Authorization'] = 'zucvAcqdwYADeqdgfJUPWKEv';
var ListaDeMensagens;
var nome = "";

function adicionarUsuario() {
    let qualNome = prompt("Digite seu nome");

    const novoUsuario = {
        name: qualNome
    };
    nome = qualNome;
    console.log(novoUsuario)
    const promessa = axios.post('https://mock-api.driven.com.br/api/vm/uol/participants', novoUsuario);
    promessa.then(receberResposta);
    promessa.catch(deuErro);
}

adicionarUsuario();

function receberResposta() {
    console.log(`O usuário foi salvo com sucesso!`);
    const promessa = axios.get('https://mock-api.driven.com.br/api/vm/uol/messages');
    promessa.then((Resposta) => {
    ListaDeMensagens = Resposta.data;
    processarResposta(Resposta)
    });
}

function deuErro(erro) {
    alert("Conecte-se novamente com outro nome")
    console.error('Ocorreu um erro ao enviar o usuário:', erro);
}

function processarResposta(resposta) {
    console.log("Voltou a resposta"); // Esse console.log disparará depois
    console.log(resposta.data);
    renderizarMensagens()
    
}

function mandarStatus() {
    const novoUsuario = {
        name: nome
    };
    console.log(novoUsuario)
    const promessa = axios.post('https://mock-api.driven.com.br/api/vm/uol/status', novoUsuario);
    promessa.then(() => { console.log("Mantendo a conexão") })
}

console.log("Enviou a requisição"); // Esse console.log disparará primeiro

function renderizarMensagens() {

    // pegar a lista ul no html
    const ulmensagens = document.querySelector('.corpo .mensagens');
    ulmensagens.innerHTML = '';

    // percorrer a minha lista de mensagens
    for (let i = 0; i < ListaDeMensagens.length; i++) {
        // pegar mensagem por mensagem

        // criar um elemento <li>] e adicionar no meu elemento <ul>
        if (ListaDeMensagens[i].type === "status") {
            ulmensagens.innerHTML += `
            <li data-test="message" class="messenger">
            <div class="messenger1">
            <div class="messenger2">(${ListaDeMensagens[i].time})</div>
            <div class="messenger3">${ListaDeMensagens[i].from}</div>
            <div class="messenger4">${ListaDeMensagens[i].text}</div>
            </div>
            </li>
        `;
        } else if (ListaDeMensagens[i].type === "message") {
            ulmensagens.innerHTML += `
        <li data-test="message" class="messenger6">
        <div class="messenger7">
        <div class="messenger2">(${ListaDeMensagens[i].time})</div>
        <div class="messenger3">${ListaDeMensagens[i].from}</div>
        <p>para</p>
        <div class="messenger5">${ListaDeMensagens[i].to}:</div>
        <div class="messenger4">${ListaDeMensagens[i].text}</div>
        </div>
        </li> 
        `;
        } else {
            ulmensagens.innerHTML += `
        <li data-test="message" class="messenger8">
        <div class="messenger9">
        <div class="messenger2">(${ListaDeMensagens[i].time})</div>
        <div class="messenger3">${ListaDeMensagens[i].from}</div>
        <p>reservadamente para</p>
        <div class="messenger3">${ListaDeMensagens[i].to}:</div>
        <div class="messenger4">${ListaDeMensagens[i].text}</div>
        </div>
        </li> 
        `;
        }
    }
}

function escreverMensagem() {

    // pegar os dados que foram digitados pelo usuario nos inputs e textareas
    const mensagem = document.querySelector('.escrever');

    // criar um novo objeto com os dados da receita

    const mensagemEnviada = {
        from: nome,
        to: "Todos",
        text: mensagem.value,
        type: "message" // ou "private_message" para o bônus
    }
    let promessa = axios.post('https://mock-api.driven.com.br/api/vm/uol/messages', mensagemEnviada)
    promessa.then(() => {
        receberResposta()
        mensagem.value = "";
    })
    promessa.catch(() => {
        alert("Você está desconectado! Conecte-se novamente.")
        window.location.reload()});
}
    setInterval(mandarStatus,5000)
    setInterval(receberResposta, 3000)