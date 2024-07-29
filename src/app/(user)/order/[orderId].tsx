import {
  ActivityIndicator,
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React from "react";
import { Stack, useLocalSearchParams } from "expo-router";
import orders from "@/assets/data/orders";
import OrderListItem from "@/src/components/OrderListItem";
import OrderItemListItem from "@/src/components/OrderItemListItem";
import { OrderStatusList } from "@/assets/types";
import Colors from "@/src/constants/Colors";
import { useOrderDetails } from "@/src/api/orders";

const OrderDetailsPage = () => {
  const { orderId } = useLocalSearchParams();

  const id = parseFloat(typeof orderId === "string" ? orderId : orderId![0]);

  const { data: order, isLoading, error } = useOrderDetails(id);
  console.log(order);
  
  if (isLoading) {
    return <ActivityIndicator />;
  }
  if (error) {
    return <Text>Failed to fetch</Text>;
  }

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
