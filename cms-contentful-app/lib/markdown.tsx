// Path: cms-contentful-app/lib/markdown.tsx
import React from "react";

type MarkdownProps = {
  content?: string | null;
  className?: string;
};

export default function Markdown({ content, className }: MarkdownProps) {
  if (!content || typeof content !== "string") return null;

  const paragraphs = content
    .split(/\n\s*\n/)
    .filter(Boolean)
    .map((p, i) => (
      // simple, safe rendering of paragraphs; use a Markdown renderer if needed
      <p key={i} style={{ marginBottom: "0.75rem" }}>
        {p}
      </p>
    ));

  return <div className={className}>{paragraphs}</div>;
}
