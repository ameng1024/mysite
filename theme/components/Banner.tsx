import { siteConfig } from '@theme/config';
import { BANNER_HEIGHT_EXTEND } from '@theme/constants/constants';
import { ImageWrapper } from './ImageWrapper';

export function Banner() {
  const bannerOffsetByPosition: Record<string, string> = {
    top: `${BANNER_HEIGHT_EXTEND}vh`,
    center: `${BANNER_HEIGHT_EXTEND / 2}vh`,
    bottom: '0',
  };
  const bannerOffset = bannerOffsetByPosition[siteConfig.banner.position || 'center'];

  return (
    <div
      id="banner-wrapper"
      className="absolute z-10 w-full transition duration-700 overflow-hidden"
      style={{ top: `-${BANNER_HEIGHT_EXTEND}vh` }}
    >
      <ImageWrapper
        id="banner"
        alt="Banner image of the blog"
        className="object-cover h-full transition duration-700 opacity-0 scale-105"
        src={siteConfig.banner.src}
        position={siteConfig.banner.position}
        style={{ '--bannerOffset': bannerOffset } as React.CSSProperties}
      />
    </div>
  );
}
