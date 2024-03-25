import styled from "styled-components";

export const Input = styled.TextInput.attrs({
  placeholderTextColor: "#49B3BA",
})`
  width: 90%;
  height: 53px;
  padding: 16px;
  margin-top: 15px;

  border: 2px solid #49b3ba;
  border-radius: 5px;
  color: #34898f;
  font-size: 16px;
  font-family: "MontserratAlternates_600SemiBold";
`;

export const RecoverInput = styled(Input)`
margin-bottom: 30px;
`

export const InputRecord = styled(Input)`
height: 121px;
color: #33303E;
text-align-vertical: top;
width: 100%; 
`

export const InputMedicalRecords = styled(InputRecord)`
height: 53px;
`

export const InputNumbers = styled(Input)`
width: 65px;
height: 62px;
margin-bottom: 30px;
font-size: 25px;
text-align: center;
`