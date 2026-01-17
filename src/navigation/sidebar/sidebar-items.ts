import {
  Users,
  SquareArrowUpRight,
  LayoutDashboard,
  ChartBar,
  Banknote,
  Gauge,
  type LucideIcon,
  TrendingUp,
  Scale,
  ShoppingBagIcon,
  PackageIcon,
  Calendar1Icon,
  AppWindowIcon,
  UserCog,
  Bell,
} from "lucide-react";

export interface NavSubItem {
  title: string;
  url: string;
  icon?: LucideIcon;
  comingSoon?: boolean;
  newTab?: boolean;
  isNew?: boolean;
}

export interface NavMainItem {
  title: string;
  url: string;
  icon?: LucideIcon;
  subItems?: NavSubItem[];
  comingSoon?: boolean;
  newTab?: boolean;
  isNew?: boolean;
}

export interface NavGroup {
  id: number;
  label?: string;
  items: NavMainItem[];
}

export const sidebarItems: NavGroup[] = [
  {
    id: 1,
    label: "Dashboards",
    items: [
      {
        title: "Tổng quan",
        url: "/dashboard/default",
        icon: LayoutDashboard,
      },
      {
        title: "CRM",
        url: "/dashboard/crm",
        icon: ChartBar,
      },
      {
        title: "Tài chính",
        url: "/dashboard/finance",
        icon: Banknote,
      },
      {
        title: "Phân tích",
        url: "/dashboard/coming-soon",
        icon: Gauge,
        comingSoon: true,
      },
      {
        title: "Trending",
        url: "/dashboard/coming-soon",
        icon: TrendingUp,
        comingSoon: true,
      },
      {
        title: "Zalo OA",
        url: "/dashboard/coming-soon",
        icon: AppWindowIcon,
        comingSoon: true,
      },
    ],
  },
  {
    id: 2,
    label: "Quản lý",
    items: [
      {
        title: "Đơn hàng",
        url: "/orders",
        icon: ShoppingBagIcon,
      },
      {
        title: "Khách hàng",
        url: "/customers",
        icon: Users,
      },
      {
        title: "Hàng hóa",
        url: "/products",
        icon: PackageIcon,
      },
      {
        title: "Sự kiện",
        url: "/events",
        icon: Calendar1Icon,
      },
      {
        title: "Thông báo",
        url: "/auth",
        icon: Bell,
        subItems: [
          { title: "Cập nhật", url: "/thong-bao/cap-nhap", newTab: true },
          { title: "Dịch vụ", url: "/thong-bao/dich-vu", newTab: true },
        ],
      },
    ],
  },
  {
    id: 3,
    label: "Khác",
    items: [
      {
        title: "Tài khoản",
        url: "/account",
        icon: UserCog,
      },
      {
        title: "Quy tắc",
        url: "/rules",
        icon: Scale,
      },
      {
        title: "Khác",
        url: "/other",
        icon: SquareArrowUpRight,
      },
    ],
  },
];
