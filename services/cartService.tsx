import { supabase } from "@/lib/superbase";

export interface CartItem {
  cart_id: string;
  user_id: string;
  items_id: string;
  created_at: string;
  status: boolean
  item: {
    item_id: string;
    created_at: string;
    title: string;
    price: number;
    media: string[];
    description?: string;
  };
  reviews: {
    review_id: string;
    user_id: string;
    rating: number;
    comments: string;
    created_at: string;
  }[];
}


export async function getCartById(
  userId: string
): Promise<CartItem[]> {
  try {
    const { data, error } = await supabase
      .from("mega_mall_cart")
      .select(`
        cart_id,
        user_id,
        items_id,
        created_at,
        status,
        mega_mall_items!inner (
          item_id,
          created_at,
          title,
          price,
          media,
          description,
          mega_mall_reviews (
            review_id,
            user_id,
            rating,
            comments,
            created_at
          )
        )
      `)
      .eq("user_id", userId)
      .order("created_at", { ascending: false });

    if (error) throw error;
    if (!data) return [];

    const formatted: CartItem[] = data.map((row: any) => ({
      cart_id: row.cart_id,
      user_id: row.user_id,
      items_id: row.items_id,
      created_at: row.created_at,
      status: row.status,
      item: {
        item_id: row.mega_mall_items.item_id,
        created_at: row.mega_mall_items.created_at,
        title: row.mega_mall_items.title,
        price: row.mega_mall_items.price,
        media: row.mega_mall_items.media,
        description: row.mega_mall_items.description,
      },
      reviews: row.mega_mall_items.mega_mall_reviews ?? [],
    }));

    return formatted;

  } catch (error: any) {
    console.log("Fetch cart error:", error.message);
    return [];
  }
}