import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Accelerometer } from 'expo-sensors';

export default function ForcaGScreen() {
  // Estado para armazenar as coordenadas X, Y e Z do hardware
  const [{ x, y, z }, setDadosAcelerometro] = useState({ x: 0, y: 0, z: 0 });
  
  // Estado para controlar a subscrição do sensor
  const [subscricao, setSubscricao] = useState(null);

  // Função para ligar o sensor
  const iniciarSensor = () => {
    // Define a velocidade de atualização para 500ms para não sobrecarregar o processador
    Accelerometer.setUpdateInterval(500); 
    
    // Fica à escuta (Listener) das mudanças físicas no telemóvel
    setSubscricao(
      Accelerometer.addListener(dados => {
        setDadosAcelerometro(dados);
      })
    );
  };

  // Função para desligar o sensor e poupar bateria/memória
  const pararSensor = () => {
    if (subscricao) {
      subscricao.remove();
    }
    setSubscricao(null);
  };

  // Ciclo de vida: liga o sensor ao abrir o ecrã e desliga ao sair (Clean-up function)
  useEffect(() => {
    iniciarSensor();
    return () => pararSensor();
  }, []);

  // Cálculo vetorial básico para obter a Força G Total (Teorema de Pitágoras em 3D)
  const forcaGTotal = Math.sqrt(x * x + y * y + z * z).toFixed(2);

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Telemetria em Tempo Real</Text>
      <Text style={styles.descricao}>
        Coloque o telemóvel num suporte no painel do carro para medir a Força G durante a aceleração e travagem.
      </Text>

      <View style={styles.painelDisplay}>
        <Text style={styles.textoGTotal}>{forcaGTotal} G</Text>
      </View>

      <View style={styles.eixosContainer}>
        <Text style={styles.textoEixo}>Eixo X (Curvas): {x.toFixed(2)}</Text>
        <Text style={styles.textoEixo}>Eixo Y (Aceleração): {y.toFixed(2)}</Text>
        <Text style={styles.textoEixo}>Eixo Z (Vertical): {z.toFixed(2)}</Text>
      </View>

      <TouchableOpacity 
        style={[styles.botao, subscricao ? styles.botaoParar : styles.botaoIniciar]} 
        onPress={subscricao ? pararSensor : iniciarSensor}
      >
        <Text style={styles.textoBotao}>
          {subscricao ? "Pausar Telemetria" : "Iniciar Telemetria"}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#121212', // Fundo escuro para visual desportivo
    padding: 20,
  },
  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 10,
  },
  descricao: {
    fontSize: 14,
    color: '#b0bec5',
    textAlign: 'center',
    marginBottom: 40,
  },
  painelDisplay: {
    width: 200,
    height: 200,
    borderRadius: 100,
    borderWidth: 8,
    borderColor: '#ff5252',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 30,
    backgroundColor: '#1e1e1e',
  },
  textoGTotal: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#ff5252',
  },
  eixosContainer: {
    width: '100%',
    backgroundColor: '#1e1e1e',
    padding: 20,
    borderRadius: 10,
    marginBottom: 30,
  },
  textoEixo: {
    fontSize: 18,
    color: '#ffffff',
    marginBottom: 5,
    fontFamily: 'monospace',
  },
  botao: {
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 8,
  },
  botaoIniciar: {
    backgroundColor: '#4caf50',
  },
  botaoParar: {
    backgroundColor: '#f44336',
  },
  textoBotao: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
  }
});