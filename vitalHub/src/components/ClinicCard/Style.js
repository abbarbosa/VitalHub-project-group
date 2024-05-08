import styled from 'styled-components';
import { Title } from '../Title/Style';

export const ContentNameClinicCard = styled.View`
	width: 134px;
	height: auto;
	flex-direction: column;
	gap: 10px;
	justify-content: center;
`;
export const ContentNameDoctorCard = styled(ContentNameClinicCard)`
	width: 100%;
`;

export const TitleCard = styled(Title)`
	font-size: 16px;
`;

export const ContentInformationCard = styled.View`
	width: 106px;
	flex-direction: column;
	gap: 10px;
	align-items: flex-end;
	margin-left: 70px;
`;
export const ContentStar = styled.View`
	width: 45px;
	height: auto;
	justify-content: space-evenly;
	flex-direction: row;
	align-items: center;
	margin-left: 110px;
`;
export const NumberStar = styled.Text`
	font-family: 'Quicksand_600SemiBold';
	font-size: 18;
	color: #f9a620;
`;

export const ContentTime = styled.View`
	width: 100px;
	height: auto;
	flex-direction: row;
	align-items: center;
	justify-content: center;
	gap: 5px;
	background-color: #e8fcfd;
	border-radius: 5px;
`;

export const TextTime = styled.Text`
	font-family: 'Quicksand_600SemiBold';
	font-size: 14px;
	color: #49b3ba;
`;

export const SegurarOEndereco = styled.View`
	width: 200px;
	flex-direction: row;
`;
