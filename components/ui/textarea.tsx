import React from 'react';
import { TextInput, StyleSheet, TextInputProps, TextStyle } from 'react-native';

interface TextareaProps extends TextInputProps {
  error?: boolean;
}

export function Textarea({ 
  style, 
  error,
  ...props 
}: TextareaProps) {
  const combinedStyle = [
    styles.textarea,
    error && styles.error,
    style as TextStyle,
  ].filter(Boolean) as TextStyle[];

  return (
    <TextInput
      style={combinedStyle}
      multiline
      numberOfLines={4}
      textAlignVertical="top"
      {...props}
    />
  );
}

const styles = StyleSheet.create({
  textarea: {
    backgroundColor: '#F9FAFB',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    color: '#1F2937',
    minHeight: 120,
  },
  error: {
    borderColor: '#EF4444',
  },
});
