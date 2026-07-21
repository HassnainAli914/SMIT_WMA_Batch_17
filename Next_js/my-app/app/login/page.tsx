"use client";

import { useRouter } from "next/navigation";

export default function page() {
  const router = useRouter();

  function login() {
    console.log("Login Success");
    // router.push("/dashboard");
    router.replace("/dashboard");
  }

  return (
    <div>
      <h1>Login Page</h1>
      <hr />
      <button onClick={() => login()}>Login</button>
    </div>
  );
}
