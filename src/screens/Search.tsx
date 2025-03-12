import { FlatList, StyleSheet, Text, TextInput, View } from "react-native"
import api from "../service/api";
import { useState } from "react";

const Search = () => {
   
    const [searchResults, setSearchResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');

    const handleSearchMusic = async (searchQuery: string) => {
        try {
            setLoading(true)
            // Chama a API para buscar músicas
            const response = await fetch('https://gist.githubusercontent.com/billiezinha/774b5a0ae247f7370a86d307ded19ba1/raw/5e39300bec91ec4156466710da9b65a81b59f5b0/api-billie.json');
            const data = await response.json();
           
             console.log("converted", data.musicas);
             const filtered = data.musicas.filter((el) => el.nome_da_musica.toLowerCase().startsWith(searchQuery.toLowerCase()))
            setSearchResults(filtered);
            setLoading(false)
        } catch (error) {
            // Trata erros caso ocorra um erro na requisição
            console.error("Erro ao buscar músicas:", error);
        }
    };

    return (
        <View style={styles.container}>
            <Text>busque aqui</Text>
            <TextInput placeholder="busque sua musica"  onChangeText={(text) => {
                    setSearchQuery(text); // Atualiza o valor do campo de busca
                    handleSearchMusic(text); // Faz a pesquisa automaticamente enquanto digita
                }}/>
            
            {loading ? (
                <Text>Carregando...</Text>
            ) : (
                <FlatList 
                    style={{width: '100%'}}
                    data={searchResults}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item }) => <View>
                         <Text>{item.nome_da_musica}</Text>
                         <Text>{item.nome_do_artista}</Text>
                         <Text>{item.letra_da_musica}</Text>
                    </View>} // Exibe o título de cada música
                />
            )}

        </View>
    )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
    alignItems: "center",
  },

  })
export default Search;