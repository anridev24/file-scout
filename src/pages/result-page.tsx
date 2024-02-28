import { listen } from '@tauri-apps/api/event';
import { useMount } from 'react-use';
import { AppEvent } from '@custom-types/app-event.enum';
import { useState } from 'react';
import { Logo } from '@components/shared';
import { invoke } from '@tauri-apps/api';
import { appWindow } from '@tauri-apps/api/window';

export default function ResultPage() {
  const [searchResult, setSearchResult] = useState<string[]>([]);

  useMount(() =>
    listen<string[]>(AppEvent.SEARCH_RESULT, (event) =>
      setSearchResult(event.payload)
    )
  );

  async function handlePathClick(path: string) {
    await invoke('open_folder_rust', { path });
  }

  function addDotsToEnd(text: string) {
    const optimalLength = 90;
    return text.length > optimalLength
      ? `${text.substring(0, optimalLength)}...`
      : text;
  }

  async function handleClose() {
    await appWindow.close();
  }

  return (
    <div className="dark flex min-h-screen flex-col items-center justify-center gap-y-2 bg-background">
      <div className="flex h-screen w-screen flex-col items-center bg-[#1F1D1D]">
        <Logo />
        {searchResult.length ? (
          <div className="flex w-full flex-col overflow-x-hidden overflow-y-scroll">
            <h4 className="self-center text-white/60">
              Found {searchResult.length} Results
            </h4>
            <ul className="mx-4 my-5 flex flex-col gap-y-4 border border-[#262626] p-4">
              {searchResult.map((result, index) => (
                <li
                  onClick={() => handlePathClick(result)}
                  key={index}
                  className="cursor-pointer text-white/60 transition-all duration-150 ease-in-out hover:text-white/90"
                >
                  {addDotsToEnd(result)}
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <div className="flex h-screen w-screen flex-col items-center justify-center">
            <div className="h-16 w-16 animate-spin-slow rounded-full border-8 border-dashed border-white/60" />
            <h4 className="mt-4 text-white/60">Loading Results...</h4>
          </div>
        )}
        <div>
          <button onClick={handleClose} className="m-2 h-10 w-full bg-[#C14E4E] px-2 text-white filter transition-all duration-300 ease-in-out hover:brightness-75">
            Close Window
          </button>
        </div>
      </div>
    </div>
  );
}
