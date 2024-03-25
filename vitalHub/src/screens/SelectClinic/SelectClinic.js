// SelectClinic.js
import React, { useState } from 'react';
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

const Clinicas = [
	{ id: 1, name: 'Clinic Nature', address: 'Jerumenha - PI' },
	{ id: 2, name: 'Clinic of Woman', address: 'Januaria - MG' },
	{ id: 3, name: 'Hospital São Lucas', address: 'Lagoinha - MT' },
	{ id: 4, name: 'Centro Médico Vitalidade', address: 'Rio Branco - AC' },
	{ id: 5, name: 'Clínica Saúde e Vida', address: 'Seabra - BA' },
	{ id: 6, name: 'Clínica Integrada Harmonia', address: 'Se - SP' },
];

export const SelectClinic = ({ navigation }) => {
	const [selectedClinic, setSelectedClinic] = useState('');

	const handleClinicSelection = (name) => {
		setSelectedClinic(name);
	};

	return (
		<Container>
			<TitleSelection>Select Clinic</TitleSelection>

			<ListComponent
				data={Clinicas}
				keyExtractor={(item) => item.id.toString()}
				renderItem={({ item }) => (
					<TouchableOpacity
						onPress={() => handleClinicSelection(item.id)}
					>
						<ClinicCard
							name={item.name}
							address={item.address}
							selected={item.id === selectedClinic}
							onPress={() => handleClinicSelection(item.id)}
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
