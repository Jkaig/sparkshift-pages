import React from 'react';
import { View, Text, StyleSheet, Pressable, Modal } from 'react-native';
import { Picker } from '@react-native-picker/picker';

export interface SelectProps {
  value: string;
  onValueChange: (value: string) => void;
  children?: React.ReactNode;
  placeholder?: string;
  style?: any;
}

export interface SelectItemProps {
  value: string;
  children: React.ReactNode;
}

export const SelectItem: React.FC<SelectItemProps> = () => null; // This is just for type compatibility

export const SelectTrigger: React.FC<{ children: React.ReactNode }> = ({ children }) => children;
export const SelectValue: React.FC<{ placeholder?: string }> = ({ placeholder }) => (
  <Text style={styles.placeholder}>{placeholder}</Text>
);
export const SelectContent: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Process children to extract values
  const items = React.Children.map(children, (child) => {
    if (React.isValidElement(child) && child.props) {
      return {
        label: child.props.children,
        value: child.props.value
      };
    }
    return null;
  })?.filter(Boolean) ?? [];
  
  return <>{items}</>;
};

export function Select({ value, onValueChange, children, placeholder, style }: SelectProps) {
  // Process children to extract values
  const content = React.Children.toArray(children).find(
    child => React.isValidElement(child) && child.type === SelectContent
  );
  
  const items = content ? React.Children.toArray((content as React.ReactElement).props.children)
    .map(child => {
      if (React.isValidElement(child) && child.props) {
        return {
          label: child.props.children,
          value: child.props.value
        };
      }
      return null;
    }).filter(Boolean) : [];

  return (
    <View style={[styles.container, style]}>
      <Picker
        selectedValue={value}
        onValueChange={onValueChange}
        style={styles.picker}
      >
        {placeholder && (
          <Picker.Item label={placeholder} value="" />
        )}
        {items.map((item: any) => (
          <Picker.Item
            key={item.value}
            label={item.label}
            value={item.value}
          />
        ))}
      </Picker>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    backgroundColor: '#fff',
  },
  picker: {
    height: 50,
    width: '100%',
  },
  placeholder: {
    color: '#666',
    fontSize: 16,
  },
});
