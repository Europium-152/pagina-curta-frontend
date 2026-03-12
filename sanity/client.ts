import { createClient } from "next-sanity";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;

/**
 * Whether the Sanity project ID has been configured.
 * When false, queries will return empty results instead of crashing.
 */
export const isSanityConfigured =
  !!projectId && /^[a-z0-9-]+$/.test(projectId);

export const client = isSanityConfigured
  ? createClient({
      projectId,
      dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
      apiVersion:
        process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2025-03-01",
      useCdn: true,
    })
  : null;
