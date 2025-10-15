// Path: cms-contentful-app/app/cover-image.tsx
import Image from "next/image";

type CoverImageProps = {
  title?: string;
  src?: string | null;
  alt?: string;
  width?: number;
  height?: number;
  className?: string;
};

export default function CoverImage({
  title,
  src,
  alt,
  width = 1200,
  height = 600,
  className,
}: CoverImageProps) {
  const imgAlt = alt ?? title ?? "cover image";

  if (!src) {
    return (
      <div
        className={className}
        style={{
          width: "100%",
          maxWidth: width,
          height,
          background: "#eee",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
        aria-hidden
      >
        <span style={{ color: "#666" }}>{imgAlt}</span>
      </div>
    );
  }

  const srcFixed = src.startsWith("//") ? `https:${src}` : src;

  return (
    <div style={{ width: "100%", maxWidth: width, overflow: "hidden" }} className={className}>
      <Image
        src={srcFixed}
        alt={imgAlt}
        width={width}
        height={height}
        style={{ width: "100%", height: "auto", objectFit: "cover" }}
        unoptimized={true}
      />
    </div>
  );
}
