import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { RiArrowDownSLine } from "@remixicon/react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import SidebarNavLinkItem from "../sidebar-nav-link-item";
import { cn } from "@/lib/utils";
import { CollapseSubItem } from "../sidebar.type";
import { ReactNode } from "react";

type SidebarCollapseItemProps = {
  label: string;
  icon: ReactNode | null;
  items: CollapseSubItem[];
  defaultOpen?: boolean;
  collapsibleContentClassName?: string;
  collapsibleTriggerClassName?: string;
};

function SidebarCollapseItem({
  label,
  items,
  defaultOpen = false,
  icon,
  collapsibleContentClassName = "",
  collapsibleTriggerClassName = "",
}: SidebarCollapseItemProps) {
  const { open } = useSidebar();
  return (
    <SidebarMenu>
      <Collapsible defaultOpen={defaultOpen} className="group/collapsible">
        <SidebarMenuItem>
          <CollapsibleTrigger asChild>
            <SidebarMenuButton
              className={cn(
                "justify-between rounded h-9 bg-sidebar text-zinc-800 hover:bg-zinc-200 [&_>_#nav-link-icon_>_*]:text-zinc-800",
                open ? "p-1.5" : "p-1",
                collapsibleTriggerClassName
              )}
            >
              <div className={cn("flex items-center ", icon ? "gap-2" : "gap-0")}>
                <span id="sidebar-collapse-item-icon">{icon}</span>
                <p>{label}</p>
              </div>
              <RiArrowDownSLine className="transition-transform group-data-[state=open]/collapsible:rotate-180" />
            </SidebarMenuButton>
          </CollapsibleTrigger>
          <CollapsibleContent className={collapsibleContentClassName}>
            <SidebarMenuSub className="border-l-0 border-r">
              {items &&
                items.map((item, index) =>
                  item.type === "link" ? (
                    <SidebarNavLinkItem key={index} {...item}>
                      <p>{item.label}</p>
                    </SidebarNavLinkItem>
                  ) : (
                    <SidebarMenuSubItem
                      key={index}
                      className={cn(
                        "flex w-full items-center rounded bg-sidebar text-zinc-800 hover:bg-zinc-200 [&_>_#nav-link-icon_>_*]:text-zinc-800 relative overflow-hidden cursor-pointer",
                        item?.icon ? "gap-2" : "gap-0 h-9",
                        open ? "p-1.5" : "p-1"
                      )}
                    >
                      <span id="sidebar-menu-item-icon" className="[&_~_*]:w-full">{item.icon}</span>
                      {item.component}
                    </SidebarMenuSubItem>
                  )
                )}
            </SidebarMenuSub>
          </CollapsibleContent>
        </SidebarMenuItem>
      </Collapsible>
    </SidebarMenu>
  );
}

export default SidebarCollapseItem;
