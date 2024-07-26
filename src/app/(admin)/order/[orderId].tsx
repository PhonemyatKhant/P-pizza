import { FlatList, StyleSheet, Text, View } from "react-native";
import React from "react";
import { Stack, useLocalSearchParams } from "expo-router";
import orders from "@/assets/data/orders";
import OrderListItem from "@/src/components/OrderListItem";
import OrderItemListItem from "@/src/components/OrderItemListItem";

const OrderDetailsPage = () => {
  const { orderId } = useLocalSearchParams();

  const order = orders.find((order) => order.id.toString() === orderId);
  return (
    <View>
      <Stack.Screen options={{ title: `Order ID #${orderId}` }} />
      <View style={{ padding: 10 }}>
        <OrderListItem order={order!} />
      </View>
      <FlatList
        data={order?.order_items}
        contentContainerStyle={{ gap: 10, padding: 10 }}
        renderItem={({ item }) => <OrderItemListItem item={item} />}
      />
    </View>
  );
};

export default OrderDetailsPage;

const styles = StyleSheet.create({});
