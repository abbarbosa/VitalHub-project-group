
// Importando os módulos necessários do React e do React Native
import { useEffect, useState } from "react";
import { Button, ButtonExitApp, ButtonTitle } from "../../components/Button/Style";
import { Container, ScrollContainer } from "../../components/Container/Style";
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
} from "./Style"; // Importando os estilos específicos para este componente


// Importando funções e componentes adicionais necessários
import { UserDecodeToken } from '../../services/Utils/Auth';
<<<<<<< HEAD
import AsyncStorage from "@react-native-async-storage/async-storage";
import { api } from "../../services/Service";
import moment from "moment";
import { ActivityIndicator } from "react-native";
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { ButtonCamera, ContainerImage } from "../Login/Style";
=======
import AsyncStorage from '@react-native-async-storage/async-storage';
import { api } from '../../services/Service';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { ButtonCamera, ContainerImage } from './Style';
import moment from 'moment';
import { ActivityIndicator } from 'react-native';
>>>>>>> 6cfcb6ec150ee0ff454d0a186c1042fa12968907

// Definição do componente Profile
export const Profile = ({ navigation, route }) => {
<<<<<<< HEAD
	const [nameUser, setNameUser] = useState('');
	const [userEmail, setUserEmail] = useState('');
	const [userData, setUserData] = useState('');
	const [photoUri, setPhotoUri] = useState(null);
	const [profile, setProfile] = useState();
	const [dados, setDados] = useState();

	const [loading, setLoading] = useState();

	//carregamento dos dados do usuario
	async function profileLoad() {

		const token = await UserDecodeToken();

		setProfile(token);
		const { role } = token

		if (role) {
			await BuscarPorId()
		}s

		try {
			const token = await UserDecodeToken();

			const { name } = token;
			const { email } = token;
			const { dateBirth } = token;

			if (token) {
				const { name, email } = token;
			}
			// Limitamos o tamanho do nome a, por exemplo, 20 caracteres
			const limitedName =
				name.length > 16 ? name.substring(0, 16) + '...' : name;

			setNameUser(limitedName);
			setUserEmail(email);
		} catch (error) {
			console.log(error);
		}

	}

	async function loggedUser() {
		try {
			// Recuperação do token de acesso
			const token = JSON.parse(await AsyncStorage.getItem('token')).token;

			if (token) {
				await api
					.get('/Pacientes/PerfilLogado', {
						headers: {
							// Adicionando o token ao cabeçalho de autorização
							Authorization: `Bearer ${token}`,
						},
					})
					.then((response) => {
						// Formata a data de nascimento antes de definir no estado
						const formattedBirthDate = formatBirthDate(
							response.data.dataNascimento,
						);
						// Formata o CPF antes de definir no estado
						const formattedCPF = formatCPF(response.data.cpf);
						// Define a data de nascimento formatada no estado
						setUserData({
							...response.data,
							dataNascimento: formattedBirthDate,
							cpf: formattedCPF,
						});
					})
					.catch((error) => {
						console.log(error);
					});
			} else {
				console.log(`deu erro no if`);
			}
		} catch (error) {
			console.log(`Deu erro nl catch: ${error}`);
		}
	}
=======
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
>>>>>>> 6cfcb6ec150ee0ff454d0a186c1042fa12968907

	async function BuscarPorId() {

		const token = await UserDecodeToken();

		const url = token.role === 'Medico' ? 'Medicos' : 'Pacientes';

		console.log(url);

		try {
			const token = await UserDecodeToken();

			setProfile(token.role);

			const url = token.role === 'Medico' ? 'Medicos' : 'Pacientes';
			console.log(`/${url}/BuscarPorId?id=${token.user}`);
			await api
<<<<<<< HEAD
				.get(`${url}/BuscarPorId?id=${token.user}`)
=======
				.get(`/${url}/BuscarPorId?id=${token.user}`)
>>>>>>> 6cfcb6ec150ee0ff454d0a186c1042fa12968907
				.then((response) => {
					console.log("Aqui jaz as informacoes \n");
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
<<<<<<< HEAD
		profileLoad();
		loggedUser();
	}, []);
=======
		BuscarPorId();
	}, [dados != null]);
>>>>>>> 6cfcb6ec150ee0ff454d0a186c1042fa12968907

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
<<<<<<< HEAD
							{dados && dados.foto && (
								<ProfilePicture
									source={{
										uri: `${dados.idNavigation.foto}`
									}}
								/>
							)}
=======
							<ProfilePicture
								source={{
									uri: `${dados.idNavigation.foto}`,
								}}
							/>
>>>>>>> 6cfcb6ec150ee0ff454d0a186c1042fa12968907

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
<<<<<<< HEAD
							<TextProfileName> {nameUser} </TextProfileName>
							<TextProfileEmail>{userEmail}</TextProfileEmail>
						</ContentName>
						{/*  */}
						<ContentProfile>
							{profile.role === 'Paciente' ? (
								<TextProfileInput>Date of birth</TextProfileInput>
							) : (
								<TextProfileInput>specialty</TextProfileInput>
							)}

							<InputProfile placeholder={'04/05/1999'}>
							{profile.role === 'Paciente' ? (
								userData.dataNascimento
							) : (
							 userData.dataNascimento
							)}
							</InputProfile>
						</ContentProfile>
						{/*  */}
						<ContentProfile>
						{profile.role === 'Paciente' ? (
								<TextProfileInput>CPF</TextProfileInput>
							) : (
								<TextProfileInput>CRM</TextProfileInput>
							)}

							<InputProfile placeholder={'859********'}>
							{profile.role === 'Paciente' ? (
								userData.cpf
							) : (
								userData.crm
							)}
							</InputProfile>
							
								
								{/* {userData.cpf} */}
							
						</ContentProfile>
						{/*  */}
						<ContentProfile>
							<TextProfileInput>Address:</TextProfileInput>
							<InputProfile placeholder={'Rua Vincenso Silva, 987'}>
								{userData.endereco ? userData.endereco.logradouro : ''}
							</InputProfile>
						</ContentProfile>
						{/*  */}
						<ContentRow>
							<RowContentProfile>
								<TextProfileInput>CEP:</TextProfileInput>
								<InputRow placeholder={'05545-333'}>
									{userData.endereco ? userData.endereco.cep : ''}
								</InputRow>
							</RowContentProfile>
							{/*  */}
							<RowContentProfile>
								<TextProfileInput>City:</TextProfileInput>
								<InputRow placeholder={'Capao Redondo - SP'}>
									{userData.endereco ? userData.endereco.cidade : ''}
								</InputRow>
							</RowContentProfile>
						</ContentRow>

						<Button>
							<ButtonTitle>Save</ButtonTitle>
						</Button>

						<Button>
							<ButtonTitle>Edit</ButtonTitle>
						</Button>

						<ButtonExitApp onPress={() => Logout()}>
							<ButtonTitle>Exit the app</ButtonTitle>
						</ButtonExitApp>
					</>
				) : (
					<ActivityIndicator />
				)}

=======
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
											`DD-MM-YYYY`,
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
>>>>>>> 6cfcb6ec150ee0ff454d0a186c1042fa12968907
			</Container>
		</ScrollContainer>
	);
};