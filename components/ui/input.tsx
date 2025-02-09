import React from 'react';
import { TextInput, StyleSheet, TextInputProps, View, Text, TextStyle } from 'react-native';

interface InputProps extends TextInputProps {
  label?: string;
  error?: string;
  type?: string;
  required?: boolean;
  id?: string;
}

export function Input({ 
  label,
  error,
  style,
  type,
  required,
  id,
  ...props 
}: InputProps) {
  const combinedStyle = [
    styles.input,
    error && styles.inputError,
    style as TextStyle,
  ].filter(Boolean) as TextStyle[];

  return (
    <View style={styles.container}>
      {label && <Text style={styles.label}>{label}</Text>}
      <TextInput
        style={combinedStyle}
        placeholderTextColor="#A3A3A3"
        {...props}
      />
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    color: '#1F2937',
    marginBottom: 4,
  },
  input: {
    backgroundColor: '#F9FAFB',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    color: '#1F2937',
  },
  inputError: {
    borderColor: '#EF4444',
  },
  errorText: {
    color: '#EF4444',
    fontSize: 12,
    marginTop: 4,
  },
});
