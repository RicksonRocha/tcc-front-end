
## TCC Front-End

Este repositório contém a interface web do Sistema de Formação e Gestão de Grupos de TCC, desenvolvido como parte do Trabalho de Conclusão de Curso de Tecnologia em Análise e Desenvolvimento de Sistemas - UFPR 2025/01.

Este serviço permite que o usuário navegue por todas funcionalidades do sistema sendo Aluno, Professor ou Admin.

## Tecnologias Utilizadas

- React – Biblioteca principal para construção da interface
- Vite – Empacotador de módulos e servidor de desenvolvimento
- Material UI (MUI v5) – Biblioteca de componentes React baseada no Material Design
- React Hook Form + Yup – Gerenciamento e validação de formulários
- Axios – Requisições HTTP
- React Router – Gerenciamento de rotas
- Zustand – Gerenciamento de estado local

## Estrutura do Projeto

- src/api/ – Módulos de integração com os microserviços via API Gateway
- src/components/ – Componentes reutilizáveis
- src/constants/ – Constantes do sistema
- src/hooks/ – Hooks personalizados
- src/layouts/ – Estrutura de layout da aplicação
- src/pages/ – Páginas principais da aplicação
- src/routes/ – Definição das rotas da aplicação
- src/sections/ – Funcionalidades agrupadas por seção (login, cadastro, preferências, etc.)
- src/theme/ – Definições de tema e estilos globais
- src/utils/ – Utilitários e funções auxiliares

## Requisitos

Certifique-se de ter as seguintes ferramentas instaladas:

- Node.js 18 ou superior
- Yarn (ou npm, se preferir)

## Instalação e Execução

1. Clonar o repositório:

```
git clone https://github.com/seu-usuario/tcc-front-end.git
cd tcc-front-end
```

2. Instalar as dependências:

```
yarn
```

3. Iniciar o servidor de desenvolvimento:

```
yarn dev
```
