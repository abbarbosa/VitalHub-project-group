import styled from 'styled-components';
import { ButtonText } from '../../components/AppointmentCard/Style';

export const FileVisualize = styled.View`
	width: 100%;
	height: 111px;
	flex-direction: row;
	align-items: center;
	justify-content: center;
	background-color: #f5f3f3;
	border-radius: 5px;
	gap: 5px;
`;

export const FileVisualizeImage = styled.Image`
	width: 100%;
	height: 111px;
	flex-direction: row;
	align-items: center;
	justify-content: center;
	/* background-color: #f5f3f3; */
	border-radius: 5px;
	/* gap: 5px; */
`;

export const ContentSend = styled.View`
	width: 90%;
	height: 63px;
	justify-content: space-between;
	align-items: center;
	flex-direction: row;
	border-bottom-width: 1px; /* Definindo a largura da borda inferior */
	border-bottom-color: #8c8a97; /* Definindo a cor da borda inferior */
	margin-bottom: 21px;
`;

export const ViewPhotoSend = styled.TouchableOpacity`
	width: 48%;
	height: 44px;
	flex-direction: row;
	gap: 10px;
	background-color: #49b3ba;
	border-radius: 5px;
	align-items: center;
	justify-content: center;
`;

export const TextSend = styled.Text`
	font-size: 14px;
	font-family: 'MontserratAlternates_700Bold';
	color: #ffffff;
`;

export const ButtonTextVisualize = styled.Text`
	font-size: 14px;
	font-family: 'MontserratAlternates_500Medium';
	color: #c81d25;
	margin-right: 52px;
`;
