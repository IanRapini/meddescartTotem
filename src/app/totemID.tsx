import React, { useState } from 'react';
import { View, TextInput, Alert, StyleSheet, TouchableOpacity, Text, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../config/firebase';
import { router } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';

const SaveIdScreen = () => {
  const [id, setId] = useState('');

  const saveId = async () => {
    try {
      getDoc(doc(db, 'totens', id)).then(async (doc) => {
        if (doc.exists()) {
          await AsyncStorage.setItem('@token_id', id);
          router.replace('/(menu)');
        } else {
          Alert.alert('Erro', 'ID não encontrado');
        }
      });
    } catch (error) {
      Alert.alert('Erro', 'Falha ao salvar o ID');
    }
  };

  return (
    <LinearGradient colors={['#e6f8e0', '#f0fff4']} style={styles.container}>
      <View style={styles.logoContainer}>
        <Image
          source={require('./../../assets/images/LOGO FINAL (3).png')}
          style={{ width: 200, height: 200, }}
          resizeMode="cover"
        />
        <Image
          source={require('./../../assets/images/LOGO FINAL (4).png')} 
          style={{ width: 280, height: 70 }}
          resizeMode="cover"
        />
      </View>
      <View style={styles.form}>
        <TextInput
          style={styles.input}
          placeholder="Digite o ID do Totem"
          placeholderTextColor="#6c6c6c"
          value={id}
          onChangeText={setId}
        />
        <TouchableOpacity style={styles.button} onPress={saveId}>
          <Text style={styles.buttonText}>Salvar ID</Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  logoImage: {
    width: 200,
    height: 200,
  },
  subtitleImage: {
    width: 280,
    height: 70,
    marginTop: 10,
  },
  form: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 5,
  },
  input: {
    height: 45,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    backgroundColor: '#f2f2f2',
    fontSize: 14,
    color: '#333',
    marginBottom: 15,
  },
  button: {
    backgroundColor: '#007ACC',
    paddingVertical: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default SaveIdScreen;
