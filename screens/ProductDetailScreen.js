import React, { useEffect, useState } from 'react';
import { View, Text, Image, Button, StyleSheet } from 'react-native';
import { getFavorites, saveFavorites } from '../utils/storage';

export default function ProductDetailScreen({ route }) {
  const { product } = route.params;
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    loadFavoriteStatus();
  }, []);

  const loadFavoriteStatus = async () => {
    const favorites = await getFavorites();
    setIsFavorite(favorites.some(p => p.id === product.id));
  };

  const toggleFavorite = async () => {
    let favorites = await getFavorites();
    if (isFavorite) {
      favorites = favorites.filter(p => p.id !== product.id);
    } else {
      favorites.push(product);
    }
    await saveFavorites(favorites);
    setIsFavorite(!isFavorite);
  };

  return (
    <View style={styles.container}>
      <Image source={{ uri: product.image }} style={styles.image} />
      <Text style={styles.title}>{product.title}</Text>
      <Text style={styles.price}>R$ {product.price}</Text>
      <Text>{product.description}</Text>
      <Button title={isFavorite ? "Remover dos Favoritos" : "Adicionar aos Favoritos"} onPress={toggleFavorite} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20 },
  image: { width: 200, height: 200, alignSelf: 'center' },
  title: { fontSize: 20, fontWeight: 'bold', marginVertical: 10 },
  price: { fontSize: 18, color: 'green' },
});
