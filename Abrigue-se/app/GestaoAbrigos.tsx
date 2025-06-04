import React, { useEffect, useState } from 'react'
import { Text, Button, View, Image, StyleSheet, TouchableOpacity, Alert, TextInput } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { Link, useRouter } from 'expo-router'
import { useFonts, Roboto_600SemiBold,Roboto_400Regular } from '@expo-google-fonts/roboto'
import { collection, getDocs } from 'firebase/firestore'
import { db } from '../services/firebaseConfig'

interface Item {
  id: string;
  nome: string;
  endereco: string;
  telefone: string;
}

export default function ScreenHome() {
    const [ fontsLoaded ] = useFonts({Roboto_600SemiBold, Roboto_400Regular})
    const router = useRouter()

    const [nomeBusca, setNomeBusca] = useState('');
    const [listItems, setListItems] = useState<Item[]>([]);

    const buscarItems = async () => {
        try {
            const querySnapshot = await getDocs(collection(db, 'abrigos'));
            const items: Item[] = [];
            querySnapshot.forEach((doc) => {
                const data = doc.data();
                items.push({
                    ...doc.data(),
                    id: doc.id,
                    nome: data.nome || 'Sem título',
                    endereco: data.endereco || 'Sem endereço',
                    telefone: data.telefone || 'Sem telefone',
                });
            });
            setListItems(items);
        } catch (e) {
            console.log("Error, ", e);
        }
    };

    useEffect(() => {
        buscarItems();
    }, []);

    const encontrarIdPorNome = () => {
        const abrigoEncontrado = listItems.find(item =>
            item.nome.toLowerCase() === nomeBusca.toLowerCase().trim()
        );
        if (abrigoEncontrado) {
            router.push(`/editarAbrigo?id=${abrigoEncontrado.id}`);
        } else {
            Alert.alert('Aviso', 'Nenhum abrigo encontrado com este nome');
        }
    };


    return (
        <>
            <Text style={styles.titulo}>Gestão de Abrigos</Text>
                <View style={styles.servicos}>
                    <View style={styles.card}>
                        <Text style={styles.titleCard}>Cadastrar</Text>
                        <Text style={styles.textCard}>Cadastre os abrigos que você conhece</Text>
                        <TouchableOpacity 
                            style={styles.botao}
                            onPress={()=>{router.push('/cadastrarAbrigo')}}
                        >
                            <Text style={styles.botaoTexto}>Cadastrar</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.card}>
                        <Text style={styles.titleCard}>Lugar Seguro</Text>
                        <Text style={styles.textCard}>Encontre um lugar seguro, perto de você.</Text>
                        <TouchableOpacity 
                            style={styles.botao}
                            onPress={()=>{router.push('/lugarSeguro')}}
                        >
                            <Text style={styles.botaoTexto}>Buscar</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.card}>
                        <Text style={styles.titleCard}>Atualizar Abrigo</Text>
                        <Text style={styles.textCard}>Atualize informações de abrigos conhecidos! Digite o nome exato do abrigo para editar: </Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Nome do abrigo"
                            value={nomeBusca}
                            onChangeText={setNomeBusca}
                        />
                        <TouchableOpacity 
                            style={styles.botao}
                            onPress={encontrarIdPorNome}
                        >
                            <Text style={styles.botaoTexto}>Atualizar</Text>
                        </TouchableOpacity>
                    </View>
                </View>

            <TouchableOpacity style={styles.botao} 
                onPress={()=>{router.push('/home')}}
            >
                <Text style={styles.botaoTexto}>Voltar ao menu principal</Text>
            </TouchableOpacity>
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
    titulo: {
        fontFamily: 'Roboto_600SemiBold',
        fontWeight: 'bold',
        color: '#13293E',
        margin: 5,
        fontSize: 24,
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
        borderBlockColor: '',
        fontFamily: 'Roboto_400Regular',
        margin: 10,
        padding: 20,
        height: 210,
        textAlign: 'center',
        alignItems: 'center',
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
        color: '#ffffff',
        fontWeight: 'bold',
        fontSize: 16
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
        fontSize: 15
    },
    input:{ 
        backgroundColor:"lightgrey",
        padding:10,
        fontSize:15,
        width:'90%',
        alignSelf:"center",
        borderRadius:10,
        margin: 5
    },
})
