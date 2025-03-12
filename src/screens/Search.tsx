import {
    FlatList,
    StyleSheet,
    Text,
    TextInput,
    View,
    TouchableOpacity,
    Modal
} from "react-native";
import { useState, useEffect } from "react";
import { getFromStorage, saveToStorage } from "../service/storage";

const Search = () => {
    const [searchResults, setSearchResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');

    const [playlists, setPlaylists] = useState([]);
    const [selectedMusic, setSelectedMusic] = useState(null);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [newPlaylistName, setNewPlaylistName] = useState('');

    useEffect(() => {
        loadPlaylists();
    }, []);

    const loadPlaylists = async () => {
        const storedPlaylists = await getFromStorage("playlists");
        setPlaylists(storedPlaylists || []);
    };

    const handleSearchMusic = async (searchQuery: string) => {
        try {
            setLoading(true);
            const response = await fetch('https://gist.githubusercontent.com/billiezinha/774b5a0ae247f7370a86d307ded19ba1/raw/5e39300bec91ec4156466710da9b65a81b59f5b0/api-billie.json');
            const data = await response.json();

            const filtered = data.musicas.filter((el) =>
                el.nome_da_musica.toLowerCase().startsWith(searchQuery.toLowerCase())
            );
            setSearchResults(filtered);
            setLoading(false);
        } catch (error) {
            console.error("Erro ao buscar músicas:", error);
        }
    };

    const openPlaylistModal = (music) => {
        setSelectedMusic(music);
        setIsModalVisible(true);
    };

    const handleAddToPlaylist = async (playlistName) => {
        if (selectedMusic) {
            const updatedPlaylists = playlists.map((playlist) =>
                playlist.name === playlistName
                    ? { ...playlist, songs: [...playlist.songs, selectedMusic] }
                    : playlist
            );

            setPlaylists(updatedPlaylists);
            await saveToStorage("playlists", updatedPlaylists);
            setIsModalVisible(false);
        }
    };

    const handleCreatePlaylist = async () => {
        if (newPlaylistName.trim()) {
            const newPlaylist = { name: newPlaylistName, songs: [selectedMusic] };
            const updatedPlaylists = [...playlists, newPlaylist];

            setPlaylists(updatedPlaylists);
            await saveToStorage("playlists", updatedPlaylists);
            setNewPlaylistName('');
            setIsModalVisible(false);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Busque aqui</Text>
            <TextInput
                style={styles.input}
                placeholder="Busque sua música"
                onChangeText={(text) => {
                    setSearchQuery(text);
                    handleSearchMusic(text);
                }}
            />

            {loading ? (
                <Text style={styles.loadingText}>Carregando...</Text>
            ) : (
                <FlatList
                    style={styles.list}
                    data={searchResults}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item }) => (
                        <View style={styles.musicItem}>
                            <View style={styles.musicInfo}>
                                <Text style={styles.musicTitle}>{item.nome_da_musica}</Text>
                                <Text style={styles.artist}>{item.nome_do_artista}</Text>
                            </View>
                            <TouchableOpacity
                                style={styles.addButton}
                                onPress={() => openPlaylistModal(item)}
                            >
                                <Text style={styles.addButtonText}>+</Text>
                            </TouchableOpacity>
                        </View>
                    )}
                />
            )}

            {/* Modal para selecionar ou criar playlist */}
            <Modal
                visible={isModalVisible}
                transparent={true}
                animationType="slide"
                onRequestClose={() => setIsModalVisible(false)}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>Adicionar à Playlist</Text>

                        <FlatList
                            data={playlists}
                            keyExtractor={(item) => item.name}
                            renderItem={({ item }) => (
                                <TouchableOpacity
                                    style={styles.playlistItem}
                                    onPress={() => handleAddToPlaylist(item.name)}
                                >
                                    <Text style={styles.playlistText}>{item.name}</Text>
                                </TouchableOpacity>
                            )}
                        />

                        <TextInput
                            style={styles.input}
                            placeholder="Criar nova playlist"
                            value={newPlaylistName}
                            onChangeText={setNewPlaylistName}
                        />

                        <TouchableOpacity style={styles.createButton} onPress={handleCreatePlaylist}>
                            <Text style={styles.createButtonText}>Criar e Adicionar</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.closeButton} onPress={() => setIsModalVisible(false)}>
                            <Text style={styles.closeButtonText}>Fechar</Text>
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
        alignItems: "center",
    },
    title: {
        fontSize: 20,
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
    },
    list: {
        width: "100%",
    },
    loadingText: {
        fontSize: 16,
        color: "#666",
    },
    musicItem: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: "#ddd",
    },
    musicInfo: {
        flex: 1,
    },
    musicTitle: {
        fontSize: 16,
        fontWeight: "bold",
    },
    artist: {
        fontSize: 14,
        color: "#666",
    },
    addButton: {
        backgroundColor: "#007bff",
        borderRadius: 20,
        paddingVertical: 5,
        paddingHorizontal: 15,
        alignItems: "center",
        justifyContent: "center",
    },
    addButtonText: {
        color: "#fff",
        fontSize: 20,
        fontWeight: "bold",
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
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 10,
    },
    playlistItem: {
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: "#ddd",
    },
    playlistText: {
        fontSize: 16,
    },
    createButton: {
        backgroundColor: "#28a745",
        padding: 10,
        borderRadius: 5,
        alignItems: "center",
        marginTop: 10,
    },
    createButtonText: {
        color: "#fff",
        fontWeight: "bold",
    },
    closeButton: {
        marginTop: 10,
        alignItems: "center",
    },
    closeButtonText: {
        color: "red",
        fontWeight: "bold",
    },
});

export default Search;
