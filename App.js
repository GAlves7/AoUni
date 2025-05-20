import 'react-native-gesture-handler'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import Login from './src/screens/Login'
import CriarConta from './src/screens/CriarConta'
import EsqueceuSenha01 from './src/screens/EsqueceuSenha01'
import EsqueceuSenha02 from './src/screens/EsqueceuSenha02'

const Stack = createNativeStackNavigator()

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="CriarConta" component={CriarConta} />
        <Stack.Screen name="EsqueceuSenha01" component={EsqueceuSenha01} />
        <Stack.Screen name="EsqueceuSenha02" component={EsqueceuSenha02} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}