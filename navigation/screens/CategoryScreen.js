import React, { useEffect, useState } from "react";
import { Pressable } from "react-native";
import { ImageBackground, StyleSheet, Text, View } from "react-native";
import ModalItem from "../../components/ModalItem";
import Title from "../../components/Title";

import Icon from "react-native-vector-icons/Ionicons";
import { useForm } from "react-hook-form";
import CustomInput from "../../components/CustomInput";
import axios from "axios";

const img = require("../../assets/Logo.png");
const url = "http://andeen171.pythonanywhere.com/store/";

const CategoryScreen = () => {
	const {
		control,
		handleSubmit,
		reset,
		setValue,
		formState: {},
	} = useForm({
		defaultValues: {
			name: "",
		},
	});

	const [categories, setCategories] = useState(null);
	const [category, setCategory] = useState(null);
	const [edit, setEdit] = useState(null);
	const [visible, setVisible] = useState(false);

	const getCategories = async () => {
		fetch(`${url}categories/`)
			.then((response) => response.json())
			.then((json) => setCategories(json));
	};
	const createCategory = async (new_category) => {
		console.log(new_category);
		await axios
			.post(`${url}/categories/`, { name: new_category.name })
			.then(() => getCategories())
			.then(() => closeModal());
	};
	const editCategory = async (edit_category) => {
		console.log(edit_category);
		await axios
			.put(`${url}/categories/${edit}/`, { name: edit_category.name })
			.then(() => getCategories())
			.then(() => closeModal());
	};
	const getCategory = async (category_id) => {
		fetch(`${url}/categories/${category_id}`)
			.then((response) => response.json())
			.then((json) => editModal(json));
	};
	const editModal = (category) => {
		setVisible(true);
		setValue("name", category.name);
		setEdit(category.id);
	};
	const deleteCategory = async (category_id) => {
		axios
			.delete(`${url}/categories/${category_id}/`)
			.then(() => getCategories());
	};
	const closeModal = () => {
		setVisible(false);
		reset();
	};

	useEffect(() => {
		getCategories();
	}, []);
	return (
		<ImageBackground source={img} resizeMode="center" style={styles.container}>
			<Title title="Categorias" />
			<Text style={styles.detail}>Categorias cadastradas no sistema</Text>
			<View styles={styles.table}>
				<View style={styles.tableHeader}>
					<Text style={styles.tableHeaderItem}>ID</Text>
					<Text style={styles.tableHeaderItem.major}>Nome</Text>
					<Text style={styles.tableHeaderItem}>Ações</Text>
				</View>
				<View>
					{categories?.map((category) => {
						return (
							<View key={category.id} style={styles.tableBody}>
								<Text style={styles.tableHeaderItem}>{category.id}</Text>
								<Text style={styles.tableHeaderItem.major}>
									{category.name}
								</Text>
								<View style={styles.tableHeaderItem.button}>
									<Pressable onPress={() => getCategory(category.id)}>
										<Text>Editar</Text>
									</Pressable>
									<Pressable onPress={() => deleteCategory(category.id)}>
										<Text>Excluir</Text>
									</Pressable>
								</View>
							</View>
						);
					})}
				</View>
				<Pressable onPress={() => setVisible(true)}>
					<Text>Adicionar</Text>
				</Pressable>

				<ModalItem visible={visible}>
					<View>
						<Pressable onPress={() => closeModal()}>
							<Icon name="close-sharp" size={24} color="black" />
						</Pressable>
					</View>
					<View>
						{edit && <Text>ID: {edit}</Text>}
						<CustomInput
							control={control}
							name="name"
							rules={{ require: "Nome da categoria é obrigatório" }}
							placeholder="Nome"
							maxLength={20}
							inputMode="text"
						/>
						<Pressable
							style={[
								styles.button,
								{ width: "100%", justifyContent: "center" },
							]}
							onPress={handleSubmit(edit ? editCategory : createCategory)}
						>
							<Text style={styles.buttonText}>
								{!edit ? "Salvar" : `Editar`}
							</Text>
							<Icon name="save" size={18} color="#fff" />
						</Pressable>
					</View>
				</ModalItem>
			</View>
		</ImageBackground>
	);
};

export default CategoryScreen;

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
		button: {
			flex: 1,
			display: "flex",
			flexDirection: "row",
			gap: 10,
		},
	},
});
