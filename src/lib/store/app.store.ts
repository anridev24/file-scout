import { create } from 'zustand';
import { createJSONStorage, devtools, persist } from 'zustand/middleware';
import { SearchEvent } from '../../types';

interface AppStore {
  processing: boolean;
  setProcessing: (processing: boolean) => void;

  status: SearchEvent;
  setStatus: (status: SearchEvent) => void;

  search_info: { total: number; current: number };
  setSearchInfo: (search_info: { total: number; current: number }) => void;

  workingPath: string | null;
  setWorkingPath: (path: string | null) => void;

  keyword: string | null;
  setKeyword: (keyword: string | null) => void;

  ignoredFolders: string[];
  setIgnoredFolders: (folders: string[]) => void;

  ignoredExtensions: string[];
  setIgnoredExtensions: (extensions: string[]) => void;
}

export const useAppStore = create<AppStore>()(
  persist(
    devtools((set, _get) => ({
      processing: false,
      setProcessing: (processing) => set({ processing }),

      status: SearchEvent.STATUS_IDLE,
      setStatus: (status) => set({ status }),

      search_info: { total: 0, current: 0 },
      setSearchInfo: (search_info) => set({ search_info }),

      workingPath: null,
      setWorkingPath: (path) => set({ workingPath: path }),

      keyword: null,
      setKeyword: (keyword) => set({ keyword }),

      ignoredFolders: [],
      setIgnoredFolders: (folders) => set({ ignoredFolders: folders }),

      ignoredExtensions: [],
      setIgnoredExtensions: (extensions) =>
        set({ ignoredExtensions: extensions }),
    })),

    {
      name: 'app-store',
      storage: createJSONStorage(() => localStorage),
    }
  )
);
