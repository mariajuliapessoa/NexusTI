document.addEventListener('DOMContentLoaded', () => {
  atualizarNav();
});

function atualizarNav() {
  const usuario    = Auth.getUsuario();
  const liLogin    = document.getElementById('li-login');
  const liLogout   = document.getElementById('li-logout');
  const liCadastro = document.getElementById('li-cadastro');
  const liPainel   = document.getElementById('li-painel');

  if (usuario && usuario.logado) {
    liLogin.style.display    = 'none';
    liCadastro.style.display = 'none';
    liLogout.style.display   = 'list-item';
    liPainel.style.display   = 'list-item';
  } else {
    liLogin.style.display    = 'list-item';
    liCadastro.style.display = 'list-item';
    liLogout.style.display   = 'none';
    liPainel.style.display   = 'none';
  }
}

function sair() {
  Auth.logout();
  window.location.reload();
}
