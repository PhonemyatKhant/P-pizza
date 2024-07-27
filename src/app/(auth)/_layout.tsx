import React from "react";
import { Redirect, Stack } from "expo-router";
import { View } from "react-native";
import { useAuth } from "@/src/providers/AuthProvider";

const AuthLayout = () => {
  const { session } = useAuth();

  if (session) {
    return <Redirect href={"/"} />;
  }
  return <Stack></Stack>;
};

export default AuthLayout;
