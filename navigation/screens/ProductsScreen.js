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
import { Dropdown } from "react-native-element-dropdown";
import Icon from "react-native-vector-icons/Ionicons";
import { Controller, useForm } from "react-hook-form";
import axios from "axios";

import Title from "../../components/Title";
import ProductTable from "../../components/ProductTable";
import ModalItem from "../../components/ModalItem";

const img = require("../../assets/Logo.png");

const url = "http://10.0.0.137:8000/store/";

//categories
const ProductsScreen = () => {
	const {
		control,
		handleSubmit,
		formState: { errors },
	} = useForm({});

	const [products, setProducts] = useState([]);
	const [categories, setCategories] = useState([]);

	const [visible, setVisible] = useState(false);
	const [isFocus, setIsFocus] = useState(false);

	const [photo, setPhoto] = useState(null);

	const pickImage = async () => {
		const options = {
			mediaTypes: "photo",
			includeBase64: true,
		};
		let result = await ImagePicker.launchImageLibraryAsync(options, {
			mediaTypes: ImagePicker.MediaTypeOptions.All,
			allowsEditing: true,
			aspect: [4, 3],
			quality: 1,
		});

		if (!result.canceled) {
			console.log(result);
			setPhoto(result.assets[0].uri);
		}
	};

	const getProducts = async () => {
		fetch(`${url}products/`)
			.then((response) => response.json())
			.then((json) => setProducts(json.results));
	};
	const getCategories = async () => {
		fetch(`${url}categories/`)
			.then((response) => response.json())
			.then((json) => setCategories(json));
	};

	const dataURItoFile = (dataURI, filename) => {
		const arr = dataURI.split(",");
		const mime = arr[0].match(/:(.*?);/)[1];
		const bstr = window.atob(arr[1]);
		let n = bstr.length;
		const u8arr = new Uint8Array(n);
		while (n--) {
			u8arr[n] = bstr.charCodeAt(n);
		}
		return new File([u8arr], filename, { type: mime });
	};

	const createProduct = async (product) => {
		const formData = new FormData();
		const imageFile = dataURItoFile(photo, "image.jpg");
		formData.append("image", imageFile);
		formData.append("name", product.name);
		formData.append("description", product.description);
		formData.append("price", product.price);
		formData.append("cost", product.cost);
		formData.append("category_id", product.category.id);

		try {
			await axios
				.post(`${url}products/`, formData)
				.then(() => getProducts())
				.then(() => setVisible(false));
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		getProducts();
		getCategories();
	}, []);

	return (
		<ImageBackground source={img} resizeMode="center" style={styles.container}>
			<Title title="Produtos" />
			<Text style={styles.detail}>Produtos cadastrados no sistema</Text>
			<ProductTable products={products} url={url} handleTable={getProducts}/>
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
							<Controller
								control={control}
								name="name"
								render={({ field: { onChange, onBlur, value } }) => (
									<TextInput
										style={styles.modalInput}
										placeholder="Nome"
										onChange={onChange}
										onBlur={onBlur}
										value={value}
									/>
								)}
							/>

							<Controller
								control={control}
								name="description"
								render={({ field: { onChange, onBlur, value } }) => (
									<TextInput
										style={styles.modalInput}
										placeholder="Descrição"
										onChange={onChange}
										onBlur={onBlur}
										value={value}
									/>
								)}
							/>
							<Controller
								control={control}
								name="price"
								render={({ field: { onChange, onBlur, value } }) => (
									<TextInput
										style={styles.modalInput}
										inputMode="decimal"
										placeholder="Preço"
										onChange={onChange}
										onBlur={onBlur}
										value={value}
									/>
								)}
							/>
							<Controller
								control={control}
								name="cost"
								render={({ field: { onChange, onBlur, value } }) => (
									<TextInput
										style={styles.modalInput}
										placeholder="Custo"
										inputMode="decimal"
										onChange={onChange}
										onBlur={onBlur}
										value={value}
									/>
								)}
							/>
							<Controller
								control={control}
								name="category"
								render={({ field: { onChange, value } }) => (
									<Dropdown
										style={[styles.modalInput, { paddingVertical: 3 }]}
										data={categories}
										labelField="name"
										valueField="id"
										placeholder={!isFocus ? "Selecione uma categoria" : "..."}
										onChange={onChange}
										onFocus={() => setIsFocus(true)}
										onBlur={() => setIsFocus(false)}
										value={value}
									/>
								)}
							/>
						</View>
						<View
							style={{
								flex: 1,
								paddingHorizontal: 10,
								alignItems: "flex-end",
							}}
						>
							{(photo && (
								<Image
									source={{ uri: photo }}
									style={{ width: 200, height: 200 }}
								/>
							)) || (
								<View style={{ alignItems: "center", width: "100%" }}>
									<Icon name="image" size={150} color="#cccccc" />
								</View>
							)}
							<Pressable
								onPress={pickImage}
								style={[styles.button, { width: "100%" }]}
							>
								<Text style={styles.buttonText}>Adicionar uma Imagem</Text>
								<Icon name="image" size={24} color="white" />
							</Pressable>
							<Pressable
								style={[
									styles.button,
									{ width: "100%", justifyContent: "center" },
								]}
								onPress={handleSubmit(createProduct)}
							>
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
