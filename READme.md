# Nexus TI — Portal Institucional e de Serviços

Projeto acadêmico de front-end desenvolvido com HTML5, CSS3 e JavaScript puro, simulando o portal institucional e de serviços de uma empresa fictícia de tecnologia da informação.

## Autoras

* Maria Julia Pessoa — https://github.com/mariajuliapessoa
* Julia Botor — https://github.com/juliabotor

## Visão Geral

O projeto consiste em um portal web multipágina, com navegação entre seções institucionais, sistema de autenticação simulada via localStorage, painel de solicitação de serviços e páginas de suporte ao usuário. Todo o desenvolvimento foi realizado sem o uso de frameworks ou bibliotecas externas, aplicando conceitos fundamentais de desenvolvimento web front-end.

## Estrutura do Projeto

```
PROJ-AV1/
├── index.html
├── css/
│   └── style.css
├── js/
│   ├── utils.js
│   ├── index.js
│   ├── login.js
│   ├── cadastro.js
│   ├── servicos.js
│   └── troca-senha.js
└── pages/
├── login.html
├── cadastro.html
├── servicos.html
└── troca-senha.html
```

## Descrição dos Arquivos

* index.html: Página principal com hero, história, vídeo, galeria, serviços e rodapé
* css/style.css: Folha de estilos global compartilhada por todas as páginas
* js/utils.js: Módulo utilitário com Auth, Validar, Form e máscaras de CPF e telefone
* js/index.js: Controla a exibição condicional da navegação com base no estado de login
* js/login.js: Lógica de validação e submissão do formulário de login
* js/cadastro.js: Lógica de validação completa do formulário de cadastro de usuário
* js/servicos.js: Gerencia o painel de pedidos: adição, cálculo de prazo e exclusão de linhas
* js/troca-senha.js: Validação de nova senha com indicador visual de força
* pages/login.html: Página de autenticação do usuário
* pages/cadastro.html: Página de registro de novo usuário
* pages/servicos.html: Painel restrito de solicitação e acompanhamento de serviços
* pages/troca-senha.html: Página de redefinição de senha com medidor de força

## Tecnologias Utilizadas

* HTML5 semântico com atributos de acessibilidade (ARIA)
* CSS3 com custom properties, grid layout, flexbox, animações e media queries
* JavaScript ES6+ sem frameworks
* Google Fonts: Syne, DM Sans, JetBrains Mono
* localStorage para persistência de sessão simulada

## Funcionalidades

Página principal com seção hero, área institucional, vídeo responsivo, galeria de imagens, cards de serviços e rodapé completo. Navegação dinâmica baseada no estado de autenticação.

Sistema de autenticação simulada com login, cadastro completo (incluindo validação de CPF, idade mínima, nome completo e confirmação de senha), troca de senha com indicador de força e gerenciamento de sessão via localStorage.

Painel de serviços com acesso restrito, seleção de serviços com cálculo automático de preço e prazo, adição dinâmica de pedidos em tabela, exclusão com confirmação e exibição de dados do usuário logado.

## Validações Implementadas

Validação de e-mail com regex, senha com requisitos mínimos de segurança, confirmação de senha, nome completo com múltiplas palavras, CPF com verificação de dígitos, idade mínima de 18 anos, telefone opcional com máscara e escolaridade obrigatória. Erros são exibidos abaixo dos campos com foco automático no primeiro erro.

## Como Executar

O projeto deve ser executado em servidor local devido ao uso de módulos JavaScript e embed de vídeo. Abrir via file:// pode causar erros.

Opção com VS Code: instalar Live Server, clicar com botão direito em index.html e selecionar “Open with Live Server”.

Opção com Node: executar npx http-server . -p 5500 e acessar http://localhost:5500 no navegador.

## Decisões Técnicas

Projeto desenvolvido sem frameworks para reforçar fundamentos de front-end. Funções reutilizáveis centralizadas em utils.js. CSS único para consistência visual. Autenticação simulada com localStorage. Vídeo responsivo utilizando técnica de proporção 16:9 sem JavaScript.

## Observações

Projeto desenvolvido para fins acadêmicos. Dados são armazenados localmente no navegador e não são persistidos entre dispositivos. Nenhuma informação é enviada a servidores externos.
