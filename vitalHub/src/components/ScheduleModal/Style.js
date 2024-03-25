import styled from "styled-components";
import { Title } from "../Title/Style";
import { TextProfileInput } from "../../screens/Profile/Style";
import { Input } from "../Input/Style";

export const AgendModal = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.6);
`;

export const ContentSModal = styled.View`
  width: 100%;
  height: 95%;
  margin-bottom: -170px;
  padding: 30px 30px 10px;
  border-radius: 10px;
  background-color: #fff;
  align-items: center;
`;

export const TextProfileInputModal = styled(TextProfileInput)`
margin-top: 20px;
`
export const InputModal = styled(Input)`
width: 100%;
margin-bottom: 230px;
`