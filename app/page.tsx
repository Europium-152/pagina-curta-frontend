import ArticleCard from "./components/ArticleCard";
import ThemeToggle from "./components/ThemeToggle";
import { client, isSanityConfigured } from "@/sanity/client";
import { LATEST_ARTICLES_QUERY } from "@/sanity/queries";
import type { Article } from "@/sanity/types";

export const revalidate = 60; // ISR: re-fetch from Sanity every 60 seconds

export default async function Home() {
  const articles = isSanityConfigured
    ? await client!.fetch<Article[]>(LATEST_ARTICLES_QUERY)
    : [];

  return (
    <div className="min-h-screen bg-zinc-100 dark:bg-zinc-950">
      {/* Header */}
      <header className="sticky top-0 z-10 border-b border-zinc-200 bg-white/80 backdrop-blur-md dark:border-zinc-800 dark:bg-zinc-900/80">
        <div className="mx-auto flex h-14 max-w-2xl items-center px-4">
          {/* Spacer — mirrors button width to keep logo centred */}
          <div className="w-9 shrink-0" />
          <div className="flex flex-1 justify-center">
            <img src="/logo-light.svg" alt="Página Curta" className="block h-7 w-auto dark:hidden" />
            <img src="/logo-dark.svg" alt="Página Curta" className="hidden h-7 w-auto dark:block" />
          </div>
          <ThemeToggle />
        </div>
      </header>

      {/* Feed */}
      <main className="mx-auto max-w-2xl">
        <div className="flex flex-col gap-2 py-2 sm:gap-4 sm:py-4">
          {articles.length > 0 ? (
            articles.map((article) => (
              <ArticleCard
                key={article._id}
                title={article.title}
                image={article.mainImageUrl ?? ""}
                imageAlt={article.mainImageAlt ?? ""}
                tldr={article.tldr ?? ""}
                summaryPoints={article.summaryPoints ?? []}
                originalArticleUrl={article.originalArticleUrl}
                publishedDate={article.publishedDate}
              />
            ))
          ) : (
            <div className="px-4 py-20 text-center">
              <p className="text-sm text-zinc-400 dark:text-zinc-500">
                Nenhum artigo disponivel no momento.
              </p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
