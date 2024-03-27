import { useState } from 'react';
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
						data={Consultas}
						key={(item) => item.id}
						renderItem={({ item }) =>
							statusLista === item.situacao && (
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
						data={Consultas}
						key={(item) => item.id}
						renderItem={({ item }) =>
							statusLista === item.situacao && (
								<TouchableOpacity
									onPress={() =>
										setShowModalAppointment(true)
									} // Corrigido para setShowModalAppointment
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
