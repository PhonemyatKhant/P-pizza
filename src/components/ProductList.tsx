import { Image, StyleSheet, Text, View, Pressable } from "react-native";

import Colors from "@/src/constants/Colors";
import { Product } from "@/assets/types";
import { Link, useSegments } from "expo-router";

export default function ProductList({ product }: { product: Product }) {
  const segments = useSegments();
  return (
    <Link href={`/${segments[0]}/menu/${product.id}`} asChild>
      <Pressable style={styles.container}>
        <Image
          source={{
            uri:
              product.image! ||
              "https://img.freepik.com/free-vector/colorful-round-tasty-pizza_1284-10219.jpg?size=626&ext=jpg",
          }}
          style={styles.image}
        />
        <Text style={styles.title}>{product.name} </Text>
        <Text style={styles.price}>${product.price} </Text>
      </Pressable>
    </Link>
  );
}

export const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: "white",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    maxWidth: "50%",
  },
  image: {
    resizeMode: "contain",
    marginVertical: 10,
    width: "100%",
    aspectRatio: 1,
  },
  title: {
    height: "auto",

    alignItems: "flex-start",
    marginTop: 10,
    fontSize: 20,
    fontWeight: "bold",
  },
  price: {
    marginTop: 10,
    fontSize: 15,
    fontWeight: "semibold",
    color: Colors.light.tint,
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
