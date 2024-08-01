import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useEffect } from "react";
import { Stack } from "expo-router";
import OrderListItem from "@/src/components/OrderListItem";

import { useOrderList } from "@/src/api/orders";
import { supabase } from "@/src/lib/supabase";
import { useQueryClient } from "@tanstack/react-query";
import { useInsertOrderSubscription } from "@/src/api/orders/subscription";

const OrdersPageAdmin = () => {
  const {
    data: unArchivedOrders,
    isLoading,
    error,
  } = useOrderList({ archived: false });

  useInsertOrderSubscription();
  
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
