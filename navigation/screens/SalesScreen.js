import React from "react";
import { ImageBackground, StyleSheet, Text, View } from "react-native";
import Title from "../../components/Title";

const img = require("../../assets/Logo.png");

const SalesScreen = () => {
	return (
		<ImageBackground source={img} resizeMode="center" style={styles.container}>
			<Title title={"Vendas"} />
			<Text>SalesScreen</Text>
		</ImageBackground>
	);
};

export default SalesScreen;
const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
});
