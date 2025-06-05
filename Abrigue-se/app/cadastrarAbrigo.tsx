import React from 'react'
import {Text,View,TextInput,StyleSheet, FlatList, ActivityIndicator, Pressable, TouchableOpacity} from 'react-native'
import { useState,useEffect } from 'react'
import { db,collection,addDoc,getDocs} from '../services/firebaseConfig'
import ItemAbrigo from '../components/itemAbrigo'
import { useRouter } from 'expo-router'
import { useFonts, Roboto_600SemiBold,Roboto_400Regular } from '@expo-google-fonts/roboto'

interface Item {
  id: string;
  endereco: string;
  nome: string;
  telefone: string;
}

export default function cadastrarAbrigo(){
    const [ fontsLoaded ] = useFonts({Roboto_600SemiBold, Roboto_400Regular})
    const router = useRouter()

    const [nome, setNome] = useState('');
    const [endereco, setEndereco] = useState('');
    const [telefone, setTelefone] = useState('');
    const[listItems,setListItems]=useState<Item[]>([])

    const buscarItems = async()=>{
        try{
            const querySnapshot = await getDocs(collection(db,'abrigos'))
            const items: Item[] = []
        
            querySnapshot.forEach((doc)=>{
                const data = doc.data()
                items.push({
                    ...doc.data(),
                    id:doc.id,
                    nome: data.nome || 'Sem título', // Valor padrão
                    endereco: data.endereco || 'Sem endereço',
                    telefone: data.telefone || 'Sem telefone',

                })
            })
            console.log('Itens carregados: ',items)
            setListItems(items)
        }catch(e){
            console.log("Error, ",e)
        }
    }

    useEffect(()=>{
        buscarItems()
    },[])



    const salvarItem = async() =>{
        try {
            const docRef = await addDoc(collection(db, 'abrigos'), {
                nome: nome,
                endereco: endereco,
                telefone: telefone,
                isChecked: false
            });
        console.log("Abrigo salvo", docRef.id);
        setNome('');
        setEndereco('');
        setTelefone('');
        buscarItems();
    } catch (e) {
        console.log('Erro ao salvar abrigo', e);
    }
    }
    return(
        <View style={styles.container}>
            {listItems.length>0?(
                <FlatList
                    data={listItems}
                    renderItem={({ item }) =>
                    <ItemAbrigo
                        nome={item.nome}
                        endereco={item.endereco}
                        telefone={item.telefone}
                        id={item.id}
                        buscarItems={buscarItems}
                    />
                }
                    keyExtractor={item => item.id}
                />
            ):(<ActivityIndicator />)}



            <TextInput
                style={styles.input}
                placeholder='Nome do abrigo'
                value={nome}
                onChangeText={setNome}
            />
            <TextInput
                style={styles.input}
                placeholder='Endereço do abrigo'
                value={endereco}
                onChangeText={setEndereco}
            />
            <TextInput
                style={styles.input}
                placeholder='Telefone do abrigo'
                value={telefone}
                onChangeText={setTelefone}
                keyboardType="phone-pad"
            />
            <Pressable 
                style={styles.botao} 
                onPress={salvarItem}
            >
                <Text style={styles.botaoTexto}>Cadastrar</Text>
            </Pressable>

            <TouchableOpacity style={styles.botao} 
                            onPress={()=>{router.push('/gestaoAbrigos')}}
                        >
                            <Text style={styles.botaoTexto}>Voltar a Gestão de Abrigos</Text>
            </TouchableOpacity>

        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        margin: 5
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
    }
})