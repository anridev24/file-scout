import { listen } from '@tauri-apps/api/event';
import { SearchEvent } from '../../types/search-event.enum';
import { useAppStore } from '@lib/store/app.store';

export class EventListener {
  constructor() {
    const { setStatus, setSearchInfo } = useAppStore.getState();

    listen(SearchEvent.STATUS_IDLE, () => setStatus(SearchEvent.STATUS_IDLE));
    listen(SearchEvent.STATUS_BUILDING_TREE, () =>
      setStatus(SearchEvent.STATUS_BUILDING_TREE)
    );
    listen(SearchEvent.STATUS_SEARCHING, (event) => {
      const { total, current } = event.payload as {
        total: number;
        current: number;
      };
      setSearchInfo({ total, current });
      setStatus(SearchEvent.STATUS_SEARCHING);
    });
  }
}
