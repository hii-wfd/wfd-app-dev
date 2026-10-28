"use client";

import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function SearchBox() {
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();
  const [value, setValue] = useState(params.get("q") ?? "");

  useEffect(() => {
    const t = setTimeout(() => {
      const next = new URLSearchParams(params);
      value ? next.set("q", value) : next.delete("q");
      router.replace(`${pathname}?${next.toString()}`);
    }, 300);
    return () => clearTimeout(t);
  }, [value]);

  return (
    <input
      className="form-control mb-3"
      placeholder="Search by file, adder, or deleter..."
      value={value}
      onChange={(e) => setValue(e.target.value)}
    />
  );
}
