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
  } catch (error: unknown) {
    console.error("Server action error:", error);
    const errorMessage = error instanceof Error ? error.message : "An unknown error occurred";
    return {
      success: false,
      error: errorMessage,
    };
  }
}
