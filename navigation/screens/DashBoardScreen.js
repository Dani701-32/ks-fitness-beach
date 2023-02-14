import React from "react";
import {
	ImageBackground,
	Pressable,
	StyleSheet,
	Text,
	View,
} from "react-native";
import { LineChart } from "react-native-chart-kit";
import Title from "../../components/Title";

const img = require("../../assets/Logo.png");

const lastSales = [
	{
		id: 1,
		transaction: "Teste",
		date: "12/10/2023 12:35",
		price: 50.15,
		proft: 13.32,
		products: ["Blusa", "Bermuda"],
		status: "Em progresso",
	},
	{
		id: 2,
		transaction: "Teste 2",
		date: "12/10/2023 12:35",
		price: 50.15,
		proft: 13.32,
		products: ["Blusa"],
		status: "Cancelado",
	},
	{
		id: 3,
		transaction: "Teste 3",
		date: "12/10/2023 12:35",
		price: 50.15,
		proft: 13.32,
		products: ["Blusa"],
		status: "Concluído",
	},
	{
		id: 4,
		transaction: "Teste 4",
		date: "12/10/2023 12:35",
		price: 50.15,
		proft: 13.32,
		products: ["Blusa"],
		status: "Concluído",
	},
];

const DashBoardScreen = () => {
	return (
		<ImageBackground source={img} resizeMode="center" style={styles.container}>
			<Title title={"Faturamento"} />
			<LineChart
				data={{
					labels: ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho"],
					datasets: [
						{
							data: [
								Math.random() * 30,
								Math.random() * 30,
								Math.random() * 30,
								Math.random() * 30,
								Math.random() * 30,
								Math.random() * 30,
							],
						},
					],
				}}
				width={1040} // from react-native
				height={300}
				yAxisLabel="R$"
				yAxisSuffix="k"
				yAxisInterval={1} // optional, defaults to 1
				chartConfig={{
					backgroundGradientFrom: "rgba(68, 163, 155, 1)",
					backgroundGradientTo: "rgba(68, 163, 155, 1)",
					decimalPlaces: 2, // optional, defaults to 2dp
					color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
					labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
					style: {
						borderRadius: 36,
					},
					propsForDots: {
						r: "8",
						strokeWidth: "3",
						stroke: "#44A39B",
					},
				}}
				bezier
				style={{
					marginVertical: 20,
					borderRadius: 16,
				}}
			/>
			<View>
				<Title title={"Vendas"} />
				<Text style={styles.detail}>Listagem das vendas recentes</Text>
				<View style={styles.table}>
					<View style={styles.tableHeader}>
						<Text style={styles.tableHeaderItem}>Transação</Text>
						<Text style={styles.tableHeaderItem}>Data & Hora</Text>
						<Text style={styles.tableHeaderItem}>Valor (R$)</Text>
						<Text style={styles.tableHeaderItem}>Lucro (R$)</Text>
						<Text style={styles.tableHeaderItem.major}>Produtos</Text>
						<Text style={styles.tableHeaderItem}>Status</Text>
					</View>

					{lastSales.map((sale) => {
						return (
							<Pressable key={sale.id} style={styles.tableBody}>
								<Text style={styles.tableHeaderItem}>
									Pagamento por {sale.transaction}
								</Text>
								<Text style={styles.tableHeaderItem}>{sale.date}</Text>
								<Text style={styles.tableHeaderItem}>{sale.price}</Text>
								<Text style={styles.tableHeaderItem}>{sale.proft}</Text>
								<Text style={styles.tableHeaderItem.major}>
									{sale.products.toString()}
								</Text>
								<Text style={styles.tableHeaderItem}>{sale.status}</Text>
							</Pressable>
						);
					})}
				</View>
			</View>
		</ImageBackground>
	);
};

export default DashBoardScreen;

const styles = StyleSheet.create({
	table: {
		overflow: "hidden",
		borderRadius: 20,
	},
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
		paddingHorizontal: 8,
		fontWeight: 200,
		major: {
			flex: 2,
			fontSize: 12,
			fontWeight: 200,
		},
	},
});
