import Image from "next/image";
import {
  documentToReactComponents,
  Options,
} from "@contentful/rich-text-react-renderer";
import { BLOCKS, Document } from "@contentful/rich-text-types";

interface Asset {
  sys: {
    id: string;
  };
  url: string;
  description: string;
}

interface AssetLink {
  block: Asset[];
}

interface Content {
  json: Document;
  links: {
    assets: AssetLink;
  };
}

interface RichTextAssetProps {
  id: string;
  assets?: Asset[];
}

function RichTextAsset({ id, assets }: RichTextAssetProps) {
  const asset = assets?.find((asset) => asset.sys.id === id);

  if (asset?.url) {
    return (
      <div style={{ position: "relative", width: "100%", height: "400px" }}>
        <Image
          src={asset.url}
          alt={asset.description}
          fill
          style={{ objectFit: "cover" }}
        />
      </div>
    );
  }

  return null;
}

interface MarkdownProps {
  content: Content;
}

export function Markdown({ content }: MarkdownProps) {
  const options: Options = {
    renderNode: {
      [BLOCKS.EMBEDDED_ASSET]: (node) => {
        const id = node.data?.target?.sys?.id;
        return <RichTextAsset id={id} assets={content.links.assets.block} />;
      },
    },
  };

  return <>{documentToReactComponents(content.json, options)}</>;
}
