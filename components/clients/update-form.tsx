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
import { useState } from "react";
import { UpdateClient } from "@/lib/actions/clients";
import { toast } from "react-toastify";
import { Button } from "../ui/button";
import { Loader } from "lucide-react";
import { useRouter } from "next/navigation";
import { Tables } from "@/database.types";
import { Textarea } from "../ui/textarea";

export default function UpdateClientForm({ item }: { item: ClientsT }) {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);

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
    setLoading(true);
    try {
      const { error } = await UpdateClient(formData);
      if (error) {
        toast.error(error.toString());
      }
      router.push("/clients");
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
          <Label htmlFor="name">Meter no.</Label>
          <Input
            name="meter_number"
            id="meter_number"
            type="text"
            placeholder=""
            required
            defaultValue={item.meter_number}
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="name">Client name</Label>
          <input
            name="id"
            id="id"
            type="text"
            placeholder=""
            required
            defaultValue={item.id}
            hidden
          />
          <Input
            name="name"
            id="name"
            type="text"
            placeholder=""
            required
            defaultValue={item.name}
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="name">Contact no.</Label>
          <Input
            name="contact_number"
            id="contact_number"
            type="text"
            placeholder=""
            required
            defaultValue={item.contact_number}
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="address">Address</Label>
          <Textarea
            name="address"
            id="address"
            placeholder=""
            defaultValue={item.address}
            className="col-span-3"
            required
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="is_connected">Connection Status</Label>
          <div className="col-span-3">
            <Select
              name="is_connected"
              defaultValue={item.is_connected.toString()}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select Service" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="true">Connected</SelectItem>
                  <SelectItem value="false">Not connected</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>
        <Button type="submit" disabled={loading}>
          {loading ? <Loader className="animate-spin" /> : "Save"}
        </Button>
      </div>
    </form>
  );
}

export type ClientsT = Tables<"clients">;
