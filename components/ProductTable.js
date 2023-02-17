import React, { useState } from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

import ModalItem from "./ModalItem";
import Title from "./Title";

const ProductTable = ({ products, url }) => {
	const [selected, setSelected] = useState(false);
	const [product, setProduct] = useState();

	const viewProduct = (product) => {
		setSelected(true);
		fetch(`${url}products/${product}`)
			.then((response) => response.json())
			.then((json) => setProduct(json));
	};
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
							}}
						>
							<Text style={styles.tableHeaderItem}>{product.name}</Text>
							<Text style={styles.tableHeaderItem.major}>
								{product.description}
							</Text>
							<Text style={styles.tableHeaderItem}>R$ {product.price}</Text>
							<Text style={styles.tableHeaderItem}>{product.cost}</Text>
							<Text style={styles.tableHeaderItem}>
								{product.category.name}
							</Text>
						</Pressable>
					);
				})}
			</View>
			<ModalItem visible={selected}>
				<View style={{ alignItems: "center" }}>
					<View style={styles.modalHeader}>
						<Pressable onPress={() => setSelected(false)}>
							<Icon name="close-sharp" size={24} color="black" />
						</Pressable>
					</View>
					{product && (
						<View style={styles.modalContainer}>
							<View style={{ flex: 2, paddingHorizontal: 10 }}>
								<Title title={product.name} />
								{/* <Text>{}</Text> */}
								<Text>{product.price}</Text>
								<Text>{product.cost}</Text>
								<Text>{product.category.name}</Text>
							</View>
							<View
								style={{
									flex: 1,
									paddingHorizontal: 10,
									alignItems: "flex-end",
								}}
							>
								<Image
									source={product.image}
									style={{ width: 200, height: 200 }}
								/>
							</View>
						</View>
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
		width: "100%",
		height: 40,
		alignItems: "flex-end",
		justifyContent: "center",
	},
	modalContainer: {
		width: "100%",
		display: "flex",
		flexDirection: "row",
	},
});
