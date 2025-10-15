type AvatarProps = {
  name?: string;
  pictureUrl?: string;
  size?: number;
};

export default function Avatar({ name, pictureUrl, size = 48 }: AvatarProps) {
  const px = `${size}px`;
  return (
    <img
      src={pictureUrl ?? "/placeholder.png"}
      alt={name ?? "avatar"}
      width={size}
      height={size}
      style={{ width: px, height: px, borderRadius: "50%", objectFit: "cover" }}
    />
  );
}
