"use client";

import Image from "next/image";
import { useState } from "react";

interface ArticleCardProps {
  title: string;
  image: string;
  imageAlt: string;
  tldr: string;
  summaryPoints: string[];
  originalArticleUrl: string;
  publishedDate: string;
}

export default function ArticleCard({
  title,
  image,
  imageAlt,
  tldr,
  summaryPoints,
  originalArticleUrl,
  publishedDate,
}: ArticleCardProps) {
  const [expanded, setExpanded] = useState(false);

  const formattedDate = new Date(publishedDate).toLocaleDateString("pt-BR", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  return (
    <article className="w-full bg-white dark:bg-zinc-900">
      {/* Image — edge-to-edge on mobile, constrained on larger screens */}
      {image && (
        <div className="relative aspect-[4/3] w-full overflow-hidden">
          <Image
            src={image}
            alt={imageAlt || title}
            fill
            sizes="(max-width: 640px) 100vw, 640px"
            className="object-cover"
          />
        </div>
      )}

      {/* Content */}
      <div className="px-4 py-4 sm:px-6">
        {/* Date */}
        <time
          dateTime={publishedDate}
          className="text-xs font-medium uppercase tracking-wider text-zinc-400 dark:text-zinc-500"
        >
          {formattedDate}
        </time>

        {/* Title — bold, high contrast */}
        <h2 className="mt-2 text-xl font-extrabold leading-tight text-zinc-950 dark:text-white sm:text-2xl">
          {title}
        </h2>

        {/* TLDR — subtle hook */}
        {tldr && (
          <p className="mt-2 text-sm leading-relaxed text-zinc-500 dark:text-zinc-400">
            {tldr}
          </p>
        )}

        {/* Expandable summary points */}
        {summaryPoints.length > 0 && (
          <>
            <button
              type="button"
              onClick={() => setExpanded(!expanded)}
              className="mt-3 flex min-h-[44px] items-center gap-1.5 text-sm font-medium text-zinc-950 active:text-zinc-600 dark:text-zinc-200 dark:active:text-zinc-400"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className={`h-4 w-4 shrink-0 transition-transform duration-200 ${expanded ? "rotate-90" : ""}`}
              >
                <path
                  fillRule="evenodd"
                  d="M8.22 5.22a.75.75 0 0 1 1.06 0l4.25 4.25a.75.75 0 0 1 0 1.06l-4.25 4.25a.75.75 0 0 1-1.06-1.06L11.94 10 8.22 6.28a.75.75 0 0 1 0-1.06Z"
                  clipRule="evenodd"
                />
              </svg>
              {expanded ? "Esconder resumo" : "Ver resumo"}
            </button>

            {expanded && (
              <ul className="mt-2 space-y-1.5">
                {summaryPoints.map((point, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-2 text-sm leading-relaxed text-zinc-500 dark:text-zinc-400"
                  >
                    <span
                      aria-hidden="true"
                      className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-zinc-300 dark:bg-zinc-600"
                    />
                    {point}
                  </li>
                ))}
              </ul>
            )}
          </>
        )}

        {/* CTA — large touch target for mobile thumbs (min 48px) */}
        <a
          href={originalArticleUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 flex w-full items-center justify-center rounded-xl bg-zinc-950 py-3.5 text-sm font-semibold text-white transition-colors active:bg-zinc-700 dark:bg-white dark:text-zinc-950 dark:active:bg-zinc-300 sm:w-auto sm:px-8"
        >
          Ler mais
        </a>
      </div>
    </article>
  );
}
