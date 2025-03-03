"use server";
import { auth } from "@/auth";
import { generateDescriptionFromTitleAI } from "@/lib/AI";
import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

// Create a new ratelimiter that allows 5 requests per 24 hours
const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL || "",
  token: process.env.UPSTASH_REDIS_REST_TOKEN || "",
});

const ratelimit = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(5, "24 h"),
  analytics: true,
  prefix: "@upstash/ratelimit",
});

async function generateDescriptionFromTitle(title: string) {
  try {
    const session = await auth();
    if (!session) return { error: "Unauthorized" };
    if (!session.user?.email) return { error: "No user email found" };

    // Rate limit by user email
    const { success, reset, remaining } = await ratelimit.limit(
      session.user.email
    );

    if (!success) {
      const now = Date.now();
      const resetIn = Math.floor((reset - now) / 1000 / 60); // minutes
      return {
        error: `Rate limit exceeded. You have ${remaining} generations left. Please try again in ${resetIn} minutes.`,
      };
    }

    const result = await generateDescriptionFromTitleAI(title);
    return {
      output: result,
      remaining: remaining - 1, // Subtract 1 because the current request counts
    };
  } catch (error) {
    console.error("Error generating description:", error);
    return { error: "Failed to generate description" };
  }
}

export { generateDescriptionFromTitle };
