import type { PillNavItem } from '~/shared/ui/components/PillNav/PillNav';
import { ROUTES } from './routes';

export const NAVIGATION_ITEMS: PillNavItem[] = [
  {
    label: 'главная',
    href: ROUTES.HOME,
  },
  {
    label: 'галерея',
    href: ROUTES.GALLERY,
  },
  {
    label: 'о нас',
    href: ROUTES.ABOUT,
  },
];
