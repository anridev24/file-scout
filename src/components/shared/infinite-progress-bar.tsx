// import '@assets/css/infinite-progress-bar.css'
import '@assets/css/infinite-progress-bar.css';

export function InfiniteProgressBar() {
  return (
    <div className={`flex w-full items-center justify-start bg-[#7d7676] `}>
      {/* Wrapper div for the moving bars */}
      <div className="relative h-8 w-full overflow-hidden">
        {/* Two divs for the bars */}
        <div className="loading-bar first-bar absolute h-8 bg-[#5a5555]" />
        <div className="loading-bar second-bar absolute h-8 bg-[#5a5555]" />
      </div>
    </div>
  );
}
