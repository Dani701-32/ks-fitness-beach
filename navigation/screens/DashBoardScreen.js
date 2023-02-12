import React from "react";
import {
	Dimensions,
	ImageBackground,
	StyleSheet,
	Text,
	View,
} from "react-native";
import {
	LineChart,
	BarChart,
	PieChart,
	ProgressChart,
	ContributionGraph,
	StackedBarChart,
} from "react-native-chart-kit";

const img = require("../../assets/Logo.png");
const data = [
	{ month: "Janeiro", profit: Math.random() * 30 },
	{ month: "Fevereiro", profit: Math.random() * 30 },
	{ month: "Março", profit: Math.random() * 30 },
	{ month: "Abril", profit: Math.random() * 30 },
	{ month: "Maio", profit: Math.random() * 30 },
	{ month: "Junho", profit: Math.random() * 30 },
];

const DashBoardScreen = () => {
	return (
		<ImageBackground source={img} resizeMode="center" style={styles.container}>
			<Text style={styles.title}>Faturamento</Text>
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
				width={Dimensions.get("window").width - 40} // from react-native
				height={330}
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
		</ImageBackground>
	);
};

export default DashBoardScreen;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 20,
	},
	title: {
		fontSize: 30,
		fontweight: "bolder",
		color: "#44A39B",
	},
});
