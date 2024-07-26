import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import React, { useState } from "react";
import { Stack, useSegments } from "expo-router";
import Button from "@/src/components/Button";
import Colors from "@/src/constants/Colors";

const SignInScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [variant, setVariant] = useState<"sign-in" | "sign-up">("sign-in");
  const [errors, setErrors] = useState("");

  const isSignIn = variant === "sign-in";

  const validateInput = () => {
    setErrors("");

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) {
      setErrors("Email is required");
      return false;
    } else if (!emailRegex.test(email)) {
      setErrors("Invalid email format");
      return false;
    }

    // Password validation
    const passwordMinLength = 8;
    const passwordRegex =
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
    if (!password) {
      setErrors("Password is required");
      return false;
    } else if (password.length < passwordMinLength) {
      setErrors(
        `Password must be at least ${passwordMinLength} characters long`
      );
      return false;
    } else if (!passwordRegex.test(password)) {
      setErrors(
        "Password must contain at least one letter, one number, and one special character"
      );
      return false;
    }

    return true;
  };

  const signInHandler = () => {};
  const signUpHandler = () => {};
  const onSubmit = () => {
    validateInput()
    if (isSignIn) {
      signInHandler();
    } else {
      signUpHandler();
    }
  };
  return (
    <View
      style={{
        padding: 10,
        flex: 1,
        justifyContent: "center",
        backgroundColor: "white",
      }}
    >
      <Stack.Screen options={{ title: isSignIn ? "Sign in" : "Sign up" }} />
      <Text style={styles.label}>Name</Text>
      <TextInput
        value={email}
        onChangeText={setEmail}
        placeholder="example@email.com"
        style={styles.input}
      />

      <Text style={styles.label}>Password</Text>
      <TextInput
        value={password}
        onChangeText={setPassword}
        placeholder="****"
        style={styles.input}
      />
       <Text style={styles.error}>{errors}</Text>
      <Button
        onPress={onSubmit}
        text={isSignIn ? "Sign In" : "Sign Up"}
      />

      <Pressable
        onPress={() =>
          setVariant((prevValue) =>
            prevValue === "sign-in" ? "sign-up" : "sign-in"
          )
        }
        style={styles.textButton}
      >
        <Text>
          {isSignIn ? "Create an account?" : "Sign in to existing account."}
        </Text>
      </Pressable>
    </View>
  );
};

export default SignInScreen;

const styles = StyleSheet.create({
  label: {
    color: "gray",
  },
  textButton: {
    alignSelf: "center",
    fontWeight: "bold",
    color: Colors.light.text,
    marginVertical: 10,
    backgroundColor: "white",
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
