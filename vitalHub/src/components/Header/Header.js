import { ContainerHeader } from '../Container/Style';
import {
	BoxIcon,
	BoxUser,
	DataUser,
	ImageUser,
	NameUser,
	TextDefault,
} from './Style';
import { Ionicons } from '@expo/vector-icons';
import { UserDecodeToken } from '../../services/Utils/Auth';
import { useEffect, useState } from 'react';
import { api } from '../../services/Service';
import { ActivityIndicator } from 'react-native';

export const Header = ({ navigation }) => {
<<<<<<< HEAD

	const [userName, setUserName] = useState('')
=======
	const [nameUser, setUserName] = useState('');
	const [profile, setProfile] = useState();
	const [data, setData] = useState();
>>>>>>> 6cfcb6ec150ee0ff454d0a186c1042fa12968907

	// chamada da funcao para carregar o perfil do usuario e carregar as informacoes
	async function profileLoad() {
		const token = await UserDecodeToken();
		setProfile(token);
		const { name, role } = token;

		const limitedName =
			name.length > 16 ? name.substring(0, 16) + '...' : name;
		setUserName(limitedName);

		console.log(profile);

		if (role) {
			await BuscarPorId(token);
		}
	}

	async function BuscarPorId(token) {
		const url = token.role === 'Medico' ? 'Medicos' : 'Pacientes';

		console.log(url);

		await api
			.get(`${url}/BuscarPorId?id=${token.user}`)
			.then((response) => {
				setData(response.data);

				console.log(response.data);
			})
			.catch((error) => {
				console.log(error);
			});
	}

	useEffect(() => {
		profileLoad();
	}, []);

	return (
		<ContainerHeader>
<<<<<<< HEAD
			<BoxUser onPress={() => navigation.navigate('Profile')}>
				<ImageUser source={{ uri: 'https://github.com/marqzzs.png' }} />
				<DataUser>
					<TextDefault>Welcome!</TextDefault>
					<NameUser>{userName}</NameUser>
				</DataUser>
			</BoxUser>
			<Ionicons name="notifications" size={24} color="white" />
			{/* Material icons */}
=======
			{data ? (
				<>
					<BoxUser onPress={() => navigation.navigate('Profile')}>
						<ImageUser
							source={{ uri: `${data.idNavigation.foto}` }}
						/>
						<DataUser>
							<TextDefault>Welcome!</TextDefault>
							<NameUser>{nameUser}</NameUser>
						</DataUser>
					</BoxUser>
					<BoxIcon>
						<Ionicons
							name="notifications"
							size={24}
							color="white"
						/>
					</BoxIcon>
				</>
			) : (
				<>
					<ActivityIndicator />
				</>
			)}
>>>>>>> 6cfcb6ec150ee0ff454d0a186c1042fa12968907
		</ContainerHeader>
	);
};
