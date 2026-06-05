// Simple in-memory cache with TTL (time-to-live)
const cache = new Map();
const TTL_MS = 5 * 60 * 1000; // 5 minutes

export function getCache(key) {
  const entry = cache.get(key);
  if (!entry) return null;
  if (Date.now() > entry.expiresAt) {
    cache.delete(key);
    return null;
  }
  return entry.data;
}

export function setCache(key, data) {
  cache.set(key, { data, expiresAt: Date.now() + TTL_MS });
}
