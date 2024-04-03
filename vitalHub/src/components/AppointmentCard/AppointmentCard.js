import { AntDesign } from '@expo/vector-icons';
import {
	ButtonCard,
	ButtonText,
	ClockCard,
	ContainerCardList,
	ContentCard,
	DataProfileCard,
	ProfileName,
	ViewRow,
} from './Style';

export const AppointmentCard = ({
	situacao = 'pendente',
	onPressCancel,
	onPressAppointment,
	consulta,
	usuarioConsulta,
	dataConsulta,
}) => {
	return (
		<ContainerCardList>
			<ContentCard>
				<DataProfileCard>
					<ProfileName>{consulta.idNavigation?.nome}</ProfileName>
				</DataProfileCard>
				<ViewRow>
					<ClockCard situacao={situacao}>
						<AntDesign
							name="clockcircle"
							size={14}
							color={
								situacao === 'Pendentes' ? '#49B3BA' : '#8C8A97'
							}
						/>
						{/* Adicione o horário da consulta aqui */}
					</ClockCard>
					{/* Renderize os botões com base na situação da consulta */}
					{situacao === 'Pendentes' ? (
						<ButtonCard onPress={onPressCancel}>
							<ButtonText situacao={situacao}>Cancel</ButtonText>
						</ButtonCard>
					) : situacao === 'Realizados' ? (
						<ButtonCard onPress={onPressAppointment}>
							<ButtonText situacao={situacao}>
								View Medical Records
							</ButtonText>
						</ButtonCard>
					) : null}
				</ViewRow>
			</ContentCard>
		</ContainerCardList>
	);
};
