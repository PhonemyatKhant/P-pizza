import { View, Text, StyleSheet, Image, Pressable } from "react-native";
import React, { useState } from "react";
import { Stack, useLocalSearchParams } from "expo-router";
import products from "@/assets/data/products";
import { styles } from "@/src/components/ProductList";
import Button from "@/src/components/Button";
import { PizzaSize } from "@/assets/types";
import { useCart } from "@/src/providers/CartProvider";

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

  const product = products.find((p) => p.id.toString() === productId);
  return (
    <>
      <Stack.Screen options={{ title: `${product?.name || "not found"}` }} />
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
          <Image style={styles.image} source={{ uri: product.image }} />

          <Text style={styles.title}>Select Sizes</Text>
          <View style={styless.sizeContainer}>
            {sizes.map((size) => (
              <Pressable
                onPress={() => setPizzaSize(size)}
                style={[
                  styless.sizes,
                  {
                    backgroundColor: size === pizzaSize ? "gainsboro" : "white",
                  },
                ]}
                key={size}
              >
                <Text
                  style={[
                    {
                      color: size !== pizzaSize ? "grey" : "black",
                    },
                  ]}
                >
                  {size}{" "}
                </Text>
              </Pressable>
            ))}
          </View>
          <Text style={[styles.title, { marginTop: "auto" }]}>
            ${product.price}{" "}
          </Text>
          <Button
            style={{ marginTop: "auto" }}
            onPress={addToCartHandler}
            text="Add To Cart"
          />
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