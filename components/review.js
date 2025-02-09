"use client"

import { useEffect, useState } from "react"
import { View, Text, StyleSheet, ScrollView } from "react-native"
import { useSearchParams, useRouter } from "expo-router"
import { getFirestore, doc, getDoc, updateDoc } from "firebase/firestore"
import { getAuth } from "firebase/auth"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"

export default function ReviewScreen() {
  const { evaluationId } = useSearchParams()
  const router = useRouter()
  const [evaluation, setEvaluation] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [feedback, setFeedback] = useState({})
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    loadEvaluation()
  }, []) // Removed unnecessary evaluationId dependency

  const loadEvaluation = async () => {
    try {
      if (!evaluationId) {
        throw new Error("No evaluation ID provided")
      }

      const db = getFirestore()
      const evaluationRef = doc(db, "evaluations", evaluationId)
      const evaluationDoc = await getDoc(evaluationRef)

      if (!evaluationDoc.exists()) {
        throw new Error("Evaluation not found")
      }

      setEvaluation(evaluationDoc.data())
      if (evaluationDoc.data().feedback) {
        setFeedback(evaluationDoc.data().feedback)
      }
    } catch (err) {
      console.error("Error loading evaluation:", err)
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async () => {
    try {
      setSubmitting(true)
      const auth = getAuth()
      const user = auth.currentUser

      if (!user) {
        throw new Error("You must be signed in to submit a review")
      }

      const db = getFirestore()
      const evaluationRef = doc(db, "evaluations", evaluationId)

      await updateDoc(evaluationRef, {
        feedback,
        reviewedBy: user.uid,
        reviewedAt: new Date().toISOString(),
        status: "reviewed",
      })

      router.push({
        pathname: "/screens/success",
        params: { message: "Review submitted successfully" },
      })
    } catch (err) {
      console.error("Error submitting review:", err)
      setError(err.message)
    } finally {
      setSubmitting(false)
    }
  }

  if (loading) {
    return (
      <View style={styles.container}>
        <Text style={styles.loadingText}>Loading evaluation...</Text>
      </View>
    )
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>{error}</Text>
        <Button onClick={() => router.back()}>Go Back</Button>
      </View>
    )
  }

  return (
    <ScrollView style={styles.container}>
      <Card className="m-4">
        <CardContent className="p-6">
          <Text style={styles.title}>Evaluation Review</Text>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Apprentice Information</Text>
            <Text style={styles.text}>Name: {evaluation.apprenticeName}</Text>
            <Text style={styles.text}>Date: {new Date(evaluation.date).toLocaleDateString()}</Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Skills Assessment</Text>
            {evaluation.skills.map((skill, index) => (
              <View key={index} style={styles.skillItem}>
                <Text style={styles.skillTitle}>{skill.name}</Text>
                <Textarea
                  placeholder="Enter feedback..."
                  value={feedback[skill.id] || ""}
                  onChange={(e) =>
                    setFeedback((prev) => ({
                      ...prev,
                      [skill.id]: e.target.value,
                    }))
                  }
                />
              </View>
            ))}
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Overall Comments</Text>
            <Textarea
              placeholder="Enter overall comments..."
              value={feedback.overall || ""}
              onChange={(e) =>
                setFeedback((prev) => ({
                  ...prev,
                  overall: e.target.value,
                }))
              }
            />
          </View>

          <Button onClick={handleSubmit} disabled={submitting}>
            {submitting ? "Submitting..." : "Submit Review"}
          </Button>
        </CardContent>
      </Card>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f4f4f5",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#18181b",
    marginBottom: 20,
  },
  section: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: "#18181b",
    marginBottom: 15,
  },
  text: {
    fontSize: 16,
    color: "#52525b",
    marginBottom: 5,
  },
  skillItem: {
    marginBottom: 20,
  },
  skillTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#18181b",
    marginBottom: 10,
  },
  loadingText: {
    color: "#52525b",
    fontSize: 16,
    textAlign: "center",
    marginTop: 20,
  },
  errorText: {
    color: "#ef4444",
    fontSize: 16,
    textAlign: "center",
    marginTop: 20,
    marginBottom: 20,
  },
})

