// Importação dos hooks e componentes necessários para a tela
import React, { useState } from 'react'
import { StyleSheet, View, TextInput, TouchableOpacity, Text } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useNavigation } from '@react-navigation/native'

// Componente funcional da tela de pesquisa de cursos
export default function Pesquisar() {
  const navigation = useNavigation()

  // Estado para armazenar o texto digitado na pesquisa
  const [pesquisa, setPesquisa] = useState("")

  // Opções fixas de cursos com nome, ícone e rota para navegação
  const opcoes = [
    { nome: 'Medicina', icone: 'medkit', rota: 'Medicina' },
    { nome: 'Direito', icone: 'book', rota: 'Direito' },
  ]

  // Filtra as opções com base no texto digitado na pesquisa (case insensitive)
  const opcoesFiltradas = opcoes.filter(opcao =>
    opcao.nome.toLowerCase().includes(pesquisa.toLowerCase())
  )

  // Renderização da tela com cabeçalho, campo de pesquisa e opções filtradas
  return (
    <SafeAreaView style={styles.container}>
      {/* Cabeçalho com botão para voltar e título */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={25} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.titulo}>PESQUISAR</Text>
      </View>

      {/* Caixa de pesquisa com ícone e campo para digitar texto */}
      <View style={styles.caixaPesq}>
        <Ionicons name="search" size={20} color="#ccc" style={styles.iconePesq} />
        <TextInput
          placeholder="Ex.: Medicina"
          placeholderTextColor="#ccc"
          style={styles.input}
          onChangeText={value => setPesquisa(value)}
          value={pesquisa}
        />
      </View>

      <View style={styles.linha} />

      {/* Exibição das opções filtradas ou mensagem caso não encontre */}
      <View style={styles.opcoesContainer}>
        {opcoesFiltradas.length > 0 ? (
          opcoesFiltradas.map((opcao, index) => (
            <TouchableOpacity
              key={index}
              style={styles.caixaAreaFacul}
              onPress={() => navigation.navigate(opcao.rota)}
            >
              <Ionicons name={opcao.icone} size={24} color="#fff" />
              <Text style={styles.textoCaixaAreaFacul}>{opcao.nome}</Text>
            </TouchableOpacity>
          ))
        ) : (
          <Text style={{ color: '#fff' }}>Nenhuma opção encontrada</Text>
        )}
      </View>
    </SafeAreaView>
  )
}

// Estilos da tela Pesquisar
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
    top: 25,
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
    top: 55,
  },
  opcoesContainer: {
    marginTop: 80,
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  caixaAreaFacul: {
    alignItems: 'center',
    backgroundColor: '#1e1e1e',
    padding: 20,
    borderRadius: 10,
    width: 120,
    borderWidth: 1,
    borderColor: '#444',
  },
  textoCaixaAreaFacul: {
    color: '#fff',
    marginTop: 8,
    fontSize: 14,
    fontWeight: 'bold',
  },
  titulo: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 250,
  },
})