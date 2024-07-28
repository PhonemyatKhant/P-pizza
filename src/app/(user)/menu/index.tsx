import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React from "react";
import ProductList from "@/src/components/ProductList";
// import products from "@/assets/data/products";
import { Stack } from "expo-router";
// import { supabase } from "@/src/lib/supabase";
import { useProductList } from "@/src/api/products";

export default function MenuScreen() {
  const { data, isLoading, error } = useProductList();

  if (isLoading) {
    return <ActivityIndicator />;
  }
  if (error) {
    return <Text>Failed to fetch products</Text>;
  }
  return (
    <>
      <Stack.Screen options={{ title: "Menu" }} />
      <FlatList
        data={data}
        numColumns={2}
        renderItem={({ item }) => <ProductList product={item} />}
        contentContainerStyle={{ gap: 10, padding: 10 }}
        columnWrapperStyle={{ gap: 10 }}
      />
    </>
  );
}

const styles = StyleSheet.create({});
