import React, { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import ModalItem from "./ModalItem";

import Icon from "react-native-vector-icons/Ionicons";

const ProductTable = ({ products, url }) => {
	const [selected, setSelected] = useState(false);

	const viewProduct = (product) => {
		setSelected(true);
		fetch(`${url}${product}`)
			.then((response) => response.json())
			.then((json) => setSelected(json));
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
					{selected && (
						<View styles={styles.modalInputContainer}>
							<Image
								source={selected.image}
								style={{ width: 50, height: 50 }}
							/>
							<Text>{selected.name}</Text>
							<Text>{selected.price}</Text>
							<Text>{selected.cost}</Text>
							<Text>{selected.category.name}</Text>
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
});
