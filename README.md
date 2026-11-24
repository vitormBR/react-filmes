# Sistema de Filmes — Express + Handlebars + React

O projeto mantém o CRUD original em Express/Handlebars e acrescenta uma aplicação React criada com Vite. O React consulta os filmes pela API do backend.

## 1. Instalar dependências do backend

Na pasta raiz do projeto:

```bash
npm install
```

Crie o arquivo `.env` copiando `.env.example` e configure `SESSION_SECRET`. Crie o usuário de demonstração:

```bash
npm run create-admin
```

## 2. Instalar dependências do React

Abra outro terminal, entre na pasta `frontend` e instale:

```bash
cd frontend
npm install
```

## 3. Executar as aplicações

**Terminal 1 — backend:** na pasta raiz:

```bash
npm start
```

O Express ficará em `http://localhost:3000`.

**Terminal 2 — React:** dentro da pasta `frontend`:

```bash
npm run dev
```

O Vite ficará em `http://localhost:5173`.

## 4. Como acessar

1. Acesse `http://localhost:3000/login` e entre no sistema.
2. Acesse `http://localhost:5173` para visualizar a lista feita em React.
3. O React consulta `GET http://localhost:3000/api/filmes`.

Usuário de demonstração:
- E-mail: `admin@teste.com`
- Senha: `123456`

## 5. API

A rota `GET /api/filmes` retorna um array JSON com os filmes cadastrados. Ela exige autenticação e responde com status `401` em JSON quando o usuário não está logado.

O CORS está configurado para permitir a origem `http://localhost:5173` com credenciais, e o `fetch` usa `credentials: 'include'` para enviar o cookie da sessão.

## 6. Conceitos React usados

- `useState([])` armazena os filmes recebidos.
- `useEffect(..., [])` consulta a API quando o componente é montado.
- `fetch` faz a requisição HTTP.
- `map` transforma cada filme em um elemento JSX.
- `key={item.id}` identifica cada item da lista.

A tela React implementada neste acréscimo é a listagem de filmes, conforme o roteiro das aulas. As demais telas de cadastro, edição e detalhes continuam no Handlebars.
