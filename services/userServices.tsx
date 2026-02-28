import { supabase } from "@/lib/superbase";
export async function addToCart(userId: string, itemId: string) {
  return await supabase
    .from("cart")
    .insert([{ user_id: userId, item_id: itemId }]);
}

export async function getCart(userId: string) {
  return await supabase
    .from("cart")
    .select("*, mega_mall_items(*)")
    .eq("user_id", userId);
}