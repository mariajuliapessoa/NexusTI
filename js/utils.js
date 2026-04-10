const Auth = {
  login(email, nome) {
    localStorage.setItem('nexus_usuario', JSON.stringify({ email, nome, logado: true }));
  },

  logout() {
    localStorage.removeItem('nexus_usuario');
  },

  getUsuario() {
    try {
      const dados = localStorage.getItem('nexus_usuario');
      return dados ? JSON.parse(dados) : null;
    } catch {
      return null;
    }
  },

  estaLogado() {
    const u = this.getUsuario();
    return u !== null && u.logado === true;
  }
};

const Validar = {
  email(valor) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(valor.trim());
  },

  senha(valor) {
    if (valor.length < 6)
      return 'A senha deve ter pelo menos 6 caracteres.';
    if (!/[0-9]/.test(valor))
      return 'A senha deve conter pelo menos um número.';
    if (!/[A-Z]/.test(valor))
      return 'A senha deve conter pelo menos uma letra maiúscula.';
    if (!/[@#$%&*!?/\\|\-_+.=]/.test(valor))
      return 'A senha deve conter pelo menos um caractere especial (@ # $ % & * ! ? / \\ | - _ + . =).';
    if (/[¨{}[\]´`~^:;<>,"']/.test(valor))
      return 'A senha contém caracteres não permitidos.';
    return null;
  },

  nome(valor) {
    const palavras = valor.trim().split(/\s+/).filter(p => p.length > 0);
    if (palavras.length < 2)
      return 'Informe nome e sobrenome.';
    if (palavras[0].length < 2)
      return 'O primeiro nome deve ter pelo menos 2 caracteres.';
    if (/[^a-zA-ZÀ-ÿ\s]/.test(valor))
      return 'O nome não pode conter caracteres especiais ou números.';
    return null;
  },

  cpf(valor) {
    const limpo = valor.replace(/\D/g, '');
    if (!/^\d{11}$/.test(limpo))
      return 'CPF inválido. Use o formato NNN.NNN.NNN-NN.';
    if (/^(\d)\1{10}$/.test(limpo))
      return 'CPF inválido.';

    let soma = 0;
    for (let i = 0; i < 9; i++) soma += parseInt(limpo[i]) * (10 - i);
    let dig1 = (soma * 10) % 11;
    if (dig1 === 10 || dig1 === 11) dig1 = 0;
    if (dig1 !== parseInt(limpo[9])) return 'CPF inválido (dígito verificador).';

    soma = 0;
    for (let i = 0; i < 10; i++) soma += parseInt(limpo[i]) * (11 - i);
    let dig2 = (soma * 10) % 11;
    if (dig2 === 10 || dig2 === 11) dig2 = 0;
    if (dig2 !== parseInt(limpo[10])) return 'CPF inválido (dígito verificador).';

    return null;
  },

  idadeMinima(dataNascStr) {
    if (!dataNascStr) return 'Data de nascimento obrigatória.';
    const nasc = new Date(dataNascStr + 'T00:00:00');
    const hoje = new Date();
    let idade = hoje.getFullYear() - nasc.getFullYear();
    const mes = hoje.getMonth() - nasc.getMonth();
    if (mes < 0 || (mes === 0 && hoje.getDate() < nasc.getDate())) idade--;
    if (isNaN(nasc.getTime())) return 'Data de nascimento inválida.';
    if (idade < 18) return 'Você deve ter pelo menos 18 anos.';
    return null;
  },

  telefone(valor) {
    if (!valor || valor.trim() === '') return null;
    const limpo = valor.replace(/\D/g, '');
    if (limpo.length < 10 || limpo.length > 11)
      return 'Telefone inválido. Use (99) 9999-9999 ou (99) 99999-9999.';
    return null;
  }
};

const Form = {
  marcarInvalido(grupo, mensagem) {
    grupo.classList.add('invalido');
    const err = grupo.querySelector('.erro-msg');
    if (err) err.textContent = mensagem;
  },

  marcarValido(grupo) {
    grupo.classList.remove('invalido');
  },

  limparErros(form) {
    form.querySelectorAll('.form-grupo').forEach(g => this.marcarValido(g));
  }
};

function mascaraCPF(input) {
  let v = input.value.replace(/\D/g, '').substring(0, 11);
  v = v.replace(/(\d{3})(\d)/, '$1.$2');
  v = v.replace(/(\d{3})\.(\d{3})(\d)/, '$1.$2.$3');
  v = v.replace(/(\d{3})\.(\d{3})\.(\d{3})(\d)/, '$1.$2.$3-$4');
  input.value = v;
}

function mascaraTelefone(input) {
  let v = input.value.replace(/\D/g, '').substring(0, 11);
  if (v.length <= 10) {
    v = v.replace(/(\d{2})(\d)/, '($1) $2');
    v = v.replace(/(\d{4})(\d)/, '$1-$2');
  } else {
    v = v.replace(/(\d{2})(\d)/, '($1) $2');
    v = v.replace(/(\d{5})(\d)/, '$1-$2');
  }
  input.value = v;
}
