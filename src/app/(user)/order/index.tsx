import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React from "react";
import { Stack } from "expo-router";
import OrderListItem from "@/src/components/OrderListItem";

import { useMyOrders } from "@/src/api/orders";

const OrdersPage = () => {
  
  
  const { data: myOrders, error, isLoading } = useMyOrders();

  if (isLoading) {
    return <ActivityIndicator />;
  }
  if (error) {
    return <Text>Failed to fetch your order!</Text>;
  }
  return (
    <View>

      <Stack.Screen options={{ title: "Orders" }} />
      <FlatList
        data={myOrders}
        contentContainerStyle={{ gap: 10, padding: 10 }}
        renderItem={({ item }) => <OrderListItem order={item} />}
      />
    </View>
  );
};

export default OrdersPage;

const styles = StyleSheet.create({});
