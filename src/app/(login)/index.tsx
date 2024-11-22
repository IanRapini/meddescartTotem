import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    StyleSheet,
    TouchableOpacity,
    Image,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    Alert,
    ActivityIndicator,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { db } from './../../config/firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { router } from 'expo-router';

export default function LoginTotem() {
    const [totemNome, setTotemNome] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleLogin = async () => {
        if (!totemNome) {
            Alert.alert('Erro', 'Por favor, insira o nome do totem.');
            return;
        }

        setIsLoading(true);

        try {
            // Criar uma query para buscar o totem pelo nome
            const q = query(collection(db, 'totens'), where('totem', '==', totemNome));
            const querySnapshot = await getDocs(q);

            if (!querySnapshot.empty) {
                // Se a consulta encontrar resultados, login bem-sucedido
                Alert.alert('Sucesso', 'Login realizado com sucesso!');
                router.replace('/menu'); // Substitua pela rota desejada
            } else {
                // Se não encontrar o totem, exibe um erro
                Alert.alert('Erro', 'Totem não encontrado. Verifique o nome e tente novamente.');
            }
        } catch (error) {
            console.error('Erro ao verificar o totem:', error);
            Alert.alert('Erro', 'Não foi possível realizar o login. Tente novamente.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <LinearGradient colors={['#e6f8e0', '#f0fff4']} style={styles.container}>
            <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1 }}>
                <ScrollView
                    contentContainerStyle={{
                        flexGrow: 1,
                        justifyContent: 'center',
                        paddingHorizontal: 20,
                    }}>
                    <View style={styles.innerContainer}>
                        <Image
                            source={require('./../../../assets/images/LOGO FINAL (3).png')}
                            style={{ width: 200, height: 200 }}
                            resizeMode="cover"
                        />
                        <Image
                            source={require('./../../../assets/images/LOGO FINAL (4).png')}
                            style={{ width: 280, height: 70 }}
                            resizeMode="cover"
                        />
                        <View style={styles.form}>
                            <View style={styles.inputGroup}>
                                <Text style={styles.label}>Nome do Totem</Text>
                                <TextInput
                                    value={totemNome}
                                    onChangeText={setTotemNome}
                                    placeholder="Digite o nome do totem"
                                    style={styles.input}
                                    placeholderTextColor="#6c6c6c"
                                />
                            </View>
                            {!isLoading ? (
                                <TouchableOpacity style={styles.button} onPress={handleLogin}>
                                    <Text style={styles.buttonText}>Entrar</Text>
                                </TouchableOpacity>
                            ) : (
                                <ActivityIndicator size={20} />
                            )}
                        </View>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </LinearGradient>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    innerContainer: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    form: {
        width: '100%',
    },
    inputGroup: {
        marginBottom: 15,
    },
    label: {
        fontSize: 14,
        color: '#1f7a1f',
        marginBottom: 5,
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
    },
    button: {
        backgroundColor: '#007ACC',
        paddingVertical: 15,
        borderRadius: 5,
        alignItems: 'center',
        marginBottom: 15,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});
