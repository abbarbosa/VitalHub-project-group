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
import { TouchableOpacity } from 'react-native';
import { ClinicCard } from '../../components/ClinicCard/ClinicCard';
import { api } from '../../services/Service';

export const SelectClinic = ({ navigation, route }) => {
	// const [listaClinica, setListaClinica] = useState([]);
	// async function ListarClinica() {
	// 	//instanciaar a chamada da api
	// 	await api
	// 		.get('/Clinica/ListarTodas')
	// 		.then((response) => {
	// 			setListaClinica(response.data);
	// 		})
	// 		.catch((error) => {
	// 			console.log(error);
	// 		});
	// }

	// useEffect(() => {
	// 	ListarClinica();
	// }, []);

	const [selectedClinic, setSelectedClinic] = useState(null);
	const [clinica, setClinica] = useState();

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
		ListClinic();
	}, []);

	async function handleContinue() {
		navigation.replace('SelectDoctor', {
			agendamento: { ...route.params.agendamento, ...clinica },
		});
	}

	return (
		<Container>
			<TitleSelection>Select Clinic</TitleSelection>
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
							onPress={() =>
								setClinica({
									clinicaiId: item.id,
									clinicaLabel: item.nomeFantasia,
								})
							}
							clinic={item}
							setSelectedClinic={setSelectedClinic}
						/>
					</TouchableOpacity>
				)}
			/>
			<Button onPress={() => handleContinue()}>
				<ButtonTitle>Continue</ButtonTitle>
			</Button>
			<ButtonSecundaryTitle onPress={() => navigation.navigate('Home')}>
				Cancel
			</ButtonSecundaryTitle>
		</Container>
	);
};
