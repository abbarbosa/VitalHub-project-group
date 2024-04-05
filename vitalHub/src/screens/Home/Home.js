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
import AsyncStorage from '@react-native-async-storage/async-storage';
import { UserDecodeToken } from '../../services/Utils/Auth';



const Consultas = [
	{ id: 1, nome: 'Carlos', situacao: 'pendente' },
	{ id: 2, nome: 'Carlos', situacao: 'realizada' },
	{ id: 3, nome: 'Carlos', situacao: 'pendente' },
	{ id: 4, nome: 'Carlos', situacao: 'realizada' },
	{ id: 5, nome: 'Carlos', situacao: 'cancelada' },
	{ id: 6, nome: 'Carlos', situacao: 'cancelada' },
];

export const Home = ({ userType = 'patient', navigation }) => {
	const [statusLista, setStatusLista] = useState('pendente');
	const [showModalCancel, setShowModalCancel] = useState(false);
	const [showModalAppointment, setShowModalAppointment] = useState(false);
	const [showModalSchedule, setShowModalSchedule] = useState(false);
	const [showModalLocationAppointment, setShowModalLocationAppointment] =
		useState(false);

	const [dateSelected, setDateSelected] = useState('');

	const [listaConsulta, setListaConsulta] = useState([]);

	const [profile, setProfile] = useState('Paciente');

	const [userLogin, setUserLogin] = useState('');

	const [selectedQuery, setSelectedQuery] = useState('')

	async function ProfileLoad() {
		const token = await UserDecodeToken();

		setProfile(token);
		setUserLogin(token.role);
	}

	async function ListarConsulta() {
		const url = (profile.role = 'Medico' ? 'Medicos' : 'Paciente');

		console.log(
			`${url}/BuscarPorData?data=${dateSelected}&id=${profile.user}`,
		);
		await api
			.get(
				`${url}/BuscarPorData?data=${dateSelected}&id=${profile.user}`,
				{
					headers: {
						Authorization: `Bearer ${profile.token}`,
					},
				},
			)
			.then((response) => {
				setListaConsulta(response.data);
				console.log(response.data);
			})
			.catch((error) => {
				console.log(error);
			});
	}
	function ShowModal(modal, consulta) {
		if (modal === 'Cancelar') {
			setShowModalCancel(true),


			setSelectedQuery(consulta)
		}else {
			setShowModalAppointment(true)
		}
	}

	useEffect(() => {
		ProfileLoad();
		// ListarConsulta();
	}, []);

	useEffect(() => {
		if (dateSelected != '') {
			ListarConsulta();
		}
	}, [dateSelected]);

	return (
		<Container>
			{/* Header */}
			<Header navigation={navigation} />
			{/* Calendario */}
			<CalendarHome setDateSelected={setDateSelected} />
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

			<ListComponent
				data={listaConsulta}
				key={(item) => item.id}
				renderItem={({ item }) =>
					statusLista === item.situacao && (
						<TouchableOpacity
							onPress={() => setShowModalAppointment(true)}
						>
							<AppointmentCard
								navigation={navigation}
								situacao={item.situacao}
								onPressAppointment={() =>
									setShowModalAppointment(true)
								}
								onPressCancel={() => setShowModalCancel(true)}
								consulta={item}
								//
								roleUsuario={profile.role}
								dataConsulta={item.dataConsulta}
								prioridade={item.prioridade.prioridade}
								usuarioConsulta={
									profile.role == 'Medico'
										? item.paciente
										: item.medicoClinica.medico
								}
							//
							/>
						</TouchableOpacity>
					)
				}
			/>
			{profile === 'Pacientes' && (
				<>
					<ScheduleButton
						onPress={() => setShowModalSchedule(true)}
					/>
				</>
			)}
			<CancellationModal
				navigation={navigation}
				visible={showModalCancel}
				setShowModalCancel={setShowModalCancel}
			/>
			<AppointmentModal
				situacao={statusLista}
				navigation={navigation}
				consulta={selectedQuery}
				roleUser={profile.role}
				visible={showModalAppointment}
				setShowModalAppointment={setShowModalAppointment}
			/>
			<LocationModal
				visible={showModalLocationAppointment}
				setShowModalLocationAppointment={
					setShowModalLocationAppointment
				} // Correção do nome da função
			/>
			<ScheduleModal
				navigation={navigation}
				visible={showModalSchedule}
				setShowModalSchedule={setShowModalSchedule}
			/>
		</Container>
	);
};
