<div align="center">

<img src="https://raw.githubusercontent.com/Vitryne/.github/main/assets/logotipoGradiente.png" width="280" alt="Logo da Vitryne" />

# Frontend da plataforma Vitryne

Portal do parceiro: aplicação web em que os lojistas gerenciam produtos, pedidos e a operação da loja.

[![Stack](https://skillicons.dev/icons?i=react,next,ts,tailwind)](https://skillicons.dev)

</div>

---

## 📖 Visão geral

O portal do parceiro é a aplicação web usada pelos lojistas da Vitryne para cadastrar a loja, manter o catálogo de produtos, acompanhar pedidos e configurar a operação. Ele consome a API disponibilizada pelo [backend](https://github.com/Vitryne/backend).

---

## 🛠️ Stack

- [Next.js](https://nextjs.org/) 15, com Pages Router
- [React](https://react.dev/) 19
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/) 4
- [Prettier](https://prettier.io/) e [ESLint](https://eslint.org/)

---

## 🚀 Começando

### Pré-requisitos

- [Node.js](https://nodejs.org/pt-br) na versão do arquivo `.nvmrc` (24)
- npm, que já vem com o Node

Com o [nvm](https://github.com/nvm-sh/nvm), basta rodar `nvm use` na raiz do projeto.

### Executando

```bash
git clone https://github.com/Vitryne/frontend.git
cd frontend

npm install
cp .env.example .env.local

npm run dev
```

A aplicação sobe em [http://localhost:3000](http://localhost:3000).

---

## 📜 Scripts

| Comando | O que faz |
| --- | --- |
| `npm run dev` | Sobe o servidor de desenvolvimento |
| `npm run build` | Gera o build de produção |
| `npm run start` | Serve o build de produção |
| `npm run lint` | Verifica o código com o ESLint |
| `npm run typecheck` | Verifica os tipos com o TypeScript |
| `npm run format` | Formata o código com o Prettier |
| `npm run format:check` | Verifica a formatação sem alterar arquivos |

Antes de abrir um PR, rode `format`, `lint`, `typecheck` e `build`: são as mesmas verificações do CI.

---

## ⚙️ Variáveis de ambiente

As variáveis usadas pelo projeto estão listadas em `.env.example`. Copie o arquivo para `.env.local` e preencha com os valores do seu ambiente. O `.env.local` não é versionado.

Variáveis com prefixo `NEXT_PUBLIC_` ficam visíveis no navegador: nunca coloque segredos nelas.

---

## 🗂️ Estrutura

```
src/
├── components/
│   ├── ui/              # componentes globais (botões, inputs, modal, tabela...)
│   └── features/        # componentes de cada área
│       ├── panel/       # layout do painel e telas internas (produtos...)
│       └── store-register/  # etapas do cadastro da loja
├── lib/                 # funções utilitárias, sem React
├── pages/               # rotas (Pages Router): cada arquivo é uma URL
└── styles/              # estilos globais e tokens do tema
```

---

## 🔄 Fluxo de trabalho

- A branch padrão é a `dev`. Toda tarefa sai dela e volta para ela por pull request.
- A `main` recebe as releases, por PR da `dev` no fim de cada sprint.
- Nomes de branch, mensagens de commit e títulos de PR seguem o [guia de contribuição da organização](https://github.com/Vitryne/.github/blob/main/CONTRIBUTING.md).

### CI e ambientes

Cada pull request passa por:

- **Governança**: valida o nome da branch, o título do PR e as mensagens de commit.
- **Qualidade**: roda lint, verificação de tipos, build e checagem de formatação.
- **Deploy de preview**: publica uma versão do PR na Vercel, com o link no próprio PR.

Depois do merge:

| Branch | Ambiente | Endereço |
| --- | --- | --- |
| `dev` | Homologação | [homolog.vitrynes.com](https://homolog.vitrynes.com) |
| `main` | Produção | [www.vitrynes.com](https://www.vitrynes.com) |

---

## 🌐 Ecossistema

| Repositório | Descrição |
| --- | --- |
| [Backend](https://github.com/Vitryne/backend) | API da plataforma |
| [Frontend](https://github.com/Vitryne/frontend) | Portal do parceiro (web) |
| [Mobile](https://github.com/Vitryne/mobile) | Aplicativo mobile |
| [Docs](https://github.com/Vitryne/docs) | Documentação técnica |

---

## 📄 Licença

Este projeto está licenciado sob a licença MIT. Consulte o arquivo [LICENSE](LICENSE).