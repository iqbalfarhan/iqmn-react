import { convertToEmbedUrl } from '@/lib/utils';
import { FC } from 'react';

type Props = {
  url: string;
  title?: string;
};

const YoutubeEmbdedFrame: FC<Props> = ({ url, title }) => {
  const embedUrl = convertToEmbedUrl(url);
  if (!embedUrl) return null;
  return (
    <iframe
      className="aspect-video w-full"
      src={embedUrl}
      title={title}
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      referrerPolicy="strict-origin-when-cross-origin"
      allowFullScreen
    />
  );
};

export default YoutubeEmbdedFrame;
