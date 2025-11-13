import { APP_CONFIG } from "../config/config.js";
const redis = () => APP_CONFIG.REDIS;

export const cacheService = {
  async get(key) {
    const client = redis();
    if (!client) return null; // Redis not ready
    const v = await client.get(key);
    if (!v) return null;
    try { return JSON.parse(v); } catch { return v; }
  },

  async set(key, value, ttlSec = 600) {
    const client = redis();
    if (!client) return; // Redis not ready
    await client.set(key, JSON.stringify(value), { EX: ttlSec });
  },

  async delPattern(pattern) {
    const client = redis();
    if (!client) return 0; // Redis not ready
    const keys = await client.keys(pattern);
    if (keys.length) await client.del(keys);
    return keys.length;
  }
};