import { useState } from 'react'
import { View, Text, TextInput, Image, TouchableOpacity, StyleSheet } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'

export default function App(){
  
  const [usuario, setUsuario] = useState()
  const [senha, setSenha] = useState()

  function validarLogin (){

  }

  const esqueciSenha = () => {
    alert("Acesse o link para recuperar a senha.")
  }

  function validarCadastro(){

  }

  return(
    
      <LinearGradient
        colors={['#0a002e', '#0f0142']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={styles.container}
      >
      
      <Image
        source={require("../src/assets/logo.png")}
        style={styles.logo}
      />

      <Text style={styles.titulo}>Bem-Vindo ao AoUni, apoio ao PRÉ/UNIVERSITÁRIO</Text>

      <TextInput
        style={styles.input}
        onChangeText={value =>setUsuario(value)}
        placeholder='Usuário'
      />
      
      <TextInput
        style={styles.input}
        onChangeText={value =>setSenha(value)}
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
      
      <TouchableOpacity style={styles.botaoCadastro} onPress={validarCadastro}>
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
    fontFamily: "Cochin",
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
    fontFamily: "Cochin",
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
    fontFamily: "Cochin",
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