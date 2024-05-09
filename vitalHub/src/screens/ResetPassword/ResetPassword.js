import { useState } from 'react';
import { Alert, Text } from 'react-native';
import { Logo } from '../../components/Logo/Style';
import { Title } from '../../components/Title/Style';
import { Container } from '../../components/Container/Style';
import { ContentIconSetinha, SubText } from '../RecoverPassword/Style';
import { Input, RecoverInput } from '../../components/Input/Style';
import { Button, ButtonTitle } from '../../components/Button/Style';
import { AntDesign } from '@expo/vector-icons';
import { api } from '../../services/Service';

export const ResetPassword = ({ navigation, route }) => {

	const [password, setPassword] = useState('')
	const [conffirm, setConffirm] = useState('')

	async function UptadePwd(){
		if (password === conffirm) {
            try {
                await api.put(`/Usuario/AlterarSenha?email=${route.params.emailRecuperacao}`, {
                    senhaNova: password
                });
                navigation.replace("Login");
            } catch (error) {
                console.log(error);
                // Trate o erro de acordo com suas necessidades
            }
        } else {
            // Senhas não coincidem, você pode mostrar uma mensagem de erro ao usuário
            console.log("As senhas não coincidem");
            Alert.alert('Erro!', 'As senhas não coincidem!')
        }
	}
	return (
		<Container>
            <ContentIconSetinha onPress={() => navigation.navigate('Login')}>
                <AntDesign name="closecircle" size={30} color="#49B3BA" />
            </ContentIconSetinha>

            <Logo source={require('../../assets/logoVitalHub.png')} />
            <Title>Reset Password</Title>
            <SubText>Insert and confirm your new password</SubText>

            <Input
                placeholder={'New Password'}
                value={password}
                onChangeText={(txt) => { setPassword(txt) }}
                secureTextEntry={true}
            />

            <RecoverInput
                placeholder={'Confirm new password'}
                value={conffirm}
                onChangeText={(txt) => { setConffirm(txt) }}
                secureTextEntry={true}
            />

            <Button onPress={UptadePwd}>
                <ButtonTitle>Confirm new password</ButtonTitle>
            </Button>
        </Container>
	);
};
