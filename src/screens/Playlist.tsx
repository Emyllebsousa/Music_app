import { useEffect, useState } from "react";
import {
    View,
    Text,
    FlatList,
    TouchableOpacity,
    TextInput,
    Modal,
    StyleSheet,
} from "react-native";
import { getFromStorage, saveToStorage } from "../service/storage";

const PlaylistScreen = ({ navigation }) => {
    const [playlists, setPlaylists] = useState([]);
    const [isEditing, setIsEditing] = useState(false);
    const [selectedPlaylist, setSelectedPlaylist] = useState(null);
    const [newPlaylistName, setNewPlaylistName] = useState("");

    useEffect(() => {
        loadPlaylists();
    }, []);

    const loadPlaylists = async () => {
        const storedPlaylists = await getFromStorage("playlists");
        setPlaylists(storedPlaylists || []);
    };

    const removePlaylist = async (playlistName) => {
        const updatedPlaylists = playlists.filter((p) => p.name !== playlistName);
        setPlaylists(updatedPlaylists);
        await saveToStorage("playlists", updatedPlaylists);
    };

    const openEditModal = (playlist) => {
        setSelectedPlaylist(playlist);
        setNewPlaylistName(playlist.name);
        setIsEditing(true);
    };

    const handleEditPlaylist = async () => {
        if (!newPlaylistName.trim()) return;

        const updatedPlaylists = playlists.map((playlist) =>
            playlist.name === selectedPlaylist.name
                ? { ...playlist, name: newPlaylistName }
                : playlist
        );

        setPlaylists(updatedPlaylists);
        await saveToStorage("playlists", updatedPlaylists);
        setIsEditing(false);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Minhas Playlists</Text>

            {playlists.length === 0 ? (
                <Text style={styles.emptyText}>Nenhuma playlist criada.</Text>
            ) : (
                <FlatList
                    data={playlists}
                    keyExtractor={(item) => item.name}
                    renderItem={({ item }) => (
                        <View style={styles.playlistContainer}>
                            <TouchableOpacity
                                style={styles.playlistButton}
                                onPress={() =>
                                    navigation.navigate("PlaylistDetail", {
                                        playlistName: item.name,
                                    })
                                }
                            >
                                <Text style={styles.playlistTitle}>{item.name}</Text>
                            </TouchableOpacity>

                            <View style={styles.actions}>
                                <TouchableOpacity onPress={() => openEditModal(item)}>
                                    <Text style={styles.editButton}>📝</Text>
                                </TouchableOpacity>

                                <TouchableOpacity onPress={() => removePlaylist(item.name)}>
                                    <Text style={styles.removeButton}>🗑️</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    )}
                />
            )}

            {/* Modal de edição do nome da playlist */}
            <Modal
                visible={isEditing}
                transparent={true}
                animationType="slide"
                onRequestClose={() => setIsEditing(false)}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>Editar Nome da Playlist</Text>
                        <TextInput
                            style={styles.input}
                            value={newPlaylistName}
                            onChangeText={setNewPlaylistName}
                        />

                        <TouchableOpacity style={styles.saveButton} onPress={handleEditPlaylist}>
                            <Text style={styles.saveButtonText}>Salvar</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.cancelButton} onPress={() => setIsEditing(false)}>
                            <Text style={styles.cancelButtonText}>Cancelar</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
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
        marginBottom: 15,
        textAlign: "center",
    },
    emptyText: {
        textAlign: "center",
        fontSize: 16,
        color: "#888",
    },
    playlistContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        backgroundColor: "#f8f8f8",
        padding: 15,
        borderRadius: 10,
        marginBottom: 10,
        alignItems: "center",
    },
    playlistButton: {
        flex: 1,
    },
    playlistTitle: {
        fontSize: 18,
        fontWeight: "bold",
    },
    actions: {
        flexDirection: "row",
        gap: 10,
    },
    editButton: {
        fontSize: 20,
        color: "#007bff",
    },
    removeButton: {
        fontSize: 20,
        color: "red",
    },
    modalContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0,0,0,0.5)",
    },
    modalContent: {
        backgroundColor: "#fff",
        padding: 20,
        borderRadius: 10,
        width: "80%",
        alignItems: "center",
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 10,
    },
    input: {
        width: "100%",
        padding: 10,
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 5,
        marginBottom: 10,
        textAlign: "center",
    },
    saveButton: {
        backgroundColor: "#28a745",
        padding: 10,
        borderRadius: 5,
        width: "100%",
        alignItems: "center",
    },
    saveButtonText: {
        color: "#fff",
        fontWeight: "bold",
    },
    cancelButton: {
        marginTop: 10,
        alignItems: "center",
    },
    cancelButtonText: {
        color: "red",
        fontWeight: "bold",
    },
});

export default PlaylistScreen;
