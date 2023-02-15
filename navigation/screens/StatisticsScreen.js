import React from "react";
import { ImageBackground, StyleSheet, Text, View } from "react-native";

const img = require("../../assets/Logo.png");

const StatisticsScreen = () => {
	return (
		<ImageBackground source={img} resizeMode="center" style={styles.container}>
			<Text>StatisticsScreen</Text>
		</ImageBackground>
	);
};

export default StatisticsScreen;

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
});
