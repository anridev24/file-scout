import { SearchEvent } from '../../types';

export function statusToHuman(status: SearchEvent) {
  switch (status) {
    case SearchEvent.STATUS_IDLE:
      return 'Idle';
    case SearchEvent.STATUS_BUILDING_TREE:
      return 'Building file tree';
    case SearchEvent.STATUS_SEARCHING:
      return 'Searching files';

    default:
      throw new Error(`Unknown status: ${status}`);
  }
}
