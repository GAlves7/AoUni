import React, { useState } from 'react'
import { StyleSheet, View, TextInput, TouchableOpacity, Text, Image } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useNavigation } from '@react-navigation/native'

export default function Search(){

    const navigation = useNavigation()
    const [pesquisa, setPesquisa] = useState("")

    const faculdades = [{
        id: '1',
        nome: 'UNINASSAU Caruaru – Medicina',
        imagem: require('../../../../assets/nassau.png'),
        rota: 'InfoGrupoMed'
    }]   

    const faculdadesFiltradas = faculdades.filter(item =>
        item.nome.toLowerCase().includes(pesquisa.toLowerCase())
    )


    return(
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Ionicons name="arrow-back" size={25} color="#fff" />
                </TouchableOpacity>

                <View style={styles.tituloContainer}>
                    <Ionicons name="medkit" size={20} color="#fff" style={{ marginRight: 6 }} />
                    <Text style={styles.titulo}>MEDICINA</Text>
                </View>

                <View style={{ width: 25 }} />
            </View>

            <View style={styles.caixaPesq}>
                <Ionicons name="search" size={20} color="#ccc" style={styles.iconePesq} />
                <TextInput
                    placeholder="Ex.: UNINASSAU"
                    placeholderTextColor="#ccc"
                    style={styles.input}
                    onChangeText={value => setPesquisa(value)}
                />
            </View>

            <View style={styles.linha} />

            {faculdadesFiltradas.map(item => (
                <TouchableOpacity
                    key={item.id}
                    style={styles.faculdadeBox}
                    onPress={() => navigation.navigate(item.rota)}
                >
                    <Image source={item.imagem} style={styles.faculdadeLogo} />
                    <Text style={styles.faculdadeNome}>{item.nome}</Text>
                </TouchableOpacity>
            ))}
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
        justifyContent: 'space-between',
    },
    tituloContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
        justifyContent: 'center',
    },
    titulo: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
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
        marginTop: 55,
        marginBottom: 15,
    },
    faculdadeBox: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#1e1e1e',
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#444',
        padding: 15,
        marginHorizontal: 20,
        marginTop: 25,      
        gap: 15,            
    },
    faculdadeLogo: {
        width: 40,
        height: 40,
        resizeMode: 'contain',
    },
    faculdadeNome: {
        color: '#fff',
        fontSize: 14,
        fontWeight: 'bold',
        flexShrink: 1,     
    },
})