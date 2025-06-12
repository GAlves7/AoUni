// Importação de hooks, componentes e bibliotecas necessárias
import React, { useEffect, useState } from 'react'
import { useNavigation, useIsFocused } from '@react-navigation/native'
import { StyleSheet, View, Text, TouchableOpacity, Image, FlatList } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Ionicons } from '@expo/vector-icons'
import api from '../../axios/api'
import { encode } from 'base64-arraybuffer'

// Componente funcional da tela Feed
export default function Feed() {

  // Hook de navegação entre telas
  const navigation = useNavigation()

  // Estado para armazenar as postagens do feed
  const [postagens, setPostagens] = useState([])

  // Função para buscar a imagem associada à postagem e convertê-la em base64
  async function buscarImagem(idImagem) {
    try {
      const response = await api.get(`/postagem/${idImagem}/arquivo`, {
        responseType: 'arraybuffer',
      })

      const base64 = encode(response.data)
      return `data:image/jpeg;base64,${base64}`
    } catch (error) {
      console.error('Erro ao carregar imagem', error)
      return null
    }
  }

  // Hook para detectar se a tela está em foco
  const isFocused = useIsFocused()

  // useEffect para carregar as postagens quando a tela estiver em foco
  useEffect(() => {
    async function carregarPostagens() {
      try {
        const response = await api.get('/postagem')
        const postagensComImagens = await Promise.all(
          response.data.map(async (post) => {
            const imagemBase64 = await buscarImagem(post.id)
            return {
              ...post,
              imagemBase64,
              likeCount: post.curtidas || 0,
              liked: false
            }
          })
        )
        setPostagens(postagensComImagens)
      } catch (error) {
        console.error('Erro ao buscar postagens:', error)
      }
    }

    if (isFocused) {
      carregarPostagens()
    }
  }, [isFocused])

  // Função para navegar até a tela de nova publicação
  function criarNovaPublicacao() {
    navigation.navigate('CriarNovaPubli')
  }

  // Função para curtir ou descurtir uma publicação
  async function toggleLike(postId) {
    const novaLista = postagens.map(async (post) => {
      if (post.id === postId) {
        try {
          if (!post.liked) {
            await api.put(`/postagem/${postId}/like`)
            return { ...post, liked: true, likeCount: post.likeCount + 1 }
          } else {
            await api.put(`/postagem/${postId}/deslike`)
            return { ...post, liked: false, likeCount: post.likeCount - 1 }
          }
        } catch (error) {
          console.error('Erro ao curtir/descurtir:', error)
        }
      }
      return post
    })

    const resolved = await Promise.all(novaLista)
    setPostagens(resolved)
  }

  // Função para renderizar cada item do FlatList
  function renderItem({ item }) {
    return (
      <View style={styles.postContainer}>
        <Image source={{ uri: item.imagemBase64 }} style={styles.postImage} />
        <Text style={styles.caption}>{item.conteudo}</Text>
        <TouchableOpacity
          style={styles.likeButton}
          onPress={() => toggleLike(item.id)}
        >
          <Ionicons
            name={item.liked ? 'heart' : 'heart-outline'}
            size={22}
            color={item.liked ? 'red' : '#fff'}
          />
          <Text style={styles.likeText}>
            {item.likeCount} {item.likeCount === 1 ? 'curtida' : 'curtidas'}
          </Text>
        </TouchableOpacity>
      </View>
    )
  }

  // Retorno do componente com estrutura visual do feed
  return (
    <SafeAreaView style={styles.container}>
      {/* Cabeçalho do feed com botão de nova publicação */}
      <View style={styles.header}>
        <TouchableOpacity onPress={criarNovaPublicacao}>
          <Ionicons name="add-circle-outline" size={25} color="#fff" />
        </TouchableOpacity>

        <Text style={styles.titulo}>Nova publicação</Text>
        <Text style={styles.titulo2}>FEED</Text>
      </View>

      {/* Lista de postagens */}
      <FlatList
        data={postagens}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        contentContainerStyle={{ padding: 15 }}
      />
    </SafeAreaView>
  )
}

// Estilos da tela Feed
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
    borderBottomWidth: 1,
    borderBottomColor: '#333',
  },
  titulo: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
    marginLeft: 5,
  },
  titulo2: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 200,
  },
  postContainer: {
    backgroundColor: '#1f1f1f',
    borderRadius: 8,
    marginBottom: 20,
    padding: 10,
  },
  postImage: {
    width: '100%',
    height: 200,
    borderRadius: 8,
  },
  caption: {
    color: '#fff',
    marginTop: 10,
    fontSize: 16,
  },
  likeButton: {
    marginTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  likeText: {
    color: '#fff',
    fontSize: 15,
  },
})