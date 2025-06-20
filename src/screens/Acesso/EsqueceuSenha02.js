import { LinearGradient } from 'expo-linear-gradient'
import { View, Text, TextInput, Image, TouchableOpacity, StyleSheet, Platform, Alert } from 'react-native'
import { useState } from 'react'
import { useNavigation, useRoute } from '@react-navigation/native'
import { Ionicons } from '@expo/vector-icons'
import api from '../../../src/axios/api'

export default function EsqueceuSenha02(){
    
    const navigation = useNavigation()
    const [senha, setSenhaEsq] = useState()
    const [confSenha, setConfSenhaEsq] = useState()
    const route = useRoute()
    const { email } = route.params
    
    function mudarSenha(){
    
        const mudarSenha = async () => {

        if (!senha || !confSenha) {
            Alert.alert('Preencha corretamente!','Preencha todos os campos e tente novamente.')
            return;
        }

        if (senha !== confSenha) {
            Alert.alert('Senhas incoerentes!','As senhas não coincidem, digite corretamente.')
            return;
        }

        try {

            const response = await api.put('/usuario/alterar-senha', {
                email: email,
                novaSenha: senha

            })

            console.log("Senha alterada!")
            navigation.replace("Login")
            Alert.alert('✅ Troca de senha realizada!', 'Agora, entre em sua conta.')

        }catch(error){
            if (error.response && error.response.status === 400) {
            Alert.alert("Troca de senha não realizada!", "Tente novamente mais tarde!")
            } else {
            Alert.alert("Erro no servidor!", "Tente novamente mais tarde!")
            }
        }}

        mudarSenha()

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

        <Text style={styles.novaSenha}>NOVA SENHA</Text>

        <TextInput
            style={styles.input}
            onChangeText={value =>setSenhaEsq(value)}
            placeholder='Nova senha'
        />

        <TextInput
            style={styles.input}
            onChangeText={value =>setConfSenhaEsq(value)}
            placeholder='Confirmar senha'
        />

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

const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent: "center",
        alignItems: "center",
    },
    botaoVoltar:{
        position: 'absolute',
        top: 50,
        left: 20,
        zIndex: 20,
    },
    novaSenha:{
        color: "#fff",
        fontWeight: "bold",
        fontFamily: Platform.OS === 'ios' ? 'System' : 'Roboto',
        fontSize: 30,
        textShadowColor: "#000",
        textShadowOffset: { width: 2, height: 2 },
        textShadowRadius: 3,
        left:-70,
        marginTop: 40,
    },
    logo:{
        opacity: 0.35,
        width: 250,
        resizeMode: "contain",
        marginBottom: 20,
        marginTop: -125,
    },
    titulo1:{
        position: "absolute",
        fontFamily: Platform.OS === 'ios' ? 'System' : 'Roboto',
        fontSize: 30,
        fontWeight: "bold",
        color: "#fff",
        top: -70,
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
        top: -40,
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
        marginTop: 12,
    },
    textoAlterar:{
        fontFamily: Platform.OS === 'ios' ? 'System' : 'Roboto',
        fontSize: 12,
        fontWeight:'bold',
        color:"#ffffff",
    },
    botaoAlterar:{
        width: "55%",
        height: 45,
        marginTop: 75,
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
})