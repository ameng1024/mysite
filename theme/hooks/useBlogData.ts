import { useMemo } from 'react';
import { usePages } from '@rspress/core/runtime';
import { labels } from '@theme/constants/labels';
import { UNCATEGORIZED } from '@theme/constants/constants';

export interface PostFrontmatter {
  title: string;
  published: string;
  updated?: string;
  draft?: boolean;
  description?: string;
  image?: string;
  tags?: string[];
  category?: string;
  lang?: string;
}

export interface BlogPost {
  routePath: string;
  slug: string;
  frontmatter: PostFrontmatter;
}

export function useBlogPosts(): BlogPost[] {
  const { pages } = usePages();

  return useMemo(() => {
    return pages
      .filter(page => page.routePath.startsWith('/posts/') && page.routePath !== '/posts/')
      .filter(page => !page.frontmatter?.draft)
      .map(page => ({
        routePath: page.routePath,
        slug: page.routePath.replace(/^\/posts\//, '').replace(/\/$/, ''),
        frontmatter: page.frontmatter as PostFrontmatter,
      }))
      .sort((a, b) => {
        const dateA = new Date(a.frontmatter.published || 0);
        const dateB = new Date(b.frontmatter.published || 0);
        return dateB.getTime() - dateA.getTime();
      });
  }, [pages]);
}

export function useBlogData() {
  const posts = useBlogPosts();

  return useMemo(() => {
    const tagCount: Record<string, number> = {};
    const categoryCount: Record<string, number> = {};

    for (const post of posts) {
      const { tags = [], category } = post.frontmatter;
      for (const tag of tags) {
        tagCount[tag] = (tagCount[tag] || 0) + 1;
      }
      const cat = category || labels.uncategorized;
      categoryCount[cat] = (categoryCount[cat] || 0) + 1;
    }

    const tags = Object.keys(tagCount)
      .sort((a, b) => a.toLowerCase().localeCompare(b.toLowerCase()))
      .map(name => ({ name, count: tagCount[name] }));

    const categories = Object.keys(categoryCount)
      .sort((a, b) => a.toLowerCase().localeCompare(b.toLowerCase()))
      .map(name => ({ name, count: categoryCount[name] }));

    return { posts, tags, categories };
  }, [posts]);
}

export function filterPosts(
  posts: BlogPost[],
  options: { tags?: string[]; categories?: string[] },
): BlogPost[] {
  let filtered = posts;

  if (options.tags?.length) {
    filtered = filtered.filter(post =>
      post.frontmatter.tags?.some(tag => options.tags!.includes(tag)),
    );
  }

  if (options.categories?.length) {
    filtered = filtered.filter(post => {
      const cat = post.frontmatter.category || UNCATEGORIZED;
      return options.categories!.includes(cat);
    });
  }

  return filtered;
}
