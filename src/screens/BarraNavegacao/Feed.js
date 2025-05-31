import React from 'react'
import { useNavigation } from '@react-navigation/native'
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Ionicons } from '@expo/vector-icons'

export default function Feed(){
    
    const navigation = useNavigation()
    
    function criarNovaPublicacao() {
        navigation.navigate('CriarNovaPubli')
    }

    return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={criarNovaPublicacao}>
          <Ionicons name="add-circle-outline" size={25} color="#fff" />
        </TouchableOpacity>

        <Text style={styles.titulo}>Nova publicação</Text>

        <Text style={styles.titulo2}>FEED</Text>
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
    borderBottomWidth: 1,
    borderBottomColor: '#333',
  },
  titulo: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
    marginLeft: 5,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  semPost: {
    color: '#aaa',
    fontSize: 16,
  },
  titulo2: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 200,
  },
})