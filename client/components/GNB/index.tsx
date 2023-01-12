import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";

const GNB = () => {
  const router = useRouter();

  return (
    <div className="flex justify-between items-center">
      <Link href="/" className="font-bold text-3xl hover:text-blue-800">
        TodoList
      </Link>
      <button
        onClick={() => {
          localStorage.removeItem("token");
          router.replace("/auth/login");
        }}
      >
        Logout
      </button>
    </div>
  );
};

export default GNB;
