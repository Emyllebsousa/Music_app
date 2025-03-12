import { useNavigation } from "@react-navigation/native";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Search from "./Search";

const Home = () => {
    const navigation = useNavigation();

    const handleSearch = () => {
        navigation.navigate(Search);
    }
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bem-vindo ao musicApp</Text>

      <TouchableOpacity style={styles.button} onPress={handleSearch}>
        <Text style={styles.buttonText}>Buscar musica</Text>
      </TouchableOpacity>

      <View>
        <Text>Favoritas</Text>
        <View></View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
   
    
    padding: 20,
   
    gap: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 600,
  },
  button: {
    width: 120,
    height: 30,
    backgroundColor: "blue",
    borderRadius: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    color: "white",
  },
});
export default Home;
