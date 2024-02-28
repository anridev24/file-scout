import { Logo } from '@/components/shared/logo';
import { KeywordInput } from '../components/main-page/keyword-input';
import { PathInput } from '../components/main-page/path-input';
import { ActionButtons } from '../components/main-page/action-buttons';
import { IgnoredFolders } from '../components/main-page/ignored-folders';
import { SearchStatusText } from '../components/main-page/search-status-text';
import { InfiniteProgressBar } from '../components/shared/infinite-progress-bar';
import { SearchProgressBar } from '../components/shared/search-progress-bar';
import { useAppStore } from '@lib/store';

import { SearchEvent } from '@/types/search-event.enum';

export function MainPage() {
  const status = useAppStore((state) => state.status);

  const isBuildingTree = status === SearchEvent.STATUS_BUILDING_TREE;

  return (
    <div className="dark flex min-h-screen flex-col items-center justify-center gap-y-2 bg-background">
      <div className="flex h-screen w-screen flex-col items-center bg-[#1F1D1D]">
        <Logo />
        {/* Keyword Input */}
        <KeywordInput />
        {/* Keyword Input */}

        {/* Path Input */}
        <PathInput />
        {/* Path Input */}

        {/* Ignore Patterns */}
        <div className="mt-8 flex w-[75%] flex-col items-start justify-between gap-x-8">
          {/* <div className='flex flex-col w-[100%]'>
          <p className='text-[#E0E0E0] text-xl font-medium mb-2'>Ignored Folders</p>
          <div className='flex flex-col w-full h-[152px] bg-[#7D7676]'></div>
          <div className='w-full h-6 bg-[#5A5555]'></div>
        </div> */}
          <IgnoredFolders />
        </div>
        {/* Ignore Patterns */}

        <ActionButtons />
        <div className="mt-4 w-[75%]">
          {isBuildingTree ? <InfiniteProgressBar /> : <SearchProgressBar />}
          <SearchStatusText />
        </div>
      </div>
    </div>
  );
}
