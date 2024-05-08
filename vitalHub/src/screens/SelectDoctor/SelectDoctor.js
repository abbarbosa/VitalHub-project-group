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

<<<<<<< HEAD
// Definindo o componente SelectDoctor
export const SelectDoctor = ({ navigation}) => {
	// Estado para armazenar o médico selecionado
=======
export const SelectDoctor = ({ navigation, route }) => {
>>>>>>> 6cfcb6ec150ee0ff454d0a186c1042fa12968907
	const [selectedDoctor, setSelectedDoctor] = useState(null);

	// Função para lidar com a seleção de médicos
	const handleDoctorSelection = (doctorId) => {
		setSelectedDoctor(doctorId === selectedDoctor ? null : doctorId);
	};

<<<<<<< HEAD
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
=======
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
>>>>>>> 6cfcb6ec150ee0ff454d0a186c1042fa12968907
	}

	// Efeito para listar os médicos ao montar o componente
	useEffect(() => {
		ListarMedico();
	}, []);

	// useEffect(() => {
	// 	console.log(route);
	// }, [route.params]);

	async function handleContinue() {
		navigation.replace('SelectDate', {
			agendamento: {
				...route.params.agendamento,
				...doctor,
			},
		});
	}

	// Retorno do componente
	return (
		<Container>
			<TitleSelection>Select Doctor</TitleSelection>

			{/* Componente ListComponent para renderização da lista de médicos */}
			<ListComponent
				data={medicoLista}
				keyExtractor={(item) => item.id}
				renderItem={({ item }) => (
<<<<<<< HEAD
					// Componente DoctorsCard para exibição dos médicos
					<DoctorsCard 
=======
					<DoctorsCard
>>>>>>> 6cfcb6ec150ee0ff454d0a186c1042fa12968907
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

<<<<<<< HEAD
			{/* Botão para continuar */}
			<Button onPress={() => navigation.navigate('SelectDate')}>
=======
			<Button onPress={() => handleContinue()}>
>>>>>>> 6cfcb6ec150ee0ff454d0a186c1042fa12968907
				<ButtonTitle>Continue</ButtonTitle>
			</Button>
			{/* Botão secundário para cancelar */}
			<ButtonSecundaryTitle onPress={() => navigation.navigate('Home')}>
				Cancel
			</ButtonSecundaryTitle>
		</Container>
	);
};
