import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Linking, Alert } from 'react-native';

export default function ContatoScreen() {
  
  const abrirWhatsApp = async () => {
    const numero = '5511999999999'; //trocar para o numero da oficina !
    const mensagem = 'Olá! Gostaria de agendar uma avaliação para o meu carro.';
    
    const url = `whatsapp://send?phone=${numero}&text=${mensagem}`;

    try {
      const suportado = await Linking.canOpenURL(url);

      if (suportado) {
        await Linking.openURL(url);
      } else {
        Alert.alert('Erro', 'O WhatsApp não está instalado neste dispositivo.');
      }
    } catch (error) {
      Alert.alert('Erro', 'Ocorreu uma falha ao tentar abrir o link.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Fale com um de nossos Mecânicos</Text>
      <Text style={styles.descricao}>
        Precisa de um orçamento detalhado para o seu projeto? Envie-nos uma mensagem diretamente.
      </Text>

      {/* TouchableOpacity é usado em vez do Button padrão para permitir estilizarmos o botão livremente */}
      <TouchableOpacity style={styles.botaoWhatsApp} onPress={abrirWhatsApp}>
        <Text style={styles.textoBotao}>Chamar no WhatsApp</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#eceff1',
    padding: 20,
  },
  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#263238',
  },
  descricao: {
    fontSize: 16,
    textAlign: 'center',
    color: '#546e7a',
    marginBottom: 30,
    lineHeight: 22,
  },
  botaoWhatsApp: {
    backgroundColor: '#25D366', // Cor oficial da marca WhatsApp
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 8,
    elevation: 3,
  },
  textoBotao: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  }
});