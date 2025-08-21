

export interface BaseComponent {
  className?: string;
  children?: React.ReactNode;
}

export interface RouteConfig {
  path: string;
  name: string;
  component: React.ComponentType;
}

export interface AnimationConfig {
  duration?: number;
  delay?: number;
  ease?: string;
}


export interface BackgroundProps extends BaseComponent {
  variant?: 'particles' | 'galaxy';
}


export interface NavigationItem {
  id: string;
  label: string;
  path: string;
  isActive?: boolean;
}


export interface ListItem {
  id: string;
  title: string;
  description?: string;
  icon?: React.ReactNode;
}


export interface StackItem {
  id: string;
  title: string;
  content: React.ReactNode;
  backgroundColor?: string;
}
