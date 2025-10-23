# Portfólio – Rian Cavalcante

Landing page responsiva desenvolvida em HTML, Tailwind CSS (via CDN) e JavaScript para apresentar as principais experiências, habilidades e projetos de automação inteligente com IA de Rian Cavalcante.

## Estrutura do Projeto

- `index.html` – página principal com a marcação HTML.
- `assets/css/styles.css` – estilos customizados (tema escuro/claro, animações e componentes).
- `assets/js/main.js` – scripts para alternância de tema, animações, modal de detalhes e partículas.
- `assets/img/` – pasta reservada para imagens locais, caso deseje adicionar arquivos próprios.

## Pré-visualização local

1. Faça o download ou clone este repositório.
2. Abra o arquivo `index.html` diretamente no navegador **ou** sirva o diretório com uma ferramenta simples, por exemplo:

   ```bash
   npx serve .
   ```

   Em seguida acesse `http://localhost:3000` (ou a porta indicada) no navegador.

## Publicando no GitHub

1. Inicialize o repositório e faça o commit inicial:

   ```bash
   git init
   git add .
   git commit -m "feat: primeira versão do portfólio"
   ```

2. Crie um repositório vazio no GitHub.
3. Conecte o remoto e envie os arquivos:

   ```bash
   git remote add origin https://github.com/<usuario>/<repositorio>.git
   git push -u origin main
   ```

## Deploy na Vercel

1. No painel da [Vercel](https://vercel.com/), selecione **Add New Project** e importe o repositório recém-criado.
2. Escolha a pasta raiz do projeto (este diretório).
3. Confirme as configurações padrão e clique em **Deploy**.

Como o projeto é estático, nenhum build step adicional é necessário. A cada push na branch principal, a Vercel vai gerar uma nova versão automaticamente.

## Personalização

- Atualize textos e links diretamente em `index.html`.
- Ajuste estilos em `assets/css/styles.css`.
- Caso queira substituir as imagens hospedadas em serviços externos, salve os arquivos em `assets/img/` e atualize os `src` correspondentes.

---

Criado com foco em automação inteligente e pronto para ser compartilhado. 🚀
