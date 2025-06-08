import { useNavigation } from '@react-navigation/native'
import { View, Text, TextInput, Image, TouchableOpacity, StyleSheet, Platform } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import { useState } from 'react'
import { Ionicons } from '@expo/vector-icons'
import api from '../../../src/axios/api'

export default function CriarConta() {
  
  const navigation = useNavigation()
  const [email, setEmailCad] = useState()
  const [usuario, setUsuarioCad] = useState()
  const [senha, setSenhaCad] = useState()

  function confirmarCadastro(){
    
    const confirmarCadastro = async () => {

      if (!email || !usuario || !senha) {
        alert("Preencha todos os campos!");
        return;
      }

      try {

        const response = await api.post('/usuario/cadastro', {
          usuario: usuario,
          email: email,
          senha: senha

        })

        console.log("Cadastro Realizado!")
        navigation.replace('Login')
        alert('✅ Cadastro realizado! Agora, entre em sua conta.')

      }catch(error){
        if (error.response && error.response.status === 400) {
          alert("Cadastro não realizado, tente novamente mais tarde!")
        } else {
          alert("Erro no servidor, tente novamente mais tarde!")
        }
      }

    } 
    confirmarCadastro()
  }

  return (

    <LinearGradient
            colors={['#0a002e', '#0f0142']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.container}
    >

      <TouchableOpacity
        style={styles.botaoVoltar}
        onPress={() => navigation.goBack()}
      >
        <Ionicons name="arrow-back" size={30} color="#fff" />
      </TouchableOpacity>

      <View>
        <Image
          source={require("../../assets/logo.png")}
          style={styles.logo}
        />
        <Text style={styles.titulo}>REGISTRE-SE</Text>
      </View>

      <TextInput
        style={styles.input}
        onChangeText={value =>setEmailCad(value)}
        placeholder='Email'
      />

      <TextInput
        style={styles.input}
        onChangeText={value =>setUsuarioCad(value)}
        placeholder='Usuário'
      />

      <TextInput
        style={styles.input}
        onChangeText={value =>setSenhaCad(value)}
        placeholder='Senha'
      />

      <TouchableOpacity style={styles.botaoRegistrar} onPress={confirmarCadastro}>
        <LinearGradient 
          colors={['#160161', '#2602a8']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.gradientBotaoRegistrar}
        >
          <Text style={styles.textoRegistrar}>REGISTRAR</Text>
        </LinearGradient>
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
  },
  titulo:{
    position: "absolute",
    fontFamily: Platform.OS === 'ios' ? 'System' : 'Roboto',
    fontSize: 30,
    fontWeight: "bold",
    color: "#fff",
    top: 75,
    left: 35,
    textShadowColor: "#000",
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 3,
  },
  input:{
    backgroundColor: "#ffffff",
    height: 45,
    width: "80%",
    marginTop: 15,
    borderRadius: 1,
    padding: 10,
  },
  textoRegistrar:{
    fontFamily: Platform.OS === 'ios' ? 'System' : 'Roboto',
    fontSize: 20,
    fontWeight:'bold',
    color:"#ffffff",
  },
  botaoRegistrar:{
    width: "55%",
    height: 45,
    marginTop: 53,
    marginBottom: 150,
    borderRadius: 10,
    overflow:"hidden",
  },
  gradientBotaoRegistrar:{
    width: '100%',
    height: '100%',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },

})