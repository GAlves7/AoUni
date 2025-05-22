import { useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import { View, Text, TextInput, Image, TouchableOpacity, StyleSheet, Platform } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import { Ionicons } from '@expo/vector-icons'

export default function EsqueceuSenha01(){

    const navigation = useNavigation()
    const [email, setEmailEsq] = useState()

    function validarEnvio(){
        navigation.navigate("EsqueceuSenha02")
    }

    return(

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
                <Text style={styles.titulo1}>REDEFINIR</Text>
                <Text style={styles.titulo2}>SENHA</Text>
            </View>   

            <TextInput
                style={styles.input}
                onChangeText={value =>setEmailEsq(value)}
                placeholder='Email'
            />

            <TouchableOpacity style={styles.botaoEnviar} onPress={validarEnvio}>
                <LinearGradient 
                colors={['#160161', '#2602a8']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.gradientBotaoEnviar}
                >
                <Text style={styles.textoEnviar}>ENVIAR LINK DE RECUPERAÇÃO</Text>
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