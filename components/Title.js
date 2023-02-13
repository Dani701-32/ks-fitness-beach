import React from "react";
import { StyleSheet, Text } from "react-native";

const Title = ({ title }) => {
	return <Text style={styles.title}>{title}</Text>;
};

export default Title;

const styles = StyleSheet.create({
	title: {
		fontSize: 30,
		fontweight: 900,
		color: "#44A39B",
	},
});
