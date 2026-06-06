
const cache = {}
const TTL = 60 * 1000 

export function getCache(key) {
  const entry = cache[key]
  if (!entry) return null
  if (Date.now() - entry.timestamp > TTL) {
    delete cache[key]
    return null
  }
  return entry.data
}

export function setCache(key, data) {
  cache[key] = { data, timestamp: Date.now() }
}