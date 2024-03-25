import { ContainerHeader } from '../Container/Style';
import { BoxUser, DataUser, ImageUser, NameUser, TextDefault } from './Style';
import { Ionicons } from '@expo/vector-icons';
import { UserDecodeToken } from '../../services/Utils/Auth';
import { useEffect } from 'react';


export const Header = ({ navigation }) => {

	async function profileLoad(){
		const token = await UserDecodeToken()

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
					<NameUser>Dr. Claudio</NameUser>
				</DataUser>
			</BoxUser>
			<Ionicons name="notifications" size={24} color="white" />
			{/* Material icons */}
		</ContainerHeader>
	);
};
