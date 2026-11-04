import Link from "next/link";
import { prisma } from "@/lib/prisma";
import type { Prisma } from "@/generated/prisma/client";
import { AuditAction, AuditOutcome, DataClassification } from "@/generated/prisma/enums";
import { auth } from "@/lib/auth";
import { adminProtectedPage } from "@/lib/page-protection";
import { audit } from "@/lib/audit";
import { clearAuditLog } from "@/lib/auditActions";

export const dynamic = "force-dynamic";

const PAGE_SIZE = 50;
const CLASS_BADGE = { NONE: "secondary", PII: "warning text-dark", CUI: "danger" } as const;
const OUTCOME_BADGE = { SUCCESS: "success", FAILURE: "danger", DENIED: "warning text-dark" } as const;
const devMode = process.env.ENABLE_DEV_TOOLS === "true";

const pick = <T extends string>(e: Record<string, T>, v?: string) =>
  Object.values(e).find((x) => x === v);

type Params = {
  q?: string; action?: string; classification?: string;
  outcome?: string; from?: string; to?: string; page?: string;
};

export default async function AuditLogPage({ searchParams }: { searchParams: Promise<Params> }) {
  const session = await auth();
  adminProtectedPage(session as { user: { email: string; id: string; name: string; role?: string } } | null);

  await audit({
    actor: { id: Number(session!.user.id), email: session!.user.email, role: session!.user.role },
    action: "READ",
    resourceType: "AuditLog",
  });

  const sp = await searchParams;
  const q = sp.q?.trim();
  const page = Math.max(1, Number(sp.page) || 1);
  const contains = (value: string): Prisma.StringFilter => ({ contains: value, mode: "insensitive" });

  const where: Prisma.AuditLogWhereInput = {
    action: pick(AuditAction, sp.action),
    classification: pick(DataClassification, sp.classification),
    outcome: pick(AuditOutcome, sp.outcome),
    at: {
      gte: sp.from ? new Date(sp.from) : undefined,
      lte: sp.to ? new Date(`${sp.to}T23:59:59.999Z`) : undefined,
    },
    ...(q
      ? { OR: [{ userEmail: contains(q) }, { resourceId: contains(q) }, { ipAddress: contains(q) }] }
      : {}),
  };

  const [rows, total] = await Promise.all([
    prisma.auditLog.findMany({
      where,
      orderBy: { at: "desc" },
      skip: (page - 1) * PAGE_SIZE,
      take: PAGE_SIZE + 1,
    }),
    prisma.auditLog.count({ where }),
  ]);
  const logs = rows.slice(0, PAGE_SIZE);
  const hasNext = rows.length > PAGE_SIZE;

  const href = (p: number) =>
    "?" +
    new URLSearchParams({
      ...(Object.fromEntries(Object.entries(sp).filter(([, v]) => v)) as Record<string, string>),
      page: String(p),
    });

  return (
    <main className="container py-5">
      <br />
      <br />
      <h1>Audit Log ({total})</h1>

      {devMode && (
        <details className="mb-3">
          <summary className="text-danger">Clear all logs…</summary>
          <form action={clearAuditLog} className="mt-2">
            <button className="btn btn-sm btn-danger">Permanently delete all {total} events</button>
          </form>
        </details>
      )}

      <form className="row g-2 mb-4">
        <div className="col-md-3">
          <input name="q" defaultValue={sp.q} className="form-control" placeholder="User, resource ID, or IP" />
        </div>
        {([["action", AuditAction], ["classification", DataClassification], ["outcome", AuditOutcome]] as const).map(
          ([name, e]) => (
            <div className="col-md-2" key={name}>
              <select name={name} defaultValue={sp[name] ?? ""} className="form-select">
                <option value="">Any {name}</option>
                {Object.values(e).map((v) => (
                  <option key={v}>{v}</option>
                ))}
              </select>
            </div>
          ),
        )}
        <div className="col-md-2">
          <input type="date" name="from" defaultValue={sp.from} className="form-control" />
        </div>
        <div className="col-md-2">
          <input type="date" name="to" defaultValue={sp.to} className="form-control" />
        </div>
        <div className="col-auto">
          <button className="btn btn-primary">Filter</button>{" "}
          <Link href="/admin/audit-log" className="btn btn-outline-secondary">Reset</Link>
        </div>
      </form>

      <table className="table table-sm align-middle">
        <thead>
        <tr>
          <th>Time (UTC)</th>
          <th>User</th>
          <th>Role</th>
          <th>Action</th>
          <th>Resource</th>
          <th>Class</th>
          <th>Outcome</th>
          <th>IP</th>
          <th>Details</th>
        </tr>
        </thead>
        <tbody>
        {logs.map((a) => (
          <tr key={a.id}>
            <td>{a.at.toISOString().replace("T", " ").slice(0, 19)}</td>
            <td>{a.userEmail ?? "Unknown"}</td>
            <td>{a.userRole ?? "-"}</td>
            <td>{a.action}</td>
            <td>
              {a.resourceType}
              {a.resourceId ? ` #${a.resourceId}` : ""}
            </td>
            <td><span className={`badge bg-${CLASS_BADGE[a.classification]}`}>{a.classification}</span></td>
            <td><span className={`badge bg-${OUTCOME_BADGE[a.outcome]}`}>{a.outcome}</span></td>
            <td>{a.ipAddress ?? "-"}</td>
            <td className="small text-muted">{a.details ? JSON.stringify(a.details) : ""}</td>
          </tr>
        ))}
        {logs.length === 0 && (
          <tr>
            <td colSpan={9} className="text-muted">No matching events.</td>
          </tr>
        )}
        </tbody>
      </table>

      <div className="d-flex gap-2">
        {page > 1 && <Link href={href(page - 1)} className="btn btn-outline-secondary btn-sm">Previous</Link>}
        {hasNext && <Link href={href(page + 1)} className="btn btn-outline-secondary btn-sm">Next</Link>}
      </div>
    </main>
  );
}
