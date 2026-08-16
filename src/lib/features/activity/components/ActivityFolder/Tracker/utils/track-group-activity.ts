import { getIdByPath } from '$lib/features/activity/utils/get-id-by-path';
import { createDate } from '$lib/utils/date-time/createDate';
import { flagMatchingEntries } from './find-matching-entry';

type Entry = {
  id: string;
  content: string;
};

export function trackGroupActivity(groupId: string, folderId: string) {
  const folder = document.getElementById(folderId);
  const group = folder?.querySelector(`.ActivityGroup-${groupId}`);
  const nodes = group?.querySelectorAll('.ltree-node[data-tree-path]');
  const entries: Entry[] = [];

  if (!nodes) {
    return undefined;
  }

  for (const node of nodes) {
    const description = node.querySelector('.description');
    const path = node.getAttribute('data-tree-path');
    const id = getIdByPath(path || '');

    if (!id) {
      continue;
    }

    if (!description?.textContent) {
      continue;
    }

    entries.push({
      id,
      content: description?.textContent,
    });
  }

  const today = createDate().format('HH:mm');

  const candidates = flagMatchingEntries(entries, today);
  const finalCandidate = candidates.filter((item) => item.flagged)[0].id;

  return finalCandidate;
}
