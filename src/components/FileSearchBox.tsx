
"use client";

import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function FileSearchBox() {
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();
  const urlQuery = params.get("q") ?? "";
  const [value, setValue] = useState(urlQuery);

  useEffect(() => {
    if (value === urlQuery) return;

    const timeout = setTimeout(() => {
      const next = new URLSearchParams(params.toString());

      if (value) {
        next.set("q", value);
      } else {
        next.delete("q");
      }

      const queryString = next.toString();
      router.replace(queryString ? `${pathname}?${queryString}` : pathname);
    }, 300);

    return () => clearTimeout(timeout);
  }, [value, urlQuery, params, pathname, router]);

  return (
    <input
      className="form-control mb-3"
      placeholder="Search by file, uploader, or deleter..."
      value={value}
      onChange={(event) => setValue(event.target.value)}
    />
  );
}
