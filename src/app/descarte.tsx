import AsyncStorage from '@react-native-async-storage/async-storage';
import { addDoc, collection, doc, getDoc, updateDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { db } from '../config/firebase';

const CounterScreen = () => {
  const [count, setCount] = useState(0);
  const [totemID, setTotemID] = useState('');
  const [status, setStatus] = useState<'aguardo' | 'finalizado'>('aguardo');

  const increment = () => setCount(count + 1);
  const decrement = () => {
    if (count > 0) setCount(count - 1);
  };

  const confirmDiscard = async () => {
    const snapshot = await getDoc(doc(db, 'totens', totemID));
    const dados = snapshot.data();

  
    updateDoc(doc(db, 'totens', totemID), {
      status: 'finalizando',
      usuario: '',
    });


    setStatus('finalizado');
  
    const snapshotUser = await getDoc(doc(db, 'usuarios', dados?.usuario));
    const usuario = snapshotUser.data();

    updateDoc(doc(db, 'usuarios', dados?.usuario), {
      pontos: usuario?.pontos + count,
    });

    
    addDoc(collection(db, 'descartes'), {
      usuario:  dados?.usuario,
      pontos: count,
      data: new Date().toLocaleString()
    });

    

    Alert.alert('Descarte Confirmado', 'Os pontos foram adicionados ao usuário.');
  };

  useEffect(() => {
    AsyncStorage.getItem('@token_id').then((totemID: any) => setTotemID(totemID || ''));
  }, []);

  return (
    <View style={styles.container}>

      <Text style={styles.counterText}>Contador: {count}</Text>

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
        <Text style={styles.finalText}>Espere o sensor reconhecer o descarte...</Text>
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
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2E7D32', 
    marginBottom: 20,
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
