// Habilita gestos para navegação entre telas
import 'react-native-gesture-handler'

// Importações principais para navegação com React Navigation
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

// Importa telas de acesso (login, criação de conta, etc.)
import Login from './src/screens/Acesso/Login'
import CriarConta from './src/screens/Acesso/CriarConta'
import EsqueceuSenha01 from './src/screens/Acesso/EsqueceuSenha01'
import EsqueceuSenha02 from './src/screens/Acesso/EsqueceuSenha02'

// Importa telas relacionadas à área de pesquisa
import Medicina from './src/screens/BarraNavegacao/Funcionalidades/Pesquisar/Medicina'
import Direito from './src/screens/BarraNavegacao/Funcionalidades/Pesquisar/Direito'

// Importa telas com informações dos grupos
import InfoGrupoMed from './src/screens/BarraNavegacao/Funcionalidades/Pesquisar/InformacoesGrupo/InfoGrupoMed'
import InfoGrupoDir from './src/screens/BarraNavegacao/Funcionalidades/Pesquisar/InformacoesGrupo/InfoGrupoDir'
import GrupoNassauMed from './src/screens/BarraNavegacao/Funcionalidades/Pesquisar/InformacoesGrupo/Grupos/GrupoNassauMed'
import GrupoNassauDir from './src/screens/BarraNavegacao/Funcionalidades/Pesquisar/InformacoesGrupo/Grupos/GrupoNassauDir'

// Importa funcionalidades do feed e perfil
import CriarNovaPubli from './src/screens/BarraNavegacao/Funcionalidades/Feed/CriarNovaPubli'
import EditarPerfil from './src/screens/BarraNavegacao/Funcionalidades/Perfil/EditarPerfil'

// Importa o componente que gerencia as rotas principais da barra de navegação
import Routes from './src/Routes'

// Cria a pilha de navegação entre telas
const Stack = createNativeStackNavigator()

export default function App() {
  return (
    // Define o container de navegação principal
    <NavigationContainer>
      {/* Define as telas da navegação em pilha (Stack) */}
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