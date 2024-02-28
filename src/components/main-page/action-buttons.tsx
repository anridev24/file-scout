import { invoke } from '@tauri-apps/api';
import { useAppStore } from '../../lib/store';
import { WebviewWindow } from '@tauri-apps/api/window';
import { AppPage } from '@custom-types/app-page.enum';
import { emit } from '@tauri-apps/api/event';
import { AppEvent } from '../../types';

export function ActionButtons() {
  const {
    processing,
    keyword,
    workingPath,
    ignoredFolders,
    setProcessing,
    setKeyword,
    setWorkingPath,
    setSearchInfo,
  } = useAppStore();

  async function startSearch() {
    if (!keyword || !workingPath) {
      alert('Please enter a keyword and select a folder to start search');
      return;
    }
    setProcessing(true);
    const ignoredItems = Object.fromEntries(
      ignoredFolders.map((folder) => [folder, true])
    );
    const results: string[] = await invoke('start_search', {
      path: workingPath,
      searchTerm: keyword,
      ignoredItems: {
        items: ignoredItems,
      },
    });

    console.log(results);
    new WebviewWindow(AppPage.RESULT, {
      url: `./App.tsx`,
      title: 'Results',
      width: 800,
      height: 600,
      center: true,
    });

    setTimeout(() => {
      emit(AppEvent.SEARCH_RESULT, results);
    }, 1000);

    setProcessing(false);
    setSearchInfo({ total: 0, current: 0 });
  }

  function stopSearch() {
    setProcessing(false);
    setKeyword(null);
    setWorkingPath(null);
  }

  return (
    <div className="mt-10 flex w-[75%] flex-row items-center justify-between gap-x-8">
      <button
        onClick={stopSearch}
        className="h-10 w-full bg-[#C14E4E] text-white filter transition-all duration-300 ease-in-out hover:brightness-75"
      >
        Stop
      </button>
      <button
        disabled={processing}
        onClick={startSearch}
        className="h-10 w-full bg-[#68C18A] text-white filter transition-all duration-300 ease-in-out hover:brightness-75 disabled:cursor-not-allowed disabled:brightness-75"
      >
        Start
      </button>
    </div>
  );
}
