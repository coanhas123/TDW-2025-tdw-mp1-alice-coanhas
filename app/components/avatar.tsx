import Image from "next/image";

interface AvatarProps {
  name: string;
  picture: {
    url: string;
    width: number;
    height: number;
  };
}

export default function Avatar({ name, picture }: AvatarProps) {
  // Use um placeholder se a URL da imagem não existir
  const imageUrl =
    picture?.url || "https://placehold.co/60x60/334155/FFFFFF?text=AV";

  return (
    <div className="flex items-center space-x-4">
      <div className="w-10 h-10 relative rounded-full overflow-hidden">
        <Image
          src={imageUrl}
          alt={`Foto de ${name}`}
          className="object-cover"
          width={40}
          height={40}
        />
      </div>
      <div className="text-sm font-semibold text-gray-800">{name}</div>
    </div>
  );
}
