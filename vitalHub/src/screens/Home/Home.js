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
import { ScheduleButton } from '../../components/ScheduleButton/ScheduleButton';
import { ScheduleModal } from '../../components/ScheduleModal/ScheduleModal';
import { TouchableOpacity } from 'react-native';
import { LocationModal } from '../../components/LocationModal/LocationModal';
import { api } from '../../services/Service';
import { UserDecodeToken } from '../../services/Utils/Auth';

export const Home = ({ navigation }) => {
	const [statusLista, setStatusLista] = useState('Pendentes');
	const [showModalCancel, setShowModalCancel] = useState(false);
	const [showModalAppointment, setShowModalAppointment] = useState(false);
	const [showModalSchedule, setShowModalSchedule] = useState(false);
	const [showModalLocationAppointment, setShowModalLocationAppointment] =
		useState(false);

	const [dateSelected, setDateSelected] = useState('');

	const [listaConsulta, setListaConsulta] = useState([]);

	const [profile, setProfile] = useState({});

	const [userLogin, setUserLogin] = useState('');

	const [consultaSelecionada, setConsultaSelecionada] = useState();

	async function ProfileLoad() {
		const token = await UserDecodeToken();

		console.log(token);

		setProfile(token);

		console.log(profile);

		setUserLogin(token.role);

		console.log(userLogin);
	}
	async function ListarConsulta() {
		const url = profile.role === 'Medico' ? 'Medicos' : 'Pacientes';

		console.log(url);

		await api
			.get(`${url}/BuscarPorData?data=${dateSelected}&id=${profile.user}`)
			.then((response) => {
				console.log(response.data);

				setListaConsulta(response.data);

				console.log(listaConsulta);
			})
			.catch((error) => {
				console.log(error);
			});
	}

	function MostrarModal(modal, consulta) {
		setConsultaSelecionada(consulta);

		if (modal === 'cancelar') {
			setShowModalCancel(true);
		} else if (modal === 'prontuario') {
			setShowModalAppointment(true);
		}
	}

	useEffect(() => {
		ProfileLoad();
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
					textButton={'Agendadas'}
					clickButton={statusLista === 'Pendentes'}
					onPress={() => setStatusLista('Pendentes')}
				/>
				<AbsListAppontment
					textButton={'Realizadas'}
					clickButton={statusLista === 'Realizados'}
					onPress={() => setStatusLista('Realizados')}
				/>
				<AbsListAppontment
					textButton={'Cancelada'}
					clickButton={statusLista === 'Cancelados'}
					onPress={() => setStatusLista('Cancelados')}
				/>
			</FilterAppointment>

			<ListComponent
				data={listaConsulta}
				key={(item) => item.id}
				renderItem={({ item }) =>
					statusLista === item.situacao.situacao && (
						<TouchableOpacity
							onPress={() => MostrarModal('prontuario', item)}
						>
							<AppointmentCard
								navigation={navigation}
								situacao={item.situacao.situacao}
								onPressAppointment={() =>
									MostrarModal('prontuario', item)
								}
								onPressCancel={() =>
									MostrarModal('cancelar', item)
								}
								consulta={item} // Passando os dados da consulta como prop
								roleUsuario={profile.role}
								dataConsulta={item.dataConsulta}
								prioridade={item.prioridade.prioridade}
								usuarioConsulta={
									profile.role === 'Medico'
										? item.paciente
										: item.medicoClinica.medico
								}
							/>
						</TouchableOpacity>
					)
				}
			/>
			{profile === 'Paciente' && (
				<>
					<ScheduleButton
						onPress={() => setShowModalSchedule(true)}
					/>
					<ScheduleModal
						navigation={navigation}
						visible={showModalSchedule}
						setShowModalSchedule={setShowModalSchedule}
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
				visible={showModalAppointment}
				setShowModalAppointment={setShowModalAppointment}
				consulta={consultaSelecionada}
				roleUsuario={profile.role}
			/>
			<LocationModal
				visible={showModalLocationAppointment}
				setShowModalLocationAppointment={
					setShowModalLocationAppointment
				} // Correção do nome da função
				consulta={consultaSelecionada}
			/>
		</Container>
	);
};
