import React, { useEffect, useState } from 'react';
import { Alert, TouchableOpacity } from 'react-native';
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

export const SelectDoctor = ({ navigation, route }) => {
	const [selectedDoctor, setSelectedDoctor] = useState(null);

	const handleDoctorSelection = (doctorId) => {
		setSelectedDoctor(doctorId === selectedDoctor ? null : doctorId);
	};

	const [medicoLista, setMedicoLista] = useState([]);
	const [doctor, setDoctor] = useState(null);

	async function ListarMedico() {
		//instanciaar a chamada da api
		console.log(route.params.agendamento.clinicaiId);
		await api
			.get(
				`/Medicos/BuscarPorIdClinica?id=${route.params.agendamento.clinicaiId}`,
			)
			.then((response) => {
				setMedicoLista(response.data);
				console.log(response.data);
			})
			.catch((error) => {
				console.log(error);
			});
	}

	useEffect(() => {
		ListarMedico();
	}, []);

	// useEffect(() => {
	// 	console.log(route);
	// }, [route.params]);

	async function handleContinue() {
		if (selectedDoctor) {
			navigation.replace('SelectDate', {
				agendamento: {
					...route.params.agendamento,
					...doctor,
				},
			});
		} else {
			Alert.alert('Please select a doctor.');
		}
	}

	return (
		<Container>
			<TitleSelection>Select Doctor</TitleSelection>

			<ListComponent
				data={medicoLista}
				keyExtractor={(item) => item.id}
				renderItem={({ item }) => (
					<DoctorsCard
						medico={item}
						selected={item.id === selectedDoctor} // Corrigido aqui
						onPress={() => {
							handleDoctorSelection(item.id);

							setDoctor({
								medicoClinicaId: item.id,
								medicoLabel: item.idNavigation.nome,
							});
						}}
					/>
				)}
			/>

			<Button onPress={() => handleContinue()}>
				<ButtonTitle>Continue</ButtonTitle>
			</Button>
			<ButtonSecundaryTitle onPress={() => navigation.navigate('Main')}>
				Cancel
			</ButtonSecundaryTitle>
		</Container>
	);
};