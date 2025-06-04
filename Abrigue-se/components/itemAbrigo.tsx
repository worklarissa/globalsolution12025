import { StyleSheet, View, Text, Pressable,  } from "react-native";
import { AntDesign, MaterialIcons } from '@expo/vector-icons'
import { useEffect, useState } from "react";
import {db,doc,updateDoc,deleteDoc} from '../services/firebaseConfig'

interface ItemAbrigoProps {
  id: string;
  nome: string;
  endereco: string;
  telefone: string;
  buscarItems: () => void;
}

export default function ItemAbrigo(props: ItemAbrigoProps) {
    //const [isChecked, setIsChecked] = useState(props.isChecked)

    const deletarAbrigo = async () => {
        await deleteDoc(doc(db, 'abrigos', props.id))
        props.buscarItems()
    }

    return (
        <View style={styles.container}>
            <View style={styles.infoContainer}>
                <Text style={styles.nome}>{props.nome}</Text>
                <Text style={styles.endereco}>{props.endereco}</Text>
                <Text style={styles.telefone}>{props.telefone}</Text>
            </View>
            
            <Pressable onPress={deletarAbrigo}>
                <MaterialIcons name='delete' size={24} color='#ff4444' />
            </Pressable>
        </View>
    )


    /* useEffect(()=>{
        updateIsChecked()
    },[isChecked])

    return (
        <View style={styles.container}>
            <Pressable onPress={()=>setIsChecked(!isChecked)}>
                {isChecked ? (
                    <AntDesign name='checkcircle' size={24} color='black' />
                ) : (
                    <AntDesign name='checkcircleo' size={24} color='black' />
                )}

            </Pressable>
            <Text style={styles.title}>{props.title}</Text>
            <Pressable onPress={deletarItem}>
                <MaterialIcons name='delete' size={24} color='black' />
            </Pressable>
        </View>
    )*/
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        backgroundColor: 'lightgrey',
        justifyContent: "space-between",
        alignItems: "center",
        padding: 10,
        width: '90%',
        alignSelf: "center",
        borderRadius: 10,
        marginVertical: 10
    },
    title: {
        flex: 1,
        marginLeft: 10,
        fontSize: 17,
        fontWeight: 500
    },
    infoContainer: { // <-- Adicione esta linha
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
    }

})