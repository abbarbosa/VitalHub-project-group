import { useEffect, useRef, useState } from 'react';
import { Alert, LogBox, Text, View } from 'react-native';
import { Logo } from '../../components/Logo/Style';
import { Title } from '../../components/Title/Style';
import { Container } from '../../components/Container/Style';
import { ContentAccount, TextAccount } from '../Login/Style';
import {
	Link,
	LinkBold,
	MiniLink,
	TextCheck,
	TextEmail,
} from '../../components/Links/Style';
import { ContentCheck } from './Style';
import { ContentIconSetinha, SubText } from '../RecoverPassword/Style';
import { Button, ButtonTitle } from '../../components/Button/Style';
import { AntDesign } from '@expo/vector-icons';
import { InputNumbers } from '../../components/Input/Style';

import { api } from '../../services/Service';

import * as Yup from 'yup';

export const CheckEmail = ({ navigation, route }) => {
	const inputs = [useRef(null), useRef(null), useRef(null), useRef(null)];
	const [code, setCode] = useState(['', '', '', '']);
	const [error, setError] = useState('');

	function focusNextInput(index) {
		if (index < inputs.length - 1) {
			inputs[index + 1].current.focus();
		}
	}

	function FocusPrevInput(index) {
		if (index > 0) {
			inputs[index - 1].current.focus();
		}
	}

	async function ValidadeCode() {
		try {
			const schema = Yup.string().length(
				4,
				'Please enter the correct 4-digit code',
			);
			await schema.validate(code.join(''));

			await api.post(
				`/RecuperarSenha/ValidarCodigoRecuperacaoSenha?email=${
					route.params.emailRecuperacao
				}&codigo=${code.join('')}`,
			);
			navigation.replace('ResetPassword', {
				emailRecuperacao: route.params.emailRecuperacao,
			});
		} catch (validationError) {
			setError('Insira o codigo correto');
		}
	}

	useEffect(() => {
		inputs[0].current.focus();
	}, []);

	return (
		<Container>
			<ContentIconSetinha onPress={() => navigation.navigate('Login')}>
				<AntDesign name="closecircle" size={30} color="#49B3BA" />
			</ContentIconSetinha>
			<Logo source={require('../../assets/logoVitalHub.png')} />
			<Title>Check your e-mail</Title>
			<ContentCheck>
				<SubText>Enter the 4-digit code sent to</SubText>
				<TextEmail>{route.params.emailRecuperacao}</TextEmail>
				<View
					style={{
						justifyContent: 'center',
						alignItems: 'center',
						flexDirection: 'row',
						gap: 15,
					}}
				>
					{[0, 1, 2, 3].map((index) => (
						<InputNumbers
							key={index}
							ref={inputs[index]}
							keyboardType="numeric"
							placeholder="0"
							maxLength={1}
							caretHidden={true}
							onChangeText={(text) => {
								if (text == '') {
									FocusPrevInput(index);
								} else {
									const newCode = [...code];
									newCode[index] = text;
									setCode(newCode);

									focusNextInput(index);
								}
							}}
						/>
					))}
				</View>
				{error ? (
					<Text
						style={{
							color: 'red',
							marginLeft: 50,
							marginTop: -10,
							marginBottom: 15,
						}}
					>
						{error}
					</Text>
				) : null}
			</ContentCheck>
			<Button onPress={() => ValidadeCode()}>
				<ButtonTitle>Send</ButtonTitle>
			</Button>
			<MiniLink>Resend Code</MiniLink>
		</Container>
	);
};
