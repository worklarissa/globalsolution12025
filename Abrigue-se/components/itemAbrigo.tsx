import { StyleSheet, View, Text, Pressable,  } from "react-native";
import { AntDesign, MaterialIcons } from '@expo/vector-icons'
import { useEffect, useState } from "react";
import {db,doc,updateDoc,deleteDoc} from '../services/firebaseConfig'
import { Link, useRouter } from 'expo-router'
import { useFonts, Roboto_600SemiBold,Roboto_400Regular } from '@expo-google-fonts/roboto'

interface ItemAbrigoProps {
  id: string;
  nome: string;
  endereco: string;
  telefone: string;
  buscarItems: () => void;
}

export default function ItemAbrigo(props: ItemAbrigoProps) {
    const [ fontsLoaded ] = useFonts({Roboto_600SemiBold, Roboto_400Regular})
    const router = useRouter()

    const deletarAbrigo = async () => {
        await deleteDoc(doc(db, 'abrigos', props.id))
        props.buscarItems()
    }

    return (
        <View style={styles.card}>
            <View>
                <Text style={styles.titleCard}>{props.nome}</Text>
                <Text style={styles.textCard}>{props.endereco}</Text>
                <Text style={styles.textCard}>{props.telefone}</Text>
            </View>
            
            <View>
                <Pressable onPress={deletarAbrigo}>
                    <MaterialIcons name='delete' size={24} color='#ff4444' />
                </Pressable>
                <Pressable onPress={() => router.push({ pathname: '/editarAbrigo', params: { id: props.id } })}>
                    <MaterialIcons name='edit' size={24} color='#ff4444' />
                </Pressable>
            </View>
        </View>
    )

}

const styles = StyleSheet.create({
   card:{
        width: '99%',
        padding: 10,
        borderWidth: 4,
        borderColor: '#4482A7',
        borderRadius: 6,
        alignItems: 'center',
	    flexDirection: "row",
	    justifyContent: 'space-between',
	    alignSelf: "center",
	    marginVertical: 10
    },
    title: {
        flex: 1,
        marginLeft: 10,
        fontSize: 17,
        fontWeight: 500
    },
    infoContainer: { 
        flex: 1,
        marginRight: 10,
    },
    nome: {
        fontWeight: "bold",
        fontSize: 16,
        marginBottom: 2,
        color: "#222"
    },
    endereco: {
        fontSize: 14,
        color: "#555",
        marginBottom: 2
    },
    telefone: {
        fontSize: 14,
        color: "#0984e3"
    },
    titleCard:{
    fontFamily: 'Roboto_600SemiBold',
    fontSize: 25,
    color: '4482A7',
    },
    textCard:{
        fontFamily: 'Roboto_400Regular',
        fontSize: 15,
    
  }

})