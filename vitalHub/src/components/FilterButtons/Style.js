import styled from 'styled-components';
import { Button, ButtonTitle } from '../Button/Style';

export const ContentButton = styled.View`
	width: 100%;
	height: auto;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
`;
export const ButtonFilter = styled(Button)`
	width: 100px;
	height: 35px;
	padding: 8px 12px 8px 12px;
	justify-content: center;
`;
export const ButtonFilterWhite = styled(ButtonFilter)`
	background-color: #fbfbfb;
	border: 2px solid #607ec5;
`;

export const ButtonTitleFilter = styled(ButtonTitle)`
	font-size: 12px;
	font-family: 'MontserratAlternates_600SemiBold';
`;

export const ButtonTitleFilterBlue = styled(ButtonTitleFilter)`
	color: #607ec5;
`;

export const ButtonFilterModal = styled.TouchableOpacity`
	width: 88px;
	height: 40px;
	background-color: ${(props) => (props.actived ? '#60B6F5' : '#FFF')};
	border: solid 1px #60bfc5;
	border-radius: 8px;
	padding: 0px 0px;
	align-items: center;
	justify-content: center;
	margin-top: 10px;
`;

export const ButtonTitleFilterModal = styled(ButtonTitle)`
	font-family: 'MontserratAlternates_600SemiBold';
	font-size: 14px;
	color: ${(props) => (props.actived ? '#FFF' : '#77CACF')};
`;
