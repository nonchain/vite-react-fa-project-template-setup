import { useSidebar } from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
import { RiSidebarFoldLine } from "@remixicon/react";

function SidebarExpandButton() {
  const { open, toggleSidebar } = useSidebar();
  return (
    <div
      className={cn(
        "rounded-full w-full overflow-hidden cursor-pointer [perspective:1000px] [transform-style:preserve-3d] transition duration-200",
        open ? "[transform:rotateY(180deg)]" : "[transform:rotateY(0deg)] mr-1"
      )}
      onClick={toggleSidebar}
    >
      <RiSidebarFoldLine />
    </div>
  );
}

export default SidebarExpandButton;
