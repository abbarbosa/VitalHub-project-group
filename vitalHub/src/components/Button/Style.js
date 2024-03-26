import styled from "styled-components";

export const Button = styled.TouchableOpacity`
width: 90%;
height: 44px;
background-color: ${props => props.disabled ? '#CCCCCC' : '#496BBA'};
padding: 12px 8px 12px 8px;
border-radius: 5px;
margin-bottom: 15px;
border-color: #496BBA;
`

export const ButtonTitle = styled.Text`
font-size: 16px;
font-family: "MontserratAlternates_700Bold";
color: #FFFFFF;
align-self: center;
`
export const ButtonGoogle = styled(Button)`
background-color: #FAFAFA;
border: 1px solid #496BBA;;
flex-direction: row;
justify-content: center;
align-items: center;
gap: 20px;
padding: 0 0 0 0;
`

export const ButtonTitleGoogle = styled(ButtonTitle)`
color: #496BBA;
`

export const ButtonResetPassword = styled(Button)`
margin: 15px 0px;
`

export const ButtonSecundary = styled(Button)`
background-color: transparent;
border: none;
`
export const ButtonSecundaryTitle = styled(ButtonTitle)`    
text-transform: capitalize;
text-decoration: underline;
color: #344F8F;
/* margin-bottom: 20px; */
`

export const ButtonModal = styled(Button)`
width: 80%;
margin-top: 42px;
`

export const ButtonExitApp = styled(Button)`
width: 60%;
background-color: #ACABB7;
`
