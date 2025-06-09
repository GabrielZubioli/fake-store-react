import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import { getFavorites, saveFavorites } from "../utils/storage";

export default function ProductDetailScreen({ route }) {
  const { product } = route.params;
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    loadFavoriteStatus();
  }, []);

  const loadFavoriteStatus = async () => {
    const favorites = await getFavorites();
    setIsFavorite(favorites.some((p) => p.id === product.id));
  };

  const toggleFavorite = async () => {
    let favorites = await getFavorites();
    if (isFavorite) {
      favorites = favorites.filter((p) => p.id !== product.id);
    } else {
      favorites.push(product);
    }
    await saveFavorites(favorites);
    setIsFavorite(!isFavorite);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image source={{ uri: product.image }} style={styles.image} />
      <Text style={styles.title}>{product.title}</Text>
      <Text style={styles.price}>R$ {product.price}</Text>
      <Text style={styles.description}>{product.description}</Text>

      <TouchableOpacity
        style={[styles.button, isFavorite && styles.buttonRemove]}
        onPress={toggleFavorite}
      >
        <Text style={styles.buttonText}>
          {isFavorite ? "Remover dos Favoritos" : "Adicionar aos Favoritos"}
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#f1f2f6",
    alignItems: "center",
  },
  image: {
    width: "100%",
    height: 250,
    borderRadius: 12,
    marginBottom: 20,
    resizeMode: "contain",
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#2f3542",
    textAlign: "center",
    marginBottom: 10,
  },
  price: {
    fontSize: 20,
    color: "#27ae60",
    fontWeight: "600",
    marginBottom: 15,
  },
  description: {
    fontSize: 16,
    color: "#57606f",
    textAlign: "justify",
    marginBottom: 30,
  },
  button: {
    backgroundColor: "#3742fa",
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 10,
    alignItems: "center",
  },
  buttonRemove: {
    backgroundColor: "#ff4757",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});
