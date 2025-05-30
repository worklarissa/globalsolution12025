import React from 'react'
import { Text, Button } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useRouter } from 'expo-router'

export default function ScreenHome() {
    const router = useRouter()

    const realizarLogoff = async () => {
        await AsyncStorage.removeItem('@user')
        router.push('/')
    }

    return (
        <>
            <Text>Tela Inicial</Text>
            <Button title='Fazer Logoff' onPress={realizarLogoff}/>
        </>
    )
}