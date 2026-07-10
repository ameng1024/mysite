import './index.css';

const START_YEAR = 2018;
const END_YEAR = new Date().getFullYear();

export function SiteFooter() {
  return (
    <div className="rp-site-footer">
      <p className="rp-site-footer__line">
        <span>
          © {START_YEAR} - {END_YEAR} 阿猛的日常
        </span>
        <span className="rp-site-footer__sep"> / </span>
        <a href="/rss.xml">RSS</a>
        <span className="rp-site-footer__sep"> / </span>
        <a href="/sitemap.xml">Sitemap</a>
      </p>
      <p className="rp-site-footer__line">
        Powered by{' '}
        <a href="/about">Ameng</a>
        {' & '}
        <a href="https://rspress.rs/" target="_blank" rel="noreferrer">
          Rspress
        </a>
      </p>
      <p className="rp-site-footer__line">
        <a
          href="https://beian.miit.gov.cn/"
          target="_blank"
          rel="noreferrer"
        >
          冀ICP备19004388号
        </a>
      </p>
    </div>
  );
}
