import { Button, ButtonTitle } from "../Button/Style";
import { Container } from "../Container/Style";
import { ButtonFilter, ButtonFilterWhite, ButtonTitleFilter, ButtonTitleFilterBlue, ContentButton } from "./Style";

export const FilterButtons = () => {
  return (
    <Container>
      <ContentButton>
        <ButtonFilter>
          <ButtonTitleFilter>Agendadas</ButtonTitleFilter>
        </ButtonFilter>

        <ButtonFilterWhite>
          <ButtonTitleFilterBlue>Realizadas</ButtonTitleFilterBlue>
        </ButtonFilterWhite>

        <ButtonFilterWhite>
          <ButtonTitleFilterBlue>Canceladas</ButtonTitleFilterBlue>
        </ButtonFilterWhite>

      </ContentButton>
    </Container>
  );
};
