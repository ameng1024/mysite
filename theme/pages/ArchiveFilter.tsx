import { usePageData } from '@rspress/core/runtime';
import { labels } from '@theme/constants/labels';
import { ArchivePanel } from '../components/ArchivePanel';

export default function ArchiveFilterPage() {
  const { page } = usePageData();
  const path = page.routePath;

  let tags: string[] | undefined;
  let categories: string[] | undefined;

  const tagMatch = path.match(/^\/archive\/tag\/(.+)\/$/);
  const categoryMatch = path.match(/^\/archive\/category\/(.+)\/$/);

  if (tagMatch) {
    tags = [decodeURIComponent(tagMatch[1])];
  } else if (categoryMatch) {
    const cat = decodeURIComponent(categoryMatch[1]);
    categories = [cat === 'uncategorized' ? labels.uncategorized : cat];
  }

  return <ArchivePanel tags={tags} categories={categories} />;
}
