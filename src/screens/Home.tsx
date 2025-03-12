import { useNavigation } from "@react-navigation/native";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

const Home = () => {
    const navigation = useNavigation();

    const handleSearch = () => {
        navigation.navigate("Search");
    };

    const handleGoToPlaylists = () => {
        navigation.navigate("Playlist");
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Bem-vindo ao MusicApp</Text>

            <TouchableOpacity style={styles.button} onPress={handleSearch}>
                <Text style={styles.buttonText}>Buscar Música</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.button} onPress={handleGoToPlaylists}>
                <Text style={styles.buttonText}>Minhas Playlists</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        padding: 20,
        gap: 20,
        alignItems: "center",
        justifyContent: "center",
    },
    title: {
        fontSize: 22,
        fontWeight: "bold",
        marginBottom: 20,
    },
    subtitle: {
        fontSize: 18,
        fontWeight: "bold",
        marginTop: 20,
    },
    button: {
        width: 180,
        height: 40,
        backgroundColor: "blue",
        borderRadius: 20,
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 10,
    },
    buttonText: {
        color: "white",
        fontSize: 16,
        fontWeight: "bold",
    },
});

export default Home;
 