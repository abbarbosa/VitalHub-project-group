// ClinicCard.js
import React, { useEffect } from 'react';
import { TouchableOpacity } from 'react-native';
import { ContainerCardList, TextBold } from '../AppointmentCard/Style';
import {
	ContentInformationCard,
	ContentNameClinicCard,
	ContentStar,
	ContentTime,
	NumberStar,
	SegurarOEndereco,
	TextTime,
	TitleCard,
} from './Style';
import { AntDesign } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export const ClinicCard = ({ selected, onPress, clinic }) => {
	useEffect(() => {
		console.log(clinic);
	});
	return (
		<TouchableOpacity onPress={onPress}>
			<ContainerCardList
				style={{
					borderColor: selected ? '#496BBA' : 'transparent',
					borderWidth: 2,
				}}
			>
				<ContentNameClinicCard>
					<TitleCard>{clinic.nomeFantasia}</TitleCard>
					<SegurarOEndereco>
						<TextBold>
							{clinic.endereco.logradouro} -{' '}
							{clinic.endereco.cidade}
						</TextBold>
					</SegurarOEndereco>
				</ContentNameClinicCard>
				<ContentInformationCard>
					<ContentStar>
						<AntDesign name="star" size={24} color={'#F9A620'} />
						<NumberStar>5</NumberStar>
					</ContentStar>

					<ContentTime>
						<MaterialCommunityIcons
							name="calendar-outline"
							size={24}
							color={'#49B3BA'}
						/>
						<TextTime>Seg-Sex</TextTime>
					</ContentTime>
				</ContentInformationCard>
			</ContainerCardList>
		</TouchableOpacity>
	);
};
