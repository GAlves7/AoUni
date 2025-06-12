// Importação de hooks, componentes e bibliotecas necessárias
import { useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import { View, Text, TextInput, Image, TouchableOpacity, StyleSheet, Platform, Alert } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import { Ionicons } from '@expo/vector-icons'
import api from '../../../src/axios/api'

// Componente funcional da tela EsqueceuSenha01
export default function EsqueceuSenha01(){

    // Hook de navegação entre telas
    const navigation = useNavigation()

    // Estado para armazenar o email digitado
    const [email, setEmailEsq] = useState()

    // Função para verificar se o email existe no sistema
    function verificarEmail (){
    
      const verificarEmail = async () => {

        // Verifica se o campo email foi preenchido
        if (!email) {
          Alert.alert('Preencha corretamente!','Preencha todos os campos e tente novamente.')
          return
        }

        try {
          // Requisição POST para verificar se o email existe
          const response = await api.post('/usuario/verificar-email', {
            email: email
          })
        
          console.log("Email existe")

          // Navega para a próxima etapa, passando o email como parâmetro
          navigation.navigate("EsqueceuSenha02", {email: email})

        } catch(error) {
          // Erro de validação do email
          if (error.response && error.response.status === 400) {
            Alert.alert('Email incorreto!','Email incorreto ou inexistente.')
          } else {
            // Erro inesperado no servidor
            Alert.alert('Erro no servidor!','Tente novamente mais tarde.')
          }
        }

      }

      verificarEmail()
    }

    return(
        // Gradiente de fundo da tela
        <LinearGradient
          colors={['#0a002e', '#0f0142']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.container}
        >
            {/* Botão de voltar */}
            <TouchableOpacity
                style={styles.botaoVoltar}
                onPress={() => navigation.goBack()}
            >
                <Ionicons name="arrow-back" size={30} color="#fff" />
            </TouchableOpacity>

            {/* Logo e títulos */}
            <View>
                <Image
                    source={require("../../assets/logo.png")}
                    style={styles.logo}
                />
                <Text style={styles.titulo1}>REDEFINIR</Text>
                <Text style={styles.titulo2}>SENHA</Text>
            </View>   

            {/* Campo para digitar email */}
            <TextInput
                style={styles.input}
                onChangeText={value => setEmailEsq(value)}
                placeholder='Email'
            />

            {/* Botão para verificar email */}
            <TouchableOpacity style={styles.botaoEnviar} onPress={verificarEmail}>
                <LinearGradient 
                    colors={['#160161', '#2602a8']}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    style={styles.gradientBotaoEnviar}
                >
                    <Text style={styles.textoEnviar}>VERIFICAR EMAIL</Text>
                </LinearGradient>
            </TouchableOpacity>
        </LinearGradient>
    )
}

// Estilos da tela EsqueceuSenha01
const styles = StyleSheet.create({
  container:{
    flex:1,
    justifyContent: "center",
    alignItems: "center",
  },
  botaoVoltar: {
    position: 'absolute',
    top: 50,
    left: 20,
    zIndex: 20,
  },
  logo:{
    opacity: 0.35,
    width: 250,
    resizeMode: "contain",
    marginBottom: 20,
    marginTop: -250,
  },
  titulo1:{
    position: "absolute",
    fontFamily: Platform.OS === 'ios' ? 'System' : 'Roboto',
    fontSize: 30,
    fontWeight: "bold",
    color: "#fff",
    top: -190,
    left: 50,
    textShadowColor: "#000",
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 3,
  },
  titulo2:{
    position: "absolute",
    fontFamily: Platform.OS === 'ios' ? 'System' : 'Roboto',
    fontSize: 30,
    fontWeight: "bold",
    color: "#fff",
    top: -160,
    left: 75,
    textShadowColor: "#000",
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 3,
  },
  input:{
    backgroundColor: "#ffffff",
    height: 45,
    width: "80%",
    borderRadius: 1,
    padding: 10,
  },
  textoEnviar:{
    fontFamily: Platform.OS === 'ios' ? 'System' : 'Roboto',
    fontSize: 12,
    fontWeight:'bold',
    color:"#ffffff",
  },
  botaoEnviar:{
    width: "55%",
    height: 45,
    marginTop: 50,
    borderRadius: 10,
    overflow:"hidden",
  },
  gradientBotaoEnviar:{
    width: '100%',
    height: '100%',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
})