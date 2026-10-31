"use client";

import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function SearchBox() {
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();
  const urlQuery = params.get("q") ?? "";
  const [value, setValue] = useState(urlQuery);

  useEffect(() => {
    // Nothing to do if the URL already matches the input
    if (value === urlQuery) return;

    const t = setTimeout(() => {
      const next = new URLSearchParams(params.toString());
      if (value) {
        next.set("q", value);
      } else {
        next.delete("q");
      }
      const qs = next.toString();
      router.replace(qs ? `${pathname}?${qs}` : pathname);
    }, 300);

    return () => clearTimeout(t);
  }, [value, urlQuery, params, pathname, router]);

  return (
    <input
      className="form-control mb-3"
      placeholder="Search by file, adder, or deleter..."
      value={value}
      onChange={(e) => setValue(e.target.value)}
    />
  );
}