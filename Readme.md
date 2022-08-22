<h1 align="center">PROJETO REACTGRAM (backend)</h1>

# Sobre o projeto

## Conteúdos

- 🌈 [Sobre o projeto](#project)
- 🔥 [Como instalar e usar o projeto](#install)
- 🔥 [Tecnologias](#build-with)
- 📑 [Páginas](#pages)
- ⚙ [Funcionalidades](#features)
- 📝 [Licença](#license)

## Tecnologias

### Frontend

<ul>
  <li>React</li>
  <li>Typescript</li>
  <li>Materil UI</li>
  <li>Redux Toolkit</li>
</ul>

### Backend

<ul>
<li>NodeJS</li>
<li>Typescript</li>
<li>Express</li>
<li>Express validation</li>
<li>Multer</li>
<li>JSON Web Token</li>
<li>CORS</li>
<li>MongoDB</li>
</ul>

<br />

# :monocle_face: Sobre o Projeto

Este projeto tem o objetivo de compartilhar atualizações pessoais por meio do website. As atualizações são exibidas na página inicial para que todos possam visualizar. As páginas e funcionalidades foram inspiradas no Instagram.

<br />

## Como instalar e usar o projeto

### Executar na máquina local:

(certifique-se de ter instalado na sua máquina o [Node](https://nodejs.org/en/) )

É necessário criar uma conta no MongoDB Atlas

1. Abra o terminal na pasta desejada para clonar o repositório e execute o comando:

```bash
git clone https://github.com/Pedro-Afonso/reactgram-backend.git
```

2. Depois execute os seguintes comandos:

Entre na pasta do projeto

```bash
cd ./reactgram-backend
```

Para instalar as dependências

```bash
npm install
```

Crie um arquivo .env na raíz do projeto e insira a URI gerada no seu projeto do mongoDB Atlas.

```bash
# Porta do servidor
PORT=5000

# MONGO DB VARIABLES
DB_MONGO_URI=

# Chave privada (Exemplo: shuashauhs)
JWT_SECRET=qualquerConjuntoDeCaracteres
```

Para iniciar o servidor:

```bash
npm run server
```

Com isso já é possível fazer as requisições da API.

Para instalar o frontend desse projeto é necessário clonar esse repositório: [Reactgram(frontend)](https://github.com/Pedro-Afonso/reactgram-frontend) e seguir as instruções fornecidas.

# :closed_book: Autor

### Feito por [Pedro Afonso](https://github.com/Pedro-Afonso).

### :link: LinkedIn: https://www.linkedin.com/in/pedro-a-fonso/

<!-- ### Agradecimentos

## Páginas

## Funcionalidades -->

## Licença

MIT
