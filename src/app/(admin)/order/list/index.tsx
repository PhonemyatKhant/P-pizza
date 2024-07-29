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

import { useOrderList } from "@/src/api/orders";

const OrdersPageAdmin = () => {


  const {
    data: unArchivedOrders,
    isLoading,
    error,
  } = useOrderList({ archived: false });
  if (isLoading) {
    return <ActivityIndicator />;
  }
  if (error) {
    return <Text>Failed to fetch</Text>;
  }
  return (
    <View>
     
      <FlatList
        data={unArchivedOrders}
        contentContainerStyle={{ gap: 10, padding: 10 }}
        renderItem={({ item }) => <OrderListItem order={item} />}
      />
    </View>
  );
};

export default OrdersPageAdmin;

const styles = StyleSheet.create({});
