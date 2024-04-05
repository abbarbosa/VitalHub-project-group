// Importando o React e os hooks necessários do React
import React, { useEffect, useState } from 'react';
// Importando o componente TouchableOpacity do React Native
import { TouchableOpacity } from 'react-native';
// Importando estilos e componentes específicos para botões do componente
import {
	Button,
	ButtonSecundaryTitle,
	ButtonTitle,
} from '../../components/Button/Style';
// Importando estilos e componentes específicos para contêineres do componente
import { Container } from '../../components/Container/Style';
// Importando o componente DoctorsCard para exibição dos médicos
import { DoctorsCard } from '../../components/DoctorsCard/DoctorsCard';
// Importando o componente ListComponent para renderização da lista de médicos
import { ListComponent } from '../../components/List/List';
// Importando o componente TitleSelection para título da seleção de médicos
import { TitleSelection } from '../SelectClinic/Style';
// Importando a API de serviços para fazer chamadas à API
import { api } from '../../services/Service';

// Definindo o componente SelectDoctor
export const SelectDoctor = ({ navigation}) => {
	// Estado para armazenar o médico selecionado
	const [selectedDoctor, setSelectedDoctor] = useState(null);

	// Função para lidar com a seleção de médicos
	const handleDoctorSelection = (doctorId) => {
		setSelectedDoctor(
			doctorId === selectedDoctor?.toString()
				? null
				: doctorId,
		);
	};

	// Estado para armazenar a lista de médicos
	const [medicoLista, setMedicoLista] = useState([])

	// Função assíncrona para listar os médicos
	async function ListarMedico(){
		try {
			// Chamada à API para obter a lista de médicos
			const response = await api.get('/Medicos');
			// Atualiza o estado com a lista de médicos recebida da API
			setMedicoLista(response.data)
		} catch (error) {
			console.log(error);
		}
	}

	// Efeito para listar os médicos ao montar o componente
	useEffect(() => {
		ListarMedico()
	},[])

	// Retorno do componente
	return (
		<Container>
			<TitleSelection>Select Doctor</TitleSelection>

			{/* Componente ListComponent para renderização da lista de médicos */}
			<ListComponent
				data={medicoLista}
				keyExtractor={(item) => item.id}
				renderItem={({ item }) => (
					// Componente DoctorsCard para exibição dos médicos
					<DoctorsCard 
						medico={item}
						selected={item.id === selectedDoctor}
						onPress={handleDoctorSelection}
					/>
				)}
			/>

			{/* Botão para continuar */}
			<Button onPress={() => navigation.navigate('SelectDate')}>
				<ButtonTitle>Continue</ButtonTitle>
			</Button>
			{/* Botão secundário para cancelar */}
			<ButtonSecundaryTitle onPress={() => navigation.navigate('Home')}>
				Cancel
			</ButtonSecundaryTitle>
		</Container>
	);
};
