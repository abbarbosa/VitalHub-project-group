import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Home } from '../Home/Home';
import { Profile } from '../Profile/Profile';
import { FontAwesome, FontAwesome5 } from '@expo/vector-icons';
import { ContentIcon, TextIcon } from './Style';

const BottomTab = createBottomTabNavigator();

export const Main = ({ navigation, route }) => {
	const routeParams = route.params;
	return (
		<BottomTab.Navigator
			initialRouteName={
				route.params != undefined ? routeParams.screen : 'Home'
			}
			screenOptions={({ route }) => ({
				tabBarStyle: {
					backgroundColor: '#fff',
					height: 60,
					paddingTop: 10,
				},
				tabBarActiveBackgroundColor: 'transparent',
				tabBarShowLabel: false,
				headerShown: false,

				tabBarActiveTintColor: '#607EC5',
				tabBarIcon: ({ focused }) => {
					if (route.name === 'Home') {
						return (
							<>
								<ContentIcon
									tabBarActiveBackgroundColor={
										focused ? '#ECF2FF' : 'transparent'
									}
								>
									<FontAwesome
										name="calendar"
										size={22}
										color="#4E4B59"
									/>
									{focused && <TextIcon>Agenda</TextIcon>}
								</ContentIcon>
							</>
						);
					} else {
						return (
							<>
								<ContentIcon
									tabBarActiveBackgroundColor={
										focused ? '#ECF2FF' : 'transparent'
									}
								>
									<FontAwesome5
										name="user-circle"
										size={22}
										color="#4E4B59"
									/>
									{focused && <TextIcon>Profile</TextIcon>}
								</ContentIcon>
							</>
						);
					}
				},
			})}
		>
			<BottomTab.Screen name="Home" component={Home} />
			<BottomTab.Screen name="Profile">
				{(props) => <Profile navigation={navigation} route={route} />}
			</BottomTab.Screen>
		</BottomTab.Navigator>
	);
};
