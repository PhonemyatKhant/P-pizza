import {
  View,
  Text,
  StyleSheet,
  Image,
  Pressable,
  ActivityIndicator,
} from "react-native";
import React, { useState } from "react";
import { Link, Stack, useLocalSearchParams } from "expo-router";
import products from "@/assets/data/products";
import { styles } from "@/src/components/ProductList";
import Button from "@/src/components/Button";
import { PizzaSize } from "@/assets/types";
import { useCart } from "@/src/providers/CartProvider";
import { FontAwesome } from "@expo/vector-icons";
import Colors from "@/src/constants/Colors";
import { useProduct } from "@/src/api/products";

const sizes: PizzaSize[] = ["S", "M", "L", "XL"];

const ProductDetailsScreen = () => {
  const { productId } = useLocalSearchParams();

  const [pizzaSize, setPizzaSize] = useState<PizzaSize>("M");

  const { addItem } = useCart();

  const addToCartHandler = () => {
    if (!product) {
      return;
    } else {
      addItem(product, pizzaSize);
    }
  };

  // const product = products.find((p) => p.id.toString() === productId);

  const {
    data: product,
    isLoading,
    error,
  } = useProduct(
    parseInt(typeof productId === "string" ? productId : productId![0])
  );

  if (isLoading) {
    return <ActivityIndicator />;
  }
  if (error || !product) {
    return <Text>Failed to fetch product</Text>;
  }
  return (
    <>
      <Stack.Screen
        options={{
          title: `${product?.name || "not found"}`,
          headerRight: () => (
            <Link href={`/(admin)/menu/create?id=${productId}`} asChild>
              <Pressable>
                {({ pressed }) => (
                  <FontAwesome
                    name="pencil"
                    size={20}
                    color={Colors.light.text}
                    style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
                  />
                )}
              </Pressable>
            </Link>
          ),
        }}
      />
      {!product ? (
        <View>
          <Text>No Product Found!</Text>
        </View>
      ) : (
        <View
          style={{
            padding: 20,
            backgroundColor: "white",
            flex: 1,
          }}
        >

          {/* ADD DEFAULT IMAGE HERE  */}
          <Image style={styles.image} source={{ uri: product.image || "" }} />

          <Text style={[styles.title]}>${product.price} </Text>
        </View>
      )}
    </>
  );
};

export const styless = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "white",
    flex: 1,
  },
  sizeContainer: {
    flexDirection: "row",
    marginVertical: 10,
    justifyContent: "space-around",
    gap: 10,
  },

  sizes: {
    width: 50,
    aspectRatio: 1,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    padding: 0,
    fontSize: 23,
    fontWeight: "500",
  },
});

export default ProductDetailsScreen;
