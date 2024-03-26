import { ContainerHeader } from '../Container/Style';
import { BoxUser, DataUser, ImageUser, NameUser, TextDefault } from './Style';
import { Ionicons } from '@expo/vector-icons';
import { UserDecodeToken } from '../../services/Utils/Auth';
import { useEffect } from 'react';

export const Header = ({ navigation }) => {

<<<<<<< HEAD
	/*async function profileLoad(){
=======
	// chamada da funcao para carregar o perfil do usuario e carregar as informacoes
	async function profileLoad(){
>>>>>>> d8cba4db354ce0d81768182b1d759ca36c4b294d
		const token = await UserDecodeToken()

		console.log(token);
	}
	useEffect(() =>{
		profileLoad()
	},[])*/
	return (
		<ContainerHeader>
			<BoxUser onPress={() => navigation.navigate('Profile')}>
				<ImageUser source={{ uri: 'https://github.com/marqzzs.png' }} />
				<DataUser>
					<TextDefault>Welcome!</TextDefault>
					<NameUser>{}</NameUser>
				</DataUser>
			</BoxUser>
			<Ionicons name="notifications" size={24} color="white" />
			{/* Material icons */}
		</ContainerHeader>
	);
};
