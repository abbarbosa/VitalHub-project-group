import styled from 'styled-components';
import { Title } from '../Title/Style';

export const ContainerCardList = styled.View`
	width: 90%;
	flex-direction: row;
	align-items: center;
	gap: 10px;
	background-color: #ffffff;
	padding: 10px 10px;
	border-radius: 5px;
	box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.08); /* sombra em todas as direções */
	margin: 0 auto;
	margin-bottom: 12px;
	overflow: hidden; /* para evitar que a sombra se estenda além dos limites do contêiner */
`;

export const BottomShadow = styled.View`
	position: absolute;
	bottom: 0;
	left: 0;
	right: 0;
	height: 6px; /* altura da sombra */
	background-color: rgba(0, 0, 0, 0.08); /* cor da sombra */
`;

export const ProfileImage = styled.Image`
	width: 77px;
	height: 80px;
	border-radius: 5px;
`;

export const ContentCard = styled.View`
	width: 70%;
`;

export const DataProfileCard = styled.View`
	gap: 6px;
`;

export const ProfileName = styled(Title)`
	font-size: 16px;
`;

export const ProfileData = styled.View`
	flex-direction: row;
	gap: 15px;
`;
export const TextAge = styled.Text`
	font-size: 14px;
	color: #8c8a97;
	font-family: 'Quicksand_400Regular';
`;
export const TextBold = styled(TextAge)`
	font-family: 'Quicksand_600SemiBold';
	color: ${(props) => (props.color ? props.color : '#8C8A97')};
`;

export const ViewRow = styled.View`
	width: 100%;
	flex-direction: row;
	align-items: center;
	justify-content: space-between;
`;

export const ClockCard = styled.View`
	flex-direction: row;
	padding: 4px 23px;
	gap: 6px;
	border-radius: 5px;
	align-items: center;
	background-color: ${(props) =>
		props.situacao == 'Pendentes' ? '#F1F0F5' : '#E8FCFD'};
`;

export const ButtonCard = styled.TouchableOpacity``;

export const ButtonText = styled.Text`
	font-family: 'MontserratAlternates_500Medium';
	font-size: 12px;

	color: ${(props) =>
		props.situacao == 'Pendentes' ? '#C81D25' : '#344F8F'};
`;
