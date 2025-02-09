import React from 'react';
import { TextInput, StyleSheet, TextInputProps, View, Text, TextStyle, Platform } from 'react-native';

interface InputProps extends Omit<TextInputProps, 'style'> {
  label?: string;
  error?: string;
  type?: string;
  name?: string;
  id?: string;
  placeholder?: string;
  style?: TextStyle;
  required?: boolean;
  keyboardType?: 'default' | 'email-address' | 'numeric' | 'phone-pad';
  autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters';
  secureTextEntry?: boolean;
  value?: string;
  onChangeText?: (text: string) => void;
}

const baseInputStyle: TextStyle = {
  height: 40,
  paddingHorizontal: 12,
  fontSize: 16,
  backgroundColor: '#fff',
};

const webInputStyle: TextStyle = Platform.select({
  web: {
    ...baseInputStyle,
    outline: 'none',
  },
  default: baseInputStyle,
}) as TextStyle;

export function Input({
  label,
  error,
  type = 'text',
  name,
  id,
  placeholder,
  style,
  required,
  keyboardType = 'default',
  autoCapitalize = 'none',
  secureTextEntry,
  value,
  onChangeText,
  ...props
}: InputProps) {
  const inputStyle: TextStyle = {
    ...webInputStyle,
    ...(error ? { borderColor: '#ff0000' } : { borderColor: '#ccc' }),
    ...(style || {}),
    borderWidth: 1,
    borderRadius: 4,
  };

  return (
    <View style={styles.container}>
      {label && (
        <Text style={styles.label}>
          {label}
          {required && <Text style={styles.required}> *</Text>}
        </Text>
      )}
      <TextInput
        style={inputStyle}
        placeholder={placeholder}
        keyboardType={keyboardType}
        autoCapitalize={autoCapitalize}
        secureTextEntry={secureTextEntry}
        value={value}
        onChangeText={onChangeText}
        {...props}
      />
      {error && <Text style={styles.error}>{error}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    marginBottom: 8,
    color: '#000',
  },
  required: {
    color: '#ff0000',
  },
  error: {
    color: '#ff0000',
    fontSize: 12,
    marginTop: 4,
  },
});
