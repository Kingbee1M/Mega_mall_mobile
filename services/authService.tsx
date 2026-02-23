import { supabase } from "@/lib/superbase";

export async function signUpWithProfile(
    firstName: string,
    lastName: string,
    userName: string,
    email: string,
    password: string,
    role: string,
    phone: string
) {
  const { data: authData, error: authError } =
    await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          phone,
          firstName,
          lastName,
          userName,
          role,
        }
      }
    });

  if (authError) return { error: authError };

  const userId = authData.user?.id;

  if (!userId) {
    return { error: new Error("No user ID returned") };
  }

  const { error: dbError } = await supabase
    .from("mega-mall-users")
    .insert({
      user_id: userId,
      firstName,
      lastName,
      userName,
      email,
      role,
      phone: phone || null
    });

  if (dbError) {
    // rollback auth user if profile insert fails
    await supabase.auth.admin.deleteUser(userId);
    return { error: dbError };
  }

  return { user: authData.user };
}

export async function signIn(email: string, password: string) {
  return await supabase.auth.signInWithPassword({
    email,
    password,
  });
}

export async function signOut() {
  return await supabase.auth.signOut();
}
