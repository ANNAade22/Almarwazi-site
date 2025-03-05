import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";

export async function GET(request: NextRequest) {
  const path = request.nextUrl.searchParams.get("path");

  if (!path) {
    return NextResponse.json(
      { message: "Missing path parameter" },
      { status: 400 }
    );
  }

  try {
    // Revalidate the specific path
    revalidatePath(path);

    // Also revalidate related paths
    if (path === "/blog") {
      revalidatePath("/blog/admin");
      revalidatePath("/");
    }

    return NextResponse.json({
      revalidated: true,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    return NextResponse.json(
      { message: "Error revalidating", error },
      { status: 500 }
    );
  }
}
