import React from 'react';
import { TextInput, TextInputProps, StyleSheet, TextStyle, ViewStyle } from 'react-native';
import { cn } from '../../lib/utils';

interface TextareaProps extends Omit<TextInputProps, 'style'> {
  placeholder?: string;
  style?: TextStyle;
  value?: string;
  onChangeText?: (text: string) => void;
  minHeight?: number;
  error?: boolean;
}

export function Textarea({
  placeholder,
  style,
  value,
  onChangeText,
  minHeight = 100,
  error,
  ...props
}: TextareaProps) {
  const combinedStyle = [
    styles.textarea,
    error && styles.error,
    { minHeight },
    style,
  ].filter(Boolean) as TextStyle[];

  return (
    <TextInput
      style={combinedStyle}
      placeholder={placeholder}
      value={value}
      onChangeText={onChangeText}
      multiline
      textAlignVertical="top"
      placeholderTextColor="#666"
      {...props}
    />
  );
}

const styles = StyleSheet.create({
  textarea: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 6,
    padding: 12,
    fontSize: 16,
    color: '#1A202C',
  },
  error: {
    borderColor: '#EF4444',
  },
});
