import SearchBar from "@/components/search-bar";
import PaymentsTable from "@/components/payments/table";

export default function Payments({
  searchParams,
}: {
  searchParams?: { query?: string; page?: string };
}) {
  const searchQuery = searchParams?.query || "";
  const page = Number(searchParams?.page) || 1;

  return (
    <div className="container max-w-screen-lg mx-auto">
      <h1 className="text-center text-2xl">Payments</h1>
      <div className="mt-5">
        <div className="flex items-center justify-between">
          <SearchBar />
        </div>
        <div className="mt-2">
          <PaymentsTable searchQuery={searchQuery} page={page} />
        </div>
      </div>
    </div>
  );
}
