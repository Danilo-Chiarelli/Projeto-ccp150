import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function ProjetosScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.texto}>Página em construção...</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  texto: { fontSize: 18 }
});