// Importando hooks necessários do React
import { useEffect, useState } from 'react';
// Importando componentes e estilos específicos
import { AbsListAppontment } from '../../components/AbsListAppointment/AbsListAppointment';
import CalendarHome from '../../components/CalendarHome/CalendarHome';
import { Container } from '../../components/Container/Style';
import { Header } from '../../components/Header/Header';
import { FilterAppointment } from './Style'; // Importando estilos específicos para filtro de consulta
import { ListComponent } from '../../components/List/List';
import { AppointmentCard } from '../../components/AppointmentCard/AppointmentCard';
import CancellationModal from '../../components/CancellationModal/CancellationModal';
import { AppointmentModal } from '../../components/AppointmentModal/AppointmentModal';
import { ScheduleButton } from '../../components/ScheduleButton/ScheduleButton';
import { ScheduleModal } from '../../components/ScheduleModal/ScheduleModal';
import { TouchableOpacity } from 'react-native';
import { LocationModal } from '../../components/LocationModal/LocationModal';
import { api } from '../../services/Service'; // Importando API de serviços
import { UserDecodeToken } from '../../services/Utils/Auth'; // Importando função para decodificar token de usuário

// Definindo componente Home
export const Home = ({ navigation }) => {
	// Estados para controle dos modais e informações
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

	// Função assíncrona para carregar o perfil do usuário
	async function ProfileLoad() {
		const token = await UserDecodeToken();

		setProfile(token);
		setUserLogin(token.role);
	}

	// Função assíncrona para listar as consultas com base na data selecionada
	async function ListarConsulta() {
		const url = (profile.role === 'Medico' ? 'Medicos' : 'Pacientes');


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
				// console.log(response.data);

				setListaConsulta(response.data);

				// console.log(listaConsulta);
			})
			.catch((error) => {
				console.log(error);
			});
	}

	// Função para exibir um modal específico
	function MostrarModal(modal, consulta) {
		setConsultaSelecionada(consulta);
		if (modal === 'cancelar') {
			setShowModalCancel(true);
		} else if (modal === 'prontuario') {
			setShowModalAppointment(true);
		}
	}

	// Efeito para carregar o perfil do usuário ao montar o componente
	async function CancelarConsulta() {
		try {
			await api
				.patch(
					`/Consultas/Status?id=${consultaSelecionada}$situacaoid=${'1A4C4AAB-3097-45B1-9AD2-EEAE7CFD6BD2'}`,
				)
				.then((response) => {
					setListaConsulta(response.data);
				})
				.catch((error) => {
					console.log(`Deu erro na requisicao: ${error}`);
				});
		} catch (error) { }
	}


	useEffect(() => {
		ProfileLoad();
	}, []);

	// Efeito para listar as consultas quando a data selecionada é alterada
	useEffect(() => {
		if (dateSelected !== '') {
			ListarConsulta();
		}
	}, [dateSelected]);

	// Retorno do componente
	return (
		<Container>
			{/* Cabeçalho */}
			<Header navigation={navigation} />
			{/* Calendário */}
			<CalendarHome setDateSelected={setDateSelected} />
			{/* Botões de filtro de consulta */}
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

			{/* Lista de consultas */}
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
			{profile.role === 'Paciente' && (
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
				consulta={consultaSelecionada}
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

