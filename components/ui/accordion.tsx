import React, { useState } from 'react';
import { View, Text, Pressable, StyleSheet, ViewProps } from 'react-native';

interface AccordionItemProps {
  title?: string;
  value: string;
  children: React.ReactNode;
}

interface AccordionProps extends ViewProps {
  type?: 'single' | 'multiple';
  collapsible?: boolean;
  children: React.ReactElement<AccordionItemProps>[];
}

interface AccordionTriggerProps {
  children: React.ReactNode;
}

interface AccordionContentProps {
  children: React.ReactNode;
}

export function AccordionTrigger({ children }: AccordionTriggerProps) {
  return (
    <View style={styles.trigger}>
      <Text style={styles.title}>{children}</Text>
      <Text style={styles.icon}>▼</Text>
    </View>
  );
}

export function AccordionContent({ children }: AccordionContentProps) {
  return <View style={styles.content}>{children}</View>;
}

export function AccordionItem({ title, value, children }: AccordionItemProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <View style={styles.item}>
      <Pressable onPress={() => setIsOpen(!isOpen)}>
        <AccordionTrigger>{title || value}</AccordionTrigger>
      </Pressable>
      {isOpen && <AccordionContent>{children}</AccordionContent>}
    </View>
  );
}

export function Accordion({ type = 'single', collapsible = false, children, style, ...props }: AccordionProps) {
  return (
    <View style={[styles.root, style]} {...props}>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    width: '100%',
  },
  item: {
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  trigger: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
  },
  title: {
    fontSize: 16,
    fontWeight: '500',
    color: '#1F2937',
  },
  icon: {
    fontSize: 12,
    color: '#6B7280',
  },
  content: {
    padding: 16,
    backgroundColor: '#F9FAFB',
  },
});
