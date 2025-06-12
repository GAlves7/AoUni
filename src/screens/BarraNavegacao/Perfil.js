import React, { useState, useCallback } from 'react'
import { StyleSheet, View, TouchableOpacity, Text, Image } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useNavigation, useFocusEffect } from '@react-navigation/native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import api from '../../../src/axios/api'
import { encode } from 'base64-arraybuffer'

export default function Perfil() {

  const navigation = useNavigation()

  const [nomeUsuario, setNomeUsuario] = useState('')
  const [fotoPerfil, setFotoPerfil] = useState(null)

  useFocusEffect(
    useCallback(() => {
      const carregarDados = async () => {
        try {
          const usuarioNome = await AsyncStorage.getItem('usuarioNome')
          if (usuarioNome) setNomeUsuario(usuarioNome)

          const idUser = await AsyncStorage.getItem('idUser')
          const nomeArquivo = await AsyncStorage.getItem('nomeArquivoFoto')
          const extensao = nomeArquivo?.split('.').pop()?.toLowerCase()

          const mimeType = extensao === 'png'
            ? 'image/png'
            : extensao === 'jpg' || extensao === 'jpeg'
            ? 'image/jpeg'
            : 'image/*'

          const response = await api.get(`/usuario/${idUser}/foto`, {
            responseType: 'arraybuffer',
          })

          const base64 = encode(response.data)
          const imageURL = `data:${mimeType};base64,${base64}`

          setFotoPerfil(imageURL)

        } catch (error) {
          console.log('Erro ao carregar dados do perfil:', error)
        }
      }

      carregarDados()
    }, [])
  )

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={25} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.titulo}>PERFIL</Text>
      </View>

      <View style={styles.perfilContainer}>
        <Image
            source={
            fotoPerfil && fotoPerfil.startsWith('data:image')
                ? { uri: fotoPerfil }
                : require("../../assets/logo.png")
            }
            style={styles.logo}
        />
        <Text style={styles.txtNome}>{nomeUsuario}</Text>
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
    marginLeft: 290,
  },
  linha: {
    height: 1,
    backgroundColor: '#333',
    marginTop: 50,
  },
  perfilContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 40,
  },

  logo: {
    width: 100,
    height: 100,
    borderRadius: 50,
    resizeMode: "cover",
    marginBottom: 10,
    borderWidth: 2,
    borderColor: '#fff',
  },
  txtNome: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
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