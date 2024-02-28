import { dialog } from '@tauri-apps/api';
import { useAppStore } from '../../lib/store';

export function PathInput() {
  const { workingPath, setWorkingPath } = useAppStore();

  async function selectWorkingPath() {
    try {
      setWorkingPath(null);

      const path = (await dialog.open({ directory: true, multiple: false })) as
        | string
        | null;

      if (path) setWorkingPath(path);
      else alert('No path selected');
    } catch (error) {
      alert(error);
    }
  }

  return (
    <div className="mt-9 flex w-[75%] flex-row items-center">
      <input
        className="h-10 w-full bg-[#7D7676] px-3 py-2 text-xl text-[#E0E0E0]  outline-none placeholder:text-[#E0E0E0]"
        type="text"
        placeholder="select folder to search..."
        value={workingPath ?? ''}
        readOnly
      />
      <div
        onClick={selectWorkingPath}
        className="flex h-10 w-12 cursor-pointer items-center justify-center bg-[#5A5555] font-bold text-[#7D7676] filter transition-all duration-300 ease-in-out hover:brightness-90"
      >
        ...
      </div>
    </div>
  );
}
