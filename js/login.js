document.addEventListener('DOMContentLoaded', () => {
  const form       = document.getElementById('form-auth');
  const emailInput = document.getElementById('email');
  const senhaInput = document.getElementById('senha');
  const btnLimpar  = document.getElementById('btn-limpar');

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    Form.limparErros(form);

    let valido = true;

    const emailVal   = emailInput.value.trim();
    const grupoEmail = document.getElementById('grupo-email');
    if (!emailVal) {
      Form.marcarInvalido(grupoEmail, 'O e-mail é obrigatório.');
      valido = false;
    } else if (!Validar.email(emailVal)) {
      Form.marcarInvalido(grupoEmail, 'Informe um e-mail válido (ex: usuario@dominio.com).');
      valido = false;
    }

    const senhaVal   = senhaInput.value;
    const grupoSenha = document.getElementById('grupo-senha');
    if (!senhaVal) {
      Form.marcarInvalido(grupoSenha, 'A senha é obrigatória.');
      valido = false;
    }

    if (!valido) {
      const primeiroErro = form.querySelector('.form-grupo.invalido input');
      if (primeiroErro) primeiroErro.focus();
      return;
    }

    const nomeSimulado = emailVal.split('@')[0];
    Auth.login(emailVal, nomeSimulado);

    alert('Validação realizada com sucesso! Bem-vindo à Nexus TI.');
    window.location.href = '../index.html';
  });

  btnLimpar.addEventListener('click', () => {
    Form.limparErros(form);
    emailInput.value = '';
    senhaInput.value = '';
    emailInput.focus();
  });

  emailInput.addEventListener('input', () => {
    Form.marcarValido(document.getElementById('grupo-email'));
  });
  senhaInput.addEventListener('input', () => {
    Form.marcarValido(document.getElementById('grupo-senha'));
  });
});