import { StyleSheet, View, TextInput, TouchableOpacity, Text } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useNavigation } from '@react-navigation/native'

export default function Search(){

    const navigation = useNavigation()

    return(
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Ionicons name="arrow-back" size={25} color="#fff" />
                </TouchableOpacity>
                <Text style={styles.titulo}>GRUPOS</Text>
            </View>

            <View style={styles.caixaPesq}>
                <Ionicons name="search" size={20} color="#ccc" style={styles.iconePesq} />
                <TextInput
                    placeholder="Pesquisar grupos"
                    placeholderTextColor="#ccc"
                    style={styles.input}
                    
                />
            </View>

            <View style={styles.linha} />

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
        marginLeft: 275,
    },
    caixaPesq: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#1e1e1e',
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#555',
        width: '80%',
        height: 40,
        alignSelf: 'center',
        marginBottom: 10,
        paddingHorizontal: 10,
        top: 25,
    },
    iconePesq: {
        marginRight: 8,
    },
    input: {
        flex: 1,
        color: '#fff',
        fontSize: 12,
    },
    linha: {
        height: 1,
        backgroundColor: '#333',
        top: 55,
    },
})