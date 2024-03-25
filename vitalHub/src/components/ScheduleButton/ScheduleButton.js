import { FontAwesome } from "@expo/vector-icons";
import { ScheduleContainer } from "./Style";

export const ScheduleButton = ({ onPress }) => {
  return (
    <ScheduleContainer onPress={onPress}>
      <FontAwesome onPress={onPress} name="stethoscope" size={40} color="white" />
    </ScheduleContainer>
  );
};
