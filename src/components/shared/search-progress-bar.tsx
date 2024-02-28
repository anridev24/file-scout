import clsx from 'clsx';
import { useAppStore } from '../../lib/store';

export function SearchProgressBar() {
  const total = useAppStore((state) => state.search_info.total);
  const current = useAppStore((state) => state.search_info.current);

  const progressPercentage =
    total === 0 ? 0 : ((current / total) * 100).toFixed(1);
  const currentProgress = `${progressPercentage}%`;

  function isVisible() {
    return Number(progressPercentage) > 0;
  }

  return (
    <div
      className={clsx(
        'flex w-full items-center justify-start bg-[#7d7676]',
        isVisible()
          ? 'visible opacity-100'
          : 'pointer-events-none invisible opacity-0'
      )}
    >
      <div
        className="flex h-8 items-center bg-[#5a5555] p-0.5"
        style={{ width: currentProgress }}
      />
      <span className="mx-auto text-center text-sm font-medium leading-none text-white opacity-60">
        {currentProgress}
      </span>
    </div>
  );
}
