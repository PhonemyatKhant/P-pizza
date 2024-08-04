import {
  Alert,
  Image,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import Colors from "@/src/constants/Colors";
import Button from "@/src/components/Button";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import * as ImagePicker from "expo-image-picker";
import { supabase } from "@/src/lib/supabase";
import {
  useDeleteProduct,
  useInsertProduct,
  useProduct,
  useUpdateProduct,
} from "@/src/api/products";

import * as FileSystem from "expo-file-system";
import { randomUUID } from "expo-crypto";
import { decode } from "base64-arraybuffer";

const create = () => {
  const [image, setImage] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [errors, setErrors] = useState("");

  const { id } = useLocalSearchParams();
  let productId: number;

  const isEditing = !!id;

  if (isEditing) {
    productId = parseFloat(typeof id === "string" ? id : id![0]);

    const { data: updatingProduct } = useProduct(productId);
    useEffect(() => {
      setName(updatingProduct?.name as string);
      setImage(updatingProduct?.image as string);
      setPrice(updatingProduct?.price.toString() as string);
    }, [updatingProduct]);
  }

  const router = useRouter();

  const { mutate: insertProduct } = useInsertProduct();
  const { mutate: updateProduct } = useUpdateProduct();
  const { mutate: deleteProduct } = useDeleteProduct();

  const onSubmit = () => {
    if (isEditing) {
      onUpdate();
    } else {
      onCreate();
    }
  };
  const onCreate = async () => {
    validateInput();

    const imagePath = await uploadImage();

    insertProduct(
      { name, image: imagePath, price: parseFloat(price) },
      {
        onSuccess() {
          router.back();
        },
      }
    );
  };
  const onUpdate = async () => {
    validateInput();
    const imagePath = await uploadImage();
    updateProduct(
      { id, name, image: imagePath, price: parseFloat(price) },
      {
        onSuccess() {
          router.back();
        },
      }
    );
  };

  const validateInput = () => {
    setErrors("");
    if (!name) {
      setErrors("Name is required");
      return false;
    }
    if (!price) {
      setErrors("Price is required");
      return false;
    }
    if (isNaN(parseFloat(price))) {
      setErrors("Price should be a number");
      return false;
    }
    return true;
  };

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    // console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const onDelete = () => {
    deleteProduct(productId, {
      onSuccess() {
        router.replace("/(admin)/menu/");
      },
    });
  };

  const confirmDelete = () => {
    Alert.alert("Confirm", "Delete this product?", [
      { text: "Cancel" },
      {
        text: "Delete",
        onPress: onDelete,
        style: "destructive",
      },
    ]);
  };

  const uploadImage = async () => {
    if (!image?.startsWith("file://")) {
      return;
    }

    const base64 = await FileSystem.readAsStringAsync(image, {
      encoding: "base64",
    });
    const filePath = `${randomUUID()}.png`;
    const contentType = "image/png";
    const { data, error } = await supabase.storage
      .from("product-images")
      .upload(filePath, decode(base64), { contentType });

    console.log(error);

    if (data) {
      return data.path;
    }
  };

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{ title: isEditing ? "Edit Product" : "Create Product" }}
      />
      <Image
        source={{
          uri:
            image ||
            "https://img.freepik.com/free-vector/colorful-round-tasty-pizza_1284-10219.jpg?size=626&ext=jpg",
        }}
        style={styles.image}
        resizeMode="contain"
      />
      <Text onPress={pickImage} style={styles.textButton}>
        Select Image
      </Text>
      <Text style={styles.label}>Name</Text>
      <TextInput
        value={name}
        onChangeText={setName}
        placeholder="Margarita..."
        style={styles.input}
      />

      <Text style={styles.label}>Price ($)</Text>
      <TextInput
        value={price}
        onChangeText={setPrice}
        placeholder="9.99"
        style={styles.input}
        keyboardType="numeric"
      />
      <Text style={styles.error}>{errors}</Text>
      {/* <Button text="Sign Out" onPress={() => supabase.auth.signOut()} /> */}
      <Button onPress={onSubmit} text={isEditing ? "Save" : "Create"} />
      {isEditing && (
        <Pressable onPress={confirmDelete} style={styles.textButton}>
          <Text>Delete</Text>
        </Pressable>
      )}
    </View>
  );
};

export default create;

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  image: {
    width: "50%",
    aspectRatio: 1,
    alignSelf: "center",
  },
  textButton: {
    alignSelf: "center",
    fontWeight: "bold",
    color: Colors.light.text,
    marginVertical: 10,
    backgroundColor: "white",
  },
  label: {
    color: "gray",
  },
  input: {
    borderWidth: 1,
    borderColor: "gray",
    padding: 10,
    marginTop: 5,
    marginBottom: 20,
    backgroundColor: "white",
    borderRadius: 5,
  },
  error: {
    color: "red",
    textAlign: "center",
  },
});
