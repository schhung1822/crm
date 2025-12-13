import {
  ShoppingBag,
  Forklift,
  Mail,
  MessageSquare,
  Calendar,
  Kanban,
  ReceiptText,
  Users,
  Lock,
  Fingerprint,
  SquareArrowUpRight,
  LayoutDashboard,
  ChartBar,
  Banknote,
  Gauge,
  GraduationCap,
  type LucideIcon,
  Music,
  PlayCircle,
  Tv,
  TrendingUp,
  Ruler,
  Scale,
  KeyIcon,
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
        title: "Học viện",
        url: "/dashboard/coming-soon",
        icon: GraduationCap,
        comingSoon: true,
      },
      {
        title: "Nhạc nền",
        url: "/dashboard/coming-soon",
        icon: Music,
        comingSoon: true,
      },
    ],
  },
  {
    id: 2,
    label: "Quản lý",
    items: [
      {
        title: "Kênh",
        url: "/kenh",
        icon: Tv,
      },
      {
        title: "Từ khóa",
        url: "/keyword",
        icon: KeyIcon,
        comingSoon: true,
      },
      {
        title: "Học viên",
        url: "/academy",
        icon: GraduationCap,
      },
      {
        title: "Thành viên",
        url: "/user",
        icon: Users,
      },
      {
        title: "Xác thực",
        url: "/auth",
        icon: Fingerprint,
        subItems: [
          { title: "Đăng nhập v1", url: "/auth/v1/login", newTab: true },
          { title: "Đăng nhập v2", url: "/auth/v2/login", newTab: true },
          { title: "Đăng ký v1", url: "/auth/v1/register", newTab: true },
          { title: "Đăng ký v2", url: "/auth/v2/register", newTab: true },
        ],
      },
    ],
  },
  {
    id: 3,
    label: "Khác",
    items: [
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
