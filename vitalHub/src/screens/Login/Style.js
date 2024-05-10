import styled from 'styled-components';

export const ContentAccount = styled.View`
	width: 95%;
	align-items: center;
	flex-direction: row;
	justify-content: center;
	margin-top: 30px;
`;

export const TextAccount = styled.Text`
	font-size: 14px;
	font-family: 'MontserratAlternates_600SemiBold';
	color: #4e4b59;
`;
export const ButtonCamera = styled.TouchableOpacity.attrs({
	activeOpacity: 0.8
}) `
padding: 12px;
border-radius: 10px;
border: 1px solid #fbfbfb;
background-color: #496bba;
z-index:10;
bottom: -20px;
right: 15px;
position: absolute;
`
export const ContainerImage = styled.View`
width: 100%;
height: 280px;
margin-bottom:20px;

position: relative;
align-items: center;
justify-content: flex-start;
`
