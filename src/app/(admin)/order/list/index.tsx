import { FlatList, StyleSheet, Text, View } from "react-native";
import React from "react";
import { Stack } from "expo-router";
import OrderListItem from "@/src/components/OrderListItem";
import orders from "@/assets/data/orders";

const OrdersPage = () => {
  return (
    <View>
      <Stack.Screen options={{ title: "Active" }} />
      <FlatList
        data={orders}
        contentContainerStyle={{ gap: 10, padding: 10 }}
        renderItem={({ item }) => <OrderListItem order={item} />}
      />
    </View>
  );
};

export default OrdersPage;

const styles = StyleSheet.create({});
