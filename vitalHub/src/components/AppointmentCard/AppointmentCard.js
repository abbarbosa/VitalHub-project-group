import { AntDesign } from '@expo/vector-icons';
import {
	BottomShadow,
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
import moment from 'moment';

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

	const calcularIdade = (dataNascimento) => {
		const hoje = moment();
		const nascimento = moment(dataNascimento);
		return hoje.diff(nascimento, 'years');
	};
	// const formatarDataNascimento = (dataNascimento) => {
	// 	return moment(dataNascimento).format('DD/MM/YYYY');
	// };

	useEffect(() => {
		async function ProfileLoad() {
			setProfile(await UserDecodeToken());
		}

		console.log(consulta);
		console.log('\n');
		console.log(usuarioConsulta);

		ProfileLoad();
	}, []);
	
	return (
		<ContainerCardList>
			<ProfileImage
				source={{
					uri: `${usuarioConsulta.idNavigation.foto}`,
				}}
			/>
			<ContentCard>
				<DataProfileCard>
					<ProfileName>
						{roleUsuario === 'Paciente'
							? `${usuarioConsulta?.idNavigation?.nome}`
							: `${usuarioConsulta?.idNavigation?.nome}`}
					</ProfileName>

					<ProfileData>
						<TextAge>
							{roleUsuario === 'Paciente'
								? `${consulta?.medicoClinica?.medico?.crm}`
								: `${calcularIdade(
										consulta?.paciente?.dataNascimento,
								  )} anos`}
						</TextAge>
						<TextBold>
							{consulta.prioridade.prioridade === 0
								? 'Checkup'
								: consulta.prioridade.prioridade === 1
								? 'Exam'
								: 'Urgency'}
						</TextBold>
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
							{moment(dataConsulta).format('HH:mm')}
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
						roleUsuario === 'Paciente' ? (
							<ButtonCard onPress={onPressAppointment}>
								<ButtonText situacao={situacao.situacao}>
									View Medical Records
								</ButtonText>
							</ButtonCard>
						) : (
							<ButtonCard onPress={onPressAppointment}>
								<ButtonText situacao={situacao.situacao}>
									Insert medical records
								</ButtonText>
							</ButtonCard>
						)
					) : null}
				</ViewRow>
			</ContentCard>
			<BottomShadow />
		</ContainerCardList>
	);
};
