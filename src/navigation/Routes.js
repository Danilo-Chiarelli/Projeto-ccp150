import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Importação das ecrãs criadas
import HomeScreen from '../screens/HomeScreen';
import ProjetosScreen from '../screens/ProjetosScreen';
// Importe as restantes 4 ecrãs aqui...

const Stack = createNativeStackNavigator();

export default function Routes() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        {/* Definição de cada rota e o seu título na barra superior */}
        <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Início' }} />
        <Stack.Screen name="Projetos" component={ProjetosScreen} options={{ title: 'Nossos Projetos' }} />
        {/* Adicione as rotas para Contato, Orcamento, Catalogo e ForcaG aqui... */}
      </Stack.Navigator>
    </NavigationContainer>
  );
}