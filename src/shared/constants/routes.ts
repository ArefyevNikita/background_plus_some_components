export const ROUTES = {
  HOME: '/',
  // GALLERY: '/gallery',
  ABOUT: '/about',
} as const;

export const ROUTE_NAMES = {
  [ROUTES.HOME]: 'Home',
  // [ROUTES.GALLERY]: 'Gallery',
  [ROUTES.ABOUT]: 'About',
} as const;
