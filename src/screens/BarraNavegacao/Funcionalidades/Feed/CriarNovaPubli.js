// Tela para criar uma nova publicação com imagem e legenda
import React, { useState } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Image, TextInput, Alert } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useNavigation } from '@react-navigation/native'
import { Ionicons } from '@expo/vector-icons'
import * as ImagePicker from 'expo-image-picker'
import api from '../../../../axios/api'
import AsyncStorage from '@react-native-async-storage/async-storage'

export default function CriarNovaPubli() {
  const navigation = useNavigation()

  // Estado para armazenar a URI da imagem selecionada
  const [imageUri, setImageUri] = useState(null)
  // Estado para armazenar o texto da legenda da publicação
  const [caption, setCaption] = useState('')

  // Função que solicita permissão e abre a galeria para seleção de imagem
  async function pickImage() {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync()
    if (status !== 'granted') {
      Alert.alert('Permissão negada', 'Você precisa permitir acesso à galeria.')
      return
    }

    const result = await ImagePicker.launchImageLibraryAsync({ quality: 0.8 })

    // Atualiza o estado com a URI da imagem escolhida (se não cancelado)
    if (!result.canceled) setImageUri(result.assets[0].uri)
  }

  // Função que envia a publicação para a API
  async function publish() {
    // Valida se a imagem e a legenda foram preenchidas
    if (!imageUri || !caption) {
      Alert.alert('Preencha corretamente!', 'Preencha todos os campos e tente novamente.')
      return
    }

    // Recupera o id do usuário do armazenamento local
    const idUser = await AsyncStorage.getItem('idUser')
    if (!idUser) {
      console.log('Erro! Usuário não identificado.')
      return
    }

    // Monta os dados da publicação no formato multipart/form-data
    const formData = new FormData()
    formData.append('conteudo', caption)
    formData.append('idUsuario', idUser)

    const uriParts = imageUri.split('.')
    const fileType = uriParts[uriParts.length - 1]

    formData.append('arquivo', {
      uri: imageUri,
      name: `imagem.${fileType}`,
      type: `image/${fileType}`,
    })

    // Envia a publicação para o backend e navega para o feed em caso de sucesso
    try {
      const response = await api.post('/postagem', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      })

      console.log('Resposta da API:', response.data)
      navigation.replace('Rotas', { screen: 'Feed' })
    } catch (error) {
      console.error('Erro ao enviar:', error)
      Alert.alert('Erro ao publicar', 'Tente novamente.')
    }
  }

  // Renderiza a interface com cabeçalho, botão para escolher imagem, prévia, campo de legenda e botão publicar
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={25} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Criar publicação</Text>
      </View>

      <View style={styles.content}>
        <TouchableOpacity style={styles.button} onPress={pickImage}>
          <Ionicons name="image-outline" size={22} color="#fff" />
          <Text style={styles.btnText}>Selecionar imagem</Text>
        </TouchableOpacity>

        {/* Mostra a imagem selecionada como prévia */}
        {imageUri && <Image source={{ uri: imageUri }} style={styles.preview} />}

        {/* Campo para digitar a legenda da publicação */}
        <TextInput
          style={styles.captionInput}
          placeholder="Digite a legenda..."
          placeholderTextColor="#ccc"
          value={caption}
          onChangeText={setCaption}
        />

        {/* Botão para enviar a publicação */}
        <TouchableOpacity style={styles.publishButton} onPress={publish}>
          <Ionicons name="send" size={22} color="#fff" />
          <Text style={styles.btnText}>Publicar</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}

// Estilos do componente
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#141414',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingTop: 10,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#333',
  },
  headerTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    padding: 20,
  },
  button: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: '#1f1f1f',
    padding: 14,
    borderRadius: 8,
    marginTop: 15,
  },
  publishButton: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: '#0066ff',
    padding: 14,
    borderRadius: 8,
    marginTop: 30,
  },
  btnText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '600',
  },
  preview: {
    width: '100%',
    height: 220,
    borderRadius: 8,
    marginTop: 15,
  },
  captionInput: {
    width: '100%',
    backgroundColor: '#1f1f1f',
    color: '#fff',
    padding: 14,
    borderRadius: 8,
    marginTop: 15,
    minHeight: 80,
    textAlignVertical: 'top',
  },
})