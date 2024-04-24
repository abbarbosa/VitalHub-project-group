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
import { useEffect, useState } from 'react';
import { UserDecodeToken } from '../../services/Utils/Auth';
import { Text } from 'react-native';

export const AppointmentCard = ({
	situacao,
	onPressCancel,
	onPressAppointment,
	consulta,
	usuarioConsulta,
	dataConsulta,
	navigation,
	roleUsuario,
	prioridade,
}) => {
	const [profile, setProfile] = useState({});

	useEffect(() => {
		async function ProfileLoad() {
			setProfile(await UserDecodeToken());
		}

		ProfileLoad();
	}, []);
	
	return (
		<ContainerCardList>
			<ProfileImage
				source={{
					uri: 'https://dabiatlante.com.br/wp-content/uploads/2022/11/como-proteger-o-paciente-contra-as-radiacoes.jpg',
				}}
			/>
			<ContentCard>
				<DataProfileCard>
					<ProfileName>
						{usuarioConsulta.idNavigation.nome}
					</ProfileName>
					<ProfileData>
						<TextAge>45 years</TextAge>
						<TextBold>Rotina</TextBold>
					</ProfileData>
				</DataProfileCard>

				<ViewRow>
					<ClockCard situacao={situacao.situacao}>
						<AntDesign
							name="clockcircle"
							size={14}
							color={
								situacao === 'Pendentes' ? '#49B3BA' : '#8C8A97'
							}
						/>

						<TextBold
							situacao={situacao.situacao}
							color={'#49B3BA'}
						>
							{dataConsulta}
						</TextBold>
					</ClockCard>

					{/* Renderize os botões com base na situação da consulta */}
					{situacao === 'Pendentes' ? (
						<ButtonCard onPress={onPressCancel}>
							<ButtonText situacao={situacao.situacao}>
								Cancel
							</ButtonText>
						</ButtonCard>
					) : situacao === 'Realizados' ? (
						<ButtonCard onPress={onPressAppointment}>
							<ButtonText situacao={situacao.situacao}>
								View Medical Records
							</ButtonText>
						</ButtonCard>
					) : null}
				</ViewRow>
			</ContentCard>
		</ContainerCardList>
	);
};
