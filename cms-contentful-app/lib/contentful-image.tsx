type ContentfulFile = { url?: string } | undefined;
type ContentfulImageFields = { file?: ContentfulFile } | undefined;
type ContentfulImage = {
  sys?: Record<string, unknown>;
  fields?: ContentfulImageFields;
} | null;

type ContentfulImageProps = {
  image?: ContentfulImage;
  alt?: string;
  width?: number;
  height?: number;
};

export default function ContentfulImage({
  image,
  alt,
  width = 800,
  height = 400,
}: ContentfulImageProps) {
  const url = image?.fields?.file?.url;
  const safeAlt = alt ?? "image";
  if (!url) {
    return <div style={{ width, height, background: "#eee" }} aria-hidden />;
  }
  // Contentful URLs sometimes lack protocol; ensure valid src
  const src = url.startsWith("//") ? `https:${url}` : url;
  return (
    <img
      src={src}
      alt={safeAlt}
      width={width}
      height={height}
      style={{ objectFit: "cover", width: "100%" }}
    />
  );
}
