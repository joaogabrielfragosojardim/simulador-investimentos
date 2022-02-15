# Simulador de investimentos

<div display="flex">
<img alt="GitHub repo size" src="https://img.shields.io/github/repo-size/joaogabrielfragosojardim/simulador-investimentos">
<img alt="Lines of code" src="https://img.shields.io/tokei/lines/github/joaogabrielfragosojardim/simulador-investimentos">
<div/>
<br/>
<img src="https://github.com/joaogabrielfragosojardim/simulador-investimentos/blob/master/src/assets/thumbnail.jpeg" alt="thumbnail">

Simulador de investimentos feito para um desafio front-end

## 👾 Tecnologias

* React
* TypesCript
* Styled Components
* React Query

## 💻 Pré-requisitos

Antes de começar, verifique se você atendeu aos seguintes requisitos:

* Você instalou a versão mais recente do `node.js`
* `NPM` || `Yarn`

## 🚀 Instalando Simulador de investimentos

Para instalar o Simulador de investimentos, siga estas etapas:

primeiramente clone o projeto
```
git clone https://github.com/joaogabrielfragosojardim/simulador-investimentos.git
```
faça um clone da fake API
```
git clone https://github.com/eqi-investimentos/desafio-fake-api.git
```
dentro da pasta raiz da fake api instale as dependências
```
npm i || yarn
```
rode a fake API
```
npx json-server db.json
```
com a fake API rodando, agora deve-se instalar as dependências do front-end, dentro da pasta raiz do front-end rode:
```
npm i || yarn
```
feito isto basta rodar a aplicação
```
npm start || yarn start
```
recomenda-se o uso do yarn por existir um yarn.lock no projeto!
  
 ## 📄 algumas considerações
  * Independente das informações que o usuário inserir as informações sempre serão as mesmas no dashboard, esses eram requisitos do desafio
  * irei criar um novo repositório com uma API em node para que esses resultados sejam dinâmicos
