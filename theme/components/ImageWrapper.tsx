import type { CSSProperties } from 'react';

interface Props {
  src: string;
  alt?: string;
  className?: string;
  id?: string;
  position?: string;
  style?: CSSProperties;
}

export function ImageWrapper({
  src,
  alt = '',
  className = '',
  id,
  position = 'center',
  style,
}: Props) {
  if (!src) return null;

  const imgSrc = src.startsWith('/') ? src : src;

  return (
    <div id={id} className={`overflow-hidden relative ${className}`} style={style}>
      <div className="transition absolute inset-0 dark:bg-black/10 bg-opacity-50 pointer-events-none" />
      <img
        src={imgSrc}
        alt={alt}
        className="w-full h-full object-cover"
        style={{ objectPosition: position }}
        loading="lazy"
      />
    </div>
  );
}
