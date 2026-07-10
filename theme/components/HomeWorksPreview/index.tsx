import { mockWorks } from '../../data/works.mock';
import '../HomeRecentPosts/index.css';

export function HomeWorksPreview() {
  return (
    <section className="rp-home-section rp-home-section--works">
      <div className="rp-home-section__container">
        <div className="rp-home-section__header">
          <div>
            <h2 className="rp-home-section__title">精选作品</h2>
            <p className="rp-home-section__subtitle">
              个人项目与实验性 Demo，部分为 Mock 数据，后续可替换为真实作品。
            </p>
          </div>
          <a className="rp-home-section__more" href="/works">
            进入作品 →
          </a>
        </div>
        <div className="rp-works-grid">
          {mockWorks.map(work => (
            <a key={work.title} href={work.link} className="rp-works-card">
              {work.cover ? (
                <div className="rp-works-card__cover">
                  <img src={work.cover} alt={work.title} loading="lazy" />
                </div>
              ) : (
                <div className="rp-works-card__cover rp-works-card__cover--placeholder">
                  <span>{work.title.slice(0, 1)}</span>
                </div>
              )}
              <div className="rp-works-card__body">
                <div className="rp-works-card__top">
                  <h3 className="rp-works-card__title">{work.title}</h3>
                  {work.status ? (
                    <span className="rp-works-card__status">{work.status}</span>
                  ) : null}
                </div>
                <p className="rp-works-card__desc">{work.description}</p>
                <div className="rp-works-card__tags">
                  {work.tags.map(tag => (
                    <span key={tag} className="rp-works-card__tag">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
