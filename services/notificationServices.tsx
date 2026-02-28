import { supabase } from "@/lib/superbase";

export async function sendGreetingIfNewUser(userId: string) {
  try {
    const { data, error } = await supabase
      .from("mega-mall-users")
      .select("new_user")
      .eq("user_id", userId)
      .single();

    if (error) throw error;

    // Critical guard
    if (!data?.new_user) return;

    // Insert notification
    await supabase.from("notification").insert({
      title: "Welcome to the community!",
      message: "We're thrilled to have you here...",
      user_id: userId,
      read: false,
    });

    // Immediately flip flag
    await supabase
      .from("mega-mall-users")
      .update({ new_user: false })
      .eq("user_id", userId);

  } catch (err: any) {
    console.log("Greeting error:", err.message);
  }
}


export interface Notification {
  id: string;
  title: string;
  message: string;
  user_id: string;
  read: boolean;
  created_at: string;
}

export async function getNotificationByUser(userId: string): Promise<Notification[]> {
  try {
    const { data, error } = await supabase
      .from("notification")
      .select("*")
      .eq("user_id", userId)
      .order("created_at", { ascending: false });

    if (error) throw error;

    return data ?? [];

  } catch (error: any) {
    console.log("Fetch notifications error:", error.message);
    return [];
  }
}