import { Profile } from './Profile';
import { Categories } from './Categories';
import { Tags } from './Tags';

interface Props {
  className?: string;
  style?: React.CSSProperties;
}

export function SideBar({ className = '', style }: Props) {
  return (
    <div
      id="sidebar"
      className={`mb-4 row-start-2 row-end-3 col-span-2 lg:row-start-1 lg:row-end-2 lg:col-span-1 lg:max-w-[17.5rem] lg:self-start onload-animation w-full ${className}`}
      style={style}
    >
      <div className="flex flex-col w-full gap-4 mb-4">
        <Profile />
      </div>
      <div id="sidebar-sticky" className="transition-all duration-700 flex flex-col w-full gap-4 top-4 sticky top-4">
        <Categories className="onload-animation" style={{ animationDelay: '150ms' }} />
        <Tags className="onload-animation" style={{ animationDelay: '200ms' }} />
      </div>
    </div>
  );
}
