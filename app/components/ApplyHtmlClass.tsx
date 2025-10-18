'use client';
import { useEffect } from 'react';

export default function ApplyHtmlClass({ className }: { className?: string }) {
  useEffect(() => {
    if (!className) return;
    const docEl = document.documentElement;
    const classes = className.split(/\s+/).filter(Boolean);
    docEl.classList.add(...classes);
    return () => {
      docEl.classList.remove(...classes);
    };
  }, [className]);

  return null;
}
