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
  const { data: session } = useSession();

  // useEffect(() => {
  //   if (session?.user) {
  //     router.push("/");
  //   }
  // }, [session?.user]);

  return (
    <div className="my-20 flex items-center justify-center flex-col ">
      <button
        className="w-[50vw] md:w-[30vw] md:mb-10 py-2 px-3 md:py-2 md:px-20 text-white bg-gray-800 border-2 border-green-600 rounded-3xl text-[.75rem] md:text-md md:font-md shadow-2xl active:scale-[.99] active:shadow-none transform transition duration-150 hover:bg-gray-700 hover:text-white hover:border-none"
        onClick={(event: React.MouseEvent<HTMLButtonElement>) => {
          signOut();
          // router.push("/");
        }}
      >
        SIGN OUT
      </button>
    </div>
  );
};

export default SignoutPage;
