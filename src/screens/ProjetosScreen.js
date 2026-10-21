import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView } from 'react-native';

export default function ProjetosScreen() {
  return (
    // O ScrollView substitui a View comum para permitir que o utilizador faça scroll no ecrã
    <ScrollView style={styles.container}>
      <Text style={styles.titulo}>Projetos da Oficina</Text>
      
      {/* Projeto 1 - Clio 1.6 */}
      <View style={styles.card}>
        <Image 
          // Link temporário da internet. Para usar uma foto real depois, altere para: source={require('../assets/sua-foto.jpg')}
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
          • Angulo de valvulas feito para a compressao do motor{'\n'}
        </Text>
      </View>

      {/* Projeto 2 - Exemplo Secundário */}
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

// Organização de Layout e UX exigida pelo projeto
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#eceff1',
    padding: 15, // Espaçamento adequado nas bordas
  },
  titulo: {
    fontSize: 26,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#263238',
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 15,
    marginBottom: 25,
    // Aplicação de sombra para destacar os elementos (Feedback visual e UX)
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.15,
    shadowRadius: 5,
    elevation: 4, 
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
    color: '#d32f2f', // Destaque em vermelho
    marginBottom: 8,
  },
  detalhes: {
    fontSize: 15,
    color: '#546e7a',
    lineHeight: 24, // Espaçamento entre linhas para facilitar a leitura
  }
});