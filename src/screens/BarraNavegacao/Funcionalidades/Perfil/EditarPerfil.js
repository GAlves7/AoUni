// Tela para editar o perfil do usuário, permitindo alterar foto e nome
import React, { useState } from 'react'
import { View, Text, TouchableOpacity, StyleSheet, Image, TextInput } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { SafeAreaView } from 'react-native-safe-area-context'
import * as ImagePicker from 'expo-image-picker'
import { useNavigation } from '@react-navigation/native'
import api from '../../../../../src/axios/api'
import AsyncStorage from '@react-native-async-storage/async-storage'

export default function EditarPerfil() {
    const navigation = useNavigation()

    // Estado para armazenar a URI da imagem selecionada
    const [image, setImage] = useState(null)
    // Estado para armazenar o novo nome do usuário
    const [usuario, setUsuario] = useState('')

    // Função para abrir a galeria e escolher uma imagem, com edição quadrada (1:1)
    const escolherImagem = async () => {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: 'Images',
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1,
        })

        if (!result.canceled) {
            setImage(result.assets[0].uri)
        }
    }

    // Função para salvar as alterações da foto e/ou do nome do usuário
    const salvarAlteracoes = async () => {
        const idUser = await AsyncStorage.getItem('idUser')
        if (!idUser) {
            console.log('ID do usuário não encontrado.')
            return
        }

        try {
            // Se uma imagem foi selecionada, envia para a API via multipart/form-data
            if (image) {
                const formData = new FormData()
                const filename = image.split('/').pop()
                const ext = filename.split('.').pop()
                const mimeType = `image/${ext}`

                formData.append('foto', {
                    uri: image,
                    name: filename,
                    type: mimeType
                })

                await api.post(`/usuario/${idUser}/foto`, formData, {
                    headers: { 'Content-Type': 'multipart/form-data' },
                })
            }

            // Se o nome foi alterado e não está vazio, atualiza no backend e no AsyncStorage
            if (usuario.trim() !== '') {
                await api.put(`/usuario/${idUser}/alterar-nome`, { novoNome: usuario })
                await AsyncStorage.setItem('usuarioNome', usuario)
            }

            console.log('Perfil atualizado com sucesso!')
            navigation.replace('Rotas', { screen: 'Perfil' })

        } catch (error) {
            console.error('Erro ao atualizar perfil:', error.response || error.message)
        }
    }

    // Renderiza a interface de edição com opção de foto, campo para nome e botão de salvar
    return (
        <SafeAreaView style={styles.container}>

            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Ionicons name="arrow-back" size={25} color="#fff" />
                </TouchableOpacity>
                <Text style={styles.titulo}>EDITAR PERFIL</Text>
            </View>

            <TouchableOpacity style={styles.imgContainer} onPress={escolherImagem}>
                {/* Mostra a imagem selecionada ou um ícone padrão */}
                {image ? (
                    <Image source={{ uri: image }} style={styles.imagem} />
                ) : (
                    <Ionicons name="person-circle-outline" size={100} color="#888" />
                )}
                <Text style={styles.txtImagem}>Selecionar imagem</Text>
            </TouchableOpacity>

            {/* Campo para digitar novo nome de usuário */}
            <TextInput
                style={styles.input}
                placeholder="Novo usuário"
                placeholderTextColor="#aaa"
                value={usuario}
                onChangeText={setUsuario}
            />

            {/* Botão para salvar as alterações feitas */}
            <TouchableOpacity style={styles.botaoSalvar} onPress={salvarAlteracoes}>
                <Text style={styles.txtBotao}>Salvar Alterações</Text>
            </TouchableOpacity>

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
    },
    titulo: {
        color: '#fff',
        fontSize: 20,
        fontWeight: 'bold',
        marginLeft: 200,
    },
    imgContainer: {
        alignItems: 'center',
        marginTop: 50,
    },
    imagem: {
        width: 100,
        height: 100,
        borderRadius: 50,
    },
    txtImagem: {
        color: '#aaa',
        marginTop: 10,
    },
    input: {
        backgroundColor: '#1e1e1e',
        color: '#fff',
        marginHorizontal: 30,
        marginTop: 40,
        padding: 15,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#333',
        fontSize: 16,
    },
    botaoSalvar: {
        backgroundColor: '#333',
        marginHorizontal: 30,
        marginTop: 30,
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
    },
    txtBotao: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
})