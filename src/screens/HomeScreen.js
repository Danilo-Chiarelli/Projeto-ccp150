import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

export default function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Oficina Alta Performance</Text>
      <Text style={styles.subtitulo}>Especialistas em preparação</Text>

      <View style={styles.botoes}>
        <Button title="Ver Projetos (Clio 1.6 16V e mais)" onPress={() => navigation.navigate('Projetos')} />
        <Button title="Fale Connosco (WhatsApp)" onPress={() => navigation.navigate('Contato')} />
        <Button title="Pedir Orçamento (CRUD)" onPress={() => navigation.navigate('Orcamento')} />
        <Button title="Catálogo de Peças" onPress={() => navigation.navigate('Catalogo')} />
        <Button title="Medidor de Força G (Sensor)" onPress={() => navigation.navigate('ForcaG')} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#f5f5f5' },
  titulo: { fontSize: 24, fontWeight: 'bold', marginBottom: 5 },
  subtitulo: { fontSize: 16, color: '#666', marginBottom: 30 },
  botoes: { gap: 10, width: '80%' }
});