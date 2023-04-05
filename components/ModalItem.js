import React, { useEffect, useState } from "react";
import { Modal, StyleSheet } from "react-native";
import { View } from "react-native";

const ModalItem = ({ visible, children}) => {
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

export default ModalItem;

const styles = StyleSheet.create({
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
