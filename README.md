<div align="center">

<img src="https://raw.githubusercontent.com/Vitryne/.github/main/assets/logotipoGradiente.png" width="280" alt="Logo" />

# Frontend da plataforma Vitryne

Aplicação web utilizada pelos parceiros da plataforma para gerenciamento de produtos, pedidos e operação das lojas.

[![Java](https://skillicons.dev/icons?i=react,next,ts,tailwind,docker)](https://skillicons.dev)

</div>

---

## 📖 Visão Geral

A aplicação web da Vitryne é destinada aos parceiros da plataforma, permitindo o gerenciamento das operações da loja, como cadastro de produtos, controle de pedidos e acompanhamento das vendas.

A aplicação consome as APIs disponibilizadas pelo backend e integra-se aos demais serviços da plataforma.

---

## 🛠️ Stack

- Nextjs
- React
- Typescript
- Tailwind CSS
- Docker

---

## 🚀 Começando

### Pré-requisitos

- [Node.js](https://nodejs.org/pt-br)
- [npm](https://docs.npmjs.com/)
- [Docker e Docker Compose](https://www.docker.com/)

---

### Executando

```bash
# Clone o repositório
git clone https://github.com/Vitryne/frontend.git
cd frontend

# Crie o arquivo .env na raiz (veja a seção Variáveis de Ambiente)

# Suba os containers (aplicação + banco)
docker compose up --build
```

---

## ⚙️ Variáveis de Ambiente

Crie um arquivo `.env` na raiz do projeto. Você consegue verificar as variáveis que são utilizadas hoje, no arquivo `.env.example`

---

## 📚 Documentação

A documentação da plataforma, incluindo arquitetura, regras de negócio e decisões técnicas, está disponível no repositório de documentação.

## 🌐 Ecossistema

| Repositório | Descrição |
| ------------- | ----------- |
| [Backend](https://github.com/Vitryne/backend) | API da plataforma |
| [Frontend](https://github.com/Vitryne/frontend) | Aplicação Web |
| [Mobile](https://github.com/Vitryne/mobile) | Aplicativo Mobile |
| [Docs](https://github.com/Vitryne/docs) | Documentação técnica |

## 📄 Licença

Este projeto está licenciado sob a licença MIT. Consulte o arquivo [LICENSE](LICENSE) para mais informações.
