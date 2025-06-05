import React from 'react';
import { FlatList, View, Text, Linking, Button, StyleSheet, TouchableOpacity } from 'react-native';
import seguradoras from '../components/seguradoras.json'; // Caminho relativo ao arquivo
import { Link, useRouter } from 'expo-router'

const router = useRouter();

const SeguradorasList = () => (
  <>
  <FlatList
    data={seguradoras}
    keyExtractor={(item) => item.entcodigofip}
    renderItem={({ item }) => (
      <View style={styles.card}>
        <Text style={{ fontWeight: 'bold' }}>{item.entnome}</Text>
        <Text>Telefone: {item.telefone}</Text>
        <Text>Endereços: {item.endereco}</Text>
        {item.entsite ? (
          <TouchableOpacity 
            style={styles.botao}
            onPress={() => Linking.openURL(item.entsite)}
            >
              <Text style={styles.botaoTexto}>Visitar site</Text>
            </TouchableOpacity>
        ) : null}
      </View>
    )}
  />
  <TouchableOpacity 
    style={styles.botaoVoltar}
    onPress={()=>{router.push('/home')}}
  >
    <Text style={styles.botaoTexto}>Voltar ao menu principal</Text>
  </TouchableOpacity>
</>
);

export default SeguradorasList;

const styles = StyleSheet.create({
  card:{
        width: '97%',
        padding: 20,
        margin: 5,
        borderWidth: 4,
        borderColor: '#4482A7',
        borderRadius: 6,
        alignItems: 'center',
  },
  botao: {
        width: '100%',
        padding: 10,   
        backgroundColor: '#4482A7',
        borderRadius: 10,
        alignItems: 'center',
        marginTop: 15,
  },
  botaoTexto: {
    fontFamily: 'Roboto_400Regular',
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  botaoVoltar:{
    width: '50%',
    padding: 10,   
    backgroundColor: '#4482A7',
    borderRadius: 10,
    alignItems: 'center',
    margin: 10,

  }


})
