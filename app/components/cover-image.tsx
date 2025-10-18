import Image from 'next/image';
import Link from 'next/link';

interface CoverImageProps {
  title: string;
  url: string;
  slug?: string;
}

// Este componente precisa estar dentro da pasta 'components/'
export default function CoverImage({ title, url, slug }: CoverImageProps) {
  const image = (
    <div className="shadow-lg hover:shadow-xl transition-shadow duration-200 rounded-lg overflow-hidden">
      <Image
        src={url || 'https://placehold.co/1200x600/6B7280/FFFFFF?text=No+Image'}
        alt={`Capa para ${title}`}
        width={1200} // Ajuste conforme a necessidade do seu layout
        height={600}
        className="w-full object-cover"
      />
    </div>
  );

  return (
    <div className="sm:mx-0">
      {slug ? (
        <Link href={`/posts/${slug}`} aria-label={title} legacyBehavior>
          {image}
        </Link>
      ) : (
        image
      )}
    </div>
  );
}
