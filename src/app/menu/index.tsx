import AsyncStorage from '@react-native-async-storage/async-storage';
import { doc, onSnapshot, updateDoc, getDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, Image } from 'react-native';
import { db } from '../../config/firebase';
import { router } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';

const TelaInicial = () => {
  const [status, setStatus] = useState<'parado' | 'iniciado'>('parado');
  const [totemID, setTotemID] = useState('');
  const [totemName, setTotemName] = useState('');

  const fetchTotemName = async (id: string) => {
    try {
      const docRef = doc(db, 'totens', id);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const data = docSnap.data();
        setTotemName(data?.totem || 'Desconhecido');
      } else {
        setTotemName('Desconhecido');
      }
    } catch (error) {
      console.error('Erro ao buscar nome do totem:', error);
      setTotemName('Desconhecido');
    }
  };

  const iniciarDescarteHandle = async () => {
    try {
      await updateDoc(doc(db, 'totens', totemID), {
        status: 'iniciado',
      });
      setStatus('iniciado');

      Alert.alert(
        'Atenção',
        `Selecione o totem "${totemName}" no aplicativo para parear e começar o descarte`
      );
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível iniciar o descarte.');
    }
  };

  const handlecomoDescartar = () => {
    router.push('/comoDescartar');
  };

  const handleoqueDescartar = () => {
    router.push('/oqueDescartar');
  };

  const mudarTela = async () => {
    onSnapshot(doc(db, 'totens', totemID), (doc) => {
      const data = doc.data();
      if (data?.status === 'aguardo') router.replace('/descarte');
    });
  };

  useEffect(() => {
    AsyncStorage.getItem('@token_id').then(async (id) => {
      if (id) {
        setTotemID(id);
        await fetchTotemName(id);
      } else {
        Alert.alert('Erro', 'Totem ID não encontrado.');
      }
    });
  }, []);

  useEffect(() => {
    mudarTela();
  }, [status]);

  return (
    <LinearGradient colors={['#e6f8e0', '#f0fff4']} style={styles.container}>
      <Image
        source={require('@/assets/images/LOGO FINAL (3).png')}
        style={{ width: 200, height: 200 }}
        resizeMode="cover"
      />
      <Image
        source={require('@/assets/images/LOGO FINAL (4).png')}
        style={{ width: 280, height: 70 }}
        resizeMode="cover"
      />

      <TouchableOpacity
        style={styles.button}
        onPress={() => handleoqueDescartar()}
      >
        <Text style={styles.buttonText}>O que descartar</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => handlecomoDescartar()}
      >
        <Text style={styles.buttonText}>Como descartar</Text>
      </TouchableOpacity>

      {status === 'parado' && (
        <TouchableOpacity
          style={[styles.button, styles.startButton]}
          onPress={iniciarDescarteHandle}
        >
          <Text style={styles.buttonText}>Iniciar Descarte</Text>
        </TouchableOpacity>
      )}

      {status === 'iniciado' && (
        <Text style={styles.infoText}>
          {`Selecione o totem "${totemName}" no aplicativo para parear e começar o descarte`}
        </Text>
      )}
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  button: {
    backgroundColor: '#007ACC',
    paddingVertical: 15,
    borderRadius: 8,
    marginBottom: 15,
    width: '80%',
    alignItems: 'center',
  },
  startButton: {
    backgroundColor: '#006400',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  infoText: {
    fontSize: 16,
    color: '#006400',
    textAlign: 'center',
    marginTop: 20,
  },
});

export default TelaInicial;
