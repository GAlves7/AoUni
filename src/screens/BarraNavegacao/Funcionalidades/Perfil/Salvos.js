import { StyleSheet, View, TouchableOpacity, Text } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useNavigation } from '@react-navigation/native'

export default function Search(){

    const navigation = useNavigation()

    return(
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
  <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
    <Ionicons name="arrow-back" size={25} color="#fff" />
  </TouchableOpacity>

  <View style={styles.centeredTitle}>
    <Ionicons name="bookmark-outline" size={20} color="#fff" />
    <Text style={styles.titulo}>SALVOS</Text>
  </View>
</View>

            <View style={styles.linha} />

        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: "#141414",
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 10,
        paddingBottom: 10,
        position: 'relative',
    },
    titulo: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    linha: {
        height: 1,
        backgroundColor: '#333', 
    },
    backButton: {
        position: 'absolute',
        left: 15,
    },
    centeredTitle: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
    },
})