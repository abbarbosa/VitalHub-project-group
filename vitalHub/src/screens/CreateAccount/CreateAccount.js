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
<<<<<<< HEAD



=======
>>>>>>> 386569977ea7e7c73ce08ad3f05ae84bf3697cf4
	// Dentro da função CreateAccount
	const [userName, setUserName] = useState('');
	const [userEmail, setUserEmail] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');
	const [error, setError] = useState(null);
<<<<<<< HEAD
	const [password, setPassword] = useState('')
	const [rg, setRg] = useState('')
	const [cpf, setCpf] = useState('')
	const [dataNascimento, setDataNascimento] = useState('')
	const [cep, setCep] = useState('')
	const [logradouro, setLogradouro] = useState('')
	const [numero, setNumero] = useState('')
	const [cidade, setCidade] = useState('')
	const [loading, setLoading] = useState(false)



	const handleRegister = async () => {

=======
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
>>>>>>> 386569977ea7e7c73ce08ad3f05ae84bf3697cf4
		const formData = new FormData();

		formData.append('Arquivo', {
			uri: '../../assets/images.png',
			name: `image.${'../../assets/images.png'}.split('.').pop()}`,
			type: `image/${'../../assets/images.png'}.split('.').pop()}`,
		});

		// Verifica se todos os campos estão preenchidos
		if (!userEmail || !password || !confirmPassword) {
			console.log('Erro: Por favor, preencha todos os campos.');
<<<<<<< HEAD
			Alert.alert('Erro!', 'Por favor, preencha todos os campos')
=======
			Alert.alert('Erro!', 'Por favor, preencha todos os campos');
>>>>>>> 386569977ea7e7c73ce08ad3f05ae84bf3697cf4

			return; // Retorna para evitar que a função continue executando
		}

		// Verifica se as senhas coincidem
		if (password !== confirmPassword) {
			console.log('Erro: As senhas não coincidem.');
<<<<<<< HEAD
			Alert.alert('Erro!', 'As senhas não coincidem')
=======
			Alert.alert('Erro!', 'As senhas não coincidem');
>>>>>>> 386569977ea7e7c73ce08ad3f05ae84bf3697cf4

			// Salva os valores dos campos antes de limpar
			setUserName(userName);
			setUserEmail(userEmail);
			return; // Retorna para evitar que a função continue executando
		}

<<<<<<< HEAD
		setLoading(true)
=======
		setLoading(true);
>>>>>>> 386569977ea7e7c73ce08ad3f05ae84bf3697cf4

		try {
			const response = await api.post('/Usuario', {
				nome: userName,
				email: userEmail,
				senha: password,
			});

			//Arquivo: '../../assets/images.png' // Verifique se o caminho do arquivo está correto

			// Verifica se o registro foi bem-sucedido
			if (response.status === 200) {
<<<<<<< HEAD

				console.log('Usuário cadastrado com sucesso!');
				navigation.navigate('Login')
			} else {
				console.log('Erro ao cadastrar usuário:', response.data);
				Alert.alert('Erro!', 'Não foi possivel cadastrar um usuário')
			}
		} catch (error) {
			console.log(error);
		}finally{
			setLoading(false)
		}

=======
				console.log('Usuário cadastrado com sucesso!');
				navigation.navigate('Login');
			} else {
				console.log('Erro ao cadastrar usuário:', response.data);
				navigation.navigate('Login');
				// Alert.alert('Erro!', 'Não foi possivel cadastrar um usuário');
			}
		} catch (error) {
			console.log(error);
		} finally {
			setLoading(false);
		}
>>>>>>> 386569977ea7e7c73ce08ad3f05ae84bf3697cf4
	};

	return (
		<Container>
			<ContentIconSetinha onPress={() => navigation.navigate('Login')}>
				<AntDesign name="closecircle" size={30} color="#49B3BA" />
			</ContentIconSetinha>
			<Logo source={require('../../assets/logoVitalHub.png')} />
			<Title>Create Account</Title>
<<<<<<< HEAD
			<SubText>Enter your e-mail address and password to register.</SubText>
=======
			<SubText>
				Enter your e-mail address and password to register.
			</SubText>
>>>>>>> 386569977ea7e7c73ce08ad3f05ae84bf3697cf4
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
<<<<<<< HEAD
			<Button onPress={handleRegister}>{
				loading? (
					<ActivityIndicator size="small" color="#ffffff" />
				): (
					<ButtonTitle>Register</ButtonTitle>
				)
			}
				
=======
			<Button onPress={handleRegister}>
				{loading ? (
					<ActivityIndicator size="small" color="#ffffff" />
				) : (
					<ButtonTitle>Register</ButtonTitle>
				)}
>>>>>>> 386569977ea7e7c73ce08ad3f05ae84bf3697cf4
			</Button>
			<MiniLink onPress={() => navigation.navigate('Login')}>Cancel</MiniLink>

		</Container>
	);
};
