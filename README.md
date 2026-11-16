# Oficina Alta Performance — Aplicativo Mobile

Aplicativo mobile desenvolvido em **React Native com Expo** para a disciplina de Desenvolvimento de Aplicações Móveis (**CCP150**).

---

## 1. Visão Geral e Requisitos

### Motivação e Objetivo
A ideia deste projeto surgiu de uma necessidade real: **ajudar um amigo que possui uma oficina mecânica de preparação automotiva**. No dia a dia, ele perdia muito tempo tentando encontrar fotos antigas no celular para mostrar seus projetos prontos aos clientes e precisava parar o serviço na oficina o dia todo para responder mensagens básicas de orçamento.

Com isso em mente, o objetivo do aplicativo **Oficina Alta Performance** é:
1. Servir como uma vitrine (**Showroom**) organizada para apresentar aos clientes os carros já preparados pela oficina e suas fichas técnicas.
2. Permitir que os próprios clientes deixem seus **pedidos de orçamento registrados no aplicativo**, evitando que o mecânico precise parar o trabalho a todo momento para anotar pedidos por mensagem.
3. Oferecer uma ferramenta interativa de **telemetria (Medidor de Força G)** usando o sensor do celular para testar o desempenho dos carros preparados.
4. Centralizar o canal de **contato via WhatsApp** já com mensagem padrão pronta quando o cliente realmente precisar falar com a oficina.

### Requisitos Atendidos no Projeto
- Navegação entre múltiplas telas utilizando `React Navigation` (Stack Navigator).
- Estilização e organização de layout mobile utilizando `StyleSheet`, `ScrollView`, `FlatList`, `View`, `Text`, `Image` e `TouchableOpacity`.
- Integração com **banco de dados em nuvem (Google Firebase Firestore)** implementando as 4 operações do **CRUD** (*Create, Read, Update e Delete*).
- Uso de **recurso de hardware nativo do smartphone** (sensor físico **Acelerômetro** via `expo-sensors`).
- Integração externa com o aplicativo do **WhatsApp** através da API nativa `Linking`.

---

## 2. Tecnologias Utilizadas

- **Linguagem:** JavaScript (ES6+) / JSX
- **Framework Mobile:** [React Native](https://reactnative.dev/)
- **Plataforma de Desenvolvimento:** [Expo](https://expo.dev/) (`expo`, `expo-status-bar`)
- **Navegação:** [React Navigation](https://reactnavigation.org/) (`@react-navigation/native` e `@react-navigation/native-stack`)
- **Banco de Dados (Nuvem):** [Google Firebase Firestore](https://firebase.google.com/) (`firebase/firestore`)
- **Sensores Físicos do Aparelho:** [Expo Sensors](https://docs.expo.dev/versions/latest/sdk/accelerometer/) (`expo-sensors` — `Accelerometer`)
- **Ambiente e Versionamento:** Visual Studio Code, Node.js, Git e GitHub

---

## 3. Funcionalidades

### 🏠 1. Tela Inicial (`HomeScreen.jsx`)
- Apresenta a identidade visual da **Oficina Alta Performance** e funciona como menu principal de acesso rápido para todas as áreas do aplicativo, contando com ícones ilustrativos e botões estilizados com `TouchableOpacity`.

### 🏎️ 2. Showroom de Projetos (`ProjetosScreen.jsx`)
- Funciona como um mostruário digital da oficina utilizando `ScrollView` para rolagem da página.
- Exibe fotos e especificações técnicas detalhadas das preparações realizadas, como:
  - **Peugeot 206 1.6 16v Presence (2006):** Motor retificado 0.50 mm, pistões EC5, bielas aliviadas, taxa 13.5:1 no Etanol, velas de Iridium, coletor 4x2x1, remap de ECU e cabeçote retrabalhado.
  - **VW Golf GTI 2.0 TSI:** Remap Stage 2, Downpipe em Inox e filtro cônico de alto fluxo.

### 🛠️ 3. Pedidos de Orçamento — CRUD Completo (`OrcamentoScreen.jsx`)
- Permite registrar pedidos de serviço informando o **Modelo do Carro** e o **Serviço desejado**, salvando tudo em nuvem no **Firebase Firestore** (coleção `orcamentos`):
  - **Create (Criar):** Salva um novo pedido de orçamento no banco de dados com `addDoc`.
  - **Read (Ler):** Busca todos os orçamentos cadastrados com `getDocs` e exibe na tela usando `FlatList`.
  - **Update (Atualizar):** Ao tocar em **"Editar"**, carrega os dados do cartão de volta para os campos de texto e atualiza o registro no Firebase com `updateDoc`.
  - **Delete (Apagar):** Ao tocar em **"Apagar"**, remove o pedido do banco de dados com `deleteDoc`.

### ⏱️ 4. Medidor de Força G com Sensor Físico (`ForcaGScreen.jsx`)
- Acessa o hardware **Acelerômetro** do celular em tempo real a cada 500ms.
- Desconta a leitura inicial do aparelho em repouso para iniciar o marcador em **`0.00 G`**, exibindo as variações nos 3 eixos:
  - **Eixo X:** Força lateral em curvas.
  - **Eixo Y:** Força de aceleração e frenagem.
  - **Eixo Z:** Força vertical.
- Calcula a **Força G Total** aplicando o Teorema de Pitágoras em 3 dimensões ($\sqrt{x^2 + y^2 + z^2}$) e permite pausar ou iniciar a leitura a qualquer momento.

### 💬 5. Contato Rápido via WhatsApp (`ContatoScreen.jsx`)
- Utiliza o recurso nativo `Linking.openURL` do React Native para redirecionar o cliente diretamente para a conversa do WhatsApp da oficina já com uma mensagem de agendamento preenchida.

---

## 4. Demonstração

> *(Adicione aqui o link do vídeo ou o GIF/prints do aplicativo em funcionamento)*

```markdown
<!-- Exemplo para inserir GIF ou imagem de demonstração no GitHub: -->
<!-- ![Demonstração do App](./assets/demo.gif) -->
```

---

## 5. Instalação e Execução

### Pré-requisitos
- Ter o [Node.js](https://nodejs.org/) instalado no computador.
- Ter o aplicativo **Expo Go** instalado no celular (Android ou iOS) ou um navegador web.

### Passo a passo para rodar o projeto

1. **Clone este repositório:**
   ```bash
   git clone https://github.com/Danilo-Chiarelli/Projeto-ccp150.git
   ```

2. **Entre na pasta do projeto:**
   ```bash
   cd Projeto-ccp150
   ```

3. **Instale as dependências necessárias:**
   ```bash
   npm install
   ```

4. **Inicie o servidor do Expo:**
   ```bash
   npx expo start
   ```

5. **Para abrir o aplicativo:**
   - **No celular:** Escaneie o QR Code exibido no terminal utilizando o aplicativo **Expo Go**.
   - **No computador (Web):** Pressione a tecla **`w`** no terminal.

---

## 6. Aprendizados e Próximos Passos

### Aprendizados
Desenvolver este projeto permitiu entender na prática como funciona a criação de um aplicativo mobile em **React Native**, desde a diferença entre os componentes nativos (`View`, `Text`, `ScrollView`, `FlatList`, `TouchableOpacity`) até o controle de estados com `useState` e ciclo de vida com `useEffect`.

Um dos maiores aprendizados foi integrar o aplicativo com duas frentes muito importantes:
1. **Banco de Dados em Nuvem (Firebase Firestore):** Aprender a salvar, listar, editar e excluir dados reais na nuvem (CRUD).
2. **Hardware do Smartphone:** Utilizar o sensor físico de acelerômetro do celular para transformar leituras dos eixos X, Y e Z em uma funcionalidade útil dentro do tema da oficina.

### Próximos Passos
Para evoluir o aplicativo no futuro e deixá-lo ainda mais completo para o uso diário na oficina:
- Adicionar uma área de login para separar a visão do cliente da visão do mecânico.
- Permitir que o mecânico cadastre novos carros no Showroom tirando fotos direto pela câmera do celular.
- Enviar uma notificação para o cliente quando o status do orçamento dele for aprovado ou atualizado pela oficina.
