"use server";

import { createClient } from "../supabase/server";
import { revalidatePath } from "next/cache";

export async function GetPayments(
  searchQuery: string,
  page: number,
  items_per_page: number
) {
  try {
    const supabase = createClient();
    const query = supabase
      .from("payments")
      .select(`*, client_id(name)`)
      .order("name", { ascending: true })
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

export async function GetPaymentById(id: string) {
  try {
    const supabase = createClient();
    const { error, data } = await supabase
      .from("payments")
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

export async function DeletePayment(id: string) {
  try {
    const supabase = createClient();
    const { error } = await supabase.from("payments").delete().eq("id", id);

    if (error) {
      return { error: error };
    }
    revalidatePath("/payments");
    return { error: "" };
  } catch (error) {
    return { error: error };
  }
}

export async function GetTotalPayments() {
  try {
    const supabase = createClient();
    const { error, data } = await supabase.from("payments").select("*");

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

export async function GetAllPayments() {
  try {
    const supabase = createClient();
    const { data, error } = await supabase.from("payments").select("*");

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
