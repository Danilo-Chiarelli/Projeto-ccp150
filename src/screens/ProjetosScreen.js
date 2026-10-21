import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

// Função que renderiza o ecrã inicial
export default function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Oficina Alta Performance</Text>
      
      {/* Botão que aciona a navegação para o ecrã de Projetos */}
      <Button 
        title="Ver Nossos Projetos" 
        onPress={() => navigation.navigate('Projetos')} 
      />
    </View>
  );
}

// Estilos básicos para manter o layout organizado
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  }
});