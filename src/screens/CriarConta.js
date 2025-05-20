import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

export default function CriarConta() {
  return (
    <View style={styles.container}>
      <Text style={styles.texto}>Tela de Criar Conta</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff'
  },
  texto: {
    fontSize: 20,
    color: '#000'
  }
})