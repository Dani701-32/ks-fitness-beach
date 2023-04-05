import axios from "axios";
import React, { useState } from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";

import Icon from "react-native-vector-icons/Ionicons";

import Title from "./Title";
import Table from "./table/Table";
import ModalItem from "./ModalItem";
import TextTable from "./table/TextTable";

const ProductTable = ({ products, url, handleTable, handleEdit }) => {
	const [selected, setSelected] = useState(false);
	const [product, setProduct] = useState();
	const [profit, setProfit] = useState("");

	const getProfit = (product) => {
		let balance = (
			Math.round((product.price - product.cost) * 100) / 100
		).toFixed(2);
		if (balance >= 0) {
			setProfit(`R$ ${balance}`);
		} else {
			let correction = balance * -1;
			setProfit(`-R$ ${Math.round(correction).toFixed(2)}`);
		}
	};
	const truncate = (text, length) => {
		return text.length > length ? text.substring(0, length) + "..." : text;
	};
	const viewProduct = async (product_id) => {
		setSelected(true);
		fetch(`${url}products/${product_id}/`)
			.then((response) => response.json())
			.then((json) => setProduct(json));
	};
	const deleteProduct = async (product_id) => {
		await axios
			.delete(`${url}products/${product_id}/`)
			.then(() => setSelected(false))
			.then(() => handleTable());
	};
	const editProductForm = () => {
		setSelected(false);
		handleEdit(product);
	};
	return (
		<>
			<Table header={["Nome", "Descrição", "Preço", "Custo", "Categoria"]}>
				{products?.map((product) => {
					return (
						<Pressable
							key={product.id}
							style={styles.tableBody}
							onPress={() => {
								viewProduct(product.id);
								getProfit(product);
							}}
						>
							<TextTable text={product.name} />
							<TextTable text={truncate(product.description, 50)} />
							<TextTable text={`R$ ${product.price}`} />
							<TextTable text={`-R$ ${product.cost}`} />
							<TextTable text={product.category.name} />
						</Pressable>
					);
				})}
			</Table>
			<ModalItem visible={selected}>
				<View style={{ alignItems: "center" }}>
					{product && (
						<>
							<View style={styles.modalHeader}>
								<Title title={`${product.category.name} - ${product.name}`} />
								<Pressable onPress={() => setSelected(false)}>
									<Icon name="close-sharp" size={24} color="black" />
								</Pressable>
							</View>
							<View style={styles.modalContainer}>
								<View style={{ flex: 2, paddingHorizontal: 10 }}>
									<Text style={styles.modalDescription}>
										{product.description}
									</Text>
									<Table header={["Preço", "Custo", "Balanço"]}>
										<View style={styles.tableBody}>
											<TextTable text={`R$ ${product.price}`} />
											<TextTable text={`R$ ${product.cost}`} />
											<TextTable text={profit} />
										</View>
									</Table>
									<View style={{ marginTop: 12 }}>
										<Table header={["Tamanho", "Estoque"]}>
											{product.stocks?.map((stock) => {
												return (
													<View style={styles.tableBody} key={stock.id}>
														<TextTable text={stock.size} />
														<TextTable text={`${stock.quantity} unidades`} />
													</View>
												);
											})}
										</Table>
									</View>
									<View style={styles.modalButtonContainer}>
										<Pressable
											style={styles.modalButton}
											onPress={() => editProductForm()}
										>
											<Icon name="pencil-outline" size={18} color="#fff" />
											<Text style={{ color: "#FFFFFF", fontWeight: "bold" }}>
												Editar
											</Text>
										</Pressable>
										<Pressable
											style={[
												styles.modalButton,
												{ backgroundColor: "#DF6060" },
											]}
											onPress={() => deleteProduct(product.id)}
										>
											<Icon name="trash-outline" size={18} color="#fff" />
											<Text style={{ color: "#FFFFFF", fontWeight: "bold" }}>
												Excluir
											</Text>
										</Pressable>
									</View>
								</View>
								<View
									style={{
										flex: 1,
										paddingHorizontal: 10,
										alignItems: "center",
										borderRadius: 30,
									}}
								>
									<Image
										source={product.image}
										style={{ width: 300, height: 300, borderRadius: 12 }}
									/>
								</View>
							</View>
						</>
					)}
				</View>
			</ModalItem>
		</>
	);
};

export default ProductTable;

const styles = StyleSheet.create({
	tableBody: {
		display: "flex",
		flexDirection: "row",
		paddingVertical: 16,
		borderBottomWidth: 2,
		borderBottomColor: "#cccccc",
		backgroundColor: "rgba(235,235,235,0.85)",
	},
	modalHeader: {
		flexDirection: "row",
		width: "100%",
		height: 40,
		alignItems: "center",
		justifyContent: "space-between",
		paddingLeft: 11,
		paddingRight: 22,
	},
	modalContainer: {
		width: "100%",
		display: "flex",
		flexDirection: "row",
	},
	modalDescription: {
		fontSize: 17,
		marginBottom: 20,
	},
	modalButtonContainer: {
		display: "flex",
		flexDirection: "row",
		gap: 5,
		marginTop: 15,
	},
	modalButton: {
		flex: 1,
		display: "flex",
		flexDirection: "row",
		padding: 5,
		borderRadius: 5,
		backgroundColor: "#44A39B",
		alignItems: "end",
	},
});
