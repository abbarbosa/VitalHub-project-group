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


export const SelectClinic = ({ navigation }) => {
	const [listaClinica, setListaClinica] = useState([])
	async function ListarClinica(){
		//instanciaar a chamada da api
		await api.get('/Clinica/ListarTodas').then(response => {
			setListaClinica(response.data)
		}).catch(error => {
			console.log(error);
		})
	}

	useEffect(() => {
		ListarClinica()
	},[])
	const [selectedClinic, setSelectedClinic] = useState('');
	const [clinicList, setClinicList] = useState()

	const handleClinicSelection = (name) => {
		setSelectedClinic(name);
	};

	async function ListClinic() {
		await api.get('/Clinica/ListarTodas')
			.then(Response => {
				setClinicList(Response.data)
			}).catch(error => {
				console.log(error);
			})
	}

	useEffect(() => {
		ListClinic()
	}, [])

	return (
		<Container>
			<TitleSelection>Select Clinic</TitleSelection>
			<ListComponent

				data={clinicList}
				keyExtractor={(item) => item.id}
				renderItem={({ item }) => (
					<TouchableOpacity
						onPress={() => handleClinicSelection(item.id)}
					>
						<ClinicCard
							selected={item.id === selectedClinic}
							onPress={() => handleClinicSelection(item.id)}
							clinic={item}

						/>
					</TouchableOpacity>
				)}
			/>
			<Button onPress={() => navigation.navigate('SelectDoctor')}>
				<ButtonTitle>Continue</ButtonTitle>
			</Button>
			<ButtonSecundaryTitle onPress={() => navigation.navigate('Home')}>
				Cancel
			</ButtonSecundaryTitle>
		</Container>
	);
};
