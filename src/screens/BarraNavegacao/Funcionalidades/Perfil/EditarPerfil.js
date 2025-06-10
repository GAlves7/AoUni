import React, { useState } from 'react'
import { View, Text, TouchableOpacity, StyleSheet, Image, TextInput } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { SafeAreaView } from 'react-native-safe-area-context'
import * as ImagePicker from 'expo-image-picker'
import { useNavigation } from '@react-navigation/native'

export default function EditarPerfil() {
    const navigation = useNavigation()
    const [image, setImage] = useState(null)
    const [nome, setNome] = useState('')

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

    return (
        <SafeAreaView style={styles.container}>

            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Ionicons name="arrow-back" size={25} color="#fff" />
                </TouchableOpacity>
                <Text style={styles.titulo}>EDITAR PERFIL</Text>
            </View>

            <TouchableOpacity style={styles.imgContainer} onPress={escolherImagem}>
                {image ? (
                    <Image source={{ uri: image }} style={styles.imagem} />
                ) : (
                    <Ionicons name="person-circle-outline" size={100} color="#888" />
                )}
                <Text style={styles.txtImagem}>Selecionar imagem</Text>
            </TouchableOpacity>

            <TextInput
                style={styles.input}
                placeholder="Digite seu novo nome"
                placeholderTextColor="#aaa"
                value={nome}
                onChangeText={setNome}
            />

            <TouchableOpacity style={styles.botaoSalvar}>
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