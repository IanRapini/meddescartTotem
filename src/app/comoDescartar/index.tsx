import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';

const handleVoltar = () => {
    router.push('/menu');
  };

const InformacoesDescarte = () => {
  return (
    <LinearGradient colors={['#e6f8e0', '#f0fff4']} style={styles.container}>
      <Text style={styles.title}>Como fazer o descarte no Ecoponto?</Text>
      
      <View style={styles.cardContainer}>
        <View style={styles.card}>
          <Image
            source={require('./../../../assets/images/Imagem4.png')} 
            style={styles.image}
            resizeMode="contain"
          />
          <Text style={styles.cardText}>
            Comece o descarte apertando no botão "Iniciar Descarte" no totem e siga as instruções!
          </Text>
        </View>

        <View style={styles.card}>
          <Image
            source={require('./../../../assets/images/Imagem5.png')} 
            style={styles.image}
            resizeMode="contain"
          />
          <Text style={styles.cardText}>
          Retire as embalagens externas (como bulas ou caixas) e separe o medicamento.
          </Text>
        </View>

        <View style={styles.card}>
          <Image
            source={require('./../../../assets/images/Imagem6.png')} 
            style={styles.image}
            resizeMode="contain"
          />
          <Text style={styles.cardText}>
          Coloque os medicamentos diretamente no Ecoponto.
          </Text>
        </View>
        <TouchableOpacity style={styles.button}
        onPress={() => handleVoltar()}
      >
        <Text style={styles.buttonText}>Voltar</Text>
      </TouchableOpacity>

      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2E7D32',
    textAlign: 'center',
    marginBottom: 20,
  },
  cardContainer: {
    flex: 1,
    justifyContent: 'space-between',
  },
  card: {
    backgroundColor: '#e6f8e0',
    borderRadius: 10,
    padding: 15,
    alignItems: 'center',
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  image: {
    width: 100,
    height: 100,
    marginBottom: 10,
  },
  cardText: {
    fontSize: 16,
    textAlign: 'center',
    color: '#2E7D32',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  button: {
    backgroundColor: '#007ACC',
    paddingVertical: 15,
    borderRadius: 8,
    marginBottom: 15,
    width: '80%',
    alignItems: 'center',
    alignSelf: 'center',
  },
});

export default InformacoesDescarte;
