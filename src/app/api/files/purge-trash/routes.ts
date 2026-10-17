import { NextResponse } from "next/server";
import { purgeExpiredFiles } from "@/lib/fileActions";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const auth = request.headers.get("authorization");
  if (!process.env.CRON_SECRET || auth !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const result = await purgeExpiredFiles();
  return NextResponse.json(result);
}
