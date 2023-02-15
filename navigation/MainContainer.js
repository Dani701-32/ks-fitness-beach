import React from "react";

import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Icon from "react-native-vector-icons/Ionicons";
import { MaterialCommunityIcons } from "@expo/vector-icons";

//Screens
import DashBoardScreen from "./screens/DashBoardScreen";
import StatisticsScreen from "./screens/StatisticsScreen";
import ProductsScreen from "./screens/ProductsScreen";

//ScreensName
const dashboardName = "Dashboard";
const statisctsName = "Estatísticas";
const salesName = "Produtos";

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
						} else if (rn === statisctsName) {
							iconName = focused ? "bar-chart" : "bar-chart-outline";
						} else if (rn === salesName) {
							iconName = focused ? "purse" : "purse-outline";
							return (
								<MaterialCommunityIcons
									name={iconName}
									size={size}
									color={color}
								/>
							);
						}

						return <Icon name={iconName} size={size} color={color} />;
					},
					headerShown: false,
					tabBarActiveTintColor: "#44A39B",
					tabBarInactiveTintColor: "gray",
					tabBarStyle: {
						height: 60,
						paddingBottom: 10,
					},
				})}
			>
				<Tab.Screen name={dashboardName} component={DashBoardScreen} />
				<Tab.Screen name={statisctsName} component={StatisticsScreen} />
				<Tab.Screen name={salesName} component={ProductsScreen} />
			</Tab.Navigator>
		</NavigationContainer>
	);
};

export default MainContainer;
