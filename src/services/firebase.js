import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

// O objeto de configuração que o Firebase fornece quando criamos o projeto
const firebaseConfig = {
  apiKey: "COLE_AQUI_A_SUA_API_KEY",
  authDomain: "projeto-oficina.firebaseapp.com",
  projectId: "projeto-oficina",
  storageBucket: "projeto-oficina.appspot.com",
  messagingSenderId: "123456789",
  appId: "COLE_AQUI_O_SEU_APP_ID"
};

// Inicializa a aplicação Firebase
const app = initializeApp(firebaseConfig);

// Exporta a instância do banco de dados (Firestore) para ser usada nas ecrãs
export const db = getFirestore(app);