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
import * as ImagePicker from "expo-image-picker";
import Icon from "react-native-vector-icons/Ionicons";

import Title from "../../components/Title";
import ProductTable from "../../components/ProductTable";
import ModalItem from "../../components/ModalItem";

const img = require("../../assets/Logo.png");

const url = "http://10.0.0.122:8000/store/products/";

const ProductsScreen = () => {
	const [products, setProducts] = useState([]);
	const [photo, setPhoto] = useState(null);
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

	const createProduct = async (product) => {
		console.log(product);
		// let form_data = new FormData();
		// for (let key in product) {
		// 	form_data.append(key, product[key]);
		// }
		// fetch(url, {
		// 	method: "POST",
		// 	body: form_data,
		// });
	};

	useEffect(() => {
		getProducts();
	}, []);

	return (
		<ImageBackground source={img} resizeMode="center" style={styles.container}>
			<Title title="Produtos" />
			<Text style={styles.detail}>Produtos cadastrados no sistema</Text>
			<ProductTable products={products} url={url} />
			<View>
				<Pressable style={styles.button} onPress={() => setVisible(true)}>
					<Text style={styles.buttonText}>Adicionar Novo</Text>
					<Icon name="add" size={18} color="#fff" />
				</Pressable>
			</View>

			<ModalItem visible={visible}>
				<View>
					<View style={styles.modalHeader}>
						<Pressable onPress={() => setVisible(false)}>
							<Icon name="close-sharp" size={24} color="black" />
						</Pressable>
					</View>
					<View style={styles.modalInputContainer}>
						<View style={{ flex: 2, paddingHorizontal: 10 }}>
							<TextInput style={styles.modalInput} placeholder="Nome" />
							<TextInput style={styles.modalInput} placeholder="Descrição" />
							<TextInput style={styles.modalInput} placeholder="Preço" />
							<TextInput style={styles.modalInput} placeholder="Custo" />
							<TextInput style={styles.modalInput} placeholder="Categoria" />
						</View>
						<View style={{ flex: 1, paddingHorizontal: 10 }}>
							{(photo && (
								<Image
									source={{ uri: photo }}
									style={{ width: 200, height: 200 }}
								/>
							)) || (
								<View style={{ alignItems: "center" }}>
									<Icon name="image" size={150} color="balck" />
								</View>
							)}
							<Pressable onPress={pickImage} style={styles.button}>
								<Text style={styles.buttonText}>Adicionar uma Imagem</Text>
								<Icon name="image" size={24} color="white" />
							</Pressable>
							<Pressable style={styles.button} onPress={() => {}}>
								<Text style={styles.buttonText}>Salvar</Text>
								<Icon name="save" size={18} color="#fff" />
							</Pressable>
						</View>
					</View>
				</View>
			</ModalItem>
		</ImageBackground>
	);
};

export default ProductsScreen;

export const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 20,
	},
	detail: {
		marginBottom: 15,
		fontSize: 14,
		color: "rgb(132, 132, 132)",
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
	buttonText: {
		alignSelf: "center",
		color: "#ffffff",
		fontWeight: "bold",
		marginRight: 12,
	},
	modalHeader: {
		width: "100%",
		height: 40,
		alignItems: "flex-end",
		justifyContent: "center",
	},
	modalInputContainer: {
		width: "100%",
		display: "flex",
		flexDirection: "row",
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
