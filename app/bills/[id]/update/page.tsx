import Link from "next/link";
import UpdateBillsForm from "@/components/bills/update-form";
import { ArrowLeft } from "lucide-react";
import { GetBillById } from "@/lib/actions/bills";

export default async function UpdateBill({
  params,
}: {
  params: { id: string };
}) {
  const item = await GetBillById(params.id);

  return (
    <div>
      <Link href="../" className="flex gap-2 hover:underline">
        <ArrowLeft />
        Back
      </Link>
      <h1 className="text-center text-2xl">Update</h1>
      <div className="mt-5">
        <UpdateBillsForm item={item} />
      </div>
    </div>
  );
}
