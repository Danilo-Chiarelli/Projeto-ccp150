import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet, Alert } from 'react-native';
import { collection, addDoc, getDocs, updateDoc, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../services/firebase'; // Importa a nossa ligação ao banco

export default function OrcamentoScreen() {
  // Gestão de Estado (State Management)
  const [carro, setCarro] = useState('');
  const [servico, setServico] = useState('');
  const [listaOrcamentos, setListaOrcamentos] = useState([]);

  // Referência à coleção "orcamentos" no banco NoSQL
  const orcamentosRef = collection(db, 'orcamentos');

  // 1. READ (Recuperar dados) - Acionado automaticamente ao abrir a ecrã
  const buscarOrcamentos = async () => {
    try {
      const dados = await getDocs(orcamentosRef);
      // Mapeia os documentos Firestore para uma matriz (array) JavaScript
      const lista = dados.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
      setListaOrcamentos(lista);
    } catch (erro) {
      console.error("Erro ao buscar: ", erro);
    }
  };

  // O useEffect garante que a busca ocorre no momento em que o ecrã carrega
  useEffect(() => {
    buscarOrcamentos();
  }, []);

  // 2. CREATE (Salvar dados)
  const adicionarOrcamento = async () => {
    if (carro === '' || servico === '') {
      Alert.alert('Aviso', 'Preencha o carro e o serviço.');
      return;
    }
    try {
      await addDoc(orcamentosRef, { carro: carro, servico: servico });
      setCarro('');
      setServico('');
      buscarOrcamentos(); // Atualiza a lista no ecrã
    } catch (erro) {
      console.error("Erro ao adicionar: ", erro);
    }
  };

  // 3. UPDATE (Atualizar dados)
 // 3. UPDATE (Atualizar dados)
  const atualizarOrcamento = async (id, servicoAtual) => {
    try {
      const orcamentoDoc = doc(db, 'orcamentos', id);
      // Atualiza o pedido adicionando a confirmação do cliente
      await updateDoc(orcamentoDoc, { servico: servicoAtual + " - [Confirmado]" });
      buscarOrcamentos();
    } catch (erro) {
      console.error("Erro ao atualizar: ", erro);
    }
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
      
      <TouchableOpacity style={styles.botaoAdicionar} onPress={adicionarOrcamento}>
        <Text style={styles.textoBotao}>confirmar Pedido</Text>
      </TouchableOpacity>

      {/* Renderização da Lista de Dados (Read) */}
      <FlatList 
        data={listaOrcamentos}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.textoCarro}>{item.carro}</Text>
            <Text style={styles.textoServico}>{item.servico}</Text>
            
            <View style={styles.acoes}>
              <TouchableOpacity onPress={() => atualizarOrcamento(item.id)}><Text style={styles.btnAprovar}>Aprovar</Text></TouchableOpacity>
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
  textoBotao: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
  card: { backgroundColor: '#fff', padding: 15, borderRadius: 8, marginBottom: 10, elevation: 2 },
  textoCarro: { fontSize: 18, fontWeight: 'bold' },
  textoServico: { fontSize: 15, color: '#666', marginBottom: 10 },
  acoes: { flexDirection: 'row', justifyContent: 'space-between' },
  btnAprovar: { color: '#2e7d32', fontWeight: 'bold' },
  btnRemover: { color: '#c62828', fontWeight: 'bold' }
});