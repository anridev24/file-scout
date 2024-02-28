import { useAppStore } from '@lib/store';

export function KeywordInput() {
  const { keyword, setKeyword } = useAppStore();
  return (
    <div className="mt-16 flex w-[75%]">
      <input
        className="h-10 w-full bg-[#7D7676] px-3 py-2 text-xl text-[#E0E0E0]  outline-none placeholder:text-[#E0E0E0]"
        type="text"
        placeholder="keyword to search..."
        value={keyword ?? ''}
        onChange={(e) => setKeyword(e.target.value)}
      />
    </div>
  );
}
