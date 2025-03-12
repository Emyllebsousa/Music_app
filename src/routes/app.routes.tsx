import { createStackNavigator } from "@react-navigation/stack";
import Home from "../screens/Home"; // Importe o componente da tela "Home"
import Search from "../screens/Search"
import Playlist from "../screens/Playlist";
const { Navigator, Screen } = createStackNavigator();

export function AppRoutes() {
    return (
        <Navigator initialRouteName="Home">
            <Screen name="Home" component={Home} options={{headerShown: false}} />
            <Screen name="Search" component={Search}  options={{headerShown: false}}/>
            <Screen name="Playlist" component={Playlist}  options={{headerShown: false}}/>
        </Navigator>
    );
}
