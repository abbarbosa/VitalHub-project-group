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
	const [userName, setUserName] = useState('');
	const [userEmail, setUserEmail] = useState('');
	const [error, setError] = useState(null);
	const [confirmPassword, setConfirmPassword] = useState('')
	const [password, setPassword] = useState('');
	const [rg, setRg] = useState('');
	const [cpf, setCpf] = useState('');
	const [dataNascimento, setDataNascimento] = useState('');
	const [cep, setCep] = useState('');
	const [logradouro, setLogradouro] = useState('');
	const [numero, setNumero] = useState('');
	const [cidade, setCidade] = useState('');
	const [loading, setLoading] = useState(false);

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

			Alert.alert('Erro!', 'As senhas não coincidem')


			// Salva os valores dos campos antes de limpar
			setUserName(userName);
			setUserEmail(userEmail);
			return; // Retorna para evitar que a função continue executando
		}

		setLoading(true)


		try {
			const response = await api.post('/Usuario', {
				nome: userName,
				email: userEmail,
				senha: password,
			});

			//Arquivo: '../../assets/images.png' // Verifique se o caminho do arquivo está correto

			// Verifica se o registro foi bem-sucedido
			if (response.status === 201) {

				console.log('Usuário cadastrado com sucesso!');
				navigation.navigate('Login')
			} else {
				console.log('Erro ao cadastrar usuário:', response.data);
			
			}
		} catch (error) {
			console.log(error);
		}finally{
			setLoading(false)
		}



	
};
	
	return (
		<Container>
			<ContentIconSetinha onPress={() => navigation.navigate('Login')}>
				<AntDesign name="closecircle" size={30} color="#49B3BA" />
			</ContentIconSetinha>
			<Logo source={require('../../assets/logoVitalHub.png')} />
			<Title>Criar contat</Title>

			<SubText>Insira seu endereço de e-mail e senha para realizar seu cadastro..</SubText>

			<Input
				placeholder={'Nome completo'}
				value={userName}
				onChangeText={setUserName}
			/>
			<Input
				placeholder={'Seu melhor e-mail'}
				value={userEmail}
				onChangeText={setUserEmail}
			/>
			<Input
				placeholder={'Senha'}
				secureTextEntry={true}
				value={password}
				onChangeText={setPassword}
			/>
			<RecoverInput
				placeholder={'Confirmar Senha'}
				secureTextEntry={true}
				value={confirmPassword}
				onChangeText={setConfirmPassword}
			/>

			
				

			<Button onPress={handleRegister}>
				{loading ? (
					<ActivityIndicator size="small" color="#ffffff" />
				) : (
					<ButtonTitle>Cadastrar</ButtonTitle>
				)}
			</Button>
			<MiniLink onPress={() => navigation.navigate('Login')}>Cancelar</MiniLink>

		</Container>
	);
}


	