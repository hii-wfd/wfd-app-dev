
import { handleUpload, type HandleUploadBody } from "@vercel/blob/client";
import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { Role } from "@/generated/prisma/enums";

export async function POST(request: Request) {
  if (process.env.ENABLE_DEV_TOOLS !== "true") {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  const session = await auth();

  if (!session?.user?.id) {
    return NextResponse.json(
      { error: "You must be signed in to upload files." },
      { status: 401 }
    );
  }

  if (session.user.role !== Role.ADMIN) {
    return NextResponse.json(
      { error: "You are not authorized to upload files here." },
      { status: 403 }
    );
  }

  try {
    const body = (await request.json()) as HandleUploadBody;

    const json = await handleUpload({
      body,
      request,
      onBeforeGenerateToken: async () => ({
        addRandomSuffix: true,
        maximumSizeInBytes: 100 * 1024 * 1024,
      }),
      onUploadCompleted: async () => {},
    });

    return NextResponse.json(json);
  } catch (error) {
    console.error("File upload error:", error);

    return NextResponse.json(
      { error: "Unable to process upload." },
      { status: 400 }
    );
  }
}
