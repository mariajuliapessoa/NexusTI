document.addEventListener('DOMContentLoaded', () => {
  const form           = document.getElementById('form-auth');
  const emailInput     = document.getElementById('email');
  const senhaInput     = document.getElementById('senha');
  const confirmarInput = document.getElementById('confirmar');
  const btnLimpar      = document.getElementById('btn-limpar');

  senhaInput.addEventListener('input', () => {
    Form.marcarValido(document.getElementById('grupo-senha'));
    atualizarForca(senhaInput.value);
  });

  function atualizarForca(senha) {
    let pontos = 0;
    if (senha.length >= 6)                        pontos++;
    if (/[0-9]/.test(senha))                      pontos++;
    if (/[A-Z]/.test(senha))                      pontos++;
    if (/[@#$%&*!?/\\|\-_+.=]/.test(senha))       pontos++;

    const barras = [
      document.getElementById('barra1'),
      document.getElementById('barra2'),
      document.getElementById('barra3'),
      document.getElementById('barra4'),
    ];
    const labelEl = document.getElementById('forca-label');

    barras.forEach(b => b.className = 'forca-barra');

    let classeAtiva = '';
    let texto = '';

    if (senha.length === 0) {
      texto = '';
    } else if (pontos <= 1) {
      classeAtiva = 'ativa-fraca';
      texto = 'Senha fraca';
    } else if (pontos <= 2) {
      classeAtiva = 'ativa-media';
      texto = 'Senha razoável';
    } else if (pontos <= 3) {
      classeAtiva = 'ativa-media';
      texto = 'Senha boa';
    } else {
      classeAtiva = 'ativa-forte';
      texto = 'Senha forte ✓';
    }

    for (let i = 0; i < pontos; i++) {
      barras[i].classList.add(classeAtiva);
    }
    labelEl.textContent = texto;
  }

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
      Form.marcarInvalido(grupoEmail, 'Informe um e-mail válido.');
      valido = false;
    }

    const senhaVal   = senhaInput.value;
    const grupoSenha = document.getElementById('grupo-senha');
    if (!senhaVal) {
      Form.marcarInvalido(grupoSenha, 'A nova senha é obrigatória.');
      valido = false;
    } else {
      const erroSenha = Validar.senha(senhaVal);
      if (erroSenha) {
        Form.marcarInvalido(grupoSenha, erroSenha);
        valido = false;
      }
    }

    const confirmarVal   = confirmarInput.value;
    const grupoConfirmar = document.getElementById('grupo-confirmar');
    if (!confirmarVal) {
      Form.marcarInvalido(grupoConfirmar, 'Confirme a nova senha.');
      valido = false;
    } else if (senhaVal !== confirmarVal) {
      Form.marcarInvalido(grupoConfirmar, 'As senhas não coincidem.');
      valido = false;
    }

    if (!valido) {
      const primeiroErro = form.querySelector('.form-grupo.invalido input');
      if (primeiroErro) primeiroErro.focus();
      return;
    }

    alert('Senha alterada com sucesso! Faça login com sua nova senha.');
    history.back();
  });

  btnLimpar.addEventListener('click', () => {
    Form.limparErros(form);
    emailInput.value     = '';
    senhaInput.value     = '';
    confirmarInput.value = '';
    atualizarForca('');
    document.getElementById('forca-label').textContent = '';
    emailInput.focus();
  });

  confirmarInput.addEventListener('input', () => {
    Form.marcarValido(document.getElementById('grupo-confirmar'));
  });
  emailInput.addEventListener('input', () => {
    Form.marcarValido(document.getElementById('grupo-email'));
  });
});
