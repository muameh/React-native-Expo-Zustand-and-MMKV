import { StyleSheet, Text, View, FlatList, ListRenderItem, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { ProductType } from '.';
import { Ionicons } from '@expo/vector-icons';
import { useCartStore } from '../../store/cartStore';




const Cart = () => {
  const addToCart = useCartStore((state) => state.addToCart);
  const removeFromCart = useCartStore((state) => state.removeFromCart);
  const cart = useCartStore((state) => state.cart);


  const renderItem: ListRenderItem<ProductType & { quantity: number }> = ({ item }) => (
    <View style={styles.itemWrapper}>
      <Image source={{ uri: item.image }} style={{ width: 100, height: 100, resizeMode: 'contain' }} />
      <View style={styles.itemInfoWrapper}>
        <Text numberOfLines={1} style={styles.itemTitle}>{item.title}</Text>
        <Text style={styles.itemPrice}>${item.price}</Text>
        <View style={styles.buttonsContainer}>
          <TouchableOpacity style={styles.button} onPress={() => addToCart(item)}>
            <Ionicons name="add-outline" size={24} />
          </TouchableOpacity>
          <Text style={styles.quantity}>{item.quantity}</Text>
          <TouchableOpacity style={styles.button} onPress={() => removeFromCart(item)}>
            <Ionicons name="remove-outline" size={24} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )

  return (
    <View style={styles.container}>
      <FlatList
        data={cart}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        showsVerticalScrollIndicator={false}
      />
    </View>
  )
}

export default Cart

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  itemWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    backgroundColor: '#f9f9f9',
    borderColor: '#000',
    borderWidth: 1,
    borderRadius: 10,

  },
  itemInfoWrapper: {
    padding: 10,
    flexDirection: 'column',
    gap: 6,
  },
  itemTitle: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  quantity: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  itemPrice: {
    fontSize: 16,
    color: 'green',
  },
  buttonsContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 10,
  },
  button: {
    borderRadius: 5,
    backgroundColor: '#e0e0e0',
  },
})