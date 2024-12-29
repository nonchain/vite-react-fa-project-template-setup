import { useSidebar } from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
import { PropsWithChildren, ReactNode } from "react";
import { NavLink } from "react-router-dom";

type SidebarNavLinkItemProps = {
  icon: ReactNode | null;
  href: string;
  className?: string;
} & PropsWithChildren;

function SidebarNavLinkItem({ icon, href, className = "", children }: SidebarNavLinkItemProps) {
  const { open } = useSidebar();

  return (
    <NavLink
      to={href}
      className={({ isActive }) =>
        cn(
          "flex w-full items-center rounded relative overflow-hidden",
          className,
          icon ? "gap-2" : "gap-0 h-9",
          open ? "p-1.5" : "p-1",
          isActive
            ? "bg-primary text-white hover:bg-zinc-700 [&_>_#nav-link-icon_>_*]:text-white"
            : "bg-sidebar text-zinc-800 hover:bg-zinc-200 [&_>_#nav-link-icon_>_*]:text-zinc-800"
        )
      }
      caseSensitive
      end
    >
      {icon ? <span id="nav-link-icon">{icon}</span> : <></>}
      <span className={cn("absolute w-60", icon ? "right-9" : "right-1")}>{children}</span>
    </NavLink>
  );
}

export default SidebarNavLinkItem;
