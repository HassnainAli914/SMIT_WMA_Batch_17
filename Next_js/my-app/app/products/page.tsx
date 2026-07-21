"use client";

import { useRouter } from "next/router";

export default function Products() {
  const router = useRouter();
  
  return (
    <div>
      <h1>Products</h1>
      <div>This is Products Page</div>
    </div>
  );
}
