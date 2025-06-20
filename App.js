import 'react-native-gesture-handler'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import Login from './src/screens/Acesso/Login'
import CriarConta from './src/screens/Acesso/CriarConta'
import EsqueceuSenha01 from './src/screens/Acesso/EsqueceuSenha01'
import EsqueceuSenha02 from './src/screens/Acesso/EsqueceuSenha02'
import Medicina from './src/screens/BarraNavegacao/Funcionalidades/Pesquisar/Medicina'
import Direito from './src/screens/BarraNavegacao/Funcionalidades/Pesquisar/Direito'
import InfoGrupoMed from './src/screens/BarraNavegacao/Funcionalidades/Pesquisar/InformacoesGrupo/InfoGrupoMed'
import InfoGrupoDir from './src/screens/BarraNavegacao/Funcionalidades/Pesquisar/InformacoesGrupo/InfoGrupoDir'
import GrupoNassauMed from './src/screens/BarraNavegacao/Funcionalidades/Pesquisar/InformacoesGrupo/Grupos/GrupoNassauMed'
import GrupoNassauDir from './src/screens/BarraNavegacao/Funcionalidades/Pesquisar/InformacoesGrupo/Grupos/GrupoNassauDir'
import CriarNovaPubli from './src/screens/BarraNavegacao/Funcionalidades/Feed/CriarNovaPubli'
import EditarPerfil from './src/screens/BarraNavegacao/Funcionalidades/Perfil/EditarPerfil'


import Routes from './src/Routes'

const Stack = createNativeStackNavigator()

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="CriarConta" component={CriarConta} />
        <Stack.Screen name="EsqueceuSenha01" component={EsqueceuSenha01} />
        <Stack.Screen name="EsqueceuSenha02" component={EsqueceuSenha02} />
        <Stack.Screen name="Medicina" component={Medicina} />
        <Stack.Screen name="Direito" component={Direito} />
        <Stack.Screen name="InfoGrupoMed" component={InfoGrupoMed} />
        <Stack.Screen name="InfoGrupoDir" component={InfoGrupoDir} />
        <Stack.Screen name="GrupoNassauMed" component={GrupoNassauMed} />
        <Stack.Screen name="GrupoNassauDir" component={GrupoNassauDir} />
        <Stack.Screen name="CriarNovaPubli" component={CriarNovaPubli} />
        <Stack.Screen name="EditarPerfil" component={EditarPerfil} />
        <Stack.Screen name="Rotas" component={Routes} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}