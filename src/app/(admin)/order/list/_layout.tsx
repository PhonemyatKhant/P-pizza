import React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

import OrdersPage from "./index";
import OrdersArchivePage from "@/src/app/(admin)/order/list/archive";
import { SafeAreaView } from "react-native";

export const Tab = createMaterialTopTabNavigator();

export default function OrdersTabs() {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <Tab.Navigator>
        <Tab.Screen name="Active" component={OrdersPage} />
        <Tab.Screen name="Archive" component={OrdersArchivePage} />
      </Tab.Navigator>
    </SafeAreaView>
  );
}
