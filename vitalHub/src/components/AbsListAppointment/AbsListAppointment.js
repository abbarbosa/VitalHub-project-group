import { ButtonTabsStyle, ButtonTextStyle } from "./Style";

export const AbsListAppontment = ({
  textButton,
  clickButton = false,
  onPress,
}) => {
  return (
    // Botao
    // Texto do botao
    <ButtonTabsStyle clickButton={clickButton} onPress={onPress}>
      <ButtonTextStyle clickButton={clickButton}>{textButton}</ButtonTextStyle>
    </ButtonTabsStyle>
  );
};
