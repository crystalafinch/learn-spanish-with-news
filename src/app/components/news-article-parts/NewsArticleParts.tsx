"use client";

import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
  HoverCardArrow,
} from "@radix-ui/react-hover-card";
import type {
  TranslatedNewsArticleData,
  TranslatedNewsArticlePart,
} from "@/app/types/news";

function NewsArticlePart({ part }: { part: TranslatedNewsArticlePart }) {
  return (
    <HoverCard openDelay={300} closeDelay={0}>
      <HoverCardTrigger
        className="
            hover:animate-[highlight_0.75s_forwards] 
            bg-size-[200%]
            bg-[linear-gradient(to_right,var(--background)_50%,transparent_50%),linear-gradient(var(--highlight)_0%,var(--highlight)_50%)]
            [background-position-y:-0.25em]
            "
      >
        {part.es}{" "}
      </HoverCardTrigger>
      <HoverCardContent
        side="top"
        align="start"
        className="
          bg-popover 
          text-popover-foreground 
          data-[state=open]:animate-in 
          data-[state=closed]:animate-out 
          data-[state=closed]:fade-out-0 
          data-[state=open]:fade-in-0 
          data-[state=closed]:zoom-out-95 
          data-[state=open]:zoom-in-95 
          data-[side=bottom]:slide-in-from-top-2 
          data-[side=left]:slide-in-from-right-2 
          data-[side=right]:slide-in-from-left-2 
          data-[side=top]:slide-in-from-bottom-2 
          z-50 
          origin-(--radix-hover-card-content-transform-origin) 
          rounded-md 
          border border-transparent p-4 shadow-md outline-hidden relative py-2 px-3 font-normal text-sm w-auto
        "
      >
        <span className="inline-block">{part.en}</span>
        <HoverCardArrow className="fill-popover" width={20} height={10} />
      </HoverCardContent>
    </HoverCard>
  );
}

function NewsArticleParts({ data }: { data: TranslatedNewsArticleData }) {
  return data.parts.map((part, index) =>
    part.en ? <NewsArticlePart key={index} part={part} /> : part.es + " "
  );
}

export default NewsArticleParts;
