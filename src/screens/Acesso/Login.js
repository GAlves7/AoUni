import { useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import { View, Text, TextInput, Image, TouchableOpacity, StyleSheet, Platform, Alert } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import api from '../../../src/axios/api'
import AsyncStorage from '@react-native-async-storage/async-storage'

export default function Login({}){
  
  const navigation = useNavigation()
  const [email, setEmailLog] = useState()
  const [senha, setSenhaLog] = useState()

  function validarLogin (){
    
    const validarLogin = async () => {

      if (!email || !senha) {
        Alert.alert('Preencha corretamente!','Preencha todos os campos e tente novamente.')
        return
      }

      try {

        const response = await api.post('/usuario/login', {
          
          email: email,
          senha: senha
          
        })
      
          console.log("Login Válido.")
          navigation.replace("Rotas")


      }catch(error) {
        if (error.response && error.response.status === 400) {
          Alert.alert('Email ou senha incorretos!','Preencha corretamente.')
        } else {
          Alert.alert('Erro no servidor!','Tente novamente mais tarde.')
        }
      }

    }
      
      validarLogin()

  }

  const esqueciSenha = () => {
    navigation.navigate("EsqueceuSenha01")
  }

  function pageCadastro(){
    navigation.navigate("CriarConta")
  }

  return(
    
    <LinearGradient
      colors={['#0a002e', '#0f0142']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}
      style={styles.container}
    >
    
    <Image
      source={require("../../assets/logo.png")}
      style={styles.logo}
    />

    <Text style={styles.titulo}>Bem-Vindo (a) ao AOUNI!</Text>

    <TextInput
      style={styles.input}
      onChangeText={value =>setEmailLog(value)}
      placeholder='Email'
    />
    
    <TextInput
      style={styles.input}
      onChangeText={value =>setSenhaLog(value)}
      placeholder='Senha'
    />

    <View style={styles.recuperarSenhaContainer}>
      <TouchableOpacity onPress={esqueciSenha}>
        <Text style={styles.recuperarSenha}>Recuperar senha</Text>
      </TouchableOpacity>
    </View>

    <TouchableOpacity style={styles.botaoLogin} onPress={validarLogin}>
      <LinearGradient 
        colors={['#160161', '#2602a8']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={styles.gradientBotaoLogin}
      >
        <Text style={styles.textoLogin}>ENTRAR</Text>
      </LinearGradient>
    </TouchableOpacity>
    
    <TouchableOpacity style={styles.botaoCadastro} onPress={pageCadastro}>
        <Text style={styles.textoCadastro}>CRIAR CONTA</Text>
    </TouchableOpacity>

  </LinearGradient>
  )
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    justifyContent: "center",
    alignItems: "center",
  },
  logo:{
    marginTop: -35,
  },
  titulo:{
    color: "#ffffff",
    fontFamily: Platform.OS === 'ios' ? 'System' : 'Roboto',
    fontSize: 13,
    margin: 35,
  },
  input:{
    backgroundColor: "#ffffff",
    height: 45,
    width: "80%",
    marginTop: 12,
    borderRadius: 1,
    padding: 10,
  },
  textoLogin:{
    fontFamily: Platform.OS === 'ios' ? 'System' : 'Roboto',
    fontSize: 20,
    fontWeight:'bold',
    color:"#ffffff",
  },
  botaoLogin:{
    width: "55%",
    height: 45,
    marginTop: 100,
    borderRadius: 10,
    overflow:"hidden",
  },
  gradientBotaoLogin:{
    width: '100%',
    height: '100%',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textoCadastro:{
    fontFamily: Platform.OS === 'ios' ? 'System' : 'Roboto',
    fontSize: 15,
    fontWeight:'bold',
    color:"#100E2A",
  },
  botaoCadastro:{
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ffffff",
    padding: 10,
    width: "55%",
    height: 45,
    marginTop: 12,
    borderRadius: 10,
  },
  recuperarSenhaContainer: {
    width: "80%",
    alignItems: 'flex-start',
  },
  recuperarSenha: {
    color: '#ffffff',
    fontSize: 12,
    textDecorationLine: 'underline',
  },
})