import { profileConfig } from '@theme/config';
import { url } from '@theme/utils/url-utils';
import { Icon } from '@iconify/react';
import { ImageWrapper } from './ImageWrapper';

export function Profile() {
  const config = profileConfig;

  return (
    <div className="card-base p-3">
      <a
        aria-label="Go to About Page"
        href={url('/about/')}
        className="group block relative mx-auto mt-1 lg:mx-0 lg:mt-0 mb-3 max-w-[12rem] lg:max-w-none overflow-hidden rounded-xl active:scale-95"
      >
        <div className="absolute transition pointer-events-none group-hover:bg-black/30 group-active:bg-black/50 w-full h-full z-50 flex items-center justify-center">
          <Icon
            icon="fa6-regular:address-card"
            className="transition opacity-0 scale-90 group-hover:scale-100 group-hover:opacity-100 text-white text-5xl"
          />
        </div>
        <ImageWrapper
          src={config.avatar || ''}
          alt="Profile Image of the Author"
          className="mx-auto lg:w-full h-full lg:mt-0"
        />
      </a>
      <div className="px-2">
        <div className="font-bold text-xl text-center mb-1 dark:text-neutral-50 transition">{config.name}</div>
        <div className="h-1 w-5 bg-[var(--primary)] mx-auto rounded-full mb-2 transition" />
        <div className="text-center text-neutral-400 mb-2.5 transition">{config.bio}</div>
        <div className="flex gap-2 justify-center mb-1">
          {config.links.length > 1 &&
            config.links.map(item => (
              <a
                key={item.name}
                rel="me"
                aria-label={item.name}
                href={item.url}
                target="_blank"
                className="btn-regular rounded-lg h-10 w-10 active:scale-90"
              >
                <Icon icon={item.icon} className="text-[1.5rem]" />
              </a>
            ))}
          {config.links.length === 1 && (
            <a
              rel="me"
              aria-label={config.links[0].name}
              href={config.links[0].url}
              target="_blank"
              className="btn-regular rounded-lg h-10 gap-2 px-3 font-bold active:scale-95"
            >
              <Icon icon={config.links[0].icon} className="text-[1.5rem]" />
              {config.links[0].name}
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
