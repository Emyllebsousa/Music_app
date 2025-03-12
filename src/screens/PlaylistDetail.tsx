import { useEffect, useState } from "react";
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from "react-native";
import { getFromStorage, saveToStorage } from "../service/storage";

const PlaylistDetail = ({ route, navigation }) => {
    const { playlistName } = route.params;
    const [playlist, setPlaylist] = useState(null);

    useEffect(() => {
        loadPlaylist();
    }, []);

    const loadPlaylist = async () => {
        const playlists = await getFromStorage("playlists");
        const selectedPlaylist = playlists.find((p) => p.name === playlistName);
        setPlaylist(selectedPlaylist || null);
    };

    const removeSong = async (songName) => {
        if (!playlist) return;

        const updatedSongs = playlist.songs.filter((song) => song.nome_da_musica !== songName);
        const updatedPlaylists = await getFromStorage("playlists");

        const newPlaylists = updatedPlaylists.map((p) =>
            p.name === playlistName ? { ...p, songs: updatedSongs } : p
        );

        await saveToStorage("playlists", newPlaylists);
        setPlaylist({ ...playlist, songs: updatedSongs });
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Playlist: {playlistName}</Text>

            {playlist && playlist.songs.length > 0 ? (
                <FlatList
                    data={playlist.songs}
                    keyExtractor={(item) => item.nome_da_musica}
                    renderItem={({ item }) => (
                        <TouchableOpacity
                            style={styles.songItem}
                            onPress={() => navigation.navigate("LyricsScreen", { song: item })}
                        >
                            <View>
                                <Text style={styles.songTitle}>{item.nome_da_musica}</Text>
                                <Text style={styles.songArtist}>{item.nome_do_artista}</Text>
                            </View>
                            <TouchableOpacity
                                style={styles.removeButton}
                                onPress={() => removeSong(item.nome_da_musica)}
                            >
                                <Text style={styles.removeButtonText}>X</Text>
                            </TouchableOpacity>
                        </TouchableOpacity>
                    )}
                />
            ) : (
                <Text style={styles.emptyText}>Nenhuma música nesta playlist.</Text>
            )}

            <TouchableOpacity
                style={styles.addButton}
                onPress={() => navigation.navigate("Search", { playlistName })}
            >
                <Text style={styles.addButtonText}>+ Adicionar Música</Text>
            </TouchableOpacity>

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
        fontSize: 22,
        fontWeight: "bold",
        marginBottom: 15,
    },
    emptyText: {
        textAlign: "center",
        fontSize: 16,
        color: "#888",
    },
    songItem: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: "#ddd",
    },
    songTitle: {
        fontSize: 16,
        fontWeight: "bold",
    },
    songArtist: {
        fontSize: 14,
        color: "#666",
    },
    removeButton: {
        backgroundColor: "red",
        padding: 5,
        borderRadius: 5,
    },
    removeButtonText: {
        color: "#fff",
    },
    addButton: {
        marginTop: 20,
        backgroundColor: "#28a745",
        padding: 10,
        borderRadius: 5,
        alignItems: "center",
    },
    addButtonText: {
        color: "#fff",
        fontWeight: "bold",
    },
    backButton: {
        marginTop: 10,
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

export default PlaylistDetail;
