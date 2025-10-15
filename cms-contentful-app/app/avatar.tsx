// Path: cms-contentful-app/app/avatar.tsx
import Image from "next/image";

type AvatarProps = {
  name?: string;
  pictureUrl?: string;
  size?: number;
  className?: string;
};

export default function Avatar({ name, pictureUrl, size = 48, className }: AvatarProps) {
  const px = Math.max(16, size);
  const src = pictureUrl ? (pictureUrl.startsWith("//") ? `https:${pictureUrl}` : pictureUrl) : "/placeholder.png";

  return (
    <Image
      src={src}
      alt={name ?? "avatar"}
      width={px}
      height={px}
      className={className}
      style={{ borderRadius: "50%", objectFit: "cover" }}
      unoptimized={true}
    />
  );
}
