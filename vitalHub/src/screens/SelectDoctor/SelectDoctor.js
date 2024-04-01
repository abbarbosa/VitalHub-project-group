import React, { useEffect, useState } from 'react';
import { TouchableOpacity } from 'react-native';
import {
	Button,
	ButtonSecundaryTitle,
	ButtonTitle,
} from '../../components/Button/Style';
import { Container } from '../../components/Container/Style';
import { DoctorsCard } from '../../components/DoctorsCard/DoctorsCard';
import { ListComponent } from '../../components/List/List';
import { TitleSelection } from '../SelectClinic/Style';

import { api } from '../../services/Service';

export const SelectDoctor = ({ navigation}) => {
	const [selectedDoctor, setSelectedDoctor] = useState(null);

	const handleDoctorSelection = (doctorId) => {
		setSelectedDoctor(
			doctorId === selectedDoctor?.toString()
				? null
				: doctorId,
		);
	};

	const [medicoLista, setMedicoLista] = useState([])
	async function ListarMedico(){
		//instanciaar a chamada da api
		await api.get('/Medicos').then(response => {
			setMedicoLista(response.data)
		}).catch(error => {
			console.log(error);
		})
	}

	useEffect(() => {
		ListarMedico()
	},[])

	return (
		<Container>
			<TitleSelection>Select Doctor</TitleSelection>

			<ListComponent
				data={medicoLista}
				keyExtractor={(item) => item.id}
				renderItem={({ item }) => (
					<DoctorsCard 
						medico={item}
						selected={item.id === selectedDoctor}
						onPress={handleDoctorSelection}
					/>
				)}
			/>

			<Button onPress={() => navigation.navigate('SelectDate')}>
				<ButtonTitle>Continue</ButtonTitle>
			</Button>
			<ButtonSecundaryTitle onPress={() => navigation.navigate('Home')}>
				Cancel
			</ButtonSecundaryTitle>
		</Container>
	);
};