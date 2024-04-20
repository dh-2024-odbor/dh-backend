export enum MainSidebarType {
  dashboard = 'dashboard',
}

export interface SidebarItemMeta {
  icon?: string;
  activeIcon?: string;
  labelKey?: NestedKeyOf<MessageSchema>;
  path: string;
}