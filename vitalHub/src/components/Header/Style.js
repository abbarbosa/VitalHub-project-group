import styled from 'styled-components';

export const BoxUser = styled.TouchableOpacity.attrs({ activeOpacity: 1 })`
	flex-direction: row;
	align-items: center;
	gap: 10px;
	margin-left: 20px;
	margin-top: 30px;
`;

export const BoxIcon = styled.View`
	margin-top: 30px;
`;

export const ImageUser = styled.Image`
	width: 60px;
	height: 60px;
	border-radius: 5px;
`;

export const DataUser = styled.View``;

export const TextDefault = styled.Text`
	font-size: 14px;
	font-family: 'Quicksand_500Medium';
	color: #4e4b59;
`;

export const NameUser = styled.Text`
	font-size: 16px;
	font-family: 'MontserratAlternates_600SemiBold';
	color: #fbfbfb;
`;
