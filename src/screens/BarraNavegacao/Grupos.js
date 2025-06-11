import React, { useEffect, useState } from 'react'
import { StyleSheet, View, TextInput, TouchableOpacity, Text, FlatList, Image } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useNavigation } from '@react-navigation/native'
import api from '../..../../../../src/axios/api'
import AsyncStorage from '@react-native-async-storage/async-storage'

export default function Search() {
    const navigation = useNavigation()
    const [grupos, setGrupos] = useState([])


    async function pegandoChats() {
        const idUser = await AsyncStorage.getItem('idUser')
        console.log('ID do usuário:', idUser)

        try {
            const response = await api.get(`/usuario/${idUser}/chats`)
            const primeiroChat = response.data[0] // pega o primeiro item

            if (primeiroChat) {
                console.log('Primeiro chat:', primeiroChat)
                // você pode usar primeiroChat.id, primeiroChat.nome, etc.
            } else {
                console.log('Nenhum chat encontrado.')
            }
        } catch (error) {
            console.error('Erro ao pegar informações:', error.response?.data || error.message)
        }
    }

    pegandoChats()

    useEffect(() => {
        async function fetchGrupos() {
            const idUser = await AsyncStorage.getItem('idUser')
            try {
                const response = await api.get(`/usuario/${idUser}/chats`)
                setGrupos(response.data)
            } catch (error) {
                console.error('Erro ao buscar grupos:', error.response?.data || error.message)
            }
        }

        fetchGrupos()
    }, [])

    return (
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

            <FlatList
                data={grupos}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <TouchableOpacity 
                        style={styles.cardGrupo}
                        onPress={() => navigation.navigate('GrupoNassauMed', { idGrupo: item.id })}
                    >
                        <Image 
                            source={require('../../assets/nassau.png')}
                            style={styles.logoGrupo}
                        />
                        <Text style={styles.nomeGrupo}>{`${item.faculdade}${item.curso}`}</Text>
                    </TouchableOpacity>
                )}
            />
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
    marginTop: 10, // substitui o top
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
    marginTop: 10, // substitui o top
    marginBottom: 15, // dá espaçamento antes da FlatList
},
    cardGrupo: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1e1e1e',
    padding: 12,
    borderRadius: 10,
    borderColor: '#444',
    borderWidth: 1,
    marginBottom: 15,
    marginHorizontal: 20, // adiciona margem lateral fixa para alinhar os cards
},

logoGrupo: {
    width: 45,
    height: 45,
    borderRadius: 22.5,
    marginRight: 12,
    backgroundColor: '#555',
},

nomeGrupo: {
    color: '#fff',
    fontSize: 15,
    fontWeight: 'bold',
}
})