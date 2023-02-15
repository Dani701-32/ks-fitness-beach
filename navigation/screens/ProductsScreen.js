import React, { useEffect, useState } from "react";
import {
	ImageBackground,
	Pressable,
	StyleSheet,
	Text,
	TextInput,
	View,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { Modal } from "react-native-web";
import Title from "../../components/Title";

const img = require("../../assets/Logo.png");
// const url = "https://dummyjson.com/products?limit=8";
const url = "http://10.0.0.122:8000/store/products/";

const ModalAdd = ({ visible, children }) => {
	const [showModal, setVisible] = useState(false);

	const toggleModal = () => {
		return visible ? setVisible(true) : setVisible(false);
	};

	useEffect(() => {
		toggleModal();
	}, [visible]);

	return (
		<Modal transparent visible={showModal}>
			<View style={styles.modalBackground}>
				<View style={styles.modalContainer}>{children}</View>
			</View>
		</Modal>
	);
};

const ProductsScreen = () => {
	const [products, setProducts] = useState([]);
	const [visible, setVisible] = useState(false);

	const getProducts = async () => {
		fetch(url)
			.then((response) => response.json())
			.then((json) => setProducts(json.results));
	};

	useEffect(() => {
		getProducts();
	}, []);

	return (
		<ImageBackground source={img} resizeMode="center" style={styles.container}>
			<Title title="Produtos" />
			<Text style={styles.detail}>Produtos cadastrados no sistema</Text>
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
							<Pressable key={product.id} style={styles.tableBody}>
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
			</View>
			<View>
				<Pressable style={styles.button} onPress={() => setVisible(true)}>
					<Text
						style={{
							alignSelf: "center",
							color: "#ffffff",
							fontWeight: "bold",
						}}
					>
						Adicionar Novo
					</Text>
					<Icon name="add" size={18} color="#fff" />
				</Pressable>
			</View>
			<ModalAdd visible={visible}>
				<View style={{ alignItems: "center" }}>
					<View style={styles.modalHeader}>
						<Pressable onPress={() => setVisible(false)}>
							<Icon name="close-sharp" size={24} color="black" />
						</Pressable>
					</View>
					<View>
						<TextInput style={styles.modalInput} placeholder="Nome" />
						<TextInput style={styles.modalInput} placeholder="Descrição" />
						<TextInput
							style={styles.modalInput}
							placeholder="Preço"
							inputMode="decimal"
						/>
						<TextInput
							style={styles.modalInput}
							placeholder="Custo"
							inputMode="decimal"
						/>
					</View>
				</View>
			</ModalAdd>
		</ImageBackground>
	);
};

export default ProductsScreen;

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
	modalBackground: {
		flex: 1,
		backgroundColor: "rgba(0, 0, 0, 0.5)",
		justifyContent: "center",
		alignItems: "center",
	},
	modalContainer: {
		width: "70%",
		backgroundColor: "white",
		paddingHorizontal: 20,
		paddingVertical: 30,
		borderRadius: 20,
		elevation: 20,
	},
	modalHeader: {
		width: "100%",
		height: 40,
		alignItems: "flex-end",
		justifyContent: "center",
	},
	modalInput: {
		borderWidth: 2,
		borderColor: "#cccccc",
		paddingVertical: 12,
		paddingHorizontal: 6,
		borderRadius: 15,
		marginBottom: 30,
	},
});
