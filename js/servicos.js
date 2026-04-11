document.addEventListener('DOMContentLoaded', () => {
  const usuario = Auth.getUsuario();

  if (!usuario || !usuario.logado) {
    document.getElementById('aviso-login').style.display = 'block';
    document.getElementById('conteudo-painel').style.display = 'none';
    return;
  }

  document.getElementById('aviso-login').style.display = 'none';
  document.getElementById('conteudo-painel').style.display = 'block';

  document.getElementById('info-nome').textContent  = formatarNome(usuario.nome) || '—';
  document.getElementById('info-email').textContent = usuario.email || '—';

  let contadorPedidos = 1000;

  const selServico  = document.getElementById('sel-servico');
  const inpPreco    = document.getElementById('inp-preco');
  const inpPrazo    = document.getElementById('inp-prazo');
  const inpDataPrev = document.getElementById('inp-data-prev');

  selServico.addEventListener('change', () => {
    const opcao = selServico.options[selServico.selectedIndex];
    const preco = opcao.dataset.preco;
    const prazo = opcao.dataset.prazo;

    if (preco && prazo) {
      inpPreco.value    = formatarMoeda(parseFloat(preco));
      inpPrazo.value    = prazo + ' dia(s)';
      inpDataPrev.value = formatarData(calcularDataPrevista(parseInt(prazo)));
    } else {
      inpPreco.value    = '';
      inpPrazo.value    = '';
      inpDataPrev.value = '';
    }

    Form.marcarValido(document.getElementById('grupo-servico'));
  });

  document.getElementById('btn-adicionar').addEventListener('click', () => {
    const opcao = selServico.options[selServico.selectedIndex];

    if (!selServico.value) {
      Form.marcarInvalido(
        document.getElementById('grupo-servico'),
        'Selecione um serviço para continuar.'
      );
      selServico.focus();
      return;
    }

    const pedido = {
      numero:       ++contadorPedidos,
      dataPedido:   formatarData(new Date()),
      servico:      opcao.text,
      status:       'EM ELABORAÇÃO',
      preco:        inpPreco.value,
      dataPrevista: inpDataPrev.value,
    };

    adicionarLinhaNaTabela(pedido);
    limparFormulario();
  });

  function adicionarLinhaNaTabela(pedido) {
    const tbody = document.getElementById('tabela-body');
    const linhaVazia = tbody.querySelector('.linha-vazia');
    if (linhaVazia) linhaVazia.remove();

    const tr = document.createElement('tr');
    tr.classList.add('linha-nova');
    tr.dataset.numero = pedido.numero;

    tr.innerHTML = `
      <td>${pedido.dataPedido}</td>
      <td><span class="num-pedido">#${pedido.numero}</span></td>
      <td>${pedido.servico}</td>
      <td><span class="status-badge">${pedido.status}</span></td>
      <td><span class="valor-preco">${pedido.preco}</span></td>
      <td>${pedido.dataPrevista}</td>
      <td>
        <button
          class="btn btn-perigo"
          aria-label="Excluir pedido #${pedido.numero}"
          onclick="excluirLinha(this)">
          Excluir
        </button>
      </td>
    `;

    tbody.appendChild(tr);
  }

  function limparFormulario() {
    selServico.value  = '';
    inpPreco.value    = '';
    inpPrazo.value    = '';
    inpDataPrev.value = '';
    Form.marcarValido(document.getElementById('grupo-servico'));
  }

  function formatarNome(nome) {
    if (!nome) return '';
    return nome.charAt(0).toUpperCase() + nome.slice(1);
  }

  function calcularDataPrevista(dias) {
    const data = new Date();
    data.setDate(data.getDate() + dias);
    return data;
  }

  function formatarData(data) {
    const dia = String(data.getDate()).padStart(2, '0');
    const mes = String(data.getMonth() + 1).padStart(2, '0');
    const ano = data.getFullYear();
    return `${dia}/${mes}/${ano}`;
  }

  function formatarMoeda(valor) {
    return valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  }
});

function excluirLinha(btn) {
  const tr = btn.closest('tr');
  const numero = tr.dataset.numero;

  if (confirm(`Deseja realmente excluir o pedido #${numero}?`)) {
    tr.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
    tr.style.opacity    = '0';
    tr.style.transform  = 'translateX(20px)';

    setTimeout(() => {
      const tbody = tr.parentElement;
      tr.remove();

      if (tbody.children.length === 0) {
        const linhaVazia = document.createElement('tr');
        linhaVazia.classList.add('linha-vazia');
        linhaVazia.innerHTML = '<td colspan="7">Nenhum pedido encontrado. Solicite um serviço abaixo.</td>';
        tbody.appendChild(linhaVazia);
      }
    }, 300);
  }
}

function sair() {
  Auth.logout();
  window.location.href = '../index.html';
}