document.addEventListener('DOMContentLoaded', () => {
  const form              = document.getElementById('form-auth');
  const emailInput        = document.getElementById('email');
  const senhaInput        = document.getElementById('senha');
  const confirmarInput    = document.getElementById('confirmar');
  const nomeInput         = document.getElementById('nome');
  const cpfInput          = document.getElementById('cpf');
  const nascimentoInput   = document.getElementById('nascimento');
  const telefoneInput     = document.getElementById('telefone');
  const escolaridadeInput = document.getElementById('escolaridade');
  const btnLimpar         = document.getElementById('btn-limpar');
  const btnVoltar         = document.getElementById('btn-voltar');

  cpfInput.addEventListener('input', () => {
    mascaraCPF(cpfInput);
    Form.marcarValido(document.getElementById('grupo-cpf'));
  });

  telefoneInput.addEventListener('input', () => {
    mascaraTelefone(telefoneInput);
    Form.marcarValido(document.getElementById('grupo-telefone'));
  });

  const campos = [emailInput, senhaInput, confirmarInput, nomeInput, nascimentoInput];
  campos.forEach(campo => {
    campo.addEventListener('input', () => {
      const grupo = document.getElementById('grupo-' + campo.id);
      if (grupo) Form.marcarValido(grupo);
    });
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    Form.limparErros(form);

    let valido = true;
    let primeiroErroEl = null;

    function erro(grupoId, mensagem, inputEl) {
      Form.marcarInvalido(document.getElementById(grupoId), mensagem);
      if (!primeiroErroEl) primeiroErroEl = inputEl;
      valido = false;
    }

    const emailVal = emailInput.value.trim();
    if (!emailVal) {
      erro('grupo-email', 'O e-mail é obrigatório.', emailInput);
    } else if (!Validar.email(emailVal)) {
      erro('grupo-email', 'Informe um e-mail válido.', emailInput);
    }

    const senhaVal = senhaInput.value;
    if (!senhaVal) {
      erro('grupo-senha', 'A senha é obrigatória.', senhaInput);
    } else {
      const erroSenha = Validar.senha(senhaVal);
      if (erroSenha) erro('grupo-senha', erroSenha, senhaInput);
    }

    const confirmarVal = confirmarInput.value;
    if (!confirmarVal) {
      erro('grupo-confirmar', 'Confirme sua senha.', confirmarInput);
    } else if (senhaVal !== confirmarVal) {
      erro('grupo-confirmar', 'As senhas não coincidem.', confirmarInput);
    }

    const nomeVal = nomeInput.value.trim();
    if (!nomeVal) {
      erro('grupo-nome', 'O nome completo é obrigatório.', nomeInput);
    } else {
      const erroNome = Validar.nome(nomeVal);
      if (erroNome) erro('grupo-nome', erroNome, nomeInput);
    }

    const cpfVal = cpfInput.value.trim();
    if (!cpfVal) {
      erro('grupo-cpf', 'O CPF é obrigatório.', cpfInput);
    } else {
      const erroCpf = Validar.cpf(cpfVal);
      if (erroCpf) erro('grupo-cpf', erroCpf, cpfInput);
    }

    const nascVal = nascimentoInput.value;
    if (!nascVal) {
      erro('grupo-nascimento', 'A data de nascimento é obrigatória.', nascimentoInput);
    } else {
      const erroIdade = Validar.idadeMinima(nascVal);
      if (erroIdade) erro('grupo-nascimento', erroIdade, nascimentoInput);
    }

    const telVal = telefoneInput.value.trim();
    const erroTel = Validar.telefone(telVal);
    if (erroTel) erro('grupo-telefone', erroTel, telefoneInput);

    if (!escolaridadeInput.value) {
      erro('grupo-escolaridade', 'Selecione sua escolaridade.', escolaridadeInput);
    }

    if (!valido) {
      if (primeiroErroEl) primeiroErroEl.focus();
      return;
    }

    Auth.login(emailVal, nomeVal.split(' ')[0]);
    alert(`Cadastro realizado com sucesso! Bem-vindo(a), ${nomeVal.split(' ')[0]}!`);
    window.location.href = '../index.html';
  });

  btnLimpar.addEventListener('click', () => {
    form.reset();
    Form.limparErros(form);
    document.querySelector('input[name="estado_civil"][value="solteiro"]').checked = true;
    escolaridadeInput.value = 'medio_com';
    emailInput.focus();
  });

  btnVoltar.addEventListener('click', () => {
    history.back();
  });
});
