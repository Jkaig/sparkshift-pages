import { Stack } from 'expo-router';
import { View, Text, TouchableOpacity, StyleSheet, useWindowDimensions } from 'react-native';
import { Link } from 'expo-router';

function CustomHeader() {
  const { width } = useWindowDimensions();
  const isMobile = width < 768;

  return (
    <View style={[styles.header, isMobile && styles.headerMobile]}>
      <Link href="/" asChild>
        <TouchableOpacity>
          <Text style={styles.logo}>SparkShift</Text>
        </TouchableOpacity>
      </Link>
      
      <View style={[styles.nav, isMobile && styles.navMobile]}>
        <Link href="/" asChild>
          <TouchableOpacity style={styles.navItem}>
            <Text style={styles.navText}>Home</Text>
          </TouchableOpacity>
        </Link>
        <Link href="/screens/pricing" asChild>
          <TouchableOpacity style={styles.navItem}>
            <Text style={styles.navText}>Pricing</Text>
          </TouchableOpacity>
        </Link>
        <Link href="/screens/resources" asChild>
          <TouchableOpacity style={styles.navItem}>
            <Text style={styles.navText}>Resources</Text>
          </TouchableOpacity>
        </Link>
        <TouchableOpacity style={styles.signInButton}>
          <Text style={styles.signInText}>Sign In</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default function Layout() {
  return (
    <Stack
      screenOptions={{
        header: () => <CustomHeader />,
        contentStyle: { backgroundColor: '#1a1a1a' },
      }}
    />
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: '#2a2a2a',
  },
  headerMobile: {
    flexDirection: 'column',
    paddingVertical: 10,
  },
  logo: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  nav: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 20,
  },
  navMobile: {
    flexDirection: 'column',
    width: '100%',
    marginTop: 10,
    gap: 10,
  },
  navItem: {
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  navText: {
    color: '#ffffff',
    fontSize: 16,
  },
  signInButton: {
    backgroundColor: '#007AFF',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
  },
  signInText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
});
