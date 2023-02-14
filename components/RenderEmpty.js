import React from "react";
import { Text, View } from "react-native";
import { styles } from "../navigation/screens/SalesScreen";

const RenderEmpty = () => {
	return (
		<View style={styles.dropdown.empty}>
			<Text>Lista Vazia</Text>
		</View>
	);
};

export default RenderEmpty;
