// src/config/redis.js
import { createClient } from "redis";
import { ENV } from "./config.js";



export default client = createClient({ url: process.env.REDIS_URL })
await client.connect()


