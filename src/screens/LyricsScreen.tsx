import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

const LyricsScreen = ({ route, navigation }) => {
    const { song } = route.params; // Recebe a música selecionada

    return (
        <View style={styles.container}>
            <Text style={styles.title}>{song.nome_da_musica}</Text>
            <Text style={styles.artist}>Artista: {song.nome_do_artista}</Text>

            <View style={styles.lyricsContainer}>
                <Text style={styles.lyrics}>{song.letra_da_musica || "Letra não disponível."}</Text>
            </View>

            <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                <Text style={styles.backButtonText}>Voltar</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        textAlign: "center",
        marginBottom: 10,
    },
    artist: {
        fontSize: 18,
        color: "#666",
        textAlign: "center",
        marginBottom: 20,
    },
    lyricsContainer: {
        backgroundColor: "#f8f8f8",
        padding: 15,
        borderRadius: 10,
    },
    lyrics: {
        fontSize: 16,
        textAlign: "center",
        fontStyle: "italic",
    },
    backButton: {
        marginTop: 20,
        backgroundColor: "#007bff",
        padding: 10,
        borderRadius: 5,
        alignItems: "center",
    },
    backButtonText: {
        color: "#fff",
        fontWeight: "bold",
    },
});

export default LyricsScreen;
