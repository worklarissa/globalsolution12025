import React from 'react'
import { Text, Button, View, Image, StyleSheet, TouchableOpacity } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { Link, useRouter } from 'expo-router'

export default function ScreenHome() {
    const router = useRouter()

    const realizarLogoff = async () => {
        await AsyncStorage.removeItem('@user')
        router.push('/')
    }

    return (
        <>
            <Text>Número de emergência </Text>
            <View>
                <Image></Image>
                <Text style={styles.alerta}>Em caso de emergência ligue para 190</Text>
            </View>
            <Text>Serviços de abrigo</Text>
            <View style={styles.servicos}>
            <TouchableOpacity 
                style={styles.botao}
                onPress={()=>{router.push('/lugarSeguro')}}
            >
                <Text style={styles.botaoTexto}>Verificar Locais</Text>
            </TouchableOpacity>


                <Button  title='Verificar Locais' onPress={()=>{router.push('/lugarSeguro')}} style={styles.botao} />
                <Button title='Verificar Locais' onPress={()=>{router.push('/lugarSeguro')}}/>
            </View>









            <Button title='Fazer Logoff' onPress={realizarLogoff}/>
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
        flex: 1,
        margin: 10,
        padding: 20,
        backgroundColor: '#F66B0E',
        height: 210,
        textAlign: 'center',
        alignItems: 'center',
    },
    servicos: {
        flex: 1,
        margin: 10,
        padding: 20,
        backgroundColor: '#4482A7',
        height: 210,
        textAlign: 'center',
        alignItems: 'center',
    },
    botao: {
        width: '100%',
        padding: 10,   
        backgroundColor: '#4286F5',
        borderRadius: 10,
        alignItems: 'center'
    },
})
