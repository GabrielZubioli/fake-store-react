// Dentro de ProductListScreen.js
import React, { useEffect, useState } from 'react';
import { View, FlatList, ActivityIndicator, Button } from 'react-native'; // Imports do React e React Native no topo
import axios from 'axios';
import ProductItem from '../components/ProductItem'; // Certifique-se que este caminho está correto e o componente existe

export default function ProductListScreen({ navigation }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('https://fakestoreapi.com/products')
      .then(response => {
        setProducts(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error("Erro ao buscar produtos:", error);
        setLoading(false);
      });
  }, []); 

  if (loading) {
    return <ActivityIndicator size="large" style={{ flex: 1, justifyContent: 'center' }} />;
  }

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={products}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) =>
          <ProductItem
            product={item}
            onPress={() => navigation.navigate('Details', { product: item })}
          />
        }
      />
    </View>
  );
}