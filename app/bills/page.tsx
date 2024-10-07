import BillsTable from "@/components/bills/table";
import SearchBar from "@/components/search-bar";
import CreateBillsDialog from "@/components/bills/create-dialog";

export default function Customers({
  searchParams,
}: {
  searchParams?: { query?: string; page?: string };
}) {
  const searchQuery = searchParams?.query || "";
  const page = Number(searchParams?.page) || 1;

  return (
    <div className="container max-w-screen-lg mx-auto">
      <h1 className="text-center text-2xl">Bills</h1>
      <div className="mt-5">
        <div className="flex items-center justify-between">
          <SearchBar />
          <CreateBillsDialog />
        </div>
        <div className="mt-2">
          <BillsTable searchQuery={searchQuery} page={page} />
        </div>
      </div>
    </div>
  );
}
