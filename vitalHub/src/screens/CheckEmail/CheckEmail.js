import { Text, View } from 'react-native';
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

export const CheckEmail = ({ navigation }) => {
	return (
		<Container>
			<ContentIconSetinha onPress={() => navigation.navigate('Login')}>
				<AntDesign name="closecircle" size={30} color="#49B3BA" />
			</ContentIconSetinha>
			<Logo source={require('../../assets/logoVitalHub.png')} />
			<Title>Check your e-mail</Title>
			<ContentCheck>
				<SubText>Enter the 4-digit code sent to</SubText>
				<TextEmail>username@email.com</TextEmail>
				<View style={{
					justifyContent: "center",
					alignItems: "center",
					flexDirection: "row",
					gap: 15
				}}>
					<InputNumbers placeholder="0" />
					<InputNumbers placeholder="0" />
					<InputNumbers placeholder="0" />
					<InputNumbers placeholder="0" />
				</View>
			</ContentCheck>
			<Button onPress={() => navigation.navigate('ResetPassword')}>
				<ButtonTitle>Enter</ButtonTitle>
			</Button>
			<MiniLink>Resend Code</MiniLink>
		</Container>
	);
};
