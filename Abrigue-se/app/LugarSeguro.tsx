import { ActivityIndicator, FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Link, useRouter } from 'expo-router'
import { useFonts, Roboto_600SemiBold,Roboto_400Regular } from '@expo-google-fonts/roboto'
import { db,collection,getDocs} from '../services/firebaseConfig'
import ItemAbrigo from '../components/itemAbrigo'
import { useEffect, useState } from 'react';

interface Item {
  id: string;
  endereco: string;
  nome: string;
  telefone: string;
}

export default function ScreenLugarSeguro() {
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



  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Abrigos Conhecidos</Text>
                  <View style={styles.servicos}>
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
                  </View>

                  <TouchableOpacity 
                              style={styles.botao}
                              onPress={()=>{router.push('/cadastrarAbrigo')}}
                          >
                              <Text style={styles.botaoTexto}>Cadastrar Abrigo</Text>
                  </TouchableOpacity>
                  <TouchableOpacity 
                              style={styles.botao}
                              onPress={()=>{router.push('/home')}}
                          >
                              <Text style={styles.botaoTexto}>Voltar ao menu principal</Text>
                  </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  titulo: {
        fontFamily: 'Roboto_600SemiBold',
        fontWeight: 'bold',
        color: '#13293E',
        margin: 5,
        fontSize: 24,
  },
  servicos: {
        flex: 1,
        fontFamily: 'Roboto_400Regular',
        margin: 2,
        padding: 5,
        width: '100%'
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
  botao: {
        width: '90%',
        padding: 10,   
        backgroundColor: '#4482A7',
        borderRadius: 10,
        alignItems: 'center',
        marginBlock: 15
  },
  botaoTexto: {
        fontFamily: 'Roboto_400Regular',
        color: '#ffffff',
        fontWeight: 'bold',
        fontSize: 16
  }
});
