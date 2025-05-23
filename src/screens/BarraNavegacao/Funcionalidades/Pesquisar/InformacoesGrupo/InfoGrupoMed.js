import { StyleSheet, View, TouchableOpacity, Text, Image } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useNavigation } from '@react-navigation/native'

export default function Search(){

    const navigation = useNavigation()

    return(
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.voltar}>
                    <Ionicons name="arrow-back" size={25} color="#fff" />
                    <Text style={styles.titulo}>DESCRIÇÃO</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.linha} />

            <View style={styles.caixaDescricao}>
                <View style={styles.topoCaixa}>
                    <View style={styles.logoNomeWrapper}>
                        <Image 
                            source={require('../../../../../assets/nassau.png')} 
                            style={styles.logoGrupo} 
                            resizeMode="contain"
                        />
                        <Text style={styles.nomeGrupo}>UNINASSAU Caruaru - Medicina</Text>
                    </View>
                </View>
                <View style={styles.meioCaixa}>
                    <Text style={styles.descricaoGrupo}>
                        Este é um grupo focado em discutir e compartilhar conteúdos relacionados ao curso de Medicina na UNINASSAU.
                    </Text>
                </View>
                <View style={styles.rodapeCaixa}>
                    <Text style={styles.endereco}>
                        <Text style={styles.enderecoNegrito}>Endereço: </Text> BR-104, KM 68 - n 1215 - Agamenon Magalhães Caruaru - PE, 55000-000
                    </Text>
                </View>
            </View>

            <TouchableOpacity style={styles.botaoEntrar} onPress={() => navigation.navigate('GrupoNassauMed')}>
                <Text style={styles.textoBotao}>ENTRAR</Text>
            </TouchableOpacity>
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
    voltar:{
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    titulo: {
        color: '#fff',
        fontSize: 20,
        fontWeight: 'bold',
    },
    linha: {
        height: 1,
        backgroundColor: '#333', 
    },
    caixaDescricao: {
        flex: 1,
        margin: 20,
        backgroundColor: '#222',
        borderRadius: 10,
        padding: 20,
        justifyContent: 'space-between',
    },
    topoCaixa: {
        alignItems: 'center',
        height: 120,
        justifyContent: 'center',
    },
    logoNomeWrapper: {
        alignItems: 'center',
    },
    logoGrupo: {
        width: 80,
        height: 80,
        borderRadius: 40,
        backgroundColor: '#555',
        marginBottom: 6,
    },
    nomeGrupo: {
        color: '#fff',
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    meioCaixa: {
        flex: 1,
        justifyContent: 'center',
        marginVertical: 20,
        paddingHorizontal: 10,
    },
    descricaoGrupo: {
        color: '#ccc',
        fontSize: 16,
        textAlign: 'center',
    },
    rodapeCaixa: {
        alignItems: 'center',
        marginTop: 10,
    },
    endereco: {
        color: '#fff',
        fontSize: 12,
    },
    enderecoNegrito: {
        fontWeight: 'bold',
        textDecorationLine: 'underline',
    },
    botaoEntrar: {
        backgroundColor: '#2602a8',
        marginHorizontal: 20,
        marginBottom: 30,
        paddingVertical: 15,
        borderRadius: 10,
        alignItems: 'center',
    },
    textoBotao: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    }
})