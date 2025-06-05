import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity, TextInput, } from 'react-native';
import React, { useState, useEffect, useCallback } from 'react';
import { Link, useRouter } from 'expo-router';
import { auth } from '../services/firebaseConfig'
import { signInWithEmailAndPassword } from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFonts, Roboto_600SemiBold,Roboto_400Regular } from '@expo-google-fonts/roboto'



export default function Login() {
    const [ fontsLoaded ] = useFonts({Roboto_600SemiBold, Roboto_400Regular})
    const [email, setEmail] = useState('')
    const [senha, setSenha] = useState('')

    const router = useRouter()//Hook de navegação

    useEffect(()=>{
        const verificarUsuarioLogado = async() =>{
          try{
            const usuarioSalvo = await AsyncStorage.getItem('@user')
            if(usuarioSalvo){
              router.push('/home')
            }
          }catch(error){
            console.log('Error ao fazer o login: ',error)
          }
        }
        verificarUsuarioLogado()
      },[])

      const realizarLogin = () => {
        console.log("Entrou na função login")
        signInWithEmailAndPassword(auth, email, senha)
          .then(async(userCredential) => {
            // Signed in 
            const user = userCredential.user;
            await AsyncStorage.setItem('@user',JSON.stringify(user))
            router.push('/home')
          })
          .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorMessage)
          });
      };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Bem-vindo(a) ao Abrigue-se!</Text>
            
            {/* Campos de Login */}
            <TextInput
                placeholder="E-mail"
                onChangeText={(value) => setEmail(value)}
                style={styles.input}
                placeholderTextColor="#4482A7"
                autoCapitalize="none"
                keyboardType="email-address"
            />
            
            <TextInput
                placeholder="Senha"
                style={styles.input}
                placeholderTextColor="#4482A7"
                secureTextEntry
                onChangeText={(value) => setSenha(value)}
            />

            <TouchableOpacity 
                style={styles.botao}
                onPress={realizarLogin}
            >
                <Text style={styles.botaoTexto}> Entrar</Text>
            </TouchableOpacity>

            <Link href="cadastrarUsuario" style={styles.link}>Cadastre-se</Link>

            <StatusBar style="auto" />

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFF',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20
    },
    logo: {
        marginBottom: 40
    },
    title: {
        fontFamily: 'Roboto_600SemiBold',
        fontWeight: 'bold',
        color: '#F66B0E',
        fontSize: 30,
        marginBottom: 30,
        textAlign: 'center'
    },
    input: {
        fontFamily: 'Roboto_400Regular',
        width: '100%',
        height: 50,
        backgroundColor: '#E6E2DF',
        borderRadius: 10,
        padding: 15,
        marginBottom: 15,
        fontSize: 16,
    },
    botao: {
        width: '100%',
        padding: 15,
        backgroundColor: '#4482A7',
        borderRadius: 10,
        marginTop: 20,
        alignItems: 'center'  
    },
    botaoTexto: {
        fontFamily: 'Roboto_600SemiBold',
        color: '#ffffff',
        fontWeight: 'bold',
        fontSize: 16
    },
    erro: {
        color: '#FFD700',
        marginVertical: 10,
        textAlign: 'center'
    },
    link: {
        fontFamily: 'Roboto_600SemiBold',
        color: "#F66B0E",
        marginTop: 20
    }
})