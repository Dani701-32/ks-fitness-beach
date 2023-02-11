import React from "react";
import { ImageBackground, StyleSheet, Text, View } from "react-native";

const img = require("../../assets/Logo.png");

const SettingsScreen = () => {
	return (
		<ImageBackground source={img} resizeMode="center" style={styles.container}>
			<Text>SettingsScreen</Text>
		</ImageBackground>
	);
};

export default SettingsScreen;

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
});
