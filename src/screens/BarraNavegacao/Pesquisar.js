import React, { useState } from 'react'
import { StyleSheet, View, TextInput, TouchableOpacity, Text } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useNavigation } from '@react-navigation/native'

export default function Pesquisar(){

    const navigation = useNavigation()
    const [pesquisa, setPesquisa] = useState("")

    const opcoes = [
        { nome: 'Medicina', icone: 'medkit', rota: 'Medicina' },
        { nome: 'Direito', icone: 'book', rota: 'Direito' },
    ]

    const opcoesFiltradas = opcoes.filter(opcao =>
        opcao.nome.toLowerCase().includes(pesquisa.toLowerCase())
    )

    return(
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Ionicons name="arrow-back" size={25} color="#fff" />
                </TouchableOpacity>
            </View>

            <View style={styles.caixaPesq}>
                <Ionicons name="search" size={20} color="#ccc" style={styles.iconePesq} />
                <TextInput
                    placeholder="Pesquisar (Ex.: Medicina)"
                    placeholderTextColor="#ccc"
                    style={styles.input}
                    onChangeText={value => setPesquisa(value)}
                    value={pesquisa}
                />
            </View>

            <View style={styles.linha} />

            <View style={styles.opcoesContainer}>
                {opcoesFiltradas.length > 0 ? (
                    opcoesFiltradas.map((opcao, index) => (
                        <TouchableOpacity
                            key={index}
                            style={styles.caixaAreaFacul}
                            onPress={() => navigation.navigate(opcao.rota)}
                        >
                            <Ionicons name={opcao.icone} size={24} color="#fff" />
                            <Text style={styles.textoCaixaAreaFacul}>{opcao.nome}</Text>
                        </TouchableOpacity>
                    ))
                ) : (
                    <Text style={{ color: '#fff' }}>Nenhuma opção encontrada</Text>
                )}
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
        paddingHorizontal: 15,
        paddingTop: 10,
        paddingBottom: 10,
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
    opcoesContainer: {
        marginTop: 80,
        paddingHorizontal: 20,
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    caixaAreaFacul: {
        alignItems: 'center',
        backgroundColor: '#1e1e1e',
        padding: 20,
        borderRadius: 10,
        width: 120,
        borderWidth: 1,
        borderColor: '#444',
    },
    textoCaixaAreaFacul: {
        color: '#fff',
        marginTop: 8,
        fontSize: 14,
        fontWeight: 'bold',
    },
})