import { ContainerHeader } from '../Container/Style';
import { BoxUser, DataUser, ImageUser, NameUser, TextDefault } from './Style';
import { Ionicons } from '@expo/vector-icons';
import { UserDecodeToken } from '../../services/Utils/Auth';
import { useEffect, useState } from 'react';

export const Header = ({ navigation }) => {

	const [userName, setUserName] = useState('')

	// chamada da funcao para carregar o perfil do usuario e carregar as informacoes
	async function profileLoad(){
		const token = await UserDecodeToken()

		const {name} = token;

		// Limitamos o tamanho do nome a, por exemplo, 20 caracteres
		const limitedName = name.length > 16 ? name.substring(0, 16) + '...' : name;

		setUserName(limitedName);

		console.log(token);
	}
	useEffect(() =>{
		profileLoad()
	},[])
	return (
		<ContainerHeader>
			<BoxUser onPress={() => navigation.navigate('Profile')}>
				<ImageUser source={{ uri: 'https://github.com/marqzzs.png' }} />
				<DataUser>
					<TextDefault>Welcome!</TextDefault>
					<NameUser>{userName}</NameUser>
				</DataUser>
			</BoxUser>
			<Ionicons name="notifications" size={24} color="white" />
			{/* Material icons */}
		</ContainerHeader>
	);
};