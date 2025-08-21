import type { PillNavProps } from '~/shared/ui/components/PillNav/PillNav';

export const DEFAULT_PILL_NAV_CONFIG: Omit<PillNavProps, 'items' | 'activeHref'> = {
  logo: "/logo.svg",
  logoAlt: "React Showcase Logo",
  baseColor: "#1a1a1a",
  pillColor: "#000000",
  hoveredPillTextColor: "#ffffff",
  pillTextColor: "#c9c9c9",
  initialLoadAnimation: true,
  ease: "power3.easeOut",
};
