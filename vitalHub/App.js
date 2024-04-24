import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { Navigation } from './src/screens/Navigation/Navigation';
import { Login } from './src/screens/Login/Login';
import { RecoverPassword } from './src/screens/RecoverPassword/RecoverPassword';
import { ResetPassword } from './src/screens/ResetPassword/ResetPassword';
import { MedicalRecords } from './src/screens/MedicalRecords/MedicalRecords';

// Import library moment
import moment from 'moment';

// import calendar strip
import { CalendarHome } from './src/components/CalendarHome/CalendarHome';

//StackNavigator instance
const Stack = createNativeStackNavigator();

//Import from sources
import {
	useFonts,
	MontserratAlternates_600SemiBold,
	MontserratAlternates_500Medium,
	MontserratAlternates_700Bold,
} from '@expo-google-fonts/montserrat-alternates';

import {
	Quicksand_500Medium,
	Quicksand_600SemiBold,
	Quicksand_400Regular,
} from '@expo-google-fonts/quicksand';
import { CheckEmail } from './src/screens/CheckEmail/CheckEmail';
import { CreateAccount } from './src/screens/CreateAccount/CreateAccount';
import { Profile } from './src/screens/Profile/Profile';
import { Home } from './src/screens/Home/Home';
import { SelectClinic } from './src/screens/SelectClinic/SelectClinic';
import { SelectDoctor } from './src/screens/SelectDoctor/SelectDoctor';
import { SelectDate } from './src/screens/SelectDate/SelectDate';
import { LocationAppointment } from './src/screens/LocationAppointment/LocationAppointment';
import { VisualizePrescription } from './src/screens/VisualizePrescription/VisualizePrescription';
import { Main } from './src/screens/Main/Main';

import { Camera, CameraPhoto } from './src/components/CameraPhoto/CameraPhoto';

export default function App() {
	const [fontsLoaded, fontsError] = useFonts({
		MontserratAlternates_600SemiBold,
		MontserratAlternates_500Medium,
		MontserratAlternates_700Bold,
		Quicksand_500Medium,
		Quicksand_600SemiBold,
		Quicksand_400Regular,
	});

	if (!fontsLoaded && !fontsError) {
		return null;
	}

	return (
		//involves the structure of navigation
		<NavigationContainer>
			<StatusBar />
			{/* Navigation component */}
			<Stack.Navigator screenOptions={{ headerShown: false }}>
				<Stack.Screen
					//Screen name
					name="Login"
					//component that will be called
					component={Login}
					//screen title
					options={{ title: 'Login', headerShown: false }}
				/>
				<Stack.Screen
					//screen name
					name="Main"
					//component that will be called
					component={Main}
					//screen title
					options={{
						title: 'Main',
					}}
				/>
				{/* <Stack.Screen
          //Screen name
          name="Navigation"
          //component that will be called
          component={Navigation}
          //screen title
          options={{ title: "Navigation", headerShown: false }}
        /> */}
				<Stack.Screen
					//Screen name
					name="RecoverPassword"
					//component that will be called
					component={RecoverPassword}
					//screen title
					options={{ title: 'RecoverPassword', headerShown: false }}
				/>
				<Stack.Screen
					//Screen name
					name="CheckEmail"
					//component that will be called
					component={CheckEmail}
					//screen title
					options={{ title: 'CheckEmail', headerShown: false }}
				/>
				<Stack.Screen
					//Screen name
					name="ResetPassword"
					//component that will be called
					component={ResetPassword}
					//screen title
					options={{ title: 'ResetPassword', headerShown: false }}
				/>
				<Stack.Screen
					//Screen name
					name="CreateAccount"
					//component that will be called
					component={CreateAccount}
					//screen title
					options={{ title: 'CreateAccount', headerShown: false }}
				/>
				<Stack.Screen
					//Screen name
					name="Profile"
					//component that will be called
					component={Profile}
					//screen title
					options={{ title: 'Profile', headerShown: false }}
				/>
				<Stack.Screen
					//Screen name
					name="Home"
					//component that will be called
					component={Home}
					//screen title
					options={{ title: 'Home', headerShown: false }}
				/>
				<Stack.Screen
					//Screen name
					name="MedicalRecords"
					//component that will be called
					component={MedicalRecords}
					//screen title
					options={{ title: 'MedicalRecords', headerShown: false }}
				/>
				<Stack.Screen
					//Screen name
					name="SelectClinic"
					//component that will be called
					component={SelectClinic}
					//screen title
					options={{ title: 'SelectClinic', headerShown: false }}
				/>
				<Stack.Screen
					//Screen name
					name="SelectDoctor"
					//component that will be called
					component={SelectDoctor}
					//screen title
					options={{ title: 'SelectDoctor', headerShown: false }}
				/>
				<Stack.Screen
					//Screen name
					name="SelectDate"
					//component that will be called
					component={SelectDate}
					//screen title
					options={{ title: 'SelectDate', headerShown: false }}
				/>
				<Stack.Screen
					//Screen name
					name="LocationAppointment"
					//component that will be called
					component={LocationAppointment}
					//screen title
					options={{
						title: 'LocationAppointment',
						headerShown: false,
					}}
				/>
				<Stack.Screen
					//Screen name
					name="VisualizePrescription"
					//component that will be called
					component={VisualizePrescription}
					//screen title
					options={{
						title: 'VisualizePrescription',
						headerShown: false,
					}}
				/>
				<Stack.Screen
					//Screen name
					name="CameraPhoto"
					//component that will be called
					component={CameraPhoto}
					//screen title
					options={{
						title: 'CameraPhoto',
						headerShown: false,
					}}
				/>
			</Stack.Navigator>
		</NavigationContainer>
	);
}
