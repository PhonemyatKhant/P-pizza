import { FlatList, StyleSheet, Text, View } from "react-native";
import React from "react";
import ProductList from "@/src/components/ProductList";
import products from "@/assets/data/products";
import { Stack } from "expo-router";


export default function MenuScreen() {
  return (
    <>
    <Stack.Screen options={{title:'Menu'}}/>
      <FlatList
        data={products}
        numColumns={2}
        renderItem={({ item }) => <ProductList product={item} />}
        contentContainerStyle={{ gap: 10, padding: 10 }}
        columnWrapperStyle={{ gap: 10 }}
      />
    </>
  );
}

const styles = StyleSheet.create({});
