"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus } from "lucide-react";
import { toast } from "react-toastify";
import { CreateBill } from "@/lib/actions/bills";
import { useState, useEffect } from "react";
import { Tables } from "@/database.types";
import { GetAllClients } from "@/lib/actions/clients";

export default function CreateBillsDialog() {
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
      !formData.get("amount")
    ) {
      toast.error("Please fill in all the required fields correctly.");
      return;
    }

    try {
      const { error } = await CreateBill(formData);
      if (error) {
        toast.error(error.toString());
      }
    } catch (error) {
      toast.error("There was an unexpected error creating.");
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="default" className="flex items-center">
          <Plus size={18} className="mr-2" /> New Bill
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Create Bill</DialogTitle>
            <DialogDescription>
              Complete the fields and hit create.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="billing_number" className="text-right">
                Billing no.
              </Label>
              <Input
                name="billing_number"
                id="billing_number"
                type="number"
                placeholder=""
                className="col-span-3"
                required
              />
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="client_id" className="text-right">
                Client
              </Label>
              <div className="col-span-3">
                <Select name="client_id">
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
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="due_date" className="text-right">
                Due date
              </Label>
              <Input
                name="due_date"
                id="due_date"
                type="date"
                placeholder=""
                className="col-span-3"
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="penalty_date" className="text-right">
                Penalty date
              </Label>
              <Input
                name="penalty_date"
                id="penalty_date"
                type="date"
                placeholder=""
                className="col-span-3"
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="penalty" className="text-right">
                Penalty
              </Label>
              <Input
                name="penalty"
                id="penalty"
                type="number"
                placeholder=""
                className="col-span-3"
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="amount" className="text-right">
                Amount
              </Label>
              <Input
                name="amount"
                id="amount"
                type="number"
                placeholder=""
                className="col-span-3"
                required
              />
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button type="submit">Create</Button>
            </DialogClose>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export type ClientsT = Tables<"clients">;
