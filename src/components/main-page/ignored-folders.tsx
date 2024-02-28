import { useRef, useState } from 'react';
import { useAppStore } from '../../lib/store';
import clsx from 'clsx';
import { useClickAway } from 'react-use';

export function IgnoredFolders() {
  const { ignoredFolders, setIgnoredFolders } = useAppStore();

  const [folderInput, setFolderInput] = useState('');

  const [selectedFolder, setSelectedFolder] = useState<string | null>(null);

  const ref = useRef(null);
  useClickAway(ref, () => {
    setTimeout(() => {
      setSelectedFolder(null);
    }, 80);
  });

  function addToIgnoredFolders() {
    // if already in the list show alert
    if (ignoredFolders.includes(folderInput)) {
      alert(`${folderInput} - Folder already in the list`);
      setFolderInput('');
      return;
    }

    if (folderInput) {
      setIgnoredFolders([...ignoredFolders, folderInput]);
      setFolderInput('');
    }
  }

  function removeFromIgnoredFolders() {
    if (!selectedFolder) return;

    const newFolders = ignoredFolders.filter(
      (folder) => folder !== selectedFolder
    );
    setIgnoredFolders(newFolders);
    setSelectedFolder(null);
  }

  function clearSelection() {
    setSelectedFolder(null);
  }

  function isSelectedFolder(folder: string) {
    return selectedFolder === folder;
  }

  function getActionButton() {
    if (selectedFolder)
      return (
        <button
          className="w-full text-red-500/70"
          onClick={removeFromIgnoredFolders}
        >
          Remove
        </button>
      );
    return (
      <button className="w-full" onClick={addToIgnoredFolders}>
        Add
      </button>
    );
  }

  function getSecondaryActionButton() {
    if (selectedFolder)
      return (
        <button className="w-full" onClick={clearSelection}>
          Clear Selection
        </button>
      );
    return (
      <input
        disabled={selectedFolder ? true : false}
        value={folderInput}
        onChange={(e) => setFolderInput(e.target.value)}
        placeholder="folder name"
        className="w-full text-[#7D7676]  outline-none"
        type="text"
      />
    );
  }

  return (
    <div className="flex w-[100%] flex-col">
      <p className="mb-2 text-xl font-medium text-[#E0E0E0]">Ignored Folders</p>
      <div className="flex h-[152px] w-full flex-col overflow-y-auto bg-[#7D7676]">
        <ul ref={ref} className="">
          {ignoredFolders.map((folder, index) => (
            <li
              onClick={() => setSelectedFolder(folder)}
              className={clsx(
                'cursor-pointer p-1',
                isSelectedFolder(folder) && 'bg-[#5A5555]'
              )}
              key={index}
            >
              {folder}
            </li>
          ))}
        </ul>
      </div>
      <div className="flex h-6 w-full flex-row items-center justify-between gap-2 bg-[#5A5555]">
        {getActionButton()}
        {getSecondaryActionButton()}
      </div>
    </div>
  );
}
