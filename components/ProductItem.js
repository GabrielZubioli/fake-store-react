import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';

export default function ProductItem({ product, onPress }) {
  return (
    <TouchableOpacity style={styles.item} onPress={onPress}>
      <Image source={{ uri: product.image }} style={styles.image} />
      <View style={styles.info}>
        <Text numberOfLines={1}>{product.title}</Text>
        <Text>R$ {product.price}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  item: { flexDirection: 'row', padding: 10, borderBottomWidth: 1 },
  image: { width: 60, height: 60, marginRight: 10 },
  info: { flex: 1, justifyContent: 'center' },
});
