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

export const Home = ({navigation}) => {
	const [statusLista, setStatusLista] = useState('pendente');
	const [showModalCancel, setShowModalCancel] = useState(false);
	const [showModalAppointment, setShowModalAppointment] = useState(false);
	const [showModalSchedule, setShowModalSchedule] = useState(false);
	const [showModalLocationAppointment, setShowModalLocationAppointment] = useState(false);

	const [dateSelected, setDateSelected] = useState('')

	const [listaConsulta, setListaConsulta] = useState([])

	const [profile, setProfile] = useState('Paciente')

	async function ProfileLoad(){
		const token = await UserDecodeToken()
	}

	// async function ListarConsulta(){
	// 	const url = (profile.role = 'Medico' ? 'Medicos' : 'Pacientes')

	// 	///${url}/BuscarPorData?data=${dateSelected}&id=${}
	// 	await api.get(`  `)
	// }

	useEffect(() => {
		ProfileLoad()
	},[])

	return (
		<Container>
			{/* Header */}
			<Header navigation={navigation} />

			{/* Calendario */}
			<CalendarHome
			setDateSelected={setDateSelected}
			/>

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

			//LIstagem dos cards
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
								//
								roleUsuario={profile.role}
								dataConsulta={item.dataConsulta}
								prioridade={item.prioridade.prioridade}
								usuarioConsulta={profile.role == 'Medico' ? item.paciente : item.medicoClinica.medico}
								//
									
								/>
						</TouchableOpacity>
					)
				}
			/>


			{/* Renderização condicional com base no userType */}
			{userType === 'doctor' && (
				<>
					
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
										//
										roleUsuario={profile.role}
										dataConsulta={item.dataConsulta}
										prioridade={item.prioridade.prioridade}
										usuarioConsulta={profile.role == 'Medico' ? item.paciente : item.medicoClinica.medico}
										//
									
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
