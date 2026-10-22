import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

// A configuração da sua aplicação web copiada do Firebase[cite: 30]
const firebaseConfig = {
  apiKey: "AIzaSyDG1vAsV9QKZFRxWg3AkxsFMgARHUA2l9s",
  authDomain: "oficina-ccp150.firebaseapp.com",
  projectId: "oficina-ccp150",
  storageBucket: "oficina-ccp150.firebasestorage.app",
  messagingSenderId: "581114355491",
  appId: "1:581114355491:web:29be89da38514fe1603696",
  measurementId: "G-ZXGWS4RY13"
};

// Inicializa a aplicação Firebase
const app = initializeApp(firebaseConfig);

// Exporta a instância do banco de dados (Firestore) para ser usada no ecrã de orçamentos
export const db = getFirestore(app);