import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import UpdateClientForm from "@/components/clients/update-form";
import { GetClientById } from "@/lib/actions/clients";

export default async function UpdateCustomer({
  params,
}: {
  params: { id: string };
}) {
  const item = await GetClientById(params.id);

  return (
    <div>
      <Link href="../" className="flex gap-2 hover:underline">
        <ArrowLeft />
        Back
      </Link>
      <h1 className="text-center text-2xl">Update</h1>
      <div className="mt-5">
        <UpdateClientForm item={item} />
      </div>
    </div>
  );
}
