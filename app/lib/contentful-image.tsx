import Image, { ImageProps } from "next/image";

export default function ContentfulImage(props: ImageProps) {
  return <Image {...props} alt={props.alt || ""} />;
}
