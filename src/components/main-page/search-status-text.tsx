import { statusToHuman } from '@lib/helpers';
import { useAppStore } from '../../lib/store';

export function SearchStatusText() {
  const status = useAppStore((state) => state.status);

  return (
    <div className="mx-1 my-3 flex w-full items-center justify-center">
      <span className="text-white opacity-60">{statusToHuman(status)}</span>
    </div>
  );
}
