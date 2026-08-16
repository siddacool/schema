export function getIdByPath(path: string): string {
  return path.split('.').pop() ?? path;
}
