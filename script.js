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
function selecionarVisibilidade(event) {
    const publico = document.querySelector('.publico');
    const reservado = document.querySelector('.reservado');
    const checkIcons = document.querySelectorAll('.check');
    const checkIconPublico = publico.querySelector('.check');
    const checkIconReservado = reservado.querySelector('.check');
  
    // Remove a classe 'selecionado' de todos os ícones de check
    checkIcons.forEach(icon => icon.classList.remove('selecionado'));
  
    // Adiciona a classe 'selecionado' ao ícone de check do elemento clicado
    if (event.target.parentNode.classList.contains('publico')) {
      checkIconPublico.classList.add('selecionado');
    } else {
      checkIconReservado.classList.add('selecionado');
    }
  }
  
  

  
  