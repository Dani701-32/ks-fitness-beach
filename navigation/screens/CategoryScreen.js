import React, { useEffect, useState } from "react";
import { Pressable } from "react-native";
import { ImageBackground, StyleSheet, Text, View } from "react-native";
import ModalItem from "../../components/ModalItem";
import Title from "../../components/Title";

import Icon from "react-native-vector-icons/Ionicons";
import { useForm } from "react-hook-form";
import CustomInput from "../../components/CustomInput";
import axios from "axios";
import Table from "../../components/table/Table";
import TextTable from "../../components/table/TextTable";

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
	const [edit, setEdit] = useState(null);
	const [visible, setVisible] = useState(false);
	const [del, setDelete] = useState(null);

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
		setEdit(category.id);
		setValue("name", category.name);
		setVisible(true);
	};
	const alertDeleteCategory = (category_id) => {
		setDelete(category_id);
		setVisible(true);
	};
	const deleteCategory = async (category_id) => {
		axios
			.delete(`${url}/categories/${category_id}/`)
			.then(() => getCategories())
			.then(() => closeModal());
	};
	const closeModal = () => {
		setDelete(null);
		setVisible(false);
		setEdit(null);
		reset();
	};

	useEffect(() => {
		getCategories();
	}, []);
	return (
		<ImageBackground source={img} resizeMode="center" style={styles.container}>
			<Title title="Categorias" />
			<Text style={styles.detail}>Categorias cadastradas no sistema</Text>
			<Table header={["ID", "Nome", "Ações"]}>
				{categories?.map((category) => {
					return (
						<View key={category.id} style={styles.tableBody}>
							<TextTable text={category.id} />
							<TextTable text={category.name} />
							<View style={styles.tableButton}>
								<Pressable
									onPress={() => getCategory(category.id)}
									style={styles.editButton}
								>
									<Icon name="pencil-outline" size={25} color="#fff" />
									<Text style={styles.textButton}>Editar</Text>
								</Pressable>
								<Pressable
									onPress={() => alertDeleteCategory(category.id)}
									style={styles.deleteButton}
								>
									<Icon name="trash-outline" size={25} color="#fff" />
									<Text style={styles.textButton}>Apagar</Text>
								</Pressable>
							</View>
						</View>
					);
				})}
			</Table>
			<Pressable style={styles.addButton} onPress={() => setVisible(true)}>
				<Text style={[styles.textButton, { marginRight: 12 }]}>
					Adicionar Novo
				</Text>
				<Icon name="add" size={18} color="#fff" />
			</Pressable>
			<ModalItem visible={visible} porcent={60}>
				{del ? (
					<>
						<Text style={styles.deleteTitle}>{`Apagar categoria ${del}?`}</Text>
						<Text style={styles.deleteText}>
							Você em certeza que gostaria de apagar essa categoria? Caso
							deletada todos os produtos que pertencem a essa cetegoria também
							serão apagados! Continuar?
						</Text>
						<View style={styles.deleteButtons}>
							<Pressable
								style={styles.cancelButton}
								onPress={() => closeModal()}
							>
								<Text style={[styles.textButton, { color: "#44A39B" }]}>
									Cancelar
								</Text>
							</Pressable>
							<Pressable
								style={styles.deleteButtonModal}
								onPress={() => deleteCategory(del)}
							>
								<Text style={styles.textButton}>Apagar</Text>
							</Pressable>
						</View>
					</>
				) : (
					<>
						<View style={styles.modalHeader}>
							<Title title={edit ? `Categoria: ${edit}` : "Criar categoria"} />
							<Pressable
								onPress={() => closeModal()}
								style={{ width: "fit-content" }}
							>
								<Icon name="close-sharp" size={24} color="black" />
							</Pressable>
						</View>
						<View>
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
									styles.addButton,
									{ gap: 10, marginTop: 5, paddingHorizontal: 10 },
								]}
								onPress={handleSubmit(edit ? editCategory : createCategory)}
							>
								<Text style={styles.textButton}>
									{!edit ? "Salvar" : `Editar`}
								</Text>
								<Icon name="save" size={20} color="#fff" />
							</Pressable>
						</View>
					</>
				)}
			</ModalItem>
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
	tableBody: {
		display: "flex",
		flexDirection: "row",
		paddingVertical: 10,
		borderBottomWidth: 2,
		borderBottomColor: "#cccccc",
		backgroundColor: "rgba(235,235,235,0.85)",
	},
	tableButton: {
		flex: 1,
		display: "flex",
		flexDirection: "row",
		gap: 20,
		paddingHorizontal: 8,
	},
	editButton: {
		backgroundColor: "#44A39B",
		paddingHorizontal: 5,
		paddingVertical: 3,
		borderRadius: 10,
		display: "flex",
		flexDirection: "row",
		alignItems: "center",
		flex: 1,
	},
	deleteButton: {
		backgroundColor: "#DF6060",
		paddingHorizontal: 5,
		paddingVertical: 3,
		borderRadius: 10,
		display: "flex",
		flexDirection: "row",
		alignItems: "center",
		flex: 1,
	},
	textButton: {
		color: "#FFFF",
		fontWeight: "700",
		width: "100%",
		textAlign: "center",
	},
	addButton: {
		width: "fit-content",
		backgroundColor: "#44a39b",
		marginTop: 20,
		paddingVertical: 10,
		paddingHorizontal: 8,
		borderRadius: 14,
		display: "flex",
		flexDirection: "row",
	},
	modalHeader: {
		display: "flex",
		width: "100%",
		flexDirection: "row",
		justifyContent: "space-between",
	},
	deleteTitle: {
		fontSize: 27,
		fontWeight: "bold",
		color: "#f44336",
		marginBottom: 10,
		textAlign: "center",
	},
	deleteText: {
		color: "#67150f",
		fontSize: 18,
		marginBottom: 50,
		paddingHorizontal: 3,
		textAlign: "center",
	},
	deleteButtons: {
		display: "flex",
		flexDirection: "row",
		justifyContent: "space-between",
		gap: 20,
	},
	deleteButtonModal: {
		backgroundColor: "#DF6060",
		paddingVertical: 10,
		borderRadius: 10,
		display: "flex",
		flexDirection: "row",
		alignItems: "center",
		flex: 1,
	},
	cancelButton: {
		paddingVertical: 10,
		borderRadius: 10,
		display: "flex",
		flexDirection: "row",
		alignItems: "center",
		flex: 1,
		borderWidth: 3,
		borderColor: "#44a39b",
	},
});
