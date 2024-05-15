import React, { useState } from 'react';
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
import { ActivityIndicator, Alert, StyleSheet, Text } from 'react-native';
import Notification from '../../components/Notification/Notification';
import { api } from '../../services/Service';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Yup from 'yup';

export const Login = ({ navigation }) => {
	const [email, setEmail] = useState('');
	const [senha, setSenha] = useState('');
	const [loading, setLoading] = useState(false);
	const [notifyUser, setNotifyUser] = useState({ showMessage: false });
	const [errors, setErrors] = useState({ email: '', senha: '' });

	const validationSchema = Yup.object().shape({
		email: Yup.string().required('Preencha todos os campos'),
		senha: Yup.string().required('Preencha todos os campos'),
	});

	async function Login() {
		setLoading(true);
		try {
			await validationSchema.validate(
				{ email, senha },
				{ abortEarly: false },
			);

			const response = await api.post('/Login', {
				email: email,
				senha: senha,
			});

			await AsyncStorage.setItem('token', JSON.stringify(response.data));
			navigation.navigate('Main');
		} catch (error) {
			if (error.name === 'ValidationError') {
				const validationErrors = {};
				error.inner.forEach((e) => {
					validationErrors[e.path] = e.message;
				});
				setErrors(validationErrors);
			} else {
				setErrors({ email: 'Email ou senha inválidos', senha: '' });
			}
		} finally {
			setLoading(false);
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
			/>
			{errors.email ? (
				<Text style={styles.errorText}>{errors.email}</Text>
			) : null}
			<Input
				placeholder={'Password...'}
				secureTextEntry={true}
				value={senha}
				onChangeText={(txt) => setSenha(txt)}
			/>
			{errors.senha ? (
				<Text style={styles.errorText}>{errors.senha}</Text>
			) : null}

			<LinkMedium onPress={() => navigation.navigate('RecoverPassword')}>
				Forgot your password?
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

const styles = StyleSheet.create({
	errorText: {
		color: 'red',
		marginTop: 5,
	},
});

export default Login;
