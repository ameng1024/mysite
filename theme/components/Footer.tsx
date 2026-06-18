import { url } from '@theme/utils/url-utils';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <>
      <div className="transition border-t border-black/10 dark:border-white/15 my-10 border-dashed mx-32" />
      <div className="transition border-dashed border-[oklch(85%_0.01_var(--hue))] dark:border-white/15 rounded-2xl mb-12 flex flex-col items-center justify-center px-6">
        <div className="transition text-50 text-sm text-center">
          &copy; <span id="copyright-year">2018 - {currentYear}</span> 阿猛的日常 /
          <a className="transition link text-[var(--primary)] font-medium" target="_blank" href={url('rss.xml')} rel="noreferrer">RSS</a> /
          <a className="transition link text-[var(--primary)] font-medium" target="_blank" href={url('sitemap.xml')} rel="noreferrer">Sitemap</a>
          <br />
          Powered by
          <a className="transition link text-[var(--primary)] font-medium" target="_blank" href="https://iameng.cn" rel="noreferrer"> Ameng</a> &
          <a className="transition link text-[var(--primary)] font-medium" target="_blank" href="https://rspress.rs" rel="noreferrer"> Rspress</a>
          <br />
          <a className="transition link text-[var(--primary)] font-medium" target="_blank" href="https://beian.miit.gov.cn/" rel="noreferrer">冀ICP备19004388号</a>
          <br />
        </div>
      </div>
    </>
  );
}
