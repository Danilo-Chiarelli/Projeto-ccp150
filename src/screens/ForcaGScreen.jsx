import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import { Accelerometer } from 'expo-sensors';

export default function ForcaGScreen() {
  const [{ x, y, z }, setDadosAcelerometro] = useState({ x: 0, y: 0, z: 0 });
  const [subscricao, setSubscricao] = useState(null);

  // Função para ligar o sensor
  const iniciarSensor = () => {
    if (Platform.OS === 'web') {
      return;
    }

    Accelerometer.setUpdateInterval(500);

    let leituraInicial = null;

    const listener = Accelerometer.addListener((dados) => {
      // Guarda a primeira leitura como ponto zero (desconta a gravidade com o celular parado)
      if (!leituraInicial) {
        leituraInicial = dados;
      }

      setDadosAcelerometro({
        x: dados.x - leituraInicial.x,
        y: dados.y - leituraInicial.y,
        z: dados.z - leituraInicial.z,
      });
    });

    setSubscricao(listener);
  };

  // Função para desligar o sensor e zerar os valores
  const pararSensor = () => {
    if (subscricao) {
      subscricao.remove();
    }
    setSubscricao(null);
    setDadosAcelerometro({ x: 0, y: 0, z: 0 });
  };

  useEffect(() => {
    iniciarSensor();
    return () => {
      if (subscricao) {
        subscricao.remove();
      }
    };
  }, []);

  // Cálculo de Pitágoras 3D para obter a Força G Total
  const forcaGTotal = Math.sqrt(x * x + y * y + z * z).toFixed(2);

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Telemetria em Tempo Real</Text>
      <Text style={styles.descricao}>
        Quanto mais estavel o celular, mais certeira sera a mediçao
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
          {subscricao ? 'Pausar Telemetria' : 'Iniciar Telemetria'}
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
    backgroundColor: '#121212',
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
  },
});
