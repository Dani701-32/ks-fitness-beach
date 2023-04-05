import React from "react";
import { StyleSheet, Text } from "react-native";

const TextTable = ({ text }) => {
	return <Text style={styles.text}>{text}</Text>;
};

export default TextTable;

const styles = StyleSheet.create({
	text: {
		flex: 1,
		fontSize: 13,
		alignSelf: "center",
		fontWeight: "600",
		paddingHorizontal: 10,
	},
});
