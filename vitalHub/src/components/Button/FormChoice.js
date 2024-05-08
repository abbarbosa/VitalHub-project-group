import {
	ButtonFilterModal,
	ButtonTitleFilterModal,
} from '../FilterButtons/Style';

export const FormChoice = ({ textButton, actived = false, onPress }) => {
	return (
		<ButtonFilterModal actived={actived} onPress={onPress}>
			<ButtonTitleFilterModal actived={actived}>
				{textButton}
			</ButtonTitleFilterModal>
		</ButtonFilterModal>
	);
};
