type CoverImageProps = {
  title?: string;
  src?: string;
  priority?: boolean;
  alt?: string;
};

export default function CoverImage({ title, src, priority = false, alt }: CoverImageProps) {
  const imgAlt = alt ?? title ?? "cover image";
  // Usa <img> simples para compatibilidade com export estático
  return (
    <div className="cover-image" style={{ width: "100%", overflow: "hidden" }}>
      {src ? (
        <img src={src} alt={imgAlt} style={{ width: "100%", display: "block", objectFit: "cover" }} />
      ) : (
        <div style={{ background: "#eee", padding: 40, textAlign: "center" }}>{imgAlt}</div>
      )}
    </div>
  );
}
