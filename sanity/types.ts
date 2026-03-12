/**
 * Represents an Article document as returned by the
 * LATEST_ARTICLES_QUERY GROQ projection.
 *
 * Matches the Sanity schema at sanity/schemaTypes/article.ts
 */
export interface Article {
  _id: string;
  title: string;
  slug: string;
  originalArticleUrl: string;
  mainImageUrl: string | null;
  mainImageAlt: string | null;
  tldr: string;
  summaryPoints: string[];
  publishedDate: string;
}
