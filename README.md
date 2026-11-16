# Oficina Alta Performance — Aplicativo Mobile

Aplicativo mobile desenvolvido em **React Native com Expo** para a disciplina de Desenvolvimento de Aplicações Móveis (**CCP150**).

---

## 1. Visão Geral e Requisitos

### Motivação e Objetivo
A ideia deste projeto surgiu de uma necessidade real: **ajudar um amigo que possui uma oficina mecânica de preparação automotiva**. No dia a dia, ele perdia muito tempo tentando encontrar fotos antigas no celular para mostrar seus projetos prontos aos clientes e precisava parar o serviço na oficina o dia todo para responder mensagens básicas de preços de peças e orçamentos.

Com isso em mente, o objetivo do aplicativo **Oficina Alta Performance** é:
1. Servir como uma vitrine (**Showroom**) organizada para apresentar aos clientes os carros já preparados pela oficina e suas fichas técnicas.
2. Disponibilizar um **Catálogo de Peças e Serviços** com preços médios para consulta rápida.
3. Permitir que os próprios clientes deixem seus **pedidos de orçamento registrados no aplicativo**, evitando que o mecânico precise parar o trabalho a todo momento para anotar pedidos por mensagem.
4. Oferecer uma ferramenta interativa de **telemetria (Medidor de Força G)** usando o sensor do celular para testar o desempenho dos carros preparados.
5. Centralizar o canal de **contato via WhatsApp** já com mensagem padrão pronta quando o cliente realmente precisar falar com a oficina.

### Requisitos Atendidos no Projeto
- **6 Telas completas** navegáveis utilizando `React Navigation` (`HomeScreen`, `ProjetosScreen`, `CatalogoScreen`, `OrcamentoScreen`, `ForcaGScreen` e `ContatoScreen`).
- Estilização e organização de layout mobile utilizando apenas componentes nativos do React Native (`StyleSheet`, `ScrollView`, `FlatList`, `View`, `Text`, `TextInput`, `Image`, `TouchableOpacity`, `Alert` e `Linking`).
- Integração com **banco de dados em nuvem (Google Firebase Firestore)** implementando as 4 operações do **CRUD** (*Create, Read, Update e Delete*).
- Uso de **sensor físico do smartphone** (**Acelerômetro** via `expo-sensors`).

---

## 2. Tecnologias e Bibliotecas Utilizadas (Explicação Detalhada)

O projeto utiliza apenas as bibliotecas fundamentais do ecossistema React Native + Expo. Abaixo está a função exata de cada biblioteca presente no projeto:

1. **`react` (`useState` e `useEffect`)**:
   - Biblioteca base para construção dos componentes em `.jsx`.
   - `useState`: Utilizado para guardar valores dinâmicos na tela (como o texto digitado nos inputs do orçamento e os valores dos eixos X, Y e Z do acelerômetro).
   - `useEffect`: Utilizado para buscar os orçamentos no Firebase assim que a tela abre e para iniciar/desligar o sensor de Força G automaticamente.
2. **`react-native`**:
   - Biblioteca padrão que fornece os componentes visuais nativos (`View`, `Text`, `Image`, `ScrollView`, `FlatList`, `TextInput`, `TouchableOpacity`, `StyleSheet`, `Alert`) e a função nativa **`Linking`** (usada para abrir o link externo do WhatsApp sem precisar de plugins extras).
3. **`@react-navigation/native` e `@react-navigation/native-stack`**:
   - Bibliotecas padrão de navegação em React Native. Criam a pilha de telas (`Stack Navigator`), permitindo ir da tela inicial para qualquer uma das outras 5 telas com barra de título e botão de voltar automático.
4. **`firebase` (`firebase/app` e `firebase/firestore`)**:
   - Biblioteca oficial do Google Firebase para conectar o aplicativo ao banco de dados em nuvem **Cloud Firestore**, usando as funções `collection`, `getDocs` (ler), `addDoc` (criar), `updateDoc` (editar) e `deleteDoc` (apagar).
5. **`expo-sensors` (`Accelerometer`)**:
   - Biblioteca oficial do Expo para comunicação com o hardware físico do celular. Como o React Native sozinho não lê o chip de movimento do aparelho, o `Accelerometer` do `expo-sensors` foi utilizado para capturar a aceleração física nos eixos X, Y e Z a cada 500ms (`setUpdateInterval(500)` e `addListener`).

---

## 3. Funcionalidades (As 6 Telas do Aplicativo)

### 1ª Tela: Menu Principal (`HomeScreen.jsx`)
- Tela inicial da **Oficina Alta Performance** que apresenta o título estilizado e os 5 botões (`TouchableOpacity`) que levam o usuário para cada uma das demais telas do aplicativo.

### 2ª Tela: Showroom de Projetos (`ProjetosScreen.jsx`)
- Funciona como o mostruário digital da oficina utilizando `ScrollView` para rolagem da página.
- Exibe fotos e especificações das preparações realizadas:
  - **Peugeot 206 1.6 16v Presence (2006):** Motor retificado 0.50 mm, pistões EC5, bielas aliviadas, taxa 13.5:1 no Etanol, velas de Iridium, coletor 4x2x1, remap de ECU e cabeçote retrabalhado.
  - **VW Golf GTI 2.0 TSI:** Remap Stage 2, Downpipe em Inox e filtro cônico de alto fluxo.

### 3ª Tela: Catálogo de Peças e Serviços (`CatalogoScreen.jsx`)
- Lista informativa em `ScrollView` com os principais kits de preparação trabalhados na oficina (Kit Pistões EC5, Coletor 4x2x1 em Inox, Downpipe + Filtro Esportivo e Remapeamento de ECU) e suas faixas médias de preço, diminuindo as dúvidas básicas de clientes.

### 4ª Tela: Pedir Orçamento — CRUD Completo (`OrcamentoScreen.jsx`)
- Permite registrar pedidos de serviço informando o **Modelo do Carro** e o **Serviço desejado**, salvando tudo em nuvem no **Firebase Firestore** (coleção `orcamentos`):
  - **Create (Criar):** Salva um novo pedido de orçamento no banco de dados com `addDoc`.
  - **Read (Ler):** Busca todos os orçamentos cadastrados com `getDocs` e exibe na tela usando `FlatList`.
  - **Update (Atualizar):** Ao tocar em **"Editar"**, carrega os dados do cartão de volta para os campos de texto e atualiza o registro no Firebase com `updateDoc`.
  - **Delete (Apagar):** Ao tocar em **"Apagar"**, remove o pedido do banco de dados com `deleteDoc`.

### 5ª Tela: Medidor de Força G com Sensor Físico (`ForcaGScreen.jsx`)
- Acessa o hardware **Acelerômetro** do celular em tempo real a cada 500ms.
- Desconta a leitura inicial do aparelho parado para iniciar o marcador em **`0.00 G`**, exibindo as variações nos 3 eixos:
  - **Eixo X (Curvas):** Força lateral.
  - **Eixo Y (Aceleração):** Arrancada e frenagem.
  - **Eixo Z (Vertical):** Variação vertical da pista.
- Calcula a **Força G Total** aplicando o Teorema de Pitágoras em 3 dimensões ($\sqrt{x^2 + y^2 + z^2}$) e permite pausar ou iniciar a telemetria.

### 6ª Tela: Fale Conosco via WhatsApp (`ContatoScreen.jsx`)
- Utiliza o recurso nativo `Linking.openURL` do React Native para redirecionar o cliente diretamente para o WhatsApp da oficina já com a mensagem de avaliação preenchida.

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
2. **Hardware do Smartphone:** Utilizar o sensor físico de acelerômetro do celular para transformar leituras dos eixos X, Y e Z em uma funcionalidade prática dentro do tema da oficina.

### Próximos Passos
Para evoluir o aplicativo no futuro e deixá-lo ainda mais completo para o uso diário na oficina:
- Adicionar uma área de login para separar a visão do cliente da visão do mecânico.
- Permitir que o mecânico cadastre novos carros no Showroom tirando fotos direto pela câmera do celular.
- Enviar uma notificação para o cliente quando o status do orçamento dele for aprovado ou atualizado pela oficina.
