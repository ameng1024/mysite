import { EditLink, LastUpdated, PrevNextPage } from '@rspress/core/theme';
import { SiteFooter } from '../SiteFooter';
import './index.css';

export function DocFooter() {
  return (
    <>
      <footer className="rp-doc-footer">
        <div className="rp-doc-footer__edit">
          <EditLink />
          <LastUpdated />
        </div>
        <div className="rp-doc-footer__divider" />
        <PrevNextPage />
      </footer>
      <div className="rp-doc-site-footer">
        <SiteFooter />
      </div>
    </>
  );
}
