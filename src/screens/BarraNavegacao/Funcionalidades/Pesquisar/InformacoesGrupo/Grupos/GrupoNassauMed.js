// Importações principais: hooks do React, componentes do React Native, navegação, API e armazenamento local
import React, { useState, useEffect } from 'react'
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  Image,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  ScrollView
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Ionicons } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import api from '../../../../../../axios/api'
import AsyncStorage from '@react-native-async-storage/async-storage'

export default function GroupChat() {
  const navigation = useNavigation()

  // Estados locais para controlar mensagens, mensagem atual e ID do usuário
  const [message, setMessage] = useState('')
  const [messages, setMessages] = useState([])
  const [userId, setUserId] = useState(null)

  // useEffect inicial: carrega mensagens do backend e ID do usuário do AsyncStorage
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await api.get('/chat/1/mensagem')
        const msgs = Array.isArray(response.data) ? response.data : []
        setMessages(msgs)
      } catch (error) {
        console.error('Erro ao buscar mensagens:', error)
      }
    }

    const loadUserId = async () => {
      const id = await AsyncStorage.getItem('idUser')
      setUserId(id)
    }

    loadUserId()
    fetchMessages()

    // Atualiza as mensagens a cada 3 segundos
    const interval = setInterval(fetchMessages, 3000)
    return () => clearInterval(interval)
  }, [])

  // Envia nova mensagem para a API e atualiza a lista local
  const handleSendMessage = async () => {
    const idUser = await AsyncStorage.getItem('idUser')
    if (!message.trim()) return

    try {
      const response = await api.put('/chat/1/mensagem', {
        mensagem: message,
        id: idUser
      })
      setMessages(prev => [...prev, response.data])
      setMessage('')
    } catch (error) {
      console.error('Erro ao enviar mensagem:', error)
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      {/* Cabeçalho com botão de voltar e informações do grupo */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.replace('Rotas', { screen: 'Pesquisar' })}
          style={styles.backButton}
        >
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>

        <Image
          source={require('../../../../../../assets/nassau.png')}
          style={styles.logo}
          resizeMode="contain"
        />

        <Text style={styles.groupName}>UNINASSAU Caruaru - Medicina</Text>
      </View>

      {/* Lista de mensagens do grupo */}
      <ScrollView style={styles.messagesContainer}>
        {Array.isArray(messages) &&
          messages.map((item, index) => {
            const isMyMessage = item.id?.toString() === userId

            return (
              <View
                key={index}
                style={[
                  styles.messageBubble,
                  isMyMessage ? styles.myMessage : styles.otherMessage
                ]}
              >
                <Text
                  style={[
                    styles.messageUser,
                    isMyMessage && styles.myUserName
                  ]}
                >
                  {item.nome}:
                </Text>
                <Text style={styles.messageText}>{item.mensagem}</Text>
              </View>
            )
          })}
      </ScrollView>

      {/* Campo de envio de nova mensagem */}
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={90}
      >
        <View style={styles.footer}>
          <TouchableOpacity style={styles.mediaButton} onPress={() => {}}>
            <Ionicons name="add" size={26} color="#fff" />
          </TouchableOpacity>

          <TextInput
            style={styles.input}
            placeholder="Digite sua mensagem..."
            placeholderTextColor="#888"
            value={message}
            onChangeText={setMessage}
          />

          <TouchableOpacity
            style={styles.sendButton}
            onPress={handleSendMessage}
          >
            <Ionicons name="send" size={22} color="#fff" />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#141414'
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#333'
  },
  backButton: {
    marginRight: 8
  },
  logo: {
    width: 36,
    height: 36,
    borderRadius: 18
  },
  groupName: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 10
  },
  messagesContainer: {
    flex: 1,
    paddingHorizontal: 12,
    paddingVertical: 6
  },
  messageBubble: {
    backgroundColor: '#222',
    padding: 10,
    borderRadius: 8,
    marginBottom: 8
  },
  messageUser: {
    color: '#aaa',
    fontWeight: 'bold',
    marginBottom: 2
  },
  messageText: {
    color: '#fff'
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderTopWidth: 1,
    borderTopColor: '#333',
    backgroundColor: '#0f0142'
  },
  mediaButton: {
    padding: 6,
    marginRight: 6
  },
  input: {
    flex: 1,
    backgroundColor: '#0a002e',
    borderRadius: 20,
    paddingHorizontal: 14,
    paddingVertical: 8,
    color: '#fff',
    fontSize: 15
  },
  sendButton: {
    padding: 6,
    marginLeft: 6
  },
  myMessage: {
    alignSelf: 'flex-end',
    backgroundColor: '#222'
  },
  otherMessage: {
    alignSelf: 'flex-start',
    backgroundColor: '#222'
  },
  myUserName: {
    color: '#4ea0ff'
  }
})