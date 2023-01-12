import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";

const AuthAlertDialog = () => {
  const router = useRouter();
  const [counter, setCounter] = React.useState(5);
  React.useEffect(() => {
    if (counter === 0) router.replace("/auth/login");

    const timerId = setInterval(() => {
      setCounter((p) => p - 1);
    }, 1000);
    return () => clearInterval(timerId);
  }, [counter]);

  return (
    <div className="z-50 w-screen h-screen bg-opacity-40 bg-white fixed top-0 left-0">
      <div className="w-full h-full relative">
        <div className="text-black bg-white absolute left-1/2 top-1/2 -translate-y-1/2 -translate-x-1/2 p-4 rounded-md shadow-lg">
          <div className="flex flex-col">
            <span className="font-semibold text-lg">권한이 없습니다.</span>
            <span>{counter}초뒤 자동으로 이동됩니다.</span>
            <Link href="/auth/login">
              <button className="w-full bg-slate-800 text-white p-2 rounded-md mt-4">
                로그인하기
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthAlertDialog;
