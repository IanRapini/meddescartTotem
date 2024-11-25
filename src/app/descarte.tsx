import AsyncStorage from '@react-native-async-storage/async-storage';
import { addDoc, collection, doc, getDoc, updateDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { db } from '../config/firebase';
import { useRouter } from 'expo-router'; 

const CounterScreen = () => {
  const [count, setCount] = useState(0);
  const [totemID, setTotemID] = useState('');
  const [status, setStatus] = useState<'aguardo' | 'finalizado'>('aguardo');
  const router = useRouter(); 

  const increment = () => setCount(count + 1);
  const decrement = () => {
    if (count > 0) setCount(count - 1);
  };

  const confirmDiscard = async () => {
    try {
      const snapshot = await getDoc(doc(db, 'totens', totemID));
      const dados = snapshot.data();

 
      await updateDoc(doc(db, 'totens', totemID), {
        status: 'finalizando',
        usuario: '',
      });


      const snapshotUser = await getDoc(doc(db, 'usuarios', dados?.usuario));
      const usuario = snapshotUser.data();

      await updateDoc(doc(db, 'usuarios', dados?.usuario), {
        pontos: usuario?.pontos + count,
      });

      await addDoc(collection(db, 'descartes'), {
        usuario: dados?.usuario,
        pontos: count,
        data: new Date().toLocaleString(),
      });
      Alert.alert('Descarte Concluído', 'Os pontos foram adicionados ao usuário.');
      router.replace('/menu');
    } catch (error) {
      console.error('Erro ao confirmar o descarte:', error);
      Alert.alert('Erro', 'Não foi possível concluir o descarte. Tente novamente.');
    }
  };

  useEffect(() => {
    AsyncStorage.getItem('@token_id').then((totemID: any) => setTotemID(totemID || ''));
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.counterText}>Insira a quantidade de descartes: {count}</Text>

      {status === 'aguardo' && (
        <>
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={[styles.button, styles.decrementButton]} onPress={decrement}>
              <Text style={styles.buttonText}>-</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.button, styles.incrementButton]} onPress={increment}>
              <Text style={styles.buttonText}>+</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity style={[styles.button, styles.confirmButton]} onPress={confirmDiscard}>
            <Text style={styles.buttonText}>Confirmar Descarte</Text>
          </TouchableOpacity>
        </>
      )}

      {status === 'finalizado' && (
        <Text style={styles.finalText}>
          Descarte finalizado.
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#E8F5E9',
    padding: 20,
  },
  counterText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2E7D32',
    marginBottom: 20,
    textAlign: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '60%',
    marginBottom: 20,
  },
  button: {
    paddingVertical: 12,
    paddingHorizontal: 18,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    width: '45%',
  },
  decrementButton: {
    backgroundColor: '#FFCDD2',
  },
  incrementButton: {
    backgroundColor: '#C8E6C9',
  },
  confirmButton: {
    backgroundColor: '#64B5F6',
    marginTop: 20,
    width: '80%',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  finalText: {
    fontSize: 16,
    color: '#2E7D32',
    textAlign: 'center',
    marginTop: 20,
  },
});

export default CounterScreen;
