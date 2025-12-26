import { DataTable } from "./_components/data-table";
import { getProducts } from "@/lib/products";

export default async function Page() {
  const products = await getProducts();

  return (
    <div className="@container/main flex flex-col gap-4 md:gap-6">
      <DataTable data={products} />
    </div>
  );
}
