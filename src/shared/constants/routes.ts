export const ROUTES = {
  HOME: '/',
  GALLERY: '/gallery',
  ABOUT: '/about',
  CONTACT: '/contact',
} as const;

export const ROUTE_NAMES = {
  [ROUTES.HOME]: 'Home',
  [ROUTES.GALLERY]: 'Gallery',
  [ROUTES.ABOUT]: 'About',
  [ROUTES.CONTACT]: 'Contact',
} as const;
