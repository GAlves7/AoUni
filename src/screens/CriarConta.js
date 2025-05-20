import React from 'react'
import { useNavigation } from '@react-navigation/native'
import { View, Text, TextInput, Image, TouchableOpacity, StyleSheet } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import { useState } from 'react'

export default function CriarConta() {
  
  const [email, setEmailCad] = useState()
  const [usuario, setUsuarioCada] = useState()
  const [senha, setSenhaCad] = useState()

  function confirmarCadastro(){

  }

  return (

    <LinearGradient
            colors={['#0a002e', '#0f0142']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.container}
    >

      <View>
        <Image
          source={require("../assets/logo.png")}
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

      <TouchableOpacity style={styles.botaoLogin} onPress={confirmarCadastro}>
        <LinearGradient 
          colors={['#160161', '#2602a8']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.gradientBotaoLogin}
        >
          <Text style={styles.textoLogin}>REGISTRAR</Text>
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
  logo:{
    opacity: 0.35,
    width: 250,
    resizeMode: "contain",
    marginBottom: 20,
  },
  titulo:{
    position: "absolute",
    fontSize: 30,
    fontWeight: "bold",
    color: "#fff",
    top: 75,
    left: 35,
  },
  input:{
    backgroundColor: "#ffffff",
    height: 45,
    width: "80%",
    marginTop: 15,
    borderRadius: 1,
    padding: 10,
  },
  textoLogin:{
    fontFamily: "Cochin",
    fontSize: 20,
    fontWeight:'bold',
    color:"#ffffff",
  },
  botaoLogin:{
    width: "55%",
    height: 45,
    marginTop: 53,
    marginBottom: 150,
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

})