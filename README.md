# Cadastro de Pessoas

[![Next.js](https://img.shields.io/badge/Next.js-11.0.0-brightgreen)](https://nextjs.org)
[![Vercel](https://img.shields.io/badge/Hosted%20on-Vercel-blue)](https://vercel.com)

Uma aplicação web desenvolvida com **Next.js** que permite o cadastro e gerenciamento de pessoas, incluindo informações como nome, email, estado e cidade.

## Table of Contents

- [Funcionalidades](#funcionalidades)
- [Tecnologias Utilizadas](#tecnologias-utilizadas)
- [Instalação e Execução](#instalação-e-execução)
- [Como Usar](#como-usar)


## Funcionalidades

- **Cadastro de Pessoas:** Permite adicionar novas pessoas por meio de um formulário com campos obrigatórios.
- **Validações:** Implementação de validações no lado do cliente e do servidor, garantindo dados únicos e válidos.
- **Seleção de Estado e Cidade:** Os estados são carregados do backend, e as cidades são carregadas dinamicamente com base na seleção do estado.
- **Experiência de Usuário:** Interface responsiva e amigável, facilitando a navegação.

## Tecnologias Utilizadas

- **Frontend:** Next.js
- **Backend:** Strapi V5 (com PostgreSQL)
- **Estilização:** Tailwind CSS

## Instalação e Execução

### Pré-requisitos

- Node.js (versão 14 ou superior)
- npm ou Yarn

### Passos para Inicialização

1. **Clone o repositório:**
 ```bash
 git clone https://github.com/seu-usuario/seu-repositorio.git
 cd seu-repositorio
 ```

2. Instale as dependências:
```bash
  cd frontend
  npm install
  # ou
  yarn install
```

3. Inicie a aplicação:
```bash
npm run dev
# ou
yarn dev
```

4. Acesse a aplicação:
```bash
Abra o navegador e vá para http://localhost:3000/pessoa para visualizar o formulário de cadastro.
```

## Como Usar
Para adicionar uma nova pessoa, navegue até a página /pessoa/add.
Preencha os campos obrigatórios: Nome, Email, Estado e Cidade.
Ao enviar o formulário, você será redirecionado para a página de detalhes da pessoa cadastrada.

