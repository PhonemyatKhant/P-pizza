import { View, Text, ActivityIndicator } from "react-native";
import React from "react";
import Button from "../components/Button";
import { Link, Redirect } from "expo-router";
import { useAuth } from "../providers/AuthProvider";
import { supabase } from "../lib/supabase";

const index = () => {
  const { session, loading, isAdmin, profile } = useAuth();

  console.log(loading, profile?.group);

  if (loading) {
    return <ActivityIndicator />;
  }

  if (!session) {
    return <Redirect href={"/(auth)/"} />;
  }

  // if (!loading && !isAdmin) {
  //   return <Redirect href={"/(user)"} />;
  // } else if (!loading && isAdmin) {
  //   return <Redirect href={"/(admin)"} />;
  // }

  return (
    <View style={{ flex: 1, justifyContent: "center", padding: 10 }}>
      <Link href={"/(auth)/"} asChild>
        <Button text="Sign In" />
      </Link>
      <Link href={"/(user)/menu"} asChild>
        <Button text="User" />
      </Link>
      <Link href={"/(admin)/menu"} asChild>
        <Button text="Admin" />
      </Link>

      <Button text="Sign Out" onPress={() => supabase.auth.signOut()} />
    </View>
  );
};

export default index;
