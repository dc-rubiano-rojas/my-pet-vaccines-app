import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import styles from './screenheader.style'
import { router } from 'expo-router'

const ScreeanHeader = ({ title }: any) => {
  return (
    <View style={styles.headerContainer}>

      <TouchableOpacity onPress={() => router.push('/(auth)/home')

      } style={styles.headerButton}>

        {/*           <Image source={icons.upload} style={styles.upload}
        resizeMode="contain"
      /> */}
        <Text style={styles.headerText}>{title}</Text>
      </TouchableOpacity>
    </View>
  )
}

export default ScreeanHeader