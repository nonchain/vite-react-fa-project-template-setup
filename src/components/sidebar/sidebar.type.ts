import { ReactNode } from "react";

export type SidebarBasicItem = {
  icon: ReactNode | null;
  label: string;
};

export type SidebarItem = SidebarBasicItem & {
  type: "custom"
  component: ReactNode
};

export type SidebarLinkItem = SidebarBasicItem & {
  type: "link";
  href: string;
};

export type SideBarItem = SidebarLinkItem | SidebarCollapseItem | SidebarItem;
export type CollapseSubItem = SidebarLinkItem | SidebarItem;

export type SidebarCollapseItem = SidebarBasicItem & {
  type: "collapse";
  items: CollapseSubItem[];
};
