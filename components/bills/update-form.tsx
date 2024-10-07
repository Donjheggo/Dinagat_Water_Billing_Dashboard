"use client";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { Button } from "../ui/button";
import { Loader } from "lucide-react";
import { useRouter } from "next/navigation";
import { Tables } from "@/database.types";
import { GetAllClients } from "@/lib/actions/clients";
import type { ClientsT } from "./create-dialog";
import { UpdateBill } from "@/lib/actions/bills";

export default function UpdateBillsForm({ item }: { item: BillsT }) {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);
  const [clients, setClients] = useState<ClientsT[]>([]);

  useEffect(() => {
    const fetchClients = async () => {
      const data = await GetAllClients();
      if (data) setClients(data);
    };

    fetchClients();
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    if (
      !formData.get("billing_number") ||
      !formData.get("client_id") ||
      !formData.get("due_date") ||
      !formData.get("penalty_date") ||
      !formData.get("penalty") ||
      !formData.get("amount") ||
      !formData.get("is_paid")
    ) {
      toast.error("Please fill in all the required fields correctly.");
      return;
    }
    setLoading(true);
    try {
      const { error } = await UpdateBill(formData);
      if (error) {
        toast.error(error.toString());
      }
      router.push("/bills");
    } catch (error) {
      toast.error("There was an unexpected error updating.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="grid gap-4 mt-5 container max-w-screen-sm mx-auto">
        <div className="grid gap-2">
          <Label htmlFor="billing_number">Billing no.</Label>
          <input name="id" defaultValue={item.id} hidden />
          <Input
            name="billing_number"
            id="billing_number"
            type="text"
            placeholder=""
            required
            defaultValue={item.billing_number}
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="name">Client name</Label>
          <Select name="client_id" defaultValue={item.client_id}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select Service" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {clients.map((item, index) => (
                  <SelectItem key={index} value={item.id}>
                    {item.name}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <div className="grid gap-2">
          <Label htmlFor="due_date">Due date</Label>
          <Input
            name="due_date"
            id="due_date"
            type="date"
            placeholder=""
            required
            defaultValue={new Date(item.due_date).toISOString().slice(0, 10)}
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="penalty_date">Penalty date</Label>
          <Input
            name="penalty_date"
            id="penalty_date"
            type="date"
            placeholder=""
            required
            defaultValue={new Date(item.penalty_date)
              .toISOString()
              .slice(0, 10)}
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="penalty">Penalty amount</Label>
          <Input
            name="penalty"
            id="penalty"
            type="number"
            placeholder=""
            required
            defaultValue={item.penalty}
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="amount">Amount</Label>
          <Input
            name="amount"
            id="amount"
            type="number"
            placeholder=""
            required
            defaultValue={item.amount}
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="name">Payment Status</Label>
          <Select name="is_paid" defaultValue={item.is_paid.toString()}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="true">Paid</SelectItem>
                <SelectItem value="false">Pending</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        <Button type="submit" disabled={loading}>
          {loading ? <Loader className="animate-spin" /> : "Save"}
        </Button>
      </div>
    </form>
  );
}

export type BillsT = Tables<"bills">;
