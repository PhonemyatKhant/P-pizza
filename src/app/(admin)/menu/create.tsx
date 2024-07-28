import {
  Alert,
  Image,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import React, { useState } from "react";
import Colors from "@/src/constants/Colors";
import Button from "@/src/components/Button";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import * as ImagePicker from "expo-image-picker";
import { supabase } from "@/src/lib/supabase";

const create = () => {
  const [image, setImage] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [errors, setErrors] = useState("");

  const { id } = useLocalSearchParams();

  const isEditing = !!id;

  const router = useRouter();

  const onSubmit = () => {
    if (isEditing) {
      onUpdate();
    } else {
      onCreate();
    }
  };
  const onCreate = () => {
    validateInput();
  };
  const onUpdate = () => {
    validateInput();
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

    console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const onDelete = () => {};

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

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{ title: isEditing ? "Edit Product" : "Create Product" }}
      />
      <Image
        source={{ uri: image! }}
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
      <Button text="Sign Out" onPress={() => supabase.auth.signOut()} />
      <Button onPress={onCreate} text={isEditing ? "Save" : "Create"} />
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
