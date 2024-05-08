import React from 'react';
import { TouchableOpacity } from 'react-native';
import {
	BottomShadow,
	ContainerCardList,
	TextBold,
} from '../AppointmentCard/Style';
import { ContentNameDoctorCard, TitleCard } from '../ClinicCard/Style';
import { DoctorCardImage } from './Style';

export const DoctorsCard = ({ id, selected, onPress, medico }) => {
	return (
		<TouchableOpacity onPress={onPress}>
			<ContainerCardList
				style={{
					borderWidth: selected ? 2 : 0,
					borderColor: '#496BBA',
				}}
			>
				{/* Utilize o componente Image para exibir a imagem */}
				<DoctorCardImage
					source={{
						uri: `${medico.idNavigation.foto}`,
					}}
				/>
				<ContentNameDoctorCard>
					<TitleCard>{medico.idNavigation.nome}</TitleCard>
					<TextBold>{medico.especialidade.especialidade1}</TextBold>
				</ContentNameDoctorCard>
			</ContainerCardList>
		</TouchableOpacity>
	);
};
