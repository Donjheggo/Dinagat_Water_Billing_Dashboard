import ClientsTable from "@/components/clients/table";
import SearchBar from "@/components/search-bar";
import CreateClientDialog from "@/components/clients/create-dialog";

export default function Customers({
  searchParams,
}: {
  searchParams?: { query?: string; page?: string };
}) {
  const searchQuery = searchParams?.query || "";
  const page = Number(searchParams?.page) || 1;

  return (
    <div className="container max-w-screen-lg mx-auto">
      <h1 className="text-center text-2xl">Customers</h1>
      <div className="mt-5">
        <div className="flex items-center justify-between">
          <SearchBar />
          <CreateClientDialog />
        </div>
        <div className="mt-2">
          <ClientsTable searchQuery={searchQuery} page={page} />
        </div>
      </div>
    </div>
  );
}
