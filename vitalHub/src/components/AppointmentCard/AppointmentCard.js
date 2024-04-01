import { AntDesign } from '@expo/vector-icons';
import {
	ButtonCard,
	ButtonText,
	ClockCard,
	ContainerCardList,
	ContentCard,
	DataProfileCard,
	ProfileData,
	ProfileImage,
	ProfileName,
	TextAge,
	TextBold,
	ViewRow,
} from './Style';

export const AppointmentCard = ({
	situacao = 'pendente',
	onPressCancel,
	onPressAppointment,
	consulta
}) => {
	return (
		<>
			{/* container principal */}
			<ContainerCardList>
				{/* imagem de perfil */}
				<ProfileImage
					source={{ uri: 'https://github.com/ojuaum1.png' }}
				/>
				{/* conteudo ao lado da imagem de perfil */}
				<ContentCard>
					<DataProfileCard>
						<ProfileName>{consulta.medicoClinica.medico.idNavigation.nome}</ProfileName>
						{/* <ProfileData>
							<TextAge>45 years</TextAge>
							<TextBold>Rotina</TextBold>
						</ProfileData> */}
					</DataProfileCard>

					<ViewRow>
						<ClockCard situacao={consulta.situacao.situacao}>
							<AntDesign
								name="clockcircle"
								size={14}
								color={
									consulta.situacao.situacao == 'pendente'
										? '#49B3BA'
										: '#8C8A97'
								}
							/>
							<TextBold situacao={consulta.situacao.situacao} color={consulta.situacao.situacao === 'Pendentes' ? '#49B3BA' : '#8C8A97'}>
								14:00
							</TextBold>
						</ClockCard>

						{/* valida e mostra o tipo de botao conforme a situacao */}
						{
							situacao == 'pendente' ? (
								<ButtonCard onPress={onPressCancel}>
									<ButtonText situacao={situacao}>
										Cancel
									</ButtonText>
								</ButtonCard>
							) : situacao == 'realizada' ? (
								<ButtonCard onPress={onPressAppointment}>
									<ButtonText situacao={situacao}>
										View medical records
									</ButtonText>
								</ButtonCard>
							) : null /* Aqui você não renderiza nada quando a situação é "cancelada" */
						}
					</ViewRow>
				</ContentCard>
			</ContainerCardList>
		</>
	);
};
