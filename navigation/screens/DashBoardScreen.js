import React from "react";
import { ImageBackground, StyleSheet, Text, View } from "react-native";

const img = require("../../assets/Logo.png");

const DashBoardScreen = () => {
	return (
		<ImageBackground source={img} resizeMode="center" style={styles.container}>
			<Text style={styles.title}>Faturamento</Text>
		</ImageBackground>
	);
};

export default DashBoardScreen;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 20,
	},
	title: {
		fontSize: 20,
		fontweight: "bolder",
	},
});
