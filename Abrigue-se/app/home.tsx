import React from 'react'
import { Text, Button, View, StyleSheet, TouchableOpacity } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { Link, useRouter } from 'expo-router'
import { useFonts, Roboto_600SemiBold,Roboto_400Regular } from '@expo-google-fonts/roboto'
import { Image } from 'expo-image'
import { AntDesign, MaterialIcons } from '@expo/vector-icons'

export default function ScreenHome() {
    const [ fontsLoaded ] = useFonts({Roboto_600SemiBold, Roboto_400Regular})
    const router = useRouter()

    const realizarLogoff = async () => {
        await AsyncStorage.removeItem('@user')
        router.push('/')
    }

    return (
        <>  
            <View style={styles.topo}>
                <Text style={styles.titulo}>Número de emergência </Text>
                <TouchableOpacity style={styles.botaoOff} 
                onPress={realizarLogoff}>
                    <Text style={styles.botaoTexto}>Fazer Logoff</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.alerta}>
                <MaterialIcons name='phone' size={60} color='#F66B0E' />
                <Text style={styles.textoNumero}>Em caso de emergência ligue para: 190</Text>
            </View>
            <Text style={styles.titulo}>Serviços de abrigo</Text>
            <View style={styles.servicos}>
                <View style={styles.card}>
                    <Text style={styles.titleCard}>Lugar Seguro</Text>
                    <Text style={styles.textCard}>Encontre um lugar seguro, perto de você.</Text>
                    <TouchableOpacity 
                        style={styles.botao}
                        onPress={()=>{router.push('/lugarSeguro')}}
                    >
                        <Text style={styles.botaoTexto}>Verificar Locais</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.card}>
                    <Text style={styles.titleCard}>Gestão de Abrigos</Text>
                    <Text style={styles.textCard}>Cadastre e busque por pessoas que podem estar nos abrigos</Text>
                    <TouchableOpacity 
                        style={styles.botao}
                        onPress={()=>{router.push('/gestaoAbrigos')}}
                    >
                        <Text style={styles.botaoTexto}>Acessar</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.card}>
                    <Text style={styles.titleCard}>Seguradoras</Text>
                    <Text style={styles.textCard}>Encontre informações de contato de algumas seguradoras</Text>
                    <TouchableOpacity 
                        style={styles.botao}
                        onPress={()=>{router.push('/seguradoras')}}
                    >
                        <Text style={styles.botaoTexto}>Obter Informações</Text>
                    </TouchableOpacity>
                </View> 
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFF',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20
    },
    alerta: {
        margin: 10,
        padding: 20,
        borderWidth: 4,
        borderColor: '#F66B0E',
        borderRadius: 6,
        fontSize: 20,
        alignItems: 'center',
        textAlign: 'center',
        flexDirection: 'row'
    },
    servicos: {
        flex: 1,
        fontFamily: 'Roboto_400Regular',
        padding: 10,
        textAlign: 'center',
        flexDirection: 'column',
        justifyContent: 'space-between',
    },
    botao: {
        width: '100%',
        padding: 10,   
        backgroundColor: '#4482A7',
        borderRadius: 10,
        alignItems: 'center',
        marginTop: 15
    },
    botaoTexto: {
        fontFamily: 'Roboto_400Regular',
        color: '#ffffff',
        fontWeight: 'bold',
        fontSize: 16
    },
    titulo: {
        fontFamily: 'Roboto_600SemiBold',
        fontWeight: 'bold',
        color: '#13293E',
        margin: 5,
        fontSize: 24,
    },
    card:{
        width: '100%',
        padding: 20,
        margin: 5,
        borderWidth: 4,
        borderColor: '#4482A7',
        borderRadius: 6,
        alignItems: 'center',
    },
    titleCard:{
        fontFamily: 'Roboto_600SemiBold',
        fontSize: 25,
        color: '4482A7',
    },
    textCard:{
        fontFamily: 'Roboto_400Regular',
        fontSize: 15,
    
    },
    textoNumero:{
        fontFamily: 'Roboto_600SemiBold',
        fontSize: 20,
        alignItems: 'center',
    },
    botaoOff:{
        width: '30%',
        padding: 5,   
        backgroundColor: '#4482A7',
        borderRadius: 10,
        alignItems: 'center',
        marginTop: 10,
        marginEnd: 5
    },
    topo:{
        flexDirection: 'row',
        justifyContent: 'space-between',
    }
})
