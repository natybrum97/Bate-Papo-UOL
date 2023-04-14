//function fornecerNome (){
//const desaparecediv = document.querySelector(".nome1")
//if (desaparecediv.value != ""){
//nome = document.querySelector(".maior");
//nome.classList.add("display");
//} else {
//    nome = document.querySelector(".maior");
//    nome.classList.remove("display");
//}
//}

//function sidebarAparece () {
//    const aparece = document.querySelector(".transparencia");
//    aparece.classList.toggle("display")

//    const sidebar1 = document.querySelector(".sidebar")
//    sidebar1.style.right = "0px";
//}

//function voltarMensagens () {
//    const voltar = document.querySelector(".transparencia");
//    voltar.classList.add("display");

//    const sidebar2 = document.querySelector(".sidebar")
//    sidebar2.style.right = "-259px";
//}
//function selecionarVisibilidade(event) {
//    const publico = document.querySelector('.publico');
//    const reservado = document.querySelector('.reservado');
//    const checkIcons = document.querySelectorAll('.check');
//    const checkIconPublico = publico.querySelector('.check');
//    const checkIconReservado = reservado.querySelector('.check');
  
    // Remove a classe 'selecionado' de todos os ícones de check
//    checkIcons.forEach(icon => icon.classList.remove('selecionado'));
  
    // Adiciona a classe 'selecionado' ao ícone de check do elemento clicado
//    if (event.target.parentNode.classList.contains('publico')) {
//      checkIconPublico.classList.add('selecionado');
//    } else {
//      checkIconReservado.classList.add('selecionado');
//    }
//  }
  
  axios.defaults.headers.common['Authorization'] = 'zucvAcqdwYADeqdgfJUPWKEv';
  let ListaDeMensagens;
  
  function adicionarUsuario() {
    let qualNome = prompt("Digite seu nome");
  
    const novoUsuario = {
      name: qualNome
    };
    console.log(novoUsuario)
    const promessa = axios.post('https://mock-api.driven.com.br/api/vm/uol/participants', novoUsuario);
    promessa.then(receberResposta);
    promessa.catch(deuErro);
  }

  adicionarUsuario();
  
  function receberResposta(resposta) {
    console.log(`O usuário foi salvo com sucesso!`);
    console.log(resposta);
    const promessa = axios.get('https://mock-api.driven.com.br/api/vm/uol/messages');
  promessa.then(processarResposta);
  }
  
  function deuErro(erro) {
    console.error('Ocorreu um erro ao enviar o usuário:', erro);
  }

function processarResposta(resposta) {
	console.log("Voltou a resposta"); // Esse console.log disparará depois
    console.log(resposta.data);
    renderizarMensagens(resposta.data)
}

console.log("Enviou a requisição"); // Esse console.log disparará primeiro

function renderizarMensagens(ListaDeMensagens){

    // pegar a lista ul no html
    const ulmensagens = document.querySelector('.corpo .mensagens');
    ulmensagens.innerHTML = '';

    // percorrer a minha lista de mensagens
    for( let i = 0; i < ListaDeMensagens.length; i++){
        // pegar mensagem por mensagem
        let mensagem = ListaDeMensagens[i];
        
        // criar um elemento <li>] e adicionar no meu elemento <ul>
        if (ListaDeMensagens[i].type === "status"){
        ulmensagens.innerHTML += `
            <li data-test="message" class="messenger">
            <div data-test="message" class="messenger1">
            <div data-test="message" class="messenger2">(${ListaDeMensagens[i].time})</div>
            <div data-test="message" class="messenger3">${ListaDeMensagens[i].from}</div>
            <div data-test="message" class="messenger4">${ListaDeMensagens[i].text}</div>
            </div>
            </li>
        `;
    } else if (ListaDeMensagens[i].type === "message"){
        ulmensagens.innerHTML += `
        <li data-test="message" class="messenger6">
        <div data-test="message" class="messenger7">
        <div data-test="message" class="messenger2">(${ListaDeMensagens[i].time})</div>
        <div data-test="message" class="messenger3">${ListaDeMensagens[i].from}</div>
        <p data-test="message">para</p>
        <div data-test="message" class="messenger5">${ListaDeMensagens[i].to}:</div>
        <div data-test="message" class="messenger4">${ListaDeMensagens[i].text}</div>
        </div>
        </li> 
        `;
    } else {
        ulmensagens.innerHTML += `
        <li data-test="message" class="messenger8">
        <div data-test="message" class="messenger9">
        <div data-test="message" class="messenger2">(${ListaDeMensagens[i].time})</div>
        <div data-test="message" class="messenger3">${ListaDeMensagens[i].from}</div>
        <p data-test="message">reservadamente para</p>
        <div data-test="message" class="messenger3">${ListaDeMensagens[i].to}:</div>
        <div data-test="message" class="messenger4">${ListaDeMensagens[i].text}</div>
        </div>
        </li> 
        `;
    }
}
}
  