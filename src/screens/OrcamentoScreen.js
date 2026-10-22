import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet, Alert } from 'react-native';
import { collection, addDoc, getDocs, updateDoc, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../services/firebase'; 

export default function OrcamentoScreen() {
  // Gestão de Estado (State Management)
  const [carro, setCarro] = useState('');
  const [servico, setServico] = useState('');
  const [listaOrcamentos, setListaOrcamentos] = useState([]);
  
  // Novo Estado: Guarda o ID do orçamento que estamos a editar no momento
  const [idEditando, setIdEditando] = useState(null);

  const orcamentosRef = collection(db, 'orcamentos');

  // 1. READ (Recuperar dados)
  const buscarOrcamentos = async () => {
    try {
      const dados = await getDocs(orcamentosRef);
      const lista = dados.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
      setListaOrcamentos(lista);
    } catch (erro) {
      console.error("Erro ao buscar: ", erro);
    }
  };

  useEffect(() => {
    buscarOrcamentos();
  }, []);

  // 2 e 3. CREATE e UPDATE (Salvar ou Atualizar dados)
  const salvarOuAtualizar = async () => {
    if (carro === '' || servico === '') {
      Alert.alert('Aviso', 'Preencha o carro e o serviço.');
      return;
    }
    try {
      if (idEditando) {
        // Se temos um ID na memória, significa que é um UPDATE
        const orcamentoDoc = doc(db, 'orcamentos', idEditando);
        await updateDoc(orcamentoDoc, { carro: carro, servico: servico });
        setIdEditando(null); // Limpa a memória de edição
      } else {
        // Se não temos ID, significa que é um CREATE (novo pedido)
        await addDoc(orcamentosRef, { carro: carro, servico: servico });
      }
      
      // Limpa as caixas de texto e recarrega a lista
      setCarro('');
      setServico('');
      buscarOrcamentos(); 
    } catch (erro) {
      console.error("Erro ao salvar: ", erro);
    }
  };

  // Função auxiliar para colocar os dados na caixa de texto antes do Update
  const prepararEdicao = (item) => {
    setCarro(item.carro);
    setServico(item.servico);
    setIdEditando(item.id);
  };

  // 4. DELETE (Remover dados)
  const removerOrcamento = async (id) => {
    try {
      const orcamentoDoc = doc(db, 'orcamentos', id);
      await deleteDoc(orcamentoDoc);
      buscarOrcamentos();
    } catch (erro) {
      console.error("Erro ao remover: ", erro);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Pedir Orçamento</Text>
      
      {/* Formulário de Entrada */}
      <TextInput style={styles.input} placeholder="Modelo do Carro (ex: Clio 1.6)" value={carro} onChangeText={setCarro} />
      <TextInput style={styles.input} placeholder="Serviço (ex: Remap ECU)" value={servico} onChangeText={setServico} />
      
      <TouchableOpacity 
        // O botão muda de cor consoante estarmos a criar ou a editar
        style={[styles.botaoAdicionar, idEditando ? styles.botaoEditar : null]} 
        onPress={salvarOuAtualizar}
      >
        <Text style={styles.textoBotao}>
          {idEditando ? "Atualizar Pedido" : "Salvar Pedido"}
        </Text>
      </TouchableOpacity>

      {/* Renderização da Lista de Dados */}
      <FlatList 
        data={listaOrcamentos}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.textoCarro}>{item.carro}</Text>
            <Text style={styles.textoServico}>{item.servico}</Text>
            
            <View style={styles.acoes}>
              <TouchableOpacity onPress={() => prepararEdicao(item)}><Text style={styles.btnAprovar}>Editar</Text></TouchableOpacity>
              <TouchableOpacity onPress={() => removerOrcamento(item.id)}><Text style={styles.btnRemover}>Apagar</Text></TouchableOpacity>
            </View>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#f5f5f5' },
  titulo: { fontSize: 22, fontWeight: 'bold', marginBottom: 15 },
  input: { backgroundColor: '#fff', borderWidth: 1, borderColor: '#ccc', borderRadius: 8, padding: 10, marginBottom: 10 },
  botaoAdicionar: { backgroundColor: '#d32f2f', padding: 15, borderRadius: 8, alignItems: 'center', marginBottom: 20 },
  botaoEditar: { backgroundColor: '#1976d2' }, // Azul para o modo de edição
  textoBotao: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
  card: { backgroundColor: '#fff', padding: 15, borderRadius: 8, marginBottom: 10, elevation: 2 },
  textoCarro: { fontSize: 18, fontWeight: 'bold' },
  textoServico: { fontSize: 15, color: '#666', marginBottom: 10 },
  acoes: { flexDirection: 'row', justifyContent: 'space-between' },
  btnAprovar: { color: '#1976d2', fontWeight: 'bold' },
  btnRemover: { color: '#c62828', fontWeight: 'bold' }
});