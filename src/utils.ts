export const API_VERSION = 1;
export const API_PREFIX = '/api';

export function apiUriFor(path: string) {
  return `${API_PREFIX}/v${API_VERSION}${path}`;
}
