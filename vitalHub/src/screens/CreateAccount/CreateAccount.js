import AsyncStorage from '@react-native-async-storage/async-storage';
import { Button, ButtonTitle } from '../../components/Button/Style';
import { Container } from '../../components/Container/Style';
import { Input, RecoverInput } from '../../components/Input/Style';
import { MiniLink } from '../../components/Links/Style';
import { Logo } from '../../components/Logo/Style';
import { Title } from '../../components/Title/Style';
import { api } from '../../services/Service';
import { ContentIconSetinha, SubText } from '../RecoverPassword/Style';
import { AntDesign } from '@expo/vector-icons';
import { useState } from 'react';
import { ActivityIndicator, Alert } from 'react-native';

export const CreateAccount = ({ navigation, route }) => {
	// Dentro da função CreateAccount
	const [userName, setUserName] = useState('');
	const [userEmail, setUserEmail] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');
	const [password, setPassword] = useState('');
	const [loading, setLoading] = useState(false);

	const handleRegister = async () => {
		// Verifica se todos os campos estão preenchidos
		if (!userEmail || !password || !confirmPassword) {
			Alert.alert('Erro!', 'Por favor, preencha todos os campos');
			return; // Retorna para evitar que a função continue executando
		}

		// Verifica se as senhas coincidem
		if (password !== confirmPassword) {
			Alert.alert('Erro!', 'As senhas não coincidem');
			// Salva os valores dos campos antes de limpar
			setUserName(userName);
			setUserEmail(userEmail);
			return; // Retorna para evitar que a função continue executando
		}

		setLoading(true);

		try {
			const response = await api.post('/Usuario', {
				nome: userName,
				email: userEmail,
				senha: password,
				foto: 'https://thumbs.dreamstime.com/b/perfil-de-usu%C3%A1rio-do-vetor-avatar-padr%C3%A3o-179376714.jpg',
			});

			// Verifica se o registro foi bem-sucedido
			if (response.status === 201) {
				console.log('Usuário cadastrado com sucesso!');
				navigation.navigate('Login');
			} else {
				console.log('Erro ao cadastrar usuário:', response.data);
				Alert.alert('Erro!', 'Não foi possível cadastrar o usuário');
			}
		} catch (error) {
			// Verifica se o erro possui uma resposta e mostra detalhes
			if (error.response) {
				console.log('Erro ao cadastrar usuário:', error.response.data);
				console.log('Status code:', error.response.status);
				console.log('Headers:', error.response.headers);
			} else {
				console.log('Erro na requisição:', error.message);
			}
			Alert.alert(
				'Erro!',
				'Ocorreu um erro ao tentar cadastrar o usuário',
			);
		} finally {
			setLoading(false);
		}
	};

	return (
		<Container>
			<ContentIconSetinha onPress={() => navigation.navigate('Login')}>
				<AntDesign name="closecircle" size={30} color="#49B3BA" />
			</ContentIconSetinha>
			<Logo source={require('../../assets/logoVitalHub.png')} />
			<Title>Create Account</Title>
			<SubText>
				Enter your e-mail address and password to register.
			</SubText>
			<Input
				placeholder={'Username'}
				value={userName}
				onChangeText={setUserName}
			/>
			<Input
				placeholder={'Your best E-mail'}
				value={userEmail}
				onChangeText={setUserEmail}
			/>
			<Input
				placeholder={'Password'}
				secureTextEntry={true}
				value={password}
				onChangeText={setPassword}
			/>
			<RecoverInput
				placeholder={'Confirm Password'}
				secureTextEntry={true}
				value={confirmPassword}
				onChangeText={setConfirmPassword}
			/>
			<Button onPress={handleRegister}>
				{loading ? (
					<ActivityIndicator size="small" color="#ffffff" />
				) : (
					<ButtonTitle>Register</ButtonTitle>
				)}
			</Button>
			<MiniLink onPress={() => navigation.navigate('Login')}>
				Cancel
			</MiniLink>
		</Container>
	);
};
