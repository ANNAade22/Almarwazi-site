"use server";

import { createClient } from "@supabase/supabase-js";

export async function deletePost(postId: string) {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL || "https://placeholder.supabase.co",
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "placeholder-key"
  );

  try {
    const { error } = await supabase.from("posts").delete().eq("id", postId);

    if (error) throw error;
    return { success: true };
  } catch (error: any) {
    console.error("Server action error:", error);
    return {
      success: false,
      error: error.message,
    };
  }
}
