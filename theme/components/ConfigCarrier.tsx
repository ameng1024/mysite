import { siteConfig } from '@theme/config';

export function ConfigCarrier() {
  return (
    <div
      id="config-carrier"
      data-hue={siteConfig.themeColor.hue}
      style={{ display: 'none' }}
    />
  );
}
