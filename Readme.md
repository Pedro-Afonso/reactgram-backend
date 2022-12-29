<a href="./LICENSE">![GitHub](https://img.shields.io/github/license/pedro-afonso/chat-app-frontend?style=plastic)</a>
![GitHub repo size](https://img.shields.io/github/repo-size/pedro-afonso/chat-app-frontend?style=plastic)
![GitHub Repo stars](https://img.shields.io/github/stars/pedro-afonso/chat-app-frontend?color=yellow&style=plastic)

<h1 align="center">Projeto Reactgram</h1>

<br />


# :pushpin: Índice de conteúdos

- [Screenshots do Projeto](#camera_flash-screenshots-do-projeto)
- [Sobre o Projeto](#monocle_face-sobre-o-projeto)
- [Tecnologias](#globe_with_meridians-tecnologias-usadas)
- [Features](#triangular_flag_on_post-features)
- [Instalação](#question-como-instalar-e-executar-o-projeto)
- [Autor](#closed_book-autor)

</br>

---
# :camera_flash: Screenshots do Projeto

| :sparkles: Design responsivo, tela de login e cadastro :sparkles: |
|---|
| ![full](https://user-images.githubusercontent.com/50973575/209983908-3e7e0f4f-e4d2-4b0f-9fb8-efbecb44f9b7.png) |

| :sparkles: Galeria de fotos do usuário | :sparkles: Modal para adicionar e editar foto | :sparkles: Barra de pesquisa | 
|---|---|---|
|<img src="https://user-images.githubusercontent.com/50973575/209987853-90c697bc-0b16-49e2-8efb-fa3fdadf6288.png" /> | <img src='https://user-images.githubusercontent.com/50973575/209987808-d8e6cae7-fc0e-47a5-a5bf-a9175a02f367.png' /> | <img src='https://user-images.githubusercontent.com/50973575/209987893-a74f484c-3685-47f6-abdd-3a5ebd5f1d02.png' /> | 

| :sparkles: Feed de fotos na página inicial | :sparkles: Curtir e adicionar comentário | :sparkles: Editar conta e adicionar avatar |
|---|---|---|
| <img src='https://user-images.githubusercontent.com/50973575/209987223-1c950956-83d7-4939-b555-16ce82359172.png'  /> | <img src='https://user-images.githubusercontent.com/50973575/209988297-78fd6eda-2df0-4a69-8380-136f606c139f.png' /> | <img src='https://user-images.githubusercontent.com/50973575/209987245-f52a4889-f000-4881-a241-50d46920bc7d.png' /> |


# :monocle_face: Sobre o Projeto

Inspirado no instagram, este projeto tem o objetivo de compartilhar fotos especiais. As atualizações são exibidas na página inicial para que todos possam visualizar.

<br />

# :globe_with_meridians: Tecnologias Usadas
## Frontend

✅ [React](https://reactjs.org/) - Biblioteca JS.

✅ [Typescript](https://www.typescriptlang.org) - Para fazer a tipagem

✅ [Material UI](https://mui.com) - Biblioteca de estilos.

✅ [Redux Toolkit](https://redux-toolkit.js.org) - Conjunto de ferramentas para simplificar o desenvolvimento Redux

✅ [Lints] — ESlint/Prettier/EditorConfig

## Backend

✅ [NodeJS](https://nodejs.org/en/) - Ambiente de desenvolvimento javascript.

✅ [Typescript](https://www.typescriptlang.org) - Para fazer a tipagem

✅ [Express](https://expressjs.com) - Framework usado para construir a API.

✅ [Multer](https://github.com/expressjs/multer#readme) - Usado como middleware para lidar com dados do tipo multipart/form-data.

✅ [Mongoose](https://mongoosejs.com) - Biblioteca usada para a modelagem de dados de objeto para MongoDB e NodeJS.

✅ [MongoDB](https://www.mongodb.com) - Sistema gerenciador de banco de dados NoSQL.

✅ [Lints] — ESlint/Prettier/EditorConfig

<br />


## Como instalar e usar o projeto

<br />

## Acessando direto pelo site:

- Você pode clicar nesse [link](https://reactgram-frontend.vercel.app) e acessar a aplicação que está hospedada na plataforma da Vercel.

<br />

### Executar na máquina local:

certifique-se de ter instalado na sua máquina o [Node](https://nodejs.org/en/). É necessário ter uma conta no [mongoDB Atlas](https://www.mongodb.com), e também criar um bucket S3 da [AWS](https://aws.amazon.com/pt/s3/).

1. Abra o terminal na pasta desejada para clonar o repositório e execute o comando:

```bash
git clone https://github.com/Pedro-Afonso/reactgram-frontend.git
```

2. Depois execute os seguintes comandos:

Entre na pasta do projeto

```bash
cd ./reactgram-frontend
```

Para instalar as dependências

```bash
npm install
```

Você precisa criar um arquivo .env e adicionar a variável

```bash
VITE_API=http://localhost:5000/api
```

A variável VITE_API é usada como url base do servidor.

Para iniciar o projeto:

```bash
npm run dev
```

mas para utilizar a aplicação é necessário instalar e iniciar o servidor backend

Com isso já é possível iniciar o frontend web da aplicação

3. Abra o terminal na pasta desejada para clonar o repositório e execute o comando:

```bash
git clone https://github.com/Pedro-Afonso/reactgram-backend.git
```

4. Depois de concluído, execute os seguintes comandos para iniciar:

Entre na pasta do projeto

```bash
cd ./reactgram-backend
```

Para instalar as dependências

```bash
npm install
```

Você precisa criar um arquivo .env e adicionar as variáveis

```bash
# Porta do servidor
PORT=5000

# MONGO DB VARIABLES
DB_MONGO_URI=

# Chave privada (Exemplo: shuashauhs)
JWT_SECRET=qualquerConjuntoDeCaracteres

# Variáveis do bucket S3 da AWS
S3_REGION=
S3_ACCESS_KEY_ID=
S3_SECRET_ACCESS_KEY=

```

Com isso já é possível iniciar o servidor backend da aplicação:

```bash
npm run server
```

5. Por fim, abra a pasta clonada em seu editor de códigos favorito e faça as suas alterações! xD

# :closed_book: Autor

### Feito por [Pedro Afonso](https://github.com/Pedro-Afonso).

### :link: LinkedIn: https://www.linkedin.com/in/pedro-a-fonso/

<!-- ### Agradecimentos

## Páginas

## Funcionalidades -->

## Licença

MIT
