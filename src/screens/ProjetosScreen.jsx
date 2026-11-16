import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView } from 'react-native';

export default function ProjetosScreen() {
  return (
    // ScrollView permite rolar a tela para ver todos os carros do showroom
    <ScrollView style={styles.container}>
      <Text style={styles.titulo}>Showroom da Oficina</Text>

      {/* Projeto 1 - Peugeot 206 */}
      <View style={styles.card}>
        <Image
          source={{ uri: 'https://images.unsplash.com/photo-1553440569-bcc63803a83d?w=500' }}
          style={styles.imagem}
        />
        <Text style={styles.nomeCarro}>Peugeot 206 1.6 16v Presence (2006)</Text>
        <Text style={styles.detalhes}>
          • Motor retificado com sobremedida de 0.50 mm{'\n'}
          • Pistões Peugeot EC5 e bielas aliviadas{'\n'}
          • Taxa de compressão 13.5:1 (Etanol){'\n'}
          • Velas de Iridium mais frias{'\n'}
          • Coletor de escape dimensionado 4x2x1{'\n'}
          • Remapeamento da ECU{'\n'}
          • Cabeçote retrabalhado{'\n'}
          • Angulo de valvulas feito para a compressao do motor
        </Text>
      </View>

      {/* Projeto 2 - VW Golf GTI */}
      <View style={styles.card}>
        <Image
          source={{ uri: 'https://images.unsplash.com/photo-1600705722908-bab1e61c0b4d?w=500' }}
          style={styles.imagem}
        />
        <Text style={styles.nomeCarro}>VW Golf GTI 2.0 TSI</Text>
        <Text style={styles.detalhes}>
          • Remap Stage 2{'\n'}
          • Downpipe em Inox{'\n'}
          • Filtro cónico de alto fluxo
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
    padding: 15,
  },
  titulo: {
    fontSize: 26,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#ffffff',
  },
  card: {
    backgroundColor: '#1e1e1e',
    borderRadius: 12,
    padding: 15,
    marginBottom: 25,
    borderWidth: 1,
    borderColor: '#333',
  },
  imagem: {
    width: '100%',
    height: 200,
    borderRadius: 8,
    marginBottom: 15,
  },
  nomeCarro: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ff5252',
    marginBottom: 8,
  },
  detalhes: {
    fontSize: 15,
    color: '#b0bec5',
    lineHeight: 24,
  },
});
