# Sistema de Gerenciamento de Tarefas - Frontend

Frontend do Sistema de Gerenciamento de Tarefas desenvolvido a partir do framework Vue.js. 
Ele permite que o usuário visualize, adicione, edite e exclua uma ou mais tarefas por meio de uma interface clean e conectada a uma API Backend.

## 🚀 Funcionalidades
- Exibição de lista de tarefas com título, descrição, status e data de criação.
- Formulário para criar e editar tarefas.
- Exclusão de tarefas.
- Indicação visual do Status das tarefas, como:
  - `Pendente`.
  - `Em Andamento`.
  - `Concluído`.

## 🛠️ Tecnologias Utilizadas
- **Vue.js** (Versão 3)
- **Axios** (Para requisições de API)
- **HTML 5** e **CSS 3**

---

## ⚙️ Requisitos
- **Node.js** (>= 16.0.0)
- **npm** para gerenciamento dos pacotes

---

## 📦 Instalação

1. Clone o repositório do frontend:
   ```bash
   git clone https://github.com/guilhermeS53/lista-tarefas-frontend.git
   ```

2. Instale as dependências usando:
   ```bash
   npm install
   ```

3. Execute o projeto usando:
   ```bash
   npm run serve
   ```

---

## ▶️ Execução do Frontend

1. Inicie o servidor de desenvolvimento:
   ```bash
   npm run serve
   ```

2. Acesse o frontend no navegador:
   ```
   http://localhost:8080
   ```

---

## 🔧 Configurações Adicionais

### Conectar ao Backend
Verifique antes de executar, se que o Backend está em execução e atualize a URL da API no arquivo `tarefaService.js`:
```javascript
const API_URL = "https://localhost:7087/tarefas";
```

Substitua `https://localhost:PORT` pela URL apontada pelo seu Backend.

## 📂 Estrutura de Pastas

```
src/
├── components/Tarefas
│              ├── TarefaForm.vue     # Formulário para criar e editar tarefas
│              ├── ListaTarefa.vue    # Lista de tarefas
├── App.vue                           # Componente principal
├── main.js                           # Arquivo de entrada do Vue.js
