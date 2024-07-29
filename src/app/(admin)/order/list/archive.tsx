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

import { Tab } from "./_layout";
import { useOrderList } from "@/src/api/orders";

const OrdersArchivePage = () => {

  const { data: archivedOrders, isLoading, error } = useOrderList({ archived: true });
  if (isLoading) {
    return <ActivityIndicator />;
  }
  if (error) {
    return <Text>Failed to fetch</Text>;
  }
  return (
    <View>
      <FlatList
        data={archivedOrders}
        contentContainerStyle={{ gap: 10, padding: 10 }}
        renderItem={({ item }) => <OrderListItem order={item} />}
      />
    </View>
  );
};

export default OrdersArchivePage;

const styles = StyleSheet.create({});
