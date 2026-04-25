import { base } from '$app/paths';

export function pathWithBase(path: string): string {
  if (path === '/') {
    return base || '/';
  }

  const normalizedPath = `/${path}`.replace(/\/+/g, '/');
  return `${base}${normalizedPath}`;
}

export function postHref(path: string): string {
  const normalizedPath = path.trim().replace(/^\/+|\/+$/g, '');
  const routePath = normalizedPath.startsWith('posts/')
    ? normalizedPath
    : `posts/${normalizedPath}`;

  return pathWithBase(routePath);
}
