import { StatusBar, View } from "react-native";
import MainContainer from "./navigation/MainContainer";

export default function App() {
	return (
		<>
			<MainContainer />
			<StatusBar hidden={true} />
		</>
	);
}
