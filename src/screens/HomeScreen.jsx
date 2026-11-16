import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';

export default function HomeScreen({ navigation }) {
  return (
    <View style={styles.tela}>
      {/* Imagens com fundo transparente atrás do background */}
      <View style={styles.fundoImagens} pointerEvents="none">
        <Image
          source={{ uri: 'https://img.icons8.com/color/480/f1-race-car-side-view.png' }}
          style={[styles.imgFundo, { top: 10, left: -20 }]}
        />
        <Image
          source={{ uri: 'https://img.icons8.com/color/480/finish-flag.png' }}
          style={[styles.imgFundo, { top: 40, right: -20 }]}
        />
        <Image
          source={{ uri: 'https://img.icons8.com/color/480/engine.png' }}
          style={[styles.imgFundo, { top: '40%', right: -30 }]}
        />
        <Image
          source={{ uri: 'https://img.icons8.com/color/480/maintenance.png' }}
          style={[styles.imgFundo, { top: '45%', left: -25 }]}
        />
        <Image
          source={{ uri: 'https://img.icons8.com/color/480/speed.png' }}
          style={[styles.imgFundo, { bottom: 20, right: -10 }]}
        />
      </View>

      <ScrollView contentContainerStyle={styles.container}>
        {/* Apenas as letras com o nome da oficina nas cores do Brasil */}
        <View style={styles.tituloBox}>
          <Text style={styles.tituloVerde}>OFICINA</Text>
          <Text style={styles.tituloAmarelo}>SIMAS</Text>
          <Text style={styles.tituloAzul}>PERFORMANCE</Text>
        </View>

        {/* Botões para as outras 5 telas (Totalizando as 6 telas obrigatórias) */}
        <View style={styles.botoes}>
          <TouchableOpacity
            style={styles.botaoCard}
            onPress={() => navigation.navigate('Projetos')}
          >
            <Image
              source={{ uri: 'https://img.icons8.com/color/160/f1-race-car-side-view.png' }}
              style={styles.icone}
            />
            <Text style={styles.textoBotao}>Ver Projetos Exclusivos</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.botaoCard}
            onPress={() => navigation.navigate('Catalogo')}
          >
            <Image
              source={{ uri: 'https://img.icons8.com/color/160/engine.png' }}
              style={styles.icone}
            />
            <Text style={styles.textoBotao}>Catálogo de Peças</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.botaoCard}
            onPress={() => navigation.navigate('ForcaG')}
          >
            <Image
              source={{ uri: 'https://img.icons8.com/color/160/speed.png' }}
              style={styles.icone}
            />
            <Text style={styles.textoBotao}>Medidor de Força G (Sensor)</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.botaoCard}
            onPress={() => navigation.navigate('Orcamento')}
          >
            <Image
              source={{ uri: 'https://img.icons8.com/color/160/maintenance.png' }}
              style={styles.icone}
            />
            <Text style={styles.textoBotao}>Pedir Orçamento (CRUD)</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.botaoCard}
            onPress={() => navigation.navigate('Contato')}
          >
            <Image
              source={{ uri: 'https://img.icons8.com/color/160/whatsapp--v1.png' }}
              style={styles.icone}
            />
            <Text style={styles.textoBotao}>Fale Conosco (WhatsApp)</Text>
          </TouchableOpacity>
        </View>

        {/* Frase no final com labaredas de fogo atrás */}
        <View style={styles.fogoBox}>
          <View style={styles.labaredasFundo} pointerEvents="none">
            <Image
              source={{ uri: 'https://img.icons8.com/color/240/fire-element--v1.png' }}
              style={styles.chama}
            />
            <Image
              source={{ uri: 'https://img.icons8.com/color/240/fire-element--v1.png' }}
              style={styles.chama}
            />
            <Image
              source={{ uri: 'https://img.icons8.com/color/240/fire-element--v1.png' }}
              style={styles.chama}
            />
          </View>
          <Text style={styles.fraseFinal}>NÃO É PRESSA, É PRESSÃO</Text>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  tela: {
    flex: 1,
    backgroundColor: '#121212',
  },
  fundoImagens: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  imgFundo: {
    position: 'absolute',
    width: 200,
    height: 200,
    opacity: 0.15,
  },
  container: {
    alignItems: 'center',
    padding: 20,
    paddingTop: 30,
    paddingBottom: 40,
  },
  tituloBox: {
    alignItems: 'center',
    marginBottom: 35,
  },
  tituloVerde: {
    fontSize: 44,
    fontWeight: 'bold',
    color: '#00A859',
  },
  tituloAmarelo: {
    fontSize: 42,
    fontWeight: 'bold',
    color: '#FFCC29',
  },
  tituloAzul: {
    fontSize: 38,
    fontWeight: 'bold',
    color: '#38BDF8',
  },
  botoes: {
    width: '100%',
    gap: 14,
  },
  botaoCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1e1e1e',
    padding: 15,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#333',
  },
  icone: {
    width: 45,
    height: 45,
    marginRight: 15,
  },
  textoBotao: {
    color: '#ffffff',
    fontSize: 17,
    fontWeight: 'bold',
  },
  fogoBox: {
    marginTop: 45,
    paddingVertical: 25,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  labaredasFundo: {
    position: 'absolute',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  chama: {
    width: 90,
    height: 90,
    opacity: 0.6,
    marginHorizontal: -10,
  },
  fraseFinal: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffffff',
    textAlign: 'center',
  },
});
