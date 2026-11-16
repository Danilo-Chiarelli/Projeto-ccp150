import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Alert,
} from 'react-native';
import {
  collection,
  addDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  doc,
} from 'firebase/firestore';
import { db } from '../services/firebase';

export default function OrcamentoScreen() {
  // Estados para guardar os textos digitados e a lista de orçamentos
  const [carro, setCarro] = useState('');
  const [servico, setServico] = useState('');
  const [listaOrcamentos, setListaOrcamentos] = useState([]);
  const [idEditando, setIdEditando] = useState(null);

  const orcamentosRef = collection(db, 'orcamentos');

  // 1. READ (Buscar dados do Firebase)
  const buscarOrcamentos = async () => {
    try {
      const dados = await getDocs(orcamentosRef);
      const lista = dados.docs.map((documento) => ({
        ...documento.data(),
        id: documento.id,
      }));
      setListaOrcamentos(lista);
    } catch (erro) {
      console.error('Erro ao buscar: ', erro);
    }
  };

  useEffect(() => {
    buscarOrcamentos();
  }, []);

  const salvarOuAtualizar = async () => {
    if (carro === '' || servico === '') {
      Alert.alert('Aviso', 'Preencha o carro com a placa e o serviço.');
      return;
    }

    try {
      if (idEditando) {
        const orcamentoDoc = doc(db, 'orcamentos', idEditando);
        await updateDoc(orcamentoDoc, { carro: carro, servico: servico });
        setIdEditando(null);
      } else {
        await addDoc(orcamentosRef, { carro: carro, servico: servico });
      }

      setCarro('');
      setServico('');
      buscarOrcamentos();
    } catch (erro) {
      console.error('Erro ao salvar: ', erro);
    }
  };

  const prepararEdicao = (item) => {
    setCarro(item.carro);
    setServico(item.servico);
    setIdEditando(item.id);
  };

  const removerOrcamento = async (id) => {
    try {
      const orcamentoDoc = doc(db, 'orcamentos', id);
      await deleteDoc(orcamentoDoc);
      buscarOrcamentos();
    } catch (erro) {
      console.error('Erro ao remover: ', erro);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Pedir Orçamento</Text>

      <TextInput
        style={styles.input}
        placeholder="Modelo do Carro (ex: Clio 1.6, placa aaa1b23)"
        placeholderTextColor="#888"
        value={carro}
        onChangeText={setCarro}
      />
      <TextInput
        style={styles.input}
        placeholder="Serviço (ex: Remap ECU)"
        placeholderTextColor="#888"
        value={servico}
        onChangeText={setServico}
      />

      <TouchableOpacity
        style={[styles.botaoAdicionar, idEditando ? styles.botaoEditar : null]}
        onPress={salvarOuAtualizar}
      >
        <Text style={styles.textoBotao}>
          {idEditando ? 'Atualizar Pedido' : 'Salvar Pedido'}
        </Text>
      </TouchableOpacity>

      <FlatList
        data={listaOrcamentos}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.textoCarro}>{item.carro}</Text>
            <Text style={styles.textoServico}>{item.servico}</Text>

            <View style={styles.acoes}>
              <TouchableOpacity onPress={() => prepararEdicao(item)}>
                <Text style={styles.btnAprovar}>Editar</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => removerOrcamento(item.id)}>
                <Text style={styles.btnRemover}>Apagar</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#121212',
  },
  titulo: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 15,
  },
  input: {
    backgroundColor: '#1e1e1e',
    color: '#ffffff',
    borderWidth: 1,
    borderColor: '#333',
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
  },
  botaoAdicionar: {
    backgroundColor: '#d32f2f',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 20,
  },
  botaoEditar: {
    backgroundColor: '#1976d2',
  },
  textoBotao: {
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  card: {
    backgroundColor: '#1e1e1e',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#333',
  },
  textoCarro: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  textoServico: {
    fontSize: 15,
    color: '#b0bec5',
    marginBottom: 10,
  },
  acoes: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  btnAprovar: {
    color: '#64b5f6',
    fontWeight: 'bold',
  },
  btnRemover: {
    color: '#ff5252',
    fontWeight: 'bold',
  },
});
