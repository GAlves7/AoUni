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

  const [imageUri, setImageUri] = useState(null)
  const [caption, setCaption] = useState('')

  async function pickImage() {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync()
    if (status !== 'granted') {
      Alert.alert('Permissão negada', 'Você precisa permitir acesso à galeria.')
      return
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      quality: 0.8,
    })

    if (!result.canceled) setImageUri(result.assets[0].uri)
  }

  async function publish() {
    if (!imageUri || !caption) {
      Alert.alert('Preencha corretamente!', 'Preencha todos os campos e tente novamente.')
      return
    }

    const idUser = await AsyncStorage.getItem('idUser')

    if (!idUser) {
      Alert.alert('Erro', 'Usuário não identificado.')
      return
    }

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

    try {
      const response = await api.post('/postagem', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })

      console.log('Resposta da API:', response.data)
      navigation.replace('Rotas', { screen: 'Feed' })
    } catch (error) {
      console.error('Erro ao enviar:', error)
      Alert.alert('Erro ao publicar', 'Tente novamente.')
    }
  }

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

        {imageUri && <Image source={{ uri: imageUri }} style={styles.preview} />}

        <TextInput
            style={styles.captionInput}
            placeholder="Digite a legenda..."
            placeholderTextColor="#ccc"
            value={caption}
            onChangeText={setCaption}
        />

        <TouchableOpacity style={styles.publishButton} onPress={publish}>
          <Ionicons name="send" size={22} color="#fff" />
          <Text style={styles.btnText}>Publicar</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}

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