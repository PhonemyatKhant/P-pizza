import { FlatList, StyleSheet, Text, View } from "react-native";
import React from "react";
import { Stack } from "expo-router";
import OrderListItem from "@/src/components/OrderListItem";
import orders from "@/assets/data/orders";
import { Tab } from "./_layout";

const OrdersArchivePage = () => {
  return (
    <View>
      
      <FlatList
        data={orders}
        contentContainerStyle={{ gap: 10, padding: 10 }}
        renderItem={({ item }) => <OrderListItem order={item} />}
      />
    </View>
  );
};

export default OrdersArchivePage;

const styles = StyleSheet.create({});
