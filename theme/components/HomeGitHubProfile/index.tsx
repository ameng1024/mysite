import recentPosts from '../../data/recent-posts.json';
import contributions from '../../data/contributions.json';
import { pinnedRepos, profile } from '../../data/profile';
import './index.css';

interface RecentPost {
  title: string;
  description: string;
  published: string;
  category: string;
  link: string;
}

const monthLabels = [
  '1月',
  '2月',
  '3月',
  '4月',
  '5月',
  '6月',
  '7月',
  '8月',
  '9月',
  '10月',
  '11月',
  '12月',
];

export function HomeGitHubProfile() {
  const posts = recentPosts as RecentPost[];

  return (
    <section className="gh-profile">
      <div className="gh-profile__layout">
        <aside className="gh-profile__sidebar">
          <img
            className="gh-profile__avatar"
            src="/assets/avatar.png"
            alt={`${profile.displayName} 的头像`}
            width={280}
            height={280}
          />

          <h1 className="gh-profile__name">{profile.name}</h1>
          <p className="gh-profile__tagline">{profile.tagline}</p>
          <p className="gh-profile__bio">{profile.bio}</p>

          <ul className="gh-profile__meta">
            <li>
              <svg viewBox="0 0 16 16" aria-hidden="true">
                <path d="m12.596 11.596-3.535 3.536a1.5 1.5 0 0 1-2.122 0l-3.535-3.536a6.5 6.5 0 1 1 9.192-9.193 6.5 6.5 0 0 1 0 9.193Zm-1.06-8.132v-.001a5 5 0 1 0-7.072 7.072L8 13.07l3.536-3.534a5 5 0 0 0 0-7.072ZM8 9a2 2 0 1 1 0-4 2 2 0 0 1 0 4Z" />
              </svg>
              <span>{profile.location}</span>
            </li>
            <li>
              <svg viewBox="0 0 16 16" aria-hidden="true">
                <path d="M8 0a8 8 0 1 1 0 16A8 8 0 0 1 8 0ZM5.78 1.503a6.5 6.5 0 0 0-3.7 3.2.75.75 0 0 0 .956 1.077 5.001 5.001 0 0 1 2.862-2.446.75.75 0 0 0-.118-1.31ZM8 14.5a6.5 6.5 0 0 0 3.712-1.163.75.75 0 0 0-.118-1.312 5.001 5.001 0 0 1-2.862-2.446.75.75 0 0 0-.956 1.077 6.5 6.5 0 0 0 3.224 3.844ZM8 2.75A5.25 5.25 0 0 0 3.172 6.5H8V2.75Zm0 0V6.5h4.828A5.25 5.25 0 0 0 8 2.75ZM8 10.75H3.172A5.25 5.25 0 0 0 8 13.25V10.75Zm0 2.5v-2.5h4.828A5.25 5.25 0 0 0 8 13.25Z" />
              </svg>
              <a href={profile.website} target="_blank" rel="noreferrer">
                {profile.website}
              </a>
            </li>
            <li>
              <svg viewBox="0 0 16 16" aria-hidden="true">
                <path d="M1.75 2h12.5c.966 0 1.75.784 1.75 1.75v8.5A1.75 1.75 0 0 1 14.25 15H1.75A1.75 1.75 0 0 1 0 13.25V3.75C0 2.784.784 2 1.75 2ZM1.5 3.75v8.5c0 .138.112.25.25.25h12.5a.25.25 0 0 0 .25-.25v-8.5a.25.25 0 0 0-.25-.25H1.75a.25.25 0 0 0-.25.25Zm11.03 1.03-5.96 4.722a.75.75 0 0 1-.874 0L1.47 4.78a.751.751 0 0 1 .018-1.042.751.751 0 0 1 1.042-.018L7.25 8.086l4.723-4.367a.751.751 0 0 1 1.042.018.751.751 0 0 1 .018 1.042Z" />
              </svg>
              <a href={`mailto:${profile.email}`}>{profile.email}</a>
            </li>
          </ul>
        </aside>

        <div className="gh-profile__main">
          <section className="gh-section">
            <div className="gh-section__header-row">
              <h2 className="gh-section__title gh-section__title--plain">作品</h2>
              <a className="gh-section__link" href="/works">
                查看全部 →
              </a>
            </div>
            <div className="gh-pinned">
              {pinnedRepos.map(repo => (
                <a
                  key={repo.name}
                  className="gh-pinned__card"
                  href={repo.link}
                  target="_blank"
                  rel="noreferrer"
                >
                  <div className="gh-pinned__header">
                    <svg viewBox="0 0 16 16" aria-hidden="true">
                      <path d="M2 2.5A2.5 2.5 0 0 1 4.5 0h8.75a.75.75 0 0 1 .75.75v12.5a.75.75 0 0 1-.75.75h-2.5a.75.75 0 0 1 0-1.5h1.75v-2h-8a1 1 0 0 0-.714 1.7.75.75 0 1 1-1.072 1.05A2.495 2.495 0 0 1 2 11.5v-9Zm10.5-1V9h-8a1 1 0 0 0-1 1v1.5a1 1 0 0 0 1 1h8Z" />
                    </svg>
                    <span className="gh-pinned__name">{repo.name}</span>
                  </div>
                  <p className="gh-pinned__desc">{repo.description}</p>
                  <div className="gh-pinned__footer">
                    <span className="gh-pinned__lang">
                      <span
                        className="gh-pinned__lang-dot"
                        style={{ backgroundColor: repo.languageColor }}
                      />
                      {repo.language}
                    </span>
                    {repo.stars != null ? (
                      <span className="gh-pinned__stars">
                        <svg viewBox="0 0 16 16" aria-hidden="true">
                          <path d="M8 .25a.75.75 0 0 1 .673.418l1.882 3.815 4.21.612a.75.75 0 0 1 .416 1.279l-3.046 2.97.719 4.192a.75.75 0 0 1-1.088.791L8 12.347l-3.766 1.98a.75.75 0 0 1-1.088-.79l.72-4.194L.818 6.374a.75.75 0 0 1 .416-1.28l4.21-.611L7.327.668A.75.75 0 0 1 8 .25Z" />
                        </svg>
                        {repo.stars}
                      </span>
                    ) : null}
                  </div>
                </a>
              ))}
            </div>
          </section>

          <section className="gh-section">
            <h2 className="gh-section__title gh-section__title--plain">
              过去一年内 {contributions.totalInRange} 次贡献
            </h2>
            <div className="gh-contrib">
              <div className="gh-contrib__scroll">
                <div className="gh-contrib__months">
                  {monthLabels.map(m => (
                    <span key={m}>{m}</span>
                  ))}
                </div>
                <div className="gh-contrib__grid-wrap">
                  <div className="gh-contrib__days">
                    <span>Mon</span>
                    <span>Wed</span>
                    <span>Fri</span>
                  </div>
                  <div className="gh-contrib__grid">
                    {contributions.weeks.map((week, wi) => (
                      <div key={wi} className="gh-contrib__week">
                        {week.map(cell => (
                          <span
                            key={cell.date}
                            className={`gh-contrib__cell gh-contrib__cell--${cell.level}`}
                            title={
                              cell.count > 0
                                ? `${cell.date}：发布 ${cell.count} 篇文章`
                                : `${cell.date}：无发布`
                            }
                          />
                        ))}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="gh-contrib__legend">
                <span>Less</span>
                {[0, 1, 2, 3, 4].map(l => (
                  <span key={l} className={`gh-contrib__cell gh-contrib__cell--${l}`} />
                ))}
                <span>More</span>
              </div>
            </div>
          </section>

          <section className="gh-section">
            <div className="gh-section__header-row">
              <h2 className="gh-section__title gh-section__title--plain">最近文章</h2>
              <a className="gh-section__link" href="/posts/">
                查看全部 →
              </a>
            </div>
            <ul className="gh-activity">
              {posts.map(post => (
                <li key={post.link} className="gh-activity__item">
                  <a href={post.link} className="gh-activity__link">
                    <span className="gh-activity__title">{post.title}</span>
                    <span className="gh-activity__meta">
                      {post.category && <span>{post.category}</span>}
                      {post.published && <time>{post.published}</time>}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </section>
        </div>
      </div>
    </section>
  );
}
