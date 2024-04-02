import { useEffect, useState } from 'react';
import { AbsListAppontment } from '../../components/AbsListAppointment/AbsListAppointment';
import CalendarHome from '../../components/CalendarHome/CalendarHome';
import { Container } from '../../components/Container/Style';
import { Header } from '../../components/Header/Header';
import { FilterAppointment } from './Style';
import { ListComponent } from '../../components/List/List';
import { AppointmentCard } from '../../components/AppointmentCard/AppointmentCard';
import CancellationModal from '../../components/CancellationModal/CancellationModal';
import { AppointmentModal } from '../../components/AppointmentModal/AppointmentModal';
import { FontAwesome } from '@expo/vector-icons';
import { ScheduleButton } from '../../components/ScheduleButton/ScheduleButton';
import { ScheduleModal } from '../../components/ScheduleModal/ScheduleModal';
import { TouchableOpacity } from 'react-native';
import { LocationModal } from '../../components/LocationModal/LocationModal';
import { api } from '../../services/Service';
import AsyncStorage from '@react-native-async-storage/async-storage'


const Consultas = [
	{ id: 1, nome: 'Carlos', situacao: 'pendente' },
	{ id: 2, nome: 'Carlos', situacao: 'realizada' },
	{ id: 3, nome: 'Carlos', situacao: 'pendente' },
	{ id: 4, nome: 'Carlos', situacao: 'realizada' },
	{ id: 5, nome: 'Carlos', situacao: 'cancelada' },
	{ id: 6, nome: 'Carlos', situacao: 'cancelada' },
];

export const Home = ({ userType = 'doctor', navigation }) => {
	const [statusLista, setStatusLista] = useState('pendente');
	const [showModalCancel, setShowModalCancel] = useState(false);
	const [showModalAppointment, setShowModalAppointment] = useState(false);
	const [showModalSchedule, setShowModalSchedule] = useState(false);
	const [showModalLocationAppointment, setShowModalLocationAppointment] = useState(false);

	const [listaConsulta, setListaConsulta] = useState([])
	async function ListarConsulta(){
		try {
			// Recuperação do token de acesso
			const token = JSON.parse(
				await AsyncStorage.getItem('token'),
			).token;
		
			// Verificação se o token foi corretamente obtido
			if (token) {
				// Fazendo a chamada da API para consultas
				await api.get('/Consultas', {
					headers: {
						// Adicionando o token ao cabeçalho de autorização
						Authorization: `Bearer ${token}`
					}
				}).then(response => {
					setListaConsulta(response.data);
					console.log(response.data);
				}).catch(error => {
					console.log(`Deu erro: ${error}`);
				});
			} else {
				console.log('Token de autorização não encontrado');
			}
		} catch (error) {
			console.log(error);
		}		
	}

	useEffect(() => {
		ListarConsulta()
	},[])

	return (
		<Container>
			{/* Header */}
			<Header navigation={navigation} />
			{/* Renderização condicional com base no userType */}
			{userType === 'doctor' && (
				<>
					{/* Calendario */}
					<CalendarHome />
					{/* Buttons(Filtros) */}
					<FilterAppointment>
						<AbsListAppontment
							textButton={'Scheduled'}
							clickButton={statusLista === 'pendente'}
							onPress={() => setStatusLista('pendente')}
						/>
						<AbsListAppontment
							textButton={'Realized'}
							clickButton={statusLista === 'realizada'}
							onPress={() => setStatusLista('realizada')}
						/>
						<AbsListAppontment
							textButton={'Canceled'}
							clickButton={statusLista === 'cancelada'}
							onPress={() => setStatusLista('cancelada')}
						/>
					</FilterAppointment>
					{/* Cards */}
					<ListComponent
						data={listaConsulta}
						key={(item) => item.id}
						renderItem={({ item }) =>
							statusLista === item.situacao && (
								// console.log(item)
								<TouchableOpacity>
									<AppointmentCard
										navigation={navigation}
										situacao={item.situacao}
										onPressAppointment={() =>
											setShowModalAppointment(true)
										}
										onPressCancel={() =>
											setShowModalCancel(true)
										}
									/>
								</TouchableOpacity>
							)
						}
					/>
					<CancellationModal
						navigation={navigation}
						visible={showModalCancel}
						setShowModalCancel={setShowModalCancel}
					/>
					<AppointmentModal
						situacao={statusLista}
						navigation={navigation}
						visible={showModalAppointment}
						setShowModalAppointment={setShowModalAppointment}
					/>
				</>
			)}
			{userType === 'patient' && (
				<>
					<CalendarHome />
					<FilterAppointment>
						<AbsListAppontment
							textButton={'Scheduled'}
							clickButton={statusLista === 'pendente'}
							onPress={() => setStatusLista('pendente')}
						/>
						<AbsListAppontment
							textButton={'Realized'}
							clickButton={statusLista === 'realizada'}
							onPress={() => setStatusLista('realizada')}
						/>
						<AbsListAppontment
							textButton={'Canceled'}
							clickButton={statusLista === 'cancelada'}
							onPress={() => setStatusLista('cancelada')}
						/>
					</FilterAppointment>
					<ListComponent
						data={listaConsulta}
						key={(item) => item.id}
						renderItem={({ item }) =>
							statusLista === item.situacao && (
								<TouchableOpacity
									onPress={() =>
										setShowModalAppointment(true)
									}
								>
									<AppointmentCard
										navigation={navigation}
										situacao={item.situacao}
										onPressAppointment={() =>
											setShowModalAppointment(true)
										}
										onPressCancel={() =>
											setShowModalCancel(true)
										}
										consulta={item}
									
									/>
								</TouchableOpacity>
							)
						}
					/>
					<CancellationModal
						navigation={navigation}
						visible={showModalCancel}
						setShowModalCancel={setShowModalCancel}
					/>
					<AppointmentModal
						situacao={statusLista}
						navigation={navigation}
						visible={showModalAppointment}
						setShowModalAppointment={setShowModalAppointment}
					/>

					<ScheduleModal
						navigation={navigation}
						visible={showModalSchedule}
						setShowModalSchedule={setShowModalSchedule}
					/>
					<LocationModal
						visible={showModalLocationAppointment}
						setShowModalLocationAppointment={
							setShowModalLocationAppointment
						} // Correção do nome da função
					/>
					<ScheduleButton
						onPress={() => setShowModalSchedule(true)}
					/>
				</>
			)}
		</Container>
	);
};
