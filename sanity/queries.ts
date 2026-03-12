import { groq } from "next-sanity";

/**
 * Fetches the 10 most recent published articles,
 * ordered by publication date (newest first).
 *
 * Schema: sanity/schemaTypes/article.ts
 *   - title              (string)
 *   - slug               (slug)
 *   - originalArticleUrl (url)
 *   - mainImage          (image, with alt subfield)
 *   - tldr               (text — short hook)
 *   - summaryPoints      (array of text)
 *   - publishedAt        (datetime)
 */
export const LATEST_ARTICLES_QUERY = groq`
  *[_type == "article"] | order(publishedAt desc)[0...10] {
    _id,
    title,
    "slug": slug.current,
    originalArticleUrl,
    "mainImageUrl": mainImage.asset->url,
    "mainImageAlt": mainImage.alt,
    tldr,
    summaryPoints,
    "publishedDate": publishedAt
  }
`;
