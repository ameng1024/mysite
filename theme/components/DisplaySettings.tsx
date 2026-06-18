import { useEffect, useRef, useState } from 'react';
import { Icon } from '@iconify/react';
import { labels } from '@theme/constants/labels';
import { getDefaultHue, getHue, setHue } from '@theme/utils/setting-utils';

export function DisplaySettings() {
  const sliderRef = useRef<HTMLInputElement>(null);
  const [hue, setHueState] = useState(250);
  const defaultHue = getDefaultHue();

  useEffect(() => {
    setHueState(getHue());
  }, []);

  useEffect(() => {
    const slider = sliderRef.current;
    if (!slider) return;
    slider.value = String(hue);
  }, [hue]);

  const handleChange = (value: number) => {
    setHueState(value);
    setHue(value);
  };

  return (
    <div
      id="display-setting"
      className="float-panel float-panel-closed absolute transition-all w-80 right-4 px-4 py-4"
    >
      <div className="flex flex-row gap-2 mb-3 items-center justify-between">
        <div className="flex gap-2 font-bold text-lg text-neutral-900 dark:text-neutral-100 transition relative ml-3 before:w-1 before:h-4 before:rounded-md before:bg-[var(--primary)] before:absolute before:-left-3 before:top-[0.33rem]">
          {labels.themeColor}
          <button
            aria-label="Reset to Default"
            id="hue-reset-btn"
            type="button"
            className={`btn-regular w-7 h-7 rounded-md active:scale-90 ${hue === defaultHue ? 'opacity-0 pointer-events-none' : ''}`}
            onClick={() => handleChange(defaultHue)}
          >
            <div className="text-[var(--btn-content)]">
              <Icon icon="fa6-solid:arrow-rotate-left" className="text-[0.875rem]" />
            </div>
          </button>
        </div>
        <div className="flex gap-1">
          <div className="transition bg-[var(--btn-regular-bg)] w-10 h-7 rounded-md flex justify-center font-bold text-sm items-center text-[var(--btn-content)]">
            {hue}
          </div>
        </div>
      </div>
      <div className="w-full h-6 px-1 bg-[oklch(0.80_0.10_0)] dark:bg-[oklch(0.70_0.10_0)] rounded select-none">
        <input
          aria-label={labels.themeColor}
          ref={sliderRef}
          type="range"
          min="0"
          max="360"
          step="5"
          defaultValue={hue}
          className="slider"
          style={{ width: '100%' }}
          onInput={e => handleChange(Number((e.target as HTMLInputElement).value))}
        />
      </div>
    </div>
  );
}
