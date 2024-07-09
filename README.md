# Aplicação de CRUD de Clientes

Este projeto é uma aplicação de CRUD (Criar, Ler, Atualizar, Excluir) de Clientes construída com React, Redux e TypeScript. Ele permite que os usuários gerenciem uma lista de clientes, incluindo adicionar, editar e excluir informações de clientes.

## Índice

- [Instalação](#instalação)
- [Uso](#uso)
- [Testes](#testes)
- [Estrutura de Pastas](#estrutura-de-pastas)
- [Tecnologias Utilizadas](#tecnologias-utilizadas)

## Instalação

Para instalar as dependências necessárias, use os seguintes comandos:

```sh
# Instalar dependências
pnpm install
```

## Uso

Para iniciar a aplicação, use o seguinte comando:

```sh
# A aplicação estará disponível em http://localhost:5173.
pnpm run dev
```

## Testes

Para rodar os testes, use o seguinte comando:

```sh
# Para rodar os testes, use o seguinte comando:
pnpm test
```

## Estrutura de Pastas

A estrutura de pastas do projeto é organizada da seguinte forma:
.
├── src
│ ├── components # Componentes reutilizáveis
│ ├── pages # Páginas principais
│ ├── reducers # Reducers do Redux
│ ├── store # Configuração da store do Redux
│ ├── tests # Testes unitários e de integração
│ └── index.tsx # Arquivo de entrada principal
├── public # Arquivos públicos
├── package.json # Configuração do npm
└── README.md # Este arquivo

## Tecnologias Utilizadas

- React: Biblioteca para construção de interfaces de usuário.
- Redux: Biblioteca para gerenciamento de estado.
- TypeScript: Superconjunto do JavaScript que adiciona tipos estáticos.
- Redux Thunk: Middleware para operações assíncronas no Redux.
- Jest: Framework de testes para JavaScript.
- React Testing Library: Utilitários para testes de componentes React.
