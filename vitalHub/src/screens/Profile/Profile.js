import { Button, ButtonTitle } from "../../components/Button/Style";
import { Container, ScrollContainer } from "../../components/Container/Style";
import {
  AddresRow,
  ContentName,
  ContentProfile,
  ContentProfileRow,
  ContentRow,
  InputProfile,
  InputRow,
  ProfilePicture,
  RowContentProfile,
  TextProfileEmail,
  TextProfileInput,
  TextProfileName,
} from "./Style";

export const Profile = () => {
  return (
    <ScrollContainer>
      <Container>
        <ProfilePicture source={{ uri: "https://github.com/marqzzs.png" }} />
        <ContentName>
          <TextProfileName>Richard Kosta</TextProfileName>
          <TextProfileEmail>richard.kosta@gmail.com</TextProfileEmail>
        </ContentName>
        {/*  */}
        <ContentProfile>
          <TextProfileInput>Date of birth:</TextProfileInput>
          <InputProfile placeholder={"04/05/1999"} />
        </ContentProfile>
        {/*  */}
        <ContentProfile>
          <TextProfileInput>CPF:</TextProfileInput>
          <InputProfile placeholder={"859*********"} />
        </ContentProfile>
        {/*  */}
        <ContentProfile>
          <TextProfileInput>Address</TextProfileInput>
          <InputProfile placeholder={"Rua Vincenso Silva, 987"} />
        </ContentProfile>
        {/*  */}
        <ContentRow>
          <RowContentProfile>
            <TextProfileInput>CEP:</TextProfileInput>
            <InputRow placeholder={"05545-333"} />
          </RowContentProfile>
          {/*  */}
          <RowContentProfile>
            <TextProfileInput>City:</TextProfileInput>
            <InputRow placeholder={"Capao Redondo - SP"} />
          </RowContentProfile>
        </ContentRow>

        <Button>
          <ButtonTitle>Save</ButtonTitle>
        </Button>

        <Button>
          <ButtonTitle>Edit</ButtonTitle>
        </Button>

        <Button disabled={true}>
          <ButtonTitle>Exit the app</ButtonTitle>
        </Button>
      </Container>
    </ScrollContainer>
  );
};
