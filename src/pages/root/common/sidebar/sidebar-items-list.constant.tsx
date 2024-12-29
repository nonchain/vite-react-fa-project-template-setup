import { ROUTES } from "@/lib/constants/routes.constant";
import { RiCupFill, RiDashboardFill, RiShoppingBagFill } from "@remixicon/react";
import { SideBarItem } from "../../../../components/sidebar/sidebar.type";
import AboutMePopover from "@/components/about-me.popover";

export const rootSidebarItemsList: SideBarItem[] = [
  {
    type: "link",
    label: "خانه",
    icon: <RiDashboardFill />,
    href: ROUTES.main.root,
  },
  {
    type: "link",
    label: "محصولات",
    icon: <RiShoppingBagFill />,
    href: ROUTES.main.products,
  },
  {
    type: "collapse",
    label: "رو من کلیک کن",
    icon: <RiCupFill />,
    items: [
      {
        type: "link",
        label: "حساب کاربری",
        icon: null,
        href: ROUTES.user.profile,
      },
      {
        type: "custom",
        label: "درباره من",
        icon: null,
        component: <AboutMePopover />
      },
    ],
  },
];
