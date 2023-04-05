import React from "react";
import { StyleSheet, Text, View } from "react-native";

const Table = ({ header, children }) => {
	return (
		<View style={styles.table}>
			<View style={styles.tableHeader}>
				{header.map((item, i) => {
					return (
						<Text key={i} style={styles.tableHeaderItem}>
							{item}
						</Text>
					);
				})}
			</View>
			<View>
				{children}
			</View>
		</View>
	);
};
export default Table;

const styles = StyleSheet.create({
	table: {
		overflow: "hidden",
		borderRadius: 16,
	},
	tableHeader: {
		display: "flex",
		flexDirection: "row",
		paddingVertical: 16,
		borderBottomWidth: 2,
		borderBottomColor: "#cccccc",
		backgroundColor: "rgba(215,215,215,0.60)",
	},
	tableHeaderItem: {
		flex: 1,
		fontSize: 12,
		alignSelf: "center",
		fontWeight: "200",
		paddingHorizontal: 8,
	},
});
