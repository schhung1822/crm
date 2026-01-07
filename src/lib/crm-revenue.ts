import { unstable_cache } from "next/cache";
import { getDB } from "@/lib/db";
import { buildRevenueHorizontalBars, buildRevenuePie, type RevenueGroupRow } from "@/app/(main)/dashboard/crm/_components/crm.config";

type ChartResult = ReturnType<typeof buildRevenuePie>;

function mapRows(rows: any[]): RevenueGroupRow[] {
  return (rows ?? []).map((r) => ({
    name: String(r.name ?? "Không rõ"),
    revenue: Number(r.revenue) || 0,
  }));
}

function buildDateFilter(from?: Date, to?: Date) {
  if (!from && !to) return { clause: "", params: [] as (Date | number)[] };
  
  const params: (Date | number)[] = [];
  let clause = "";
  
  if (from && to) {
    clause = "create_time >= ? AND create_time <= ?";
    params.push(from, to);
  } else if (from) {
    clause = "create_time >= ?";
    params.push(from);
  } else if (to) {
    clause = "create_time <= ?";
    params.push(to);
  }
  
  return { clause, params };
}

// ====== Doanh thu theo kênh bán ======
export const getRevenueByChannelChart = unstable_cache(
  async (from?: Date, to?: Date): Promise<ChartResult> => {
    const db = getDB();
    const dateFilter = buildDateFilter(from, to);
    
    const whereClause = dateFilter.clause || "1=1";
    
    const [rows] = await db.query<any[]>(
      `
      SELECT COALESCE(kenh_ban, 'Không rõ') AS name,
             SUM(COALESCE(thanh_tien, 0)) AS revenue
      FROM orders
      WHERE ${whereClause}
      GROUP BY COALESCE(kenh_ban, 'Không rõ')
      ORDER BY revenue DESC
      `,
      dateFilter.params
    );

    return buildRevenuePie(mapRows(rows), "Doanh thu");
  },
  ["crm-revenue-by-channel"],
  { revalidate: 300 }
);

export const getRevenueByBranchBarChart = unstable_cache(
  async (from?: Date, to?: Date, limit: number = 12) => {
    const db = getDB();
    const dateFilter = buildDateFilter(from, to);
    
    const whereClause = dateFilter.clause || "1=1";
    
    const [rows] = await db.query<any[]>(
      `
      SELECT COALESCE(brand, 'Không rõ') AS name,
             SUM(COALESCE(thanh_tien, 0)) AS revenue
      FROM orders
      WHERE ${whereClause}
      GROUP BY COALESCE(brand, 'Không rõ')
      ORDER BY revenue DESC
      LIMIT ?
      `,
      [...dateFilter.params, limit]
    );

    const mapped: RevenueGroupRow[] = (rows ?? []).map((r) => ({
      name: String(r.name ?? "Không rõ"),
      revenue: Number(r.revenue) || 0,
    }));

    return buildRevenueHorizontalBars(mapped);
  },
  ["crm-revenue-branch-bars"],
  { revalidate: 300 }
);

// ====== Thống kê tổng quan ======
export const getCRMStats = unstable_cache(
  async (from?: Date, to?: Date) => {
    const db = getDB();
    const dateFilter = buildDateFilter(from, to);
    
    const whereClause = dateFilter.clause || "1=1";
    
    const [rows] = await db.query<any[]>(
      `
      SELECT 
        COUNT(*) AS totalOrders,
        SUM(COALESCE(quantity, 0)) AS totalQuantity,
        SUM(COALESCE(tien_hang, 0)) AS totalTienHang,
        SUM(COALESCE(thanh_tien, 0)) AS totalThanhTien
      FROM orders
      WHERE ${whereClause}
      `,
      dateFilter.params
    );

    const row = rows[0] || {};
    return {
      totalOrders: Number(row.totalOrders) || 0,
      totalQuantity: Number(row.totalQuantity) || 0,
      totalTienHang: Number(row.totalTienHang) || 0,
      totalThanhTien: Number(row.totalThanhTien) || 0,
    };
  },
  ["crm-stats"],
  { revalidate: 300 }
);

// ====== Phễu chuyển đổi theo thương hiệu ======
export const getBrandConversionFunnel = unstable_cache(
  async (from?: Date, to?: Date) => {
    const db = getDB();
    const dateFilter = buildDateFilter(from, to);
    
    const whereClause = dateFilter.clause || "1=1";
    
    const [rows] = await db.query<any[]>(
      `
      SELECT 
        COALESCE(p.brand, o.brand_pro, 'Không rõ') AS brand,
        COUNT(*) AS orders
      FROM orders o
      LEFT JOIN product p ON o.pro_ID = p.pro_ID
      WHERE ${whereClause.replace('create_time', 'o.create_time')}
      GROUP BY COALESCE(p.brand, o.brand_pro, 'Không rõ')
      ORDER BY orders DESC
      LIMIT 5
      `,
      dateFilter.params
    );

    const colors = ['var(--chart-1)', 'var(--chart-2)', 'var(--chart-3)', 'var(--chart-4)', 'var(--chart-5)'];
    return (rows ?? []).map((r, idx) => ({
      stage: String(r.brand ?? "Không rõ"),
      value: Number(r.orders) || 0,
      fill: colors[idx % 5],
    }));
  },
  ["crm-brand-funnel"],
  { revalidate: 300 }
);

// ====== Tổng hợp kênh bán ======
export const getChannelSalesSummary = unstable_cache(
  async (from?: Date, to?: Date) => {
    const db = getDB();
    const dateFilter = buildDateFilter(from, to);
    
    const whereClause = dateFilter.clause || "1=1";
    
    const [rows] = await db.query<any[]>(
      `
      SELECT
        COALESCE(kenh_ban, 'Không rõ') AS kenh_ban,
        COUNT(*) AS orders,
        SUM(COALESCE(quantity, 0)) AS quantity,
        SUM(COALESCE(tien_hang, 0) * COALESCE(quantity, 0)) AS tien_hang,
        SUM(COALESCE(giam_gia, 0)) AS giam_gia,
        SUM(COALESCE(thanh_tien, 0)) AS thanh_tien
      FROM orders
      WHERE ${whereClause}
      GROUP BY COALESCE(kenh_ban, 'Không rõ')
      ORDER BY thanh_tien DESC
      `,
      dateFilter.params
    );

    return (rows ?? []).map((r) => ({
      kenh_ban: String(r.kenh_ban ?? "Không rõ"),
      orders: Number(r.orders) || 0,
      quantity: Number(r.quantity) || 0,
      tien_hang: Number(r.tien_hang) || 0,
      giam_gia: Number(r.giam_gia) || 0,
      thanh_tien: Number(r.thanh_tien) || 0,
    }));
  },
  ["crm-channel-sales-summary"],
  { revalidate: 300 }
);

// ====== Top sản phẩm bán chạy theo số lượng ======
export const getTopProductsByQuantity = unstable_cache(
  async (from?: Date, to?: Date, limit: number = 10) => {
    const db = getDB();
    const dateFilter = buildDateFilter(from, to);
    
    const whereClause = dateFilter.clause || "1=1";
    
    const [rows] = await db.query<any[]>(
      `
      SELECT 
        COALESCE(name_pro, 'Không rõ') AS product,
        SUM(COALESCE(quantity, 0)) AS totalQuantity
      FROM orders
      WHERE ${whereClause}
      GROUP BY COALESCE(name_pro, 'Không rõ')
      ORDER BY totalQuantity DESC
      LIMIT ?
      `,
      [...dateFilter.params, limit]
    );

    const total = (rows ?? []).reduce((sum, r) => sum + (Number(r.totalQuantity) || 0), 0);
    
    return (rows ?? []).map((r) => {
      const quantity = Number(r.totalQuantity) || 0;
      return {
        product: String(r.product ?? "Không rõ"),
        quantity,
        percentage: total > 0 ? Math.round((quantity / total) * 100) : 0,
      };
    });
  },
  ["crm-top-products-quantity"],
  { revalidate: 300 }
);

// ====== Top sales theo doanh thu ======
export const getTopSalesByRevenue = unstable_cache(
  async (from?: Date, to?: Date, limit: number = 5) => {
    const db = getDB();
    const dateFilter = buildDateFilter(from, to);
    
    const whereClause = dateFilter.clause || "1=1";
    
    const [rows] = await db.query<any[]>(
      `
      SELECT 
        COALESCE(seller, 'Không rõ') AS seller,
        SUM(COALESCE(thanh_tien, 0)) AS totalRevenue,
        COUNT(*) AS totalOrders
      FROM orders
      WHERE ${whereClause}
      GROUP BY COALESCE(seller, 'Không rõ')
      ORDER BY totalRevenue DESC
      LIMIT ?
      `,
      [...dateFilter.params, limit]
    );

    return (rows ?? []).map((r) => ({
      seller: String(r.seller ?? "Không rõ"),
      revenue: Number(r.totalRevenue) || 0,
      orders: Number(r.totalOrders) || 0,
    }));
  },
  ["crm-top-sales-revenue"],
  { revalidate: 300 }
);
