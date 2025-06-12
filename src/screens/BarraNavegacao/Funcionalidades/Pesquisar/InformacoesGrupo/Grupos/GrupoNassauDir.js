// Importações principais do React, componentes nativos, navegação e ícones
import React, { useState } from 'react'
import { StyleSheet, View, TouchableOpacity, Text, Image, TextInput, KeyboardAvoidingView, Platform } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Ionicons } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'

export default function GroupChat() {
  const navigation = useNavigation()
  const [message, setMessage] = useState('') // Estado para controlar a mensagem digitada

  return (
    <SafeAreaView style={styles.container}>
      
      {/* Cabeçalho com botão de voltar, logo e nome do grupo */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.replace('Rotas', {screen: 'Pesquisar'})} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>

        <Image
          source={require('../../../../../../assets/nassau.png')} 
          style={styles.logo}
          resizeMode="contain"
        />

        <Text style={styles.groupName}>UNINASSAU Caruaru - Direito</Text>
      </View>

      {/* Área onde as mensagens serão exibidas futuramente */}
      <View style={styles.messagesContainer}>
      </View>

      {/* Rodapé com campo de texto e botões para mídia e envio de mensagem */}
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

          <TouchableOpacity style={styles.sendButton} onPress={() => {}}>
            <Ionicons name="send" size={22} color="#fff" />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}

// Estilos principais da tela de chat em grupo
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#141414', // Fundo escuro
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#333', // Linha inferior do cabeçalho
  },
  backButton: {
    marginRight: 8, // Espaço entre botão e logo
  },
  logo: {
    width: 36,
    height: 36,
    borderRadius: 18, // Deixa a imagem circular
  },
  groupName: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  messagesContainer: {
    flex: 1,
    paddingHorizontal: 12,
    paddingVertical: 6, // Área futura para exibir mensagens
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderTopWidth: 1,
    borderTopColor: '#333',
    backgroundColor: '#0f0142', // Cor do rodapé
  },
  mediaButton: {
    padding: 6,
    marginRight: 6,
  },
  input: {
    flex: 1,
    backgroundColor: '#0a002e',
    borderRadius: 20,
    paddingHorizontal: 14,
    paddingVertical: 8,
    color: '#fff',
    fontSize: 15,
  },
  sendButton: {
    padding: 6,
    marginLeft: 6,
  },
})