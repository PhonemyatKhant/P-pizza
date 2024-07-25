import { View, Text, Platform, FlatList } from "react-native";
import React from "react";
import { StatusBar } from "expo-status-bar";
import { useCart } from "../providers/CartProvider";
import CartListItem from "../components/CartListItem";
import Button from "../components/Button";

const cart = () => {
  const { items, total } = useCart();
  return (
    <>
      {items.length > 0 ? (
        <View>
          <FlatList
            data={items}
            renderItem={({ item }) => <CartListItem cartItem={item} />}
            contentContainerStyle={{ padding: 10, gap: 10 }}
          />
          <Text
            style={{
              marginTop: 20,
              fontSize: 20,
              fontWeight: "500",
              marginLeft: 10,
            }}
          >
            Total: ${total}
          </Text>
          <View  style={{margin:20}}><Button text="Checkout" /></View>
          <StatusBar style={Platform.OS === "ios" ? "light" : "auto"} />
        </View>
      ) : (
        <View>
          <Text
            style={{
              textAlign: "center",
              color: "red",
              marginTop: 20,
            }}
          >
            No Items In The Cart!
          </Text>
        </View>
      )}
    </>
  );
};

export default cart;
