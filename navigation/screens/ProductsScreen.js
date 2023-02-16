import React, { useEffect, useState } from "react";
import {
	Image,
	ImageBackground,
	Pressable,
	StyleSheet,
	Text,
	TextInput,
	View,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { Modal } from "react-native-web";
import * as ImagePicker from "expo-image-picker";
import Title from "../../components/Title";

const img = require("../../assets/Logo.png");
// const url = "https://dummyjson.com/products?limit=8";
const url = "http://10.0.0.122:8000/store/products/";

const ModalItem = ({ visible, children }) => {
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
	const [selectedProduct, setSelectedProduct] = useState();
	const [photo, setPhoto] = useState(null);

	const [selected, setSelected] = useState(false);
	const [visible, setVisible] = useState(false);

	const pickImage = async () => {
		let result = await ImagePicker.launchImageLibraryAsync({
			mediaTypes: ImagePicker.MediaTypeOptions.All,
			allowsEditing: true,
			aspect: [4, 3],
			quality: 1,
		});
		console.log(result);
		if (!result.canceled) {
			setPhoto(result.assets[0].uri);
		}
	};

	const getProducts = async () => {
		fetch(url)
			.then((response) => response.json())
			.then((json) => setProducts(json.results));
	};

	const viewProduct = (product) => {
		setSelected(true);
		fetch(`${url}${product}`)
			.then((response) => response.json())
			.then((json) => setSelectedProduct(json));
	};

	const createProduct = async (product) => {
		console.log(product);
		let form_data = new FormData();

		for (let key in product) {
			form_data.append(key, product[key]);
		}

		fetch(url, {
			method: "POST",
			body: form_data,
		});
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
			<ModalItem visible={selected}>
				<View style={{ alignItems: "center" }}>
					<View style={styles.modalHeader}>
						<Pressable onPress={() => setSelected(false)}>
							<Icon name="close-sharp" size={24} color="black" />
						</Pressable>
					</View>
					{selectedProduct && (
						<View styles={styles.modalInputContainer}>
							<Image
								source={selectedProduct.image}
								style={{ width: 50, height: 50 }}
							/>
							<Text>{selectedProduct.name}</Text>
							<Text>{selectedProduct.price}</Text>
							<Text>{selectedProduct.cost}</Text>
							<Text>{selectedProduct.category.name}</Text>
						</View>
					)}
				</View>
			</ModalItem>

			{/* Adicionar Produto */}
			<ModalItem visible={visible}>
				<View style={{ alignItems: "center" }}>
					<View style={styles.modalHeader}>
						<Pressable onPress={() => setVisible(false)}>
							<Icon name="close-sharp" size={24} color="black" />
						</Pressable>
					</View>
					<View styles={styles.modalInputContainer}>
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
						<Pressable onPress={pickImage}>
							<Text>Adicionar uma Imagem</Text>
						</Pressable>
						{photo && (
							<Image
								source={{ uri: photo }}
								style={{ width: 200, height: 200 }}
							/>
						)}
						<Pressable style={styles.button} onPress={()=>{}}>
							<Text
								style={{
									alignSelf: "center",
									color: "#ffffff",
									fontWeight: "bold",
									marginRight: 12,
								}}
							>
								Salvar
							</Text>
							<Icon name="save" size={18} color="#fff" />
						</Pressable>
					</View>
				</View>
			</ModalItem>
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
	modalInputContainer: {
		width: 500,
	},
	modalInput: {
		witdh: 300,
		borderWidth: 2,
		borderColor: "#cccccc",
		paddingVertical: 12,
		paddingHorizontal: 6,
		borderRadius: 15,
		marginBottom: 30,
	},
});
