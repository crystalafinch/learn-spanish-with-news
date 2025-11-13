"use client";

import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
  HoverCardArrow,
} from "@radix-ui/react-hover-card";
import type { TranslatedNewsArticlePart } from "@/app/types/news";

function NewsArticlePart({ part }: { part: TranslatedNewsArticlePart }) {
  return (
    <HoverCard openDelay={300} closeDelay={0}>
      <HoverCardTrigger className="inline-block bg-[linear-gradient(to_right,var(--background)_50%,transparent_50%),linear-gradient(var(--highlight)_0%,var(--highlight)_50%)] bg-size-[200%] [background-position-y:-0.25em] hover:animate-[highlight_0.75s_forwards]">
        {part.es}
      </HoverCardTrigger>{" "}
      <HoverCardContent
        side="top"
        align="start"
        className="bg-popover text-popover-foreground data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 relative z-50 w-auto origin-(--radix-hover-card-content-transform-origin) rounded-md border border-transparent p-4 px-3 py-2 text-sm font-normal shadow-md outline-hidden"
      >
        <span className="inline-block">{part.en}</span>
        <HoverCardArrow className="fill-popover" width={20} height={10} />
      </HoverCardContent>
    </HoverCard>
  );
}

function NewsArticleParts({ data }: { data: TranslatedNewsArticlePart[] }) {
  return data.map((part, index) => <NewsArticlePart key={index} part={part} />);
}

export default NewsArticleParts;
