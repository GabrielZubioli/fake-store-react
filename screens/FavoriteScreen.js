import React, { useEffect, useState } from 'react';
import { View, FlatList, Text, StyleSheet } from 'react-native';
import ProductItem from '../components/ProductItem';
import { getFavorites } from '../utils/storage';

export default function FavoritesScreen({ navigation }) {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      loadFavorites();
    });
    return unsubscribe;
  }, [navigation]);

  const loadFavorites = async () => {
    const favs = await getFavorites();
    setFavorites(favs);
  };

  if (favorites.length === 0) {
    return (
      <View style={styles.center}>
        <Text>Nenhum produto favoritado.</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={favorites}
      keyExtractor={item => item.id.toString()}
      renderItem={({ item }) =>
        <ProductItem product={item} onPress={() => navigation.navigate('Details', { product: item })} />
      }
    />
  );
}

const styles = StyleSheet.create({
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
});
