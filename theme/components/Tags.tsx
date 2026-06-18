import { WidgetLayout } from './WidgetLayout';
import { ButtonTag } from './ButtonTag';
import { useBlogData } from '../hooks/useBlogData';
import { labels } from '@theme/constants/labels';
import { url } from '@theme/utils/url-utils';

interface Props {
  className?: string;
  style?: React.CSSProperties;
}

export function Tags({ className, style }: Props) {
  const { tags } = useBlogData();
  const COLLAPSED_HEIGHT = '7.5rem';
  const isCollapsed = tags.length >= 20;

  return (
    <WidgetLayout
      name={labels.tags}
      id="tags"
      isCollapsed={isCollapsed}
      collapsedHeight={COLLAPSED_HEIGHT}
      className={className}
      style={style}
    >
      <div className="flex gap-2 flex-wrap">
        {tags.map(t => (
          <ButtonTag
            key={t.name}
            href={url(`/archive/tag/${encodeURIComponent(t.name)}/`)}
            label={`View all posts with the ${t.name} tag`}
          >
            {t.name}
          </ButtonTag>
        ))}
      </div>
    </WidgetLayout>
  );
}
