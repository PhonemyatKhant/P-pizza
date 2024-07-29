import {
  ActivityIndicator,
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useState } from "react";
import { Stack, useLocalSearchParams } from "expo-router";
import orders from "@/assets/data/orders";
import OrderListItem from "@/src/components/OrderListItem";
import OrderItemListItem from "@/src/components/OrderItemListItem";
import { OrderStatus, OrderStatusList } from "@/assets/types";
import Colors from "@/src/constants/Colors";
import { useOrderDetails, useUpdateOrder } from "@/src/api/orders";

const OrderDetailsPage = () => {
  const { orderId } = useLocalSearchParams();
  const id = parseFloat(typeof orderId === "string" ? orderId : orderId![0]);
  const [loading, setLoading] = useState(false);

  const { data: order, isLoading, error } = useOrderDetails(id);

  const { mutate: updateOrder } = useUpdateOrder();
  if (isLoading) {
    return <ActivityIndicator />;
  }
  if (error) {
    return <Text>Failed to fetch</Text>;
  }

  const updateStatus = async (status: OrderStatus) => {
    setLoading(true);
    updateOrder({ id, status: status });
    setLoading(false);
  };

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
      <View style={{ padding: 10 }}>
        <Text style={{ fontWeight: "bold" }}>Status</Text>
        <View style={{ flexDirection: "row", gap: 5 }}>
          {OrderStatusList.map((status) => (
            <Pressable
              disabled={loading}
              key={status}
              onPress={() => updateStatus(status)}
              style={{
                borderColor: Colors.light.tint,
                borderWidth: 1,
                padding: 10,
                borderRadius: 5,
                marginVertical: 10,
                backgroundColor:
                  order?.status === status ? Colors.light.tint : "transparent",
              }}
            >
              <Text
                style={{
                  color: order?.status === status ? "white" : Colors.light.tint,
                }}
              >
                {status}
              </Text>
            </Pressable>
          ))}
        </View>
      </View>
    </View>
  );
};

export default OrderDetailsPage;

const styles = StyleSheet.create({});
