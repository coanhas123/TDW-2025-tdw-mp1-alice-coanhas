// Path: cms-contentful-app/lib/contentful-image.tsx
import Image from "next/image";

type ContentfulFile = { url?: string } | undefined;
type ContentfulImageFields = { file?: ContentfulFile } | undefined;
type ContentfulImage = { fields?: ContentfulImageFields } | null;

type ContentfulImageProps = {
  image?: ContentfulImage | null;
  alt?: string;
  width?: number;
  height?: number;
  className?: string;
};

export default function ContentfulImage({
  image,
  alt,
  width = 800,
  height = 400,
  className,
}: ContentfulImageProps) {
  const url = image?.fields?.file?.url;
  if (!url) {
    return (
      <div
        className={className}
        style={{ width, height, background: "#eee", display: "block" }}
        aria-hidden
      />
    );
  }

  const src = url.startsWith("//") ? `https:${url}` : url;

  return (
    <Image
      src={src}
      alt={alt ?? "image"}
      width={width}
      height={height}
      className={className}
      style={{ objectFit: "cover", width: "100%" }}
      unoptimized={true}
    />
  );
}
