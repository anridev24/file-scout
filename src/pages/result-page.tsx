import { listen } from '@tauri-apps/api/event';
import { useMount } from 'react-use';
import { AppEvent } from '@custom-types/app-event.enum';
import { useState } from 'react';
import { Logo } from '@components/shared';
import { invoke } from '@tauri-apps/api';
import { appWindow } from '@tauri-apps/api/window';
import FolderIcon from '../components/ui/icons/folder.icon';
import FileIcon from '../components/ui/icons/file.icon';
import CopyIcon from '../components/ui/icons/copy.icon';

export default function ResultPage() {
  const [searchResult, setSearchResult] = useState<
    { path: string; copied: boolean }[]
  >([]);

  useMount(() =>
    listen<string[]>(AppEvent.SEARCH_RESULT, (event) =>
      setSearchResult(event.payload.map((path) => ({ path, copied: false })))
    )
  );

  function addDotsToEnd(text: string) {
    const optimalLength = 70;
    return text.length > optimalLength
      ? `${text.substring(0, optimalLength)}...`
      : text;
  }

  async function handleClose() {
    await appWindow.close();
  }

  async function handleFile(path: string) {
    await invoke('open_file_rust', { path });
  }

  async function handleFolder(path: string) {
    await invoke('open_folder_rust', { path });
  }

  async function handleCopy(index: number) {
    const path = searchResult[index].path;
    if (!navigator.clipboard) {
      return alert('Your browser does not support clipboard API');
    }
    await navigator.clipboard.writeText(path);
    // Update the copied status for this item
    const newResults = [...searchResult];
    newResults[index].copied = true;
    setSearchResult(newResults);

    // Revert the copied status after 2 seconds
    setTimeout(() => {
      newResults[index].copied = false;
      setSearchResult(newResults);
    }, 2000);
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
            <ul className="mx-4 my-5 flex flex-col gap-y-6 border border-[#4e9168] p-4">
              {searchResult.map((result, index) => (
                <li key={index} className="text-sm text-white/60">
                  <div className="flex w-full flex-row items-center justify-center gap-x-3">
                    <span className="w-full whitespace-nowrap">
                      {addDotsToEnd(result.path)}
                    </span>
                    <div
                      onClick={() => handleCopy(index)}
                      className="ml-auto flex cursor-pointer items-center justify-center gap-x-3 text-xs filter duration-200 ease-in-out hover:brightness-75"
                    >
                      <span className="text-xs">
                        {result.copied ? 'Copied' : 'Copy'}
                      </span>
                      <CopyIcon width={16} height={16} fill={'#4e9168'} />
                    </div>

                    <div className="ml-auto flex items-center justify-center gap-x-3 text-xs">
                      <div
                        onClick={() => handleFile(result.path)}
                        className="ml-auto flex cursor-pointer items-center justify-center gap-x-3 filter transition-all duration-200 ease-in-out hover:brightness-75"
                      >
                        <span>File</span>
                        <FileIcon width={16} height={16} fill="#4e9168" />
                      </div>
                      <div
                        onClick={() => handleFolder(result.path)}
                        className="ml-auto flex cursor-pointer items-center justify-center gap-x-3 filter transition-all duration-200 ease-in-out hover:brightness-75"
                      >
                        <span>Folder</span>
                        <FolderIcon width={16} height={16} fill="#4e9168" />
                      </div>
                    </div>
                  </div>
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
          <button
            onClick={handleClose}
            className="m-2 h-10 w-full bg-[#C14E4E] px-2 text-white filter transition-all duration-300 ease-in-out hover:brightness-75"
          >
            Close Window
          </button>
        </div>
      </div>
    </div>
  );
}
