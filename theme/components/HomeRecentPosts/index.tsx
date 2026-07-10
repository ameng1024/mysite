import recentPosts from '../../data/recent-posts.json';
import './index.css';

interface RecentPost {
  title: string;
  description: string;
  published: string;
  category: string;
  link: string;
}

export function HomeRecentPosts() {
  const posts = recentPosts as RecentPost[];

  return (
    <section className="rp-home-section">
      <div className="rp-home-section__container">
        <div className="rp-home-section__header">
          <div>
            <h2 className="rp-home-section__title">最近文章</h2>
            <p className="rp-home-section__subtitle">
              最新发布的 5 篇技术笔记，更多内容见文章栏目。
            </p>
          </div>
          <a className="rp-home-section__more" href="/posts/">
            查看全部 →
          </a>
        </div>
        <ul className="rp-recent-posts">
          {posts.map(post => (
            <li key={post.link} className="rp-recent-posts__item">
              <a href={post.link} className="rp-recent-posts__link">
                <div className="rp-recent-posts__meta">
                  {post.category ? (
                    <span className="rp-recent-posts__category">
                      {post.category}
                    </span>
                  ) : null}
                  {post.published ? (
                    <time className="rp-recent-posts__date">{post.published}</time>
                  ) : null}
                </div>
                <h3 className="rp-recent-posts__title">{post.title}</h3>
                {post.description ? (
                  <p className="rp-recent-posts__desc">{post.description}</p>
                ) : null}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
