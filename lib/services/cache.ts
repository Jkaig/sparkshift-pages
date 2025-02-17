import AsyncStorage from '@react-native-async-storage/async-storage';

interface CacheConfig {
  maxAge?: number; // in milliseconds
  staleWhileRevalidate?: number; // in milliseconds
}

interface CacheEntry<T> {
  value: T;
  timestamp: number;
}

export class Cache {
  private static instance: Cache;
  private memoryCache: Map<string, CacheEntry<any>>;

  private constructor() {
    this.memoryCache = new Map();
  }

  static getInstance(): Cache {
    if (!Cache.instance) {
      Cache.instance = new Cache();
    }
    return Cache.instance;
  }

  async get<T>(key: string, config?: CacheConfig): Promise<T | null> {
    // Check memory cache first
    const memoryEntry = this.memoryCache.get(key);
    if (memoryEntry) {
      if (this.isValid(memoryEntry, config)) {
        return memoryEntry.value;
      }
      this.memoryCache.delete(key);
    }

    // Check persistent storage
    try {
      const stored = await AsyncStorage.getItem(key);
      if (stored) {
        const entry: CacheEntry<T> = JSON.parse(stored);
        if (this.isValid(entry, config)) {
          this.memoryCache.set(key, entry);
          return entry.value;
        }
        await AsyncStorage.removeItem(key);
      }
    } catch (error) {
      console.error('Cache read error:', error);
    }

    return null;
  }

  async set<T>(key: string, value: T): Promise<void> {
    const entry: CacheEntry<T> = {
      value,
      timestamp: Date.now(),
    };

    // Update memory cache
    this.memoryCache.set(key, entry);

    // Update persistent storage
    try {
      await AsyncStorage.setItem(key, JSON.stringify(entry));
    } catch (error) {
      console.error('Cache write error:', error);
    }
  }

  async invalidate(key: string): Promise<void> {
    this.memoryCache.delete(key);
    try {
      await AsyncStorage.removeItem(key);
    } catch (error) {
      console.error('Cache invalidation error:', error);
    }
  }

  private isValid<T>(entry: CacheEntry<T>, config?: CacheConfig): boolean {
    if (!config) return true;

    const age = Date.now() - entry.timestamp;
    
    if (config.maxAge && age > config.maxAge) {
      return false;
    }

    if (config.staleWhileRevalidate && age > config.staleWhileRevalidate) {
      return false;
    }

    return true;
  }
}

export const cache = Cache.getInstance();