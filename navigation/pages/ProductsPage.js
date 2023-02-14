import React, { useEffect, useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

import Title from "../../components/Title";

const ProductsPage = () => {
	let [products, setProducts] = useState([]);

	const getProducts = async () => {
		fetch("https://dummyjson.com/products?limit=7")
			.then((response) => response.json())
			.then((json) => setProducts(json.products));
	};
	useEffect(() => {
		getProducts();
	}, []);

	return (
		<View>
			<Title title="Produtos" />
			<Text style={styles.detail}>Produtos cadastrados no sistema</Text>
			<View style={styles.table}>
				<View style={styles.tableHeader}>
					<Text style={styles.tableHeaderItem}>Nome</Text>
					<Text style={styles.tableHeaderItem.major}>Descrição</Text>
					<Text style={styles.tableHeaderItem}>Preço</Text>
					<Text style={styles.tableHeaderItem}>Categoria</Text>
					<Text style={styles.tableHeaderItem}>Marca</Text>
					<Text style={styles.tableHeaderItem}>Estoque</Text>
				</View>
				<View>
					{products?.map((product) => {
						return (
							<Pressable key={product.id} style={styles.tableBody}>
								<Text style={styles.tableHeaderItem}>{product.title}</Text>
								<Text style={styles.tableHeaderItem.major}>
									{product.description}
								</Text>
								<Text style={styles.tableHeaderItem}>R$ {product.price}</Text>
								<Text style={styles.tableHeaderItem}>{product.category}</Text>
								<Text style={styles.tableHeaderItem}>{product.brand}</Text>
								<Text style={styles.tableHeaderItem}>{product.stock}</Text>
							</Pressable>
						);
					})}
				</View>
			</View>
			<View>
				<Pressable style={styles.button}>
					<Text style={{ alignSelf: "center", color: "#ffffff", fontWeight: "bold" }}>
						Adicionar Novo
					</Text>
					<Icon name="add" size={24} color="#fff" />
				</Pressable>
			</View>
		</View>
	);
};

export default ProductsPage;

const styles = StyleSheet.create({
	detail: {
		marginBottom: 15,
		fontSize: 14,
		color: "rgb(132, 132, 132)",
	},
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
	button: {
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
