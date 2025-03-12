import AsyncStorage from "@react-native-async-storage/async-storage";

// Salva qualquer dado no AsyncStorage
export const saveToStorage = async (key: string, value: any) => {
    try {
        await AsyncStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
        console.error(`Erro ao salvar ${key}:`, error);
    }
};

// Recupera qualquer dado do AsyncStorage
export const getFromStorage = async (key: string) => {
    try {
        const data = await AsyncStorage.getItem(key);
        return data ? JSON.parse(data) : null;
    } catch (error) {
        console.error(`Erro ao buscar ${key}:`, error);
        return null;
    }
};
