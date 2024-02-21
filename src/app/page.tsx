import { unstable_noStore as noStore } from "next/cache";
import React from "react";

// import { api } from "@/trpc/server";

export default async function Home() {
  noStore();
  // const hello = await api.post.hello.query({ text: "from tRPC" });

  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
    </main>
  );
}
