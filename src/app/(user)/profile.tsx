import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Button from '@/src/components/Button'
import { supabase } from '@/src/lib/supabase'

const ProfileScreen = () => {
  return (
    <View>
      <Text>ProfileScreen</Text>

      <Button text="Sign Out" onPress={() => supabase.auth.signOut()} />
    </View>
  )
}

export default ProfileScreen

const styles = StyleSheet.create({})