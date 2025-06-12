// Importação de hooks, componentes e bibliotecas necessárias
import { useState } from 'react'
import { useNavigation, useRoute } from '@react-navigation/native'
import { View, Text, TextInput, Image, TouchableOpacity, StyleSheet, Platform, Alert } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import { Ionicons } from '@expo/vector-icons'
import api from '../../../src/axios/api'

// Componente funcional da tela EsqueceuSenha02
export default function EsqueceuSenha02(){

    // Hook de navegação entre telas
    const navigation = useNavigation()

    // Estados para armazenar a nova senha e a confirmação
    const [senha, setSenhaEsq] = useState()
    const [confSenha, setConfSenhaEsq] = useState()

    // Recupera o email enviado da tela anterior
    const route = useRoute()
    const { email } = route.params

    // Função para realizar a troca da senha
    function mudarSenha(){
        const mudarSenha = async () => {

            // Verifica se todos os campos foram preenchidos
            if (!senha || !confSenha) {
                Alert.alert('Preencha corretamente!','Preencha todos os campos e tente novamente.')
                return
            }

            // Verifica se as senhas digitadas são iguais
            if (senha !== confSenha) {
                Alert.alert('Senhas incoerentes!','As senhas não coincidem, digite corretamente.')
                return
            }

            try {
                // Requisição PUT para atualizar a senha no backend
                const response = await api.put('/usuario/alterar-senha', {
                    email: email,
                    novaSenha: senha
                })

                console.log("Senha alterada!")

                // Navega para a tela de login após sucesso
                navigation.replace("Login")
                Alert.alert('✅ Troca de senha realizada!', 'Agora, entre em sua conta.')

            } catch(error) {
                // Erro de validação ou servidor
                if (error.response && error.response.status === 400) {
                    Alert.alert("Troca de senha não realizada!", "Tente novamente mais tarde!")
                } else {
                    Alert.alert("Erro no servidor!", "Tente novamente mais tarde!")
                }
            }
        }

        mudarSenha()
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

        {/* Título do campo de nova senha */}
        <Text style={styles.novaSenha}>NOVA SENHA</Text>

        {/* Campos para digitar nova senha e confirmação */}
        <TextInput
            style={styles.input}
            onChangeText={value => setSenhaEsq(value)}
            placeholder='Nova senha'
        />
        <TextInput
            style={styles.input}
            onChangeText={value => setConfSenhaEsq(value)}
            placeholder='Confirmar senha'
        />

        {/* Botão para confirmar alteração */}
        <TouchableOpacity style={styles.botaoAlterar} onPress={mudarSenha}>
            <LinearGradient 
                colors={['#160161', '#2602a8']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.gradientBotaoAlterar}
            >
                <Text style={styles.textoAlterar}>MUDAR SENHA</Text>
            </LinearGradient>
        </TouchableOpacity>

        </LinearGradient>
    )
}

// Estilos da tela EsqueceuSenha02
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
    novaSenha:{
      fontFamily: Platform.OS === 'ios' ? 'System' : 'Roboto',
      fontSize: 14,
      fontWeight: "bold",
      color: "#ffffff",
      marginTop: -20,
      marginBottom: 10,
    },
    input:{
      backgroundColor: "#ffffff",
      height: 45,
      width: "80%",
      borderRadius: 1,
      padding: 10,
      marginBottom: 10,
    },
    botaoAlterar:{
      width: "55%",
      height: 45,
      marginTop: 20,
      borderRadius: 10,
      overflow:"hidden",
    },
    gradientBotaoAlterar:{
      width: '100%',
      height: '100%',
      borderRadius: 10,
      justifyContent: 'center',
      alignItems: 'center',
    },
    textoAlterar:{
      fontFamily: Platform.OS === 'ios' ? 'System' : 'Roboto',
      fontSize: 12,
      fontWeight:'bold',
      color:"#ffffff",
    },
})