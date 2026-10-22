import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeScreen from '../screens/HomeScreen';
import ProjetosScreen from '../screens/ProjetosScreen';
import ContatoScreen from '../screens/ContatoScreen';
import OrcamentoScreen from '../screens/OrcamentoScreen';
import CatalogoScreen from '../screens/CatalogoScreen';
import ForcaGScreen from '../screens/ForcaGScreen';

const Stack = createNativeStackNavigator();

export default function Routes() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Oficina Alta Performance simas' }} />
        <Stack.Screen name="Projetos" component={ProjetosScreen} options={{ title: 'alguns prjetos' }} />
        <Stack.Screen name="Contato" component={ContatoScreen} options={{ title: 'Fale Connosco' }} />
        <Stack.Screen name="Orcamento" component={OrcamentoScreen} options={{ title: 'Pedir Orçamento' }} />
        <Stack.Screen name="Catalogo" component={CatalogoScreen} options={{ title: 'Catálogo de Peças' }} />
        <Stack.Screen name="ForcaG" component={ForcaGScreen} options={{ title: 'Medidor Força G' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}