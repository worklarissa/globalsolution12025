import React from 'react'
import { Text, Button, View, Image, StyleSheet, TouchableOpacity } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { Link, useRouter } from 'expo-router'

export default function ScreenHome() {
    const router = useRouter()

    return (
        <>
            <Text>Gestão de Abrigos</Text>
            <View style={styles.servicos}>
            <TouchableOpacity 
                style={styles.botao}
                onPress={()=>{router.push('/lugarSeguro')}}
            >
                <Text style={styles.botaoTexto}>Cadastrar</Text>
            </TouchableOpacity>

            <TouchableOpacity 
                style={styles.botao}
                onPress={()=>{router.push('/gestaoAbrigos')}}
            >
                <Text style={styles.botaoTexto}>Buscar</Text>
            </TouchableOpacity>

            <TouchableOpacity 
                style={styles.botao}
                onPress={()=>{router.push('/lugarSeguro')}}
            >
                <Text style={styles.botaoTexto}>Atualizar</Text>
            </TouchableOpacity>


                
            </View>









            <Button title='Voltar' onPress={()=>{router.push('/home')}}/>
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
        alignItems: 'center',
        marginTop: 15
    },
    botaoTexto: {
        color: '#ffffff',
        fontWeight: 'bold',
        fontSize: 16
    }
})
