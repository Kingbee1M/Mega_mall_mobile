
import { supabase } from "@/lib/superbase";

export type Review = {
  id: string;
  rating: number;
  comment: string;
  created_at: string;
};

export type ItemProduct = {
  id: string;
  title: string;
  price: number;
  stock: number;
  media: string[];
  discount?: number;
  reviews: Review[]; // ← array now, not Record
};

export const fetchItems = async (offset: number, limit: number = 20) => {
  const { data, error } = await supabase
    .from("mega_mall_items")
    .select(`
      *,
      mega_mall_reviews (
        review_id,
        rating,
        comments,
        created_at
      )
    `)
    .range(offset, offset + limit - 1);

  if (error) throw error;

  return data;
};