interface RateLimitEntry {
  count: number
  firstRequestAt: number
}

const store = new Map<string, RateLimitEntry>()

export interface RateLimitConfig {
  windowMs: number
  maxRequests: number
}

export function checkRateLimit(
  key: string,
  config: RateLimitConfig,
): { allowed: boolean; remaining: number; resetAt: number } {
  const now = Date.now()
  const entry = store.get(key)

  if (!entry || now - entry.firstRequestAt > config.windowMs) {
    store.set(key, { count: 1, firstRequestAt: now })
    return { allowed: true, remaining: config.maxRequests - 1, resetAt: now + config.windowMs }
  }

  if (entry.count >= config.maxRequests) {
    return {
      allowed: false,
      remaining: 0,
      resetAt: entry.firstRequestAt + config.windowMs,
    }
  }

  entry.count += 1
  return {
    allowed: true,
    remaining: config.maxRequests - entry.count,
    resetAt: entry.firstRequestAt + config.windowMs,
  }
}

export function getRateLimitKey(ip: string, action: string): string {
  return `${action}:${ip}`
}
