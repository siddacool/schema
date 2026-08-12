export function getParentListByPath(path: string) {
  if (!path.includes('.')) {
    return undefined;
  }

  const parts = path.split('.');
  parts.pop();

  return parts;
}
