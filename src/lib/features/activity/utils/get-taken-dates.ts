import type { Activity, ActivityGroup } from '../types';

export function getTakenDates(groups: ActivityGroup[], currentData?: Activity) {
  const currentDate = currentData?.description;
  const excludeList = groups.map((item) => item.description).filter((item) => item !== currentDate);

  return excludeList;
}
