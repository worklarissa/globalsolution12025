import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, StyleSheet, Pressable, ActivityIndicator, Alert } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { db, doc, getDocs, updateDoc, getDoc } from '../services/firebaseConfig';
import { useFonts, Roboto_600SemiBold, Roboto_400Regular } from '@expo-google-fonts/roboto';

export default function EditarAbrigo() {
  const [fontsLoaded] = useFonts({ Roboto_600SemiBold, Roboto_400Regular });
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();

  const [nome, setNome] = useState('');
  const [endereco, setEndereco] = useState('');
  const [telefone, setTelefone] = useState('');
  const [loading, setLoading] = useState(true);

  // Carregar dados do abrigo
  useEffect(() => {
    const carregarAbrigo = async () => {
      if (!id) return;
      try {
        const docRef = doc(db, 'abrigos', id);
        const docSnap = await getDoc(docRef)
        if (docSnap.exists()) {
          const data = docSnap.data();
          setNome(data.nome || '');
          setEndereco(data.endereco || '');
          setTelefone(data.telefone || '');
        } else {
          Alert.alert('Erro', 'Abrigo não encontrado');
          router.back();
        }
      } catch (e) {
        Alert.alert('Erro', 'Não foi possível carregar o abrigo');
        router.back();
      } finally {
        setLoading(false);
      }
    };
    carregarAbrigo();
  }, [id]);

  // Salvar alterações
  const salvarEdicao = async () => {
    try {
      setLoading(true);
      await updateDoc(doc(db, 'abrigos', id), {
        nome,
        endereco,
        telefone,
      });
      Alert.alert('Sucesso', 'Abrigo atualizado com sucesso!');
      router.back(); // Volta para a tela anterior
    } catch (e) {
      Alert.alert('Erro', 'Não foi possível atualizar o abrigo');
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <ActivityIndicator style={{ flex: 1 }} />;

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Editar Abrigo</Text>
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
      <Pressable style={styles.botao} onPress={salvarEdicao}>
        <Text style={styles.botaoTexto}>Salvar Alterações</Text>
      </Pressable>
      <Pressable style={styles.botao} onPress={() => router.back()}>
        <Text style={styles.botaoTexto}>Cancelar</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  titulo: {
    fontFamily: 'Roboto_600SemiBold',
    fontSize: 24,
    color: '#13293E',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    backgroundColor: "lightgrey",
    padding: 10,
    fontSize: 15,
    borderRadius: 10,
    marginBottom: 10,
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
});
