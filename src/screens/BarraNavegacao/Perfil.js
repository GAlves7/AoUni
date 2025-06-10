import { StyleSheet, View, TouchableOpacity, Text, Image } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useNavigation } from '@react-navigation/native'
import * as ImagePicker from 'expo-image-picker'

export default function Search(){

    const navigation = useNavigation()

    return(

        <SafeAreaView style={styles.container}>

            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Ionicons name="arrow-back" size={25} color="#fff" />
                </TouchableOpacity>
                <Text style={styles.titulo}>PERFIL</Text>
            </View>

            <View style={styles.perfilContainer}>
                <Image
                    source={require("../../assets/logo.png")}
                    style={styles.logo}
                />
                <Text style={styles.txtNome}>Seu nome</Text>
            </View>

            <View style={styles.linha} />

            <View style={styles.opcoesContainer}>

                <TouchableOpacity
                    style={styles.opcao}
                    onPress={() => navigation.navigate('EditarPerfil')}
                >
                    <Ionicons name="create-outline" size={24} color="#fff" />
                    <Text style={styles.textoOpcao}>Editar Perfil</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.opcao}
                    onPress={() => navigation.replace('Login')}
                >
                    <Ionicons name="log-out-outline" size={24} color="#fff" />
                    <Text style={styles.textoOpcao}>Sair</Text>
                </TouchableOpacity>
            </View>

        </SafeAreaView>

    )
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: "#141414",
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 15,
        paddingTop: 10,
        paddingBottom: 10,
    },
    titulo:{
        color: '#fff',
        fontSize: 20,
        fontWeight: 'bold',
        marginLeft: 290,
    },
    linha: {
        height: 1,
        backgroundColor: '#333',
        marginTop: -30, 
    },
    logo:{
        alignSelf: 'center',
        width: 75,
        resizeMode: "contain",
        marginTop: -75,
    },
    txtNome:{
        color: '#fff',
        fontSize: 15,
        bottom: 40,
    },
    perfilContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 30,
    },
    opcoesContainer: {
        marginTop: 50,
        paddingHorizontal: 30,
        gap: 20,
    },
    opcao: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#1e1e1e',
        padding: 15,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#333',
        gap: 15,
    },
    textoOpcao: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
})