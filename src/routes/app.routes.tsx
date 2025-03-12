import { createStackNavigator } from "@react-navigation/stack";
import Home from "../screens/Home"; // Importe o componente da tela "Home"
import Search from "../screens/Search"
import Playlist from "../screens/Playlist";
import PlaylistDetail from "../screens/PlaylistDetail";
import LyricsScreen from "../screens/LyricsScreen";
const { Navigator, Screen } = createStackNavigator();

export function AppRoutes() {
    return (
        <Navigator initialRouteName="Home">
            <Screen name="Home" component={Home} options={{headerShown: false}} />
            <Screen name="Search" component={Search}  options={{headerShown: false}}/>
            <Screen name="Playlist" component={Playlist}  options={{headerShown: false}}/>
            <Screen name="PlaylistDetail" component={PlaylistDetail}  options={{headerShown: false}}/>
            <Screen name="LyricsScreen" component={LyricsScreen} />
        </Navigator>
    );
}
