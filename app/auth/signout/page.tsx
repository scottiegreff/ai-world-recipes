"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { use, useEffect } from "react";
import { Link } from "@nextui-org/react";
import { signOut } from "next-auth/react";


interface Props {
  searchParams: {
    callbackUrl?: string;
  };
}

const SignoutPage = ({ searchParams }: Props) => {
  const router = useRouter();
  const session = useSession();

  useEffect(() => {
    if (session?.status === "unauthenticated") {
      router.push("/");
    }
  }, [session?.status]);

  return (
    <div className="flex items-center justify-center flex-col ">
      <button
        className="my-10 md:my-20 py-2 px-7 md:py-2 md:px-10 text-white bg-gray-900 border-2 border-green-800 rounded-2xl text-[.75rem] md:text-[1.25rem] md:font-md shadow-2xl active:scale-[.99] active:shadow-none transform transition duration-150 hover:bg-gray-700 hover:text-white hover:border-none"
        onClick={(event: React.MouseEvent<HTMLButtonElement>) =>  {
          signOut();
        }}
      >
        SIGN OUT
      </button>
    </div>
  );
};

export default SignoutPage;