import React, { useState } from "react";
import { ImageBackground, StyleSheet, View } from "react-native";
import { Dropdown } from "react-native-element-dropdown";

//Components
import Title from "../../components/Title";
import RenderEmpty from "../../components/RenderEmpty";

//Pages
import AttendencePage from "../pages/AttendencePage";
import PaymentsPage from "../pages/PaymentsPage";
import ProductsPage from "../pages/ProductsPage";

const img = require("../../assets/Logo.png");

const DATA = [
	{
		name: "Produtos",
		value: "products",
	},
	{
		name: "Pagamentos",
		value: "payments",
	},
	{
		name: "Atendimento",
		value: "attendence",
	},
];

const SalesScreen = () => {
	const [currentPage, setPage] = useState("products");

	return (
		<ImageBackground source={img} resizeMode="center" style={styles.container}>
			<Title title={"Vendas"} />
			<Dropdown
				value={DATA[0]}
				containerStyle={styles.dropdown.container}
				itemContainerStyle={styles.dropdownItem}
				placeholderStyle={styles.placeholder}
				placeholder="Buscar"
				style={styles.dropdown}
				backgroundColor={"rgba(0,0,0,0.2)"}
				activeColor={"rgba(68, 163, 155, 0.7)"}
				data={DATA}
				labelField="name"
				valueField="value"
				flatListProps={{
					ListEmptyComponent: <RenderEmpty />,
				}}
				onChange={(item) => {
					setPage(item.value);
				}}
			/>
			<View>
				{currentPage === "products" && <ProductsPage />}
				{currentPage === "payments" && <PaymentsPage />}
				{currentPage === "attendence" && <AttendencePage />}
			</View>
		</ImageBackground>
	);
};

export default SalesScreen;
export const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 20,
	},
	dropdown: {
		maxWidth: 300,
		height: 40,
		borderRadius: 10,
		backgroundColor: "rgba(215,215,215,0.60)",
		marginBottom: 10,
		paddingHorizontal: 10,
		paddingVertical: 6,

		container: {
			marginTop: 5,
			borderWidth: 0,
		},

		empty: {
			padding: 16,
			alignItems: "center",
		},
	},
	dropdownItem: {
		borderBottomWidth: 1,
		borderBottomColor: "#eeeeee",
	},
	placeholder: {
		fontSize: 15,
		alignSelf: "center",
		fontWeight: 200,
	},
});
