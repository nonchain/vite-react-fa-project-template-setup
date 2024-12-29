import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { rootSidebarItemsList } from "./sidebar-items-list.constant";
import SidebarNavLinkItem from "@/components/sidebar/sidebar-nav-link-item";
import Logo from "/react.png";
import SidebarExpandButton from "@/components/sidebar/sidebar-expand-button";
import { cn } from "@/lib/utils";
import SidebarCollapseItem from "@/components/sidebar/sidebar-collapse-item";

function RootSidebar() {
  const { open } = useSidebar();
  return (
    <Sidebar side="right" collapsible="icon">
      <SidebarHeader>
        <div className="flex items-center w-full gap-3">
          <img src={Logo} alt="logo" loading="lazy" className={open ? "size-10" : "size-8"} />
          <p className={cn("duration-200 transition-all font-semibold", open ? "scale-100" : "scale-0")}>قالب فارسی ریکت</p>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup className={open ? "pr-3" : "pr-1.5"}>
          <SidebarGroupLabel>داشبورد</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {rootSidebarItemsList.map((sidebarItem) => (
                <SidebarMenuItem key={sidebarItem.label}>
                  {sidebarItem.type === "link" ? (
                    <SidebarNavLinkItem {...sidebarItem}>
                      <p>{sidebarItem.label}</p>
                    </SidebarNavLinkItem>
                  ) : (
                    <SidebarCollapseItem {...sidebarItem} />
                  )}
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarExpandButton />
      </SidebarFooter>
    </Sidebar>
  );
}

export default RootSidebar;
