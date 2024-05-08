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

export const CreateAccount = ({ navigation, route }) => {



	// Dentro da função CreateAccount
	const [userName, setUserName] = useState('');
	const [userEmail, setUserEmail] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');
	const [error, setError] = useState(null);
	const [password, setPassword] = useState('')
	const [rg, setRg] = useState('')
	const [cpf, setCpf] = useState('')
	const [dataNascimento, setDataNascimento] = useState('')
	const [cep, setCep] = useState('')
	const [logradouro, setLogradouro] = useState('')
	const [numero, setNumero] = useState('')
	const [cidade, setCidade] = useState('')



	const handleRegister = async () => {

		const formData = new FormData();

		formData.append('Arquivo', {
			uri: '../../assets/images.png',
			name: `image.${'../../assets/images.png'}.split('.').pop()}`,
			type: `image/${'../../assets/images.png'}.split('.').pop()}`,
		});

		// Verifica se todos os campos estão preenchidos
		if (!userEmail || !password || !confirmPassword) {
			console.log('Erro: Por favor, preencha todos os campos.');
			return; // Retorna para evitar que a função continue executando
		}

		// Verifica se as senhas coincidem
		if (password !== confirmPassword) {
			console.log('Erro: As senhas não coincidem.');
			// Salva os valores dos campos antes de limpar
			setUserName(userName);
			setUserEmail(userEmail);
			return; // Retorna para evitar que a função continue executando
		}

		try {
			const response = await api.post('/Usuario', {
				nome: userName,
				email: userEmail,
				senha: password,
			});



			//Arquivo: '../../assets/images.png' // Verifique se o caminho do arquivo está correto

			// Verifica se o registro foi bem-sucedido
			if (response.status === 200) {

				console.log('Usuário cadastrado com sucesso!');
			} else {
				console.log('Erro ao cadastrar usuário:', response.data);
			}
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<Container>
			<ContentIconSetinha onPress={() => navigation.navigate('Login')}>
				<AntDesign name="closecircle" size={30} color="#49B3BA" />
			</ContentIconSetinha>
			<Logo source={require('../../assets/logoVitalHub.png')} />
			<Title>Create Account</Title>
			<SubText>Enter your e-mail address and password to register.</SubText>
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
				<ButtonTitle>Register</ButtonTitle>
			</Button>
			<MiniLink onPress={() => navigation.navigate('Login')}>Cancel</MiniLink>

		</Container>
	);
};
