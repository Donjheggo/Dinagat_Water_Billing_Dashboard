"use server";

import { createClient } from "../supabase/server";
import { revalidatePath } from "next/cache";

export async function GetClients(
  searchQuery: string,
  page: number,
  items_per_page: number
) {
  try {
    const supabase = createClient();
    const query = supabase
      .from("clients")
      .select(`*`)
      .order("name", { ascending: true })
      .range((page - 1) * items_per_page, page * items_per_page - 1);

    const { data, error } = searchQuery
      ? await query.ilike("name", `%${searchQuery}%`)
      : await query;

    if (error) {
      console.error(error);
      return [];
    }

    return data || [];
  } catch (error) {
    console.error(error);
    return [];
  }
}

export async function CreateClient(formData: FormData) {
  try {
    const supabase = createClient();
    const { error } = await supabase
      .from("clients")
      .insert({
        name: formData.get("name"),
        meter_number: formData.get("meter_number"),
        contact_number: formData.get("contact_number"),
        address: formData.get("address"),
        is_connected: true,
      })
      .select();

    if (error) {
      return { error: error.message };
    }
    revalidatePath("/clients");
    return { error: "" };
  } catch (error) {
    return { error: error };
  }
}

export async function GetClientById(id: string) {
  try {
    const supabase = createClient();
    const { error, data } = await supabase
      .from("clients")
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

export async function UpdateClient(formData: FormData) {
  try {
    const supabase = createClient();
    const { error } = await supabase
      .from("clients")
      .update({
        name: formData.get("name"),
        meter_number: formData.get("meter_number"),
        contact_number: formData.get("contact_number"),
        address: formData.get("address"),
        is_connected: formData.get("is_connected"),
      })
      .eq("id", formData.get("id"))
      .select();

    if (error) {
      return { error: error.message };
    }
    revalidatePath("/clients");
    return { error: "" };
  } catch (error) {
    return { error: error };
  }
}

export async function DeleteClient(id: string) {
  try {
    const supabase = createClient();
    const { error } = await supabase.from("clients").delete().eq("id", id);

    if (error) {
      return { error: error };
    }
    revalidatePath("/clients");
    return { error: "" };
  } catch (error) {
    return { error: error };
  }
}

export async function GetTotalClients() {
  try {
    const supabase = createClient();
    const { error, data } = await supabase.from("clients").select("*");

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

export async function GetAllClients() {
  try {
    const supabase = createClient();
    const { data, error } = await supabase.from("clients").select("*");

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
