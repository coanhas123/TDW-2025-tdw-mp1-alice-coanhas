import React from "react";

type MarkdownProps = {
  content?: string | null;
};

export default function Markdown({ content }: MarkdownProps) {
  if (!content || typeof content !== "string") {
    return null;
  }

  // Se não tens um renderer, faz um render básico (substitui parágrafos)
  const paragraphs = content.split(/\n\s*\n/).map((p, i) => <p key={i}>{p}</p>);

  return <div className="markdown-content">{paragraphs}</div>;
}
