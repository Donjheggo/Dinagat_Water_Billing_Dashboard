"use server";

import { createClient } from "../supabase/server";
import { revalidatePath } from "next/cache";

export async function GetBills(
  searchQuery: string,
  page: number,
  items_per_page: number
) {
  try {
    const supabase = createClient();
    const query = supabase
      .from("bills")
      .select(`*, client_id(name)`)
      .order("created_at", { ascending: true })
      .range((page - 1) * items_per_page, page * items_per_page - 1);

    const { data, error } = searchQuery
      ? await query.ilike("client_id.name", `%${searchQuery}%`)
      : await query;

    if (error) {
      console.error(error);
      return [];
    }

    // filtering for search query foreign key
    const filteredData = data.filter((item) => item.client_id !== null);

    return filteredData || [];
  } catch (error) {
    console.error(error);
    return [];
  }
}

export async function CreateBill(formData: FormData) {
  try {
    const supabase = createClient();
    const { error } = await supabase
      .from("bills")
      .insert({
        client_id: formData.get("client_id"),
        billing_number: formData.get("billing_number"),
        due_date: formData.get("due_date"),
        penalty_date: formData.get("penalty_date"),
        penalty: formData.get("penalty"),
        amount: formData.get("amount"),
        is_paid: false,
      })
      .select();

    if (error) {
      return { error: error.message };
    }
    revalidatePath("/bills");
    return { error: "" };
  } catch (error) {
    return { error: error };
  }
}

export async function GetBillById(id: string) {
  try {
    const supabase = createClient();
    const { error, data } = await supabase
      .from("bills")
      .select("*")
      .eq("id", id)
      .single();

    if (error) {
      return false;
    }
    return data;
  } catch (error) {
    return false;
  }
}

export async function UpdateBill(formData: FormData) {
  try {
    const supabase = createClient();
    const { error } = await supabase
      .from("bills")
      .update({
        client_id: formData.get("client_id"),
        billing_number: formData.get("billing_number"),
        due_date: formData.get("due_date"),
        penalty_date: formData.get("penalty_date"),
        penalty: formData.get("penalty"),
        amount: formData.get("amount"),
        is_paid: formData.get("is_paid"),
      })
      .eq("id", formData.get("id"))
      .select();

    if (error) {
      return { error: error };
    }
    revalidatePath("/bills");
    return { error: "" };
  } catch (error) {
    return { error: error };
  }
}

export async function DeleteBill(id: string) {
  try {
    const supabase = createClient();
    const { error } = await supabase.from("bills").delete().eq("id", id);

    if (error) {
      return { error: error.message };
    }
    revalidatePath("/bills");
    return { error: "" };
  } catch (error) {
    return { error: error };
  }
}

export async function GetTotalBills() {
  try {
    const supabase = createClient();
    const { error, data } = await supabase.from("bills").select("*");

    if (error) {
      console.error(error);
      return 0;
    }
    return data.length || 0;
  } catch (error) {
    console.error(error);
    return 0;
  }
}

export async function GetAllBills() {
  try {
    const supabase = createClient();
    const { data, error } = await supabase.from("bills").select("*");

    if (error) {
      console.error(error.message);
      return [];
    }
    return data || [];
  } catch (error) {
    console.error(error);
    return [];
  }
}

export async function GetAllPaidBills() {
  try {
    const supabase = createClient();
    const { data, error } = await supabase
      .from("bills")
      .select("*")
      .eq("is_paid", true);

    if (error) {
      console.error(error.message);
      return 0;
    }
    return data.length || 0;
  } catch (error) {
    console.error(error);
    return 0;
  }
}

export async function GetAllUpaidBills() {
  try {
    const supabase = createClient();
    const { data, error } = await supabase
      .from("bills")
      .select("*")
      .eq("is_paid", false);

    if (error) {
      console.error(error.message);
      return 0;
    }
    return data.length || 0;
  } catch (error) {
    console.error(error);
    return 0;
  }
}
