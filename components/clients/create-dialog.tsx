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
import { Textarea } from "../ui/textarea";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus } from "lucide-react";
import { CreateClient } from "@/lib/actions/clients";
import { toast } from "react-toastify";

export default function CreateClientDialog() {
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    if (
      !formData.get("name") ||
      !formData.get("meter_number") ||
      !formData.get("contact_number") ||
      !formData.get("address")
    ) {
      toast.error("Please fill in all the required fields correctly.");
      return;
    }

    try {
      const { error } = await CreateClient(formData);
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
          <Plus size={18} className="mr-2" /> New Client
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Create Client</DialogTitle>
            <DialogDescription>
              Complete the fields and hit create.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="meter_number" className="text-right">
                Meter no.
              </Label>
              <Input
                name="meter_number"
                id="meter_number"
                type="number"
                placeholder=""
                className="col-span-3"
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Full name
              </Label>
              <Input
                name="name"
                id="name"
                type="text"
                placeholder=""
                className="col-span-3"
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="contact_number" className="text-right">
                Contact no.
              </Label>
              <Input
                name="contact_number"
                id="contact_number"
                type="number"
                placeholder=""
                className="col-span-3"
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="address" className="text-right">
                Address
              </Label>
              <Textarea
                name="address"
                id="address"
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

export type ServiceT = {
  id?: string;
  name: string;
  price: number;
};
