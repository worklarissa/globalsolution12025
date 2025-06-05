import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import { useState } from 'react';
import { auth } from '../services/firebaseConfig'
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { useRouter } from 'expo-router';

export default function CadastrarUsuario() {
  const [nomeFocused, setNomeFocused] = useState(false);
  const [emailFocused, setEmailFocused] = useState(false);
  const [senhaFocused, setSenhaFocused] = useState(false);

  const[nome,setNome]=useState('')
  const[email,setEmail]=useState('')
  const[senha,setSenha]=useState('')

  const router = useRouter()//Hook para navegação

  const cadastrar = () => {
    createUserWithEmailAndPassword(auth, email, senha)
      .then((userCredential) => {
        // Signed up 
        const user = userCredential.user;
        console.log(user)
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
      <Text style={styles.title}>Cadastre-se na aplicação</Text>

      <TextInput
        placeholder="Digite seu nome"
        style={[styles.input, nomeFocused && styles.inputFocused]}
        placeholderTextColor="#aaa"
        onFocus={() => setNomeFocused(true)}
        onBlur={() => setNomeFocused(false)}
        value={nome}
        onChangeText={(value)=>setNome(value)}
      />

      <TextInput
        placeholder="Digite seu email"
        style={[styles.input, emailFocused && styles.inputFocused]}
        placeholderTextColor="#aaa"
        onFocus={() => setEmailFocused(true)}
        onBlur={() => setEmailFocused(false)}
        onChangeText={(value)=>setEmail(value)}
      />

      <TextInput
        placeholder="Digite sua senha"
        secureTextEntry={true}
        style={[styles.input, senhaFocused && styles.inputFocused]}
        placeholderTextColor="#aaa"
        onFocus={() => setSenhaFocused(true)}
        onBlur={() => setSenhaFocused(false)}
        onChangeText={(value)=>setSenha(value)}
      />

      <TouchableOpacity style={styles.button} onPress={cadastrar}>
        <Text style={styles.buttonText}>Cadastrar</Text>
      </TouchableOpacity>

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 18,
    marginBottom: 20,
    color: '#333',
  },
  input: {
    backgroundColor: '#fff',
    paddingVertical: 14,
    paddingHorizontal: 18,
    borderRadius: 10,
    fontSize: 16,
    borderWidth: 2,
    borderColor: '#ccc',
    color: '#333',
    width: '100%',
    marginBottom: 16,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  inputFocused: {
    borderColor: '#e53935',
    shadowColor: '#e53935',
    shadowOpacity: 0.2,
    elevation: 5,
  },
  button: {
    backgroundColor: '#e53935',
    paddingVertical: 14,
    paddingHorizontal: 30,
    borderRadius: 10,
    marginTop: 10,
    width: '100%',
    alignItems: 'center',
    elevation: 4,
    shadowColor: '#e53935',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});