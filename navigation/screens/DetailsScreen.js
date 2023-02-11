import React from "react";
import { ImageBackground, StyleSheet, Text, View } from "react-native";

const img = require("../../assets/Logo.png");

const DetailsScreen = () => {
	return (
		<ImageBackground source={img} resizeMode="center" style={styles.container}>
			<Text>DetailsScreen</Text>
		</ImageBackground>
	);
};

export default DetailsScreen;

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
});
