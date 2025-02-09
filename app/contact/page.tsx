import React from 'react';
import { View, Text } from 'react-native';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

export default function ContactPage() {
  return (
    <View style={{ flex: 1, padding: 16, alignItems: 'center' }}>
      <Card>
        <CardHeader>
          <CardTitle>Contact Us</CardTitle>
          <CardDescription>
            Send us a message and we'll get back to you as soon as possible.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <View style={{ gap: 16 }}>
            <View>
              <Label>Name</Label>
              <Input placeholder="Your name" />
            </View>
            
            <View>
              <Label>Email</Label>
              <Input 
                placeholder="Your email" 
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>
            
            <View>
              <Label>Message</Label>
              <Textarea 
                placeholder="Type your message here"
                style={{ minHeight: 120 }}
              />
            </View>
            
            <Button>
              Send Message
            </Button>
          </View>
        </CardContent>
      </Card>
    </View>
  );
}
