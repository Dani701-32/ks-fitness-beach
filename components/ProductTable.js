import axios from "axios";
import React, { useState } from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

import ModalItem from "./ModalItem";
import Title from "./Title";

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
	const editProductForm = () =>{
		setSelected(false);
		handleEdit(product);
	}

	return (
		<View style={styles.table}>
			<View style={styles.tableHeader}>
				<Text style={styles.tableHeaderItem}>Nome</Text>
				<Text style={styles.tableHeaderItem.major}>Descrição</Text>
				<Text style={styles.tableHeaderItem}>Preço</Text>
				<Text style={styles.tableHeaderItem}>Custo</Text>
				<Text style={styles.tableHeaderItem}>Categoria</Text>
			</View>
			<View>
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
							<Text style={styles.tableHeaderItem}>{product.name}</Text>
							<Text style={styles.tableHeaderItem.major}>
								{truncate(product.description, 50)}
							</Text>
							<Text style={styles.tableHeaderItem}>R$ {product.price}</Text>
							<Text style={styles.tableHeaderItem}>-R$ {product.cost}</Text>
							<Text style={styles.tableHeaderItem}>
								{product.category.name}
							</Text>
						</Pressable>
					);
				})}
			</View>
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
										<View style={styles.table}>
											<View style={styles.tableHeader}>
												<Text style={styles.tableHeaderItem}>Preço</Text>
												<Text style={styles.tableHeaderItem}>Custo</Text>
												<Text style={styles.tableHeaderItem}>Balanço</Text>
											</View>
											<View style={styles.tableBody}>
												<Text style={styles.tableHeaderItem}>
													R$ {product.price}
												</Text>
												<Text style={styles.tableHeaderItem}>
													R$ {product.cost}
												</Text>
												<Text style={styles.tableHeaderItem}>{profit}</Text>
											</View>
										</View>
										<View
											style={{
												display: "flex",
												flexDirection: "row",
												gap: 5,
												marginTop: 15,
											}}
										>
											<Pressable style={styles.modalButton} onPress={()=> editProductForm()}>
												<Icon name="create-outline" size={18} color="#fff" />
												<Text style={{ color: "#FFFFFF", fontWeight: "bold" }}>
													Editar
												</Text>
											</Pressable>
											<Pressable
												style={[styles.modalButton, {backgroundColor: '#DF6060'}]}
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
											style={{ width: 200, height: 200, borderRadius: 12 }}
										/>
									</View>
								</View>
							</>
						)}
					
				</View>
			</ModalItem>
		</View>
	);
};

export default ProductTable;

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
	tableBody: {
		display: "flex",
		flexDirection: "row",
		paddingVertical: 16,
		borderBottomWidth: 2,
		borderBottomColor: "#cccccc",
		backgroundColor: "rgba(235,235,235,0.85)",
	},
	tableHeaderItem: {
		flex: 1,
		fontSize: 12,
		alignSelf: "center",
		fontWeight: "200",
		paddingHorizontal: 8,
		major: {
			flex: 2,
			fontSize: 12,
			fontWeight: 200,
		},
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
