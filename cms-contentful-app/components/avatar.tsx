import Image from 'next/image';

interface AvatarProps {
  name: string;
  picture: {
    url: string;
    width: number;
    height: number;
  };
}

// Este componente precisa estar dentro da pasta 'components/' para ser referenciado.
export default function Avatar({ name, picture }: AvatarProps) {
  // Nota: Assumimos que o campo 'picture' da Contentful é fornecido via GraphQL/API
  const imageUrl = picture?.url || 'https://placehold.co/60x60/334155/FFFFFF?text=AV';

  return (
    <div className="flex items-center space-x-4">
      {/* Container para imagem arredondada */}
      <div className="w-12 h-12 relative rounded-full overflow-hidden">
        <Image
          src={imageUrl}
          alt={`Foto de ${name}`}
          className="object-cover"
          width={60}
          height={60}
        />
      </div>
      {/* Nome do autor */}
      <div className="text-xl font-bold text-gray-800">
        {name}
      </div>
    </div>
  );
}
