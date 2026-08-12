import { getParentListByPath } from './get-patent-list-by-path';

export function getParentByPath(path: string) {
  const list = getParentListByPath(path);

  if (!list?.length) {
    return undefined;
  }

  return list[list.length - 1];
}
