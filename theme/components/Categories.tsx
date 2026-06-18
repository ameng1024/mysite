import { WidgetLayout } from './WidgetLayout';
import { ButtonLink } from './ButtonLink';
import { useBlogData } from '../hooks/useBlogData';
import { labels } from '@theme/constants/labels';
import { getCategoryUrl } from '@theme/utils/url-utils';

interface Props {
  className?: string;
  style?: React.CSSProperties;
}

export function Categories({ className, style }: Props) {
  const { categories } = useBlogData();
  const COLLAPSED_HEIGHT = '7.5rem';
  const COLLAPSE_THRESHOLD = 5;
  const isCollapsed = categories.length >= COLLAPSE_THRESHOLD;

  return (
    <WidgetLayout
      name={labels.categories}
      id="categories"
      isCollapsed={isCollapsed}
      collapsedHeight={COLLAPSED_HEIGHT}
      className={className}
      style={style}
    >
      {categories.map(c => (
        <ButtonLink
          key={c.name}
          url={getCategoryUrl(c.name)}
          badge={String(c.count)}
          label={`View all posts in the ${c.name} category`}
        >
          {c.name}
        </ButtonLink>
      ))}
    </WidgetLayout>
  );
}
