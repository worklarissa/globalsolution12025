import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Link, useRouter } from 'expo-router'
import { useFonts, Roboto_600SemiBold,Roboto_400Regular } from '@expo-google-fonts/roboto'

export default function ScreenLugarSeguro() {
  const [ fontsLoaded ] = useFonts({Roboto_600SemiBold, Roboto_400Regular})
  const router = useRouter()

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Serviços de abrigo</Text>
                  <View style={styles.servicos}>
                      <View style={styles.card}>
                          <Text style={styles.titleCard}>Lugar Seguro</Text>
                          <Text style={styles.textCard}>Encontre um lugar seguro, perto de você.</Text>
                      </View>
                      <View style={styles.card}>
                          <Text style={styles.titleCard}>Gestão de Abrigos</Text>
                          <Text style={styles.textCard}>Cadastre e busque por pessoas que podem estar nos abrigos</Text>
                      </View>
                      <View style={styles.card}>
                          <Text style={styles.titleCard}>Seguradoras</Text>
                          <Text style={styles.textCard}>Encontre informações de contato de algumas seguradoras</Text>
                      </View> 
                  </View>

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
        borderBlockColor: '',
        fontFamily: 'Roboto_400Regular',
        margin: 10,
        padding: 20,
        height: 210,
        textAlign: 'center',
        alignItems: 'center',
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
});
