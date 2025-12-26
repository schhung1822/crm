import { DataTable } from "./_components/data-table";
import { getUser } from "@/lib/customers";

export default async function Page() {
  const users = await getUser();

  return (
    <div className="@container/main flex flex-col gap-4 md:gap-6">
      <DataTable data={users} />
    </div>
  );
}
