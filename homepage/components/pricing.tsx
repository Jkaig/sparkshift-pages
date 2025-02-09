import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/homepage/components/ui/button";
import { Check } from "lucide-react";
import { View, Text, StyleSheet, Pressable } from "react-native";

const tiers = [
  {
    name: "Free",
    id: "tier-free",
    href: "#",
    price: { monthly: "$0", annually: "$0" },
    description: "Get started with basic evaluations",
    features: [
      "3 evaluations per month",
      "Basic analytics",
      "Email support",
      "Basic templates",
    ],
    featured: false,
  },
  {
    name: "Professional",
    id: "tier-professional",
    href: "#",
    price: { monthly: "$15", annually: "$144" },
    description: "Perfect for growing teams",
    features: [
      "Unlimited evaluations",
      "Advanced analytics",
      "Priority support",
      "Custom templates",
      "Team collaboration",
      "API access",
    ],
    featured: true,
  },
  {
    name: "Enterprise",
    id: "tier-enterprise",
    href: "#",
    price: { monthly: "Custom", annually: "Custom" },
    description: "For large organizations",
    features: [
      "Everything in Professional",
      "Custom integrations",
      "Dedicated support",
      "SLA",
      "Custom reporting",
      "On-premise deployment",
    ],
    featured: false,
  },
];

export default function Pricing() {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Simple, transparent pricing</Text>
        <Text style={styles.subtitle}>
          Choose the plan that's right for your team
        </Text>
      </View>

      <View style={styles.tiersContainer}>
        {tiers.map((tier) => (
          <motion.div
            key={tier.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <View
              style={[
                styles.tierCard,
                tier.featured && styles.featuredTierCard,
              ]}
            >
              <View style={styles.tierHeader}>
                <Text style={styles.tierName}>{tier.name}</Text>
                <Text style={styles.tierPrice}>{tier.price.monthly}</Text>
                <Text style={styles.tierDescription}>{tier.description}</Text>
              </View>

              <View style={styles.featuresContainer}>
                {tier.features.map((feature) => (
                  <View key={feature} style={styles.featureRow}>
                    <Check size={20} />
                    <Text style={styles.featureText}>{feature}</Text>
                  </View>
                ))}
              </View>

              <Button
                variant={tier.featured ? "default" : "outline"}
                style={styles.button}
              >
                Get started
              </Button>
            </View>
          </motion.div>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
    alignItems: "center",
  },
  header: {
    alignItems: "center",
    marginBottom: 48,
  },
  title: {
    fontSize: 36,
    fontWeight: "bold",
    marginBottom: 16,
  },
  subtitle: {
    fontSize: 18,
    color: "#666",
  },
  tiersContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: 24,
  },
  tierCard: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 24,
    width: 320,
    borderWidth: 1,
    borderColor: "#eee",
  },
  featuredTierCard: {
    borderColor: "#000",
    borderWidth: 2,
  },
  tierHeader: {
    marginBottom: 24,
  },
  tierName: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 8,
  },
  tierPrice: {
    fontSize: 48,
    fontWeight: "bold",
    marginBottom: 8,
  },
  tierDescription: {
    color: "#666",
  },
  featuresContainer: {
    marginBottom: 24,
  },
  featureRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  featureText: {
    marginLeft: 12,
  },
  button: {
    width: "100%",
  },
});
