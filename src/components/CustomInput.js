import React from 'react';
import { TextInput, StyleSheet } from 'react-native';
import styles from './styles';
export default function CustomInput({ placeholder, value, onChangeText, secureTextEntry }) {
  return (
    <TextInput 
      style={styles.input}
      placeholder={placeholder}
      value={value}
      onChangeText={onChangeText}
      secureTextEntry={secureTextEntry}
    />
  );
}

