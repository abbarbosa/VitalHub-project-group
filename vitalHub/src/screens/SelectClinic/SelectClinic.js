// SelectClinic.js
import React, { useEffect, useState } from 'react';
import { Container } from '../../components/Container/Style';
import { ListComponent } from '../../components/List/List';
import { TitleSelection } from './Style';
import {
	Button,
	ButtonSecundaryTitle,
	ButtonTitle,
} from '../../components/Button/Style';
import { Alert, LogBox, TouchableOpacity } from 'react-native';
import { ClinicCard } from '../../components/ClinicCard/ClinicCard';
import { api } from '../../services/Service';

export const SelectClinic = ({ navigation, route }) => {
	const [selectedClinic, setSelectedClinic] = useState(null);
	const [clinica, setClinica] = useState();
	const [clinicaSelecionada, SetClinicaSelecionada] = useState();

	const handleClinicSelection = (name) => {
		setSelectedClinic(name);
	};

	async function ListClinic() {
		await api
			.get(
				`/Clinica/BuscarPorCidade?cidade=${route.params.agendamento.localizacao}`,
			)
			.then((response) => {
				setClinica(response.data);
			})
			.catch((error) => {
				console.log(error);
			});
	}

	useEffect(() => {
		console.log(route.params);
		console.log(clinica);
		ListClinic();
		LogBox.ignoreAllLogs();
	}, []);

	async function handleContinue() {
		if (clinicaSelecionada) {
			navigation.replace('SelectDoctor', {
				agendamento: {
					...route.params.agendamento,
					...clinicaSelecionada,
				},
			});
		} else {
			Alert.alert('Please select a clinic.');
		}
	}

	return (
		<Container>
			<TitleSelection>Selecionar Clinica</TitleSelection>
			<ListComponent
				data={clinica}
				keyExtractor={(item) => item.id}
				renderItem={({ item }) => (
					<TouchableOpacity
						onPress={() =>
							setClinica({
								clinicaiId: item.id,
								clinicaLabel: item.nomeFantasia,
							})
						}
					>
						<ClinicCard
							selected={item.id === selectedClinic}
							clinic={item}
							setSelectedClinic={setSelectedClinic}
							onPress={() =>
								handleClinicSelection(
									item.id,
									SetClinicaSelecionada({
										clinicaiId: item.id,
										clinicaLabel: item.nomeFantasia,
									}),
								)
							}
						/>
					</TouchableOpacity>
				)}
			/>

			<Button onPress={() => handleContinue()}>
				<ButtonTitle>Continuar</ButtonTitle>
			</Button>
			<ButtonSecundaryTitle onPress={() => navigation.navigate('Main')}>
				Cancelar
			</ButtonSecundaryTitle>
		</Container>
	);
};
