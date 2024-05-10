import { useEffect, useState } from 'react';
import {
	Button,
	ButtonExitApp,
	ButtonTitle,
} from '../../components/Button/Style';
import { Container, ScrollContainer } from '../../components/Container/Style';
import {
	ContentName,
	ContentProfile,
	ContentRow,
	InputProfile,
	InputRow,
	ProfilePicture,
	RowContentProfile,
	TextProfileEmail,
	TextProfileInput,
	TextProfileName,
} from './Style';

import { UserDecodeToken } from '../../services/Utils/Auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { api } from '../../services/Service';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { ButtonCamera, ContainerImage } from './Style';
import moment from 'moment';
import { ActivityIndicator } from 'react-native';

export const Profile = ({ navigation, route }) => {
	const [profile, setProfile] = useState();
	const [dados, setDados] = useState();
	const [edicaoHabilitada, setEdicaoHabilitada] = useState(false);
	const [dateBirth, setDateBirth] = useState('');
	const [cpf, setCpf] = useState('');
	const [rg, setRg] = useState('');
	const [logradouro, setLogradouro] = useState('');
	const [number, setNumber] = useState('');
	const [cep, setCep] = useState('');
	const [city, setCity] = useState('');
	const [photoAtualizada, setPhotoAtualizada] = useState();

	async function BuscarPorId() {
		try {
			const token = await UserDecodeToken();

			setProfile(token.role);

			const url = token.role === 'Medico' ? 'Medicos' : 'Pacientes';
			console.log(`/${url}/BuscarPorId?id=${token.user}`);
			await api
				.get(`/${url}/BuscarPorId?id=${token.user}`)
				.then((response) => {
					setDados(response.data);
					console.log(`Dados do usuario`);
					console.log(response.data);
				})
				.catch((error) => {
					console.log(`Deu erro aqui: ${error}`);
				});
		} catch (error) {
			console.log('Erro ao buscar usuário por ID:', error);
		}
	}

	async function AlternateProfile() {
		try {
			const token = await UserDecodeToken();

			const formattedDate = moment(dateBirth).format('YYYY-MM-DD');

			const url = profile === 'Medico' ? 'Medicos' : 'Pacientes';

			let dataToSend = {
				rg: rg,
				cpf: cpf,
				dataNascimento: formattedDate,
			};

			if (profile === 'Medico') {
				dataToSend = {
					cep: cep,
					logradouro: logradouro,
					numero: number,
					cidade: city,
				};
			}

			await api
				.put(`/${url}?idUsuario=${token.user}`, dataToSend)
				.then((response) => {
					setEdicaoHabilitada(false);
					console.log(`Sucesso na edicao: ${response.data}`);
				})
				.catch((error) => {
					console.log(`Deu erro no metodo: ${error}`);
				});
		} catch (error) {
			console.log(`Deu erro na chamada da api: ${error}`);
		}
	}

	async function Logout() {
		try {
			//obetendo o token
			const token = await AsyncStorage.getItem('token');

			//removendo o token
			await AsyncStorage.removeItem('token');

			navigation.navigate('Login');

			console.log('Token removido', token);
		} catch (error) {
			console.log(error);
		}
	}

	// Função para formatar o CPF
	function formatCPF(cpfString) {
		// Extrai os três primeiros dígitos do CPF
		const firstDigits = cpfString.substring(0, 3);
		// Oculta todos os demais dígitos com "*"
		const hiddenDigits = cpfString.substring(3).replace(/\d/g, '*');
		// Concatena os três primeiros dígitos com os demais ocultos
		const formattedCPF = `${firstDigits}${hiddenDigits}`;
		return formattedCPF;
	}

	function formatRG(rgString) {
		// Extrai os dois primeiros dígitos do rg
		const firstDigits = rgString.substring(0, 2);
		// Oculta todos os demais dígitos com "*"
		const hiddenDigits = rgString.substring(2).replace(/\d/g, '*');
		// Concatena os três primeiros dígitos com os demais ocultos
		const formattedRG = `${firstDigits}${hiddenDigits}`;
		return formattedRG;
	}

	async function AlternateProfilePicture() {
		// Obter o token
		const token = await UserDecodeToken();

		console.log(token);

		if (!token) {
			console.log('Token não encontrado');
			return;
		}

		const formData = new FormData();

		formData.append('Arquivo', {
			uri: route.params.photoUri,
			name: `image.${route.params.photoUri.split('.').pop()}`,
			type: `image/${route.params.photoUri.split('.').pop()}`,
		});

		await api
			.put(`/Usuario/AlterarFotoPerfil?id=${token.user}`, formData, {
				headers: {
					'Content-Type': 'multipart/form-data',
				},
			})
			.then((response) => {
				setPhotoAtualizada(dados.idNavigation.foto);
				console.log(response);
			})
			.catch((error) => {
				console.log(error);
			});
	}

	useEffect(() => {
		BuscarPorId();
	}, [dados != null]);

	useEffect(() => {
		if (route.params != undefined) {
			AlternateProfilePicture();
		}

		console.log(route.params);
	}, [dados, route.params]);

	return (
		<ScrollContainer>
			<Container>
				{dados ? (
					<>
						<ContainerImage>
							<ProfilePicture
								source={{
									uri: `${dados.idNavigation.foto}`,
								}}
							/>

							<ButtonCamera
								onPress={() =>
									navigation.navigate('CameraPhoto', {
										isProfile: true,
									})
								}
							>
								<MaterialCommunityIcons
									name="camera-plus"
									size={20}
									color={'#fbfbfb'}
								/>
							</ButtonCamera>
						</ContainerImage>

						<ContentName>
							<TextProfileName>
								{dados.idNavigation.nome}
							</TextProfileName>
							<TextProfileEmail>
								{dados.idNavigation.email}
							</TextProfileEmail>
						</ContentName>
						{/*  */}
						<ContentProfile>
							{profile === 'Paciente' ? (
								<>
									<TextProfileInput>
										Date of birth:
									</TextProfileInput>
									<InputProfile
										placeholder={'04-05-1999'}
										onChangeText={(text) =>
											setDateBirth(text)
										}
										editable={edicaoHabilitada}
									>
										{moment(dados.dataNascimento).format(
											`YYYY-MM-DD`,
										)}
									</InputProfile>
								</>
							) : (
								<>
									<TextProfileInput>
										Speciality:
									</TextProfileInput>
									<InputProfile
										placeholder={'Surgeon'}
										// onChangeText={(text) =>
										// 	setDateBirth(text)
										// }
										editable={false}
									>
										{dados.especialidade.especialidade1}
									</InputProfile>
								</>
							)}
						</ContentProfile>
						{/*  */}
						<ContentProfile>
							{profile === 'Paciente' ? (
								<>
									<TextProfileInput>CPF:</TextProfileInput>
									<InputProfile
										placeholder={'859*********'}
										onChangeText={(text) => setCpf(text)}
										editable={edicaoHabilitada}
									>
										{dados.cpf}
									</InputProfile>
								</>
							) : (
								<>
									<TextProfileInput>CRM:</TextProfileInput>
									<InputProfile
										placeholder={'88*****'}
										// onChangeText={(text) => setCpf(text)}
										editable={false}
									>
										{dados.crm}
									</InputProfile>
								</>
							)}
						</ContentProfile>
						<ContentProfile>
							{profile === 'Paciente' ? (
								<>
									<TextProfileInput>RG:</TextProfileInput>
									<InputProfile
										placeholder={'52*******'}
										onChangeText={(text) => setRg(text)}
										editable={edicaoHabilitada}
									>
										{dados.rg}
									</InputProfile>
								</>
							) : (
								<></>
							)}
						</ContentProfile>
						{/*  */}

						<ContentRow>
							<RowContentProfile>
								<TextProfileInput>Address:</TextProfileInput>
								<InputRow
									placeholder={'Av. Dos Estados'}
									onChangeText={(text) => setLogradouro(text)}
									editable={edicaoHabilitada}
								>
									{dados.endereco.logradouro}
								</InputRow>
							</RowContentProfile>
							{/*  */}
							<RowContentProfile>
								<TextProfileInput>Number:</TextProfileInput>
								<InputRow
									placeholder={'10990'}
									onChangeText={(text) => setNumber(text)}
									editable={edicaoHabilitada}
								>
									{dados.endereco.numero}
								</InputRow>
							</RowContentProfile>
						</ContentRow>
						{/*  */}
						<ContentRow>
							<RowContentProfile>
								<TextProfileInput>CEP:</TextProfileInput>
								<InputRow
									placeholder={'05545-333'}
									onChangeText={(text) => setCep(text)}
									editable={edicaoHabilitada}
								>
									{dados.endereco.cep}
								</InputRow>
							</RowContentProfile>
							{/*  */}
							<RowContentProfile>
								<TextProfileInput>City:</TextProfileInput>
								<InputRow
									placeholder={'Capao Redondo - SP'}
									onChangeText={(text) => setCity(text)}
									editable={edicaoHabilitada}
								>
									{dados.endereco.cidade}
								</InputRow>
							</RowContentProfile>
						</ContentRow>

						<Button
							onPress={() => AlternateProfile()}
							disabled={!edicaoHabilitada}
						>
							<ButtonTitle>Save</ButtonTitle>
						</Button>

						<Button
							onPress={() => setEdicaoHabilitada(true)}
							disabled={edicaoHabilitada}
						>
							<ButtonTitle>Edit</ButtonTitle>
						</Button>

						<ButtonExitApp onPress={() => Logout()}>
							<ButtonTitle>Exit the app</ButtonTitle>
						</ButtonExitApp>
					</>
				) : (
					<ActivityIndicator />
				)}
			</Container>
		</ScrollContainer>
	);
};
