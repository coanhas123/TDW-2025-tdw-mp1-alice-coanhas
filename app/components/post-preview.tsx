import Avatar from "./avatar";
import DateComponent from "./date-component";
import CoverImage from "./cover-image";
import Link from "next/link";

interface Author {
  name: string;
  picture: { url: string; width: number; height: number };
}

interface PostPreviewProps {
  title: string;
  coverImage: { url: string; width: number; height: number };
  date: string;
  excerpt: string;
  author: Author;
  slug: string;
}

export default function PostPreview({
  title,
  coverImage,
  date,
  excerpt,
  author,
  slug,
}: PostPreviewProps) {
  return (
    <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
      <div className="mb-5">
        <CoverImage slug={slug} title={title} url={coverImage.url} />
      </div>
      <h3 className="text-3xl mb-3 leading-snug font-semibold text-gray-900">
        <Link href={`/posts/${slug}`} legacyBehavior>
          <a className="hover:underline">{title}</a>
        </Link>
      </h3>
      <div className="text-lg mb-4 font-medium text-gray-500">
        <DateComponent dateString={date} />
      </div>
      <p className="text-lg leading-relaxed mb-4 text-gray-700">{excerpt}</p>
      <Avatar name={author.name} picture={author.picture} />
    </div>
  );
}
