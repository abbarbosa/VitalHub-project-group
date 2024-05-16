import { useEffect, useRef, useState } from 'react';
import { Alert, Text, View } from 'react-native';
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

export const CheckEmail = ({ navigation, route }) => {
	const inputs = [useRef(null), useRef(null), useRef(null), useRef(null)]
	const [code, setCode] = useState('')


	function focusNextInput(index) {
		//Se o index é menor do que a quantidade de campos 
		if (index < inputs.length - 1) {
			inputs[index + 1].current.focus()
		}
	}

	function FocusPrevInput(index) {
		if (index > 0) { }
		inputs[index - 1].current.focus()
	}


	async function ValidadeCode() {
		console.log(`/RecuperarSenha/ValidarCodigoRecuperacaoSenha?email=${route.params.emailRecuperacao}&codigo=${code}`)

		await api.post(`/RecuperarSenha/ValidarCodigoRecuperacaoSenha?email=${route.params.emailRecuperacao}&codigo=${code}`)
			.then(() => {
				navigation.replace("ResetPassword", {emailRecuperacao: route.params.emailRecuperacao});
			}).catch(error => {
				console.log(error);
				Alert.alert('Erro!', 'Código Inválido')
			})
	}

	useEffect(() =>{
		inputs[0].current.focus()
	},[])
	return (
		<Container>
			<ContentIconSetinha onPress={() => navigation.navigate('Login')}>
				<AntDesign name="closecircle" size={30} color="#49B3BA" />
			</ContentIconSetinha>
			<Logo source={require('../../assets/logoVitalHub.png')} />
			<Title>Verifique seu e-mail</Title>
			<ContentCheck>
				<SubText>Digite o código de 4 dígitos enviado para</SubText>
				<TextEmail>{route.params.emailRecuperacao}</TextEmail>
				<View style={{
					justifyContent: "center",
					alignItems: "center",
					flexDirection: "row",
					gap: 15
				}}>
					{/* <InputNumbers placeholder="0" /> */}

					{
						[0, 1, 2, 3].map((index) => (
							<InputNumbers
								key={index}
								ref={inputs[index]} //chave de acordo com o index
								keyBoardType="numeric" //ref de acordo com o index do app
								placeholder="0"
								maxLength={1}
								caretHidden={true}


								onChangeText={(text) => {
									//verifica se o campo está vazio
									if (text == "") {
										FocusPrevInput(index)
									} else {
										const newCode = [...code] //separa os valores das casinhas
										newCode[index] = text //corrige o valor de acordo com a posição 
										setCode(newCode.join('')) //junta todos em uma string

										focusNextInput(index)
									}

								}}
							/>
						))
						
					}
				</View>
			</ContentCheck>
			<Button onPress={() => ValidadeCode()}>
				<ButtonTitle >Entrar</ButtonTitle>
			</Button>
			<MiniLink>Reenviar código</MiniLink>
		</Container>
	);
};
