import React from "react";

import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Icon from "react-native-vector-icons/Ionicons";

//Screens
import DashBoardScreen from "./screens/DashBoardScreen";
import DetailsScreen from "./screens/DetailsScreen";
import SettingsScreen from "./screens/SettingsScreen";
import StatisticsScreen from "./screens/StatisticsScreen";
import SalesScreen from "./screens/SalesScreen";

//ScreensName
const dashboardName = "Dashboard";
const detailsName = "Detalhes";
const settingsName = "Configurações";
const statisctsName = "Estatísticas";
const salesName = "Vendas";

const Tab = createBottomTabNavigator();

const MainContainer = () => {
	return (
		<NavigationContainer>
			<Tab.Navigator
				initialRouteName={salesName}
				screenOptions={({ route }) => ({
					tabBarIcon: ({ focused, color, size }) => {
						let iconName;
						let rn = route.name;

						if (rn === dashboardName) {
							iconName = focused ? "md-pie-chart" : "md-pie-chart-outline";
						} else if (rn === detailsName) {
							iconName = focused ? "list" : "list-outline";
						} else if (rn === settingsName) {
							iconName = focused ? "settings" : "settings-outline";
						} else if (rn === statisctsName) {
							iconName = focused ? "bar-chart" : "bar-chart-outline";
						} else if (rn === salesName) {
							iconName = focused ? "clipboard" : "clipboard-outline";
						}

						return <Icon name={iconName} size={size} color={color} />;
					},
					headerShown: false,
					tabBarActiveTintColor: "#44A39B",
					tabBarInactiveTintColor: "gray",
					tabBarStyle: { height: 60, paddingBottom: 10 },
				})}
			>
				<Tab.Screen name={dashboardName} component={DashBoardScreen} />
				<Tab.Screen name={statisctsName} component={StatisticsScreen} />
				<Tab.Screen name={salesName} component={SalesScreen} />
				<Tab.Screen name={detailsName} component={DetailsScreen} />
				<Tab.Screen name={settingsName} component={SettingsScreen} />
			</Tab.Navigator>
		</NavigationContainer>
	);
};

export default MainContainer;
