import React from "react";
import { Controller } from "react-hook-form";
import { View, TextInput, StyleSheet, Text } from "react-native";

const CustomInput = ({
	control,
	name,
	rules = {},
	placeholder,
	maxLength,
	secureTextEntry,
	inputMode,
}) => {
	return (
		<Controller
			control={control}
			name={name}
			rules={rules}
			render={({
				field: { value, onChange, onBlur },
				fieldState: { error },
			}) => (
				<>
					{error && (
						<Text style={{ color: "red", alignSelf: "stretch" }}>
							{error.message || "Error"}
						</Text>
					)}
					<View
						style={[
							styles.container,
							{ borderColor: error ? "red" : "#e8e8e8" },
						]}
					>
						<TextInput
							value={value}
							onChangeText={onChange}
							inputMode={inputMode}
							onBlur={onBlur}
							placeholder={placeholder}
							style={styles.input}
							maxLength={maxLength}
							secureTextEntry={secureTextEntry}
						/>
					</View>
				</>
			)}
		/>
	);
};

export default CustomInput;

const styles = StyleSheet.create({
	container: {
		backgroundColor: "white",
		width: "100%",
		borderColor: "#e8e8e8",
		borderWidth: 2,
		borderRadius: 14,
		marginBottom: 20,
	},
	input: {
		paddingVertical: 12,
		paddingHorizontal: 6,
		borderRadius: 14,
	},
});
