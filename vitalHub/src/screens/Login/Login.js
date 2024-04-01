import { Container } from '../../components/Container/Style';
import { Logo } from '../../components/Logo/Style';
import { Title } from '../../components/Title/Style';
import { Input } from '../../components/Input/Style';
import { LinkBold, LinkMedium } from '../../components/Links/Style';
import {
	Button,
	ButtonGoogle,
	ButtonTitle,
	ButtonTitleGoogle,
} from '../../components/Button/Style';
import { AntDesign } from '@expo/vector-icons';
import { ContentAccount, TextAccount } from './Style';
import { useState } from 'react';

import { api } from '../../services/Service'

import AsyncStorage from '@react-native-async-storage/async-storage'

//import para a função de carregamento 
import { ActivityIndicator } from 'react-native';

export const Login = ({ navigation }) => {

	const [email, setEmail] = useState()
	const [senha, setSenha] = useState()
	const [loading, setLoading] = useState()

	async function Login() {
		setLoading(true);
		try {
			// Verificar se os campos de email e senha estão preenchidos
			if (!email || !senha) {
				alert('Por favor, preencha todos os campos.');
				return;
			}

			//chamar a api de login
			const response = await api.post('/Login', {
				email: email,
				senha: senha
			});

			await AsyncStorage.setItem('token', JSON.stringify(response.data));
			navigation.navigate('Main');
		} catch (error) {
			// Se ocorrer um erro ao fazer login
			console.log('Erro ao fazer login:', error);
			alert('Erro ao fazer login. Verifique suas credenciais e tente novamente.');
		} finally {
			setTimeout(() => {
				setLoading(false); // Desativa o indicador de atividade após 2 segundos
			}, 2000);
		}
	}


	return (
		<Container>
			<Logo source={require('../../assets/logoVitalHub.png')} />

			<Title>Log in or create an account</Title>

			<Input
				placeholder={'Username or email...'}
				value={email}
				onChangeText={(txt) => setEmail(txt)}
			//onChange={event => event.nativeEvent.text}
			/>

			<Input
				placeholder={'Password...'}
				secureTextEntry={true}
				value={senha}
				onChangeText={(txt) => setSenha(txt)}
			/>

			<LinkMedium onPress={() => navigation.navigate('RecoverPassword')}>
				Forgot you password?
			</LinkMedium>

			<Button onPress={Login}>
				{loading ? (
					<ActivityIndicator size="small" color="#ffffff" />
				) : (
					<ButtonTitle>Log in</ButtonTitle>
				)}
			</Button>

			<ButtonGoogle>
				<AntDesign name="google" size={18} color="#496BBA" />
				<ButtonTitleGoogle>Log in with Google</ButtonTitleGoogle>
			</ButtonGoogle>

			<ContentAccount>
				<TextAccount>
					Don't have an account?{' '}
					<LinkBold
						onPress={() => navigation.navigate('CreateAccount')}
					>
						Create an account now
					</LinkBold>
				</TextAccount>
			</ContentAccount>
		</Container>
	);
};
