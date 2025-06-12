// Importação dos hooks, componentes, ícones, navegação, API e AsyncStorage
import React, { useEffect, useState } from 'react'
import { StyleSheet, View, TextInput, TouchableOpacity, Text, FlatList, Image } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useNavigation } from '@react-navigation/native'
import api from '../..../../../../src/axios/api'
import AsyncStorage from '@react-native-async-storage/async-storage'

// Componente funcional da tela de busca e listagem de grupos
export default function Search() {
  const navigation = useNavigation()

  // Estado para armazenar os grupos/chats do usuário
  const [grupos, setGrupos] = useState([])

  // Função para pegar e logar os chats do usuário (exemplo/debug)
  async function pegandoChats() {
    const idUser = await AsyncStorage.getItem('idUser')
    console.log('ID do usuário:', idUser)

    try {
      const response = await api.get(`/usuario/${idUser}/chats`)
      const primeiroChat = response.data[0] // pega o primeiro chat da lista

      if (primeiroChat) {
        console.log('Primeiro chat:', primeiroChat)
      } else {
        console.log('Nenhum chat encontrado.')
      }
    } catch (error) {
      console.error('Erro ao pegar informações:', error.response?.data || error.message)
    }
  }

  // Chamada da função pegandoChats (para debug)
  pegandoChats()

  // useEffect para buscar os grupos/chats do usuário ao montar o componente
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

  // Renderização da tela com cabeçalho, barra de pesquisa e lista de grupos
  return (
    <SafeAreaView style={styles.container}>
      {/* Cabeçalho com botão para voltar e título */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={25} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.titulo}>GRUPOS</Text>
      </View>

      {/* Caixa de pesquisa com ícone e campo de texto */}
      <View style={styles.caixaPesq}>
        <Ionicons name="search" size={20} color="#ccc" style={styles.iconePesq} />
        <TextInput
          placeholder="Pesquisar grupos"
          placeholderTextColor="#ccc"
          style={styles.input}
        />
      </View>

      <View style={styles.linha} />

      {/* Lista de grupos com navegação para detalhes ao clicar */}
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

// Estilos da tela Search
const styles = StyleSheet.create({
  container: {
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
  titulo: {
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
    marginTop: 10,
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
    marginTop: 10,
    marginBottom: 15,
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
    marginHorizontal: 20,
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