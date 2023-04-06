import React, { useEffect, useState } from "react";
import { ImageBackground, StyleSheet, Text, View } from "react-native";
import Title from "../../components/Title";
import { Pressable } from "react-native";
import ModalItem from "../../components/ModalItem";
import { Controller, useForm } from "react-hook-form";
import { Dropdown } from "react-native-element-dropdown";
import Icon from "react-native-vector-icons/Ionicons";
import axios from "axios";
import Table from "../../components/table/Table";
import TextTable from "../../components/table/TextTable";

const img = require("../../assets/Logo.png");
const url = "http://andeen171.pythonanywhere.com/store/";

const StatisticsScreen = () => {
	const { control, handleSubmit, reset, setValue, formState } = useForm();

	const [sales, setSales] = useState(null);
	const [products, setProducts] = useState(null);
	const [edit, setEdit] = useState(null);
	const [visible, setVisible] = useState(false);
	const [isFocus, setIsFocus] = useState(false);

	const start = async () => {
		getProducts();
		getSales();
	};
	const getSales = async () => {
		fetch(`${url}sales/`)
			.then((response) => response.json())
			.then((json) => setSales(json));
	};
	const getSale = () => {};
	const createSale = async (new_sale) => {
		let product = new_sale.products;
		console.log(product);
		// await axios
		// 	.post(`${url}sales/`, {
		// 		products: [
		// 			{
		// 				id: product.id,
		// 				size: M,
		// 				quantity: 2,
		// 			},
		// 		],
		// 	})
		// 	.then(() => getSales())
		// 	.then(() => setVisible(false));
	};
	const updateSale = () => {};

	const getProducts = async () => {
		fetch(`${url}products/`)
			.then((response) => response.json())
			.then((json) => setProducts(json.results));
	};

	useEffect(() => {
		start();
	}, []);
	return (
		<ImageBackground source={img} resizeMode="center" style={styles.container}>
			<Title title="Vendas" />
			<Text style={styles.detail}>Vedas cadastradas no sistema</Text>
			<Table header={["ID da transação", "Produtos", "Saldo", "Ações"]}>
				{sales?.results.map((sale) => {
					return (
						<View key={sale.id} style={styles.tableBody}>
							<TextTable text={sale.id} />
							<TextTable text={sale.created_at} />
						</View>
					);
				})}
			</Table>

			<Pressable style={styles.addButton} onPress={() => setVisible(true)}>
				<Text style={[styles.textButton, { marginRight: 12 }]}>
					Adicionar Novo
				</Text>
				<Icon name="add" size={18} color="#fff" />
			</Pressable>
			<ModalItem visible={visible}>
				<View>
					<Pressable onPress={() => setVisible(false)}>
						<Icon name="close-sharp" size={24} color="black" />
					</Pressable>
				</View>
				<View>
					<Controller
						control={control}
						name="products"
						rules={{ required: "Produto é obrigatório" }}
						render={({ field: { onChange, value }, fieldState: { error } }) => (
							<>
								{error && (
									<Text style={{ color: "red", alignSelf: "stretch" }}>
										{error.message || "Error"}
									</Text>
								)}
								<Dropdown
									style={[styles.modalInput, { paddingVertical: 3 }]}
									data={products ? products : []}
									labelField="name"
									valueField="id"
									placeholder={!isFocus ? "Selecione um produto" : "..."}
									onChange={onChange}
									onFocus={() => setIsFocus(true)}
									onBlur={() => setIsFocus(false)}
									value={value}
								/>
							</>
						)}
					/>
					<Pressable
						style={[styles.button, { width: "100%", justifyContent: "center" }]}
						onPress={handleSubmit(edit ? updateSale : createSale)}
					>
						<Text style={styles.buttonText}>{!edit ? "Salvar" : `Editar`}</Text>
						<Icon name="save" size={18} color="#fff" />
					</Pressable>
				</View>
			</ModalItem>
		</ImageBackground>
	);
};

export default StatisticsScreen;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 20,
	},
	detail: {
		marginBottom: 15,
		fontSize: 14,
		color: "rgb(132, 132, 132)",
	},
	tableBody: {
		display: "flex",
		flexDirection: "row",
		paddingVertical: 16,
		borderBottomWidth: 2,
		borderBottomColor: "#cccccc",
		backgroundColor: "rgba(235,235,235,0.85)",
	},
	tableBodyItem: {
		flex: 1,
		fontSize: 12,
		alignSelf: "center",
		fontWeight: "200",
		paddingHorizontal: 8,
		button: {
			flex: 1,
			display: "flex",
			flexDirection: "row",
			gap: 10,
		},
	},
	textButton: {
		color: "#FFFF",
		fontWeight: "700",
		width: "100%",
		textAlign: "center",
	},
	addButton: {
		width: "fit-content",
		backgroundColor: "#44a39b",
		marginTop: 20,
		paddingVertical: 10,
		paddingHorizontal: 8,
		borderRadius: 14,
		display: "flex",
		flexDirection: "row",
	},
});
