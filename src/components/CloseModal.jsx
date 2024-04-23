"use client";

import { useRouter } from "next/navigation";

export function CloseModal() {
  const router = useRouter();
  return (
    <div
      onClick={() => router.back()}
      className="absolute top-4 right-4 cursor-pointer"
    >
      X
    </div>
  );
}
