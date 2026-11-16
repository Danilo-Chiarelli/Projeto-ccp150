import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
//importa o jsx e mantem um hisotrico de onde o usuario esta, para fazer o botao voltar do celular funcionar
import HomeScreen from '../screens/HomeScreen.jsx';
import ProjetosScreen from '../screens/ProjetosScreen.jsx';
import ContatoScreen from '../screens/ContatoScreen.jsx';
import OrcamentoScreen from '../screens/OrcamentoScreen.jsx';
import ForcaGScreen from '../screens/ForcaGScreen.jsx';
//isso e pra "andar" dentro das telas e mostrar como um baralho, uma tela vai aparecer sob a outra
const Stack = createNativeStackNavigator();

export default function Routes() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerStyle: { backgroundColor: '#1e1e1e' },
          headerTintColor: '#ffffff',
        }}
      >
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ title: 'Oficina Alta Performance Simas' }}
        />
        <Stack.Screen
          name="Projetos"
          component={ProjetosScreen}
          options={{ title: 'Nossos Projetos !' }}
        />
        <Stack.Screen
          name="Contato"
          component={ContatoScreen}
          options={{ title: 'Fale Conosco' }}
        />
        <Stack.Screen
          name="Orcamento"
          component={OrcamentoScreen}
          options={{ title: 'Pedir Orçamento' }}
        />
        <Stack.Screen
          name="ForcaG"
          component={ForcaGScreen}
          options={{ title: 'Medidor Força G' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
// mostrta pro app onde iniciar ao ser aberto e faz as setas de voltar e escreve o nome da tela no header