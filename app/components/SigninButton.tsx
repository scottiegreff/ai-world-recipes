"use client";

import { Button, user } from "@nextui-org/react";
import { signIn, useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { IoPersonCircleSharp } from "react-icons/io5";

const SigninButton = () => {
  const { data: session } = useSession();
  const router = useRouter();

  let usersName = "";
  if (session?.user.firstName && session?.user.lastName) {
    usersName = `${session?.user?.firstName} ${session?.user?.lastName}`;
  } else if (session?.user.name) {
    usersName = session?.user?.name;
  }

  return (
    <div className="md:flex md:flex-row">
      {session && session.user ? (
        <>
          <div className="flex flex-col justify-around items-center gap-1">
            <div className="flex flex-row justify-around items-center gap-1">
              <IoPersonCircleSharp className="text-3xl" />
              <Link className="p-2 hover:text-green-800" href={"/profile"}>
                {usersName}
              </Link>
            </div>
            <Link
              className="border ms-8 border-green-800 bg-slate-800 p-2 rounded-xl"
              color="foreground"
              href="/members"
            >
              Members
            </Link>
            <Link
              className="p-2 ms-8 hover:text-green-800 transition-colors"
              href={"/api/auth/signout"}
            >
              Sign Out
            </Link>
          </div>
        </>
      ) : (
        <>
          <div className="flex flex-col items-end md:flex-row md:gap-2 gap-2">
            {/* <Link
              className="border border-green-800 bg-slate-800 md:p-2 rounded-xl"
              color="foreground"
              href="/members"
            >
              Members
            </Link> */}
            <Button
              className="border p-1 h-8 md:p-5 border-green-800 bg-slate-800"
              as={Link}
              href={"/members"}
              // onClick={() => signIn()}
            >
              Members
            </Button>
            <Button
              className="border p-1 h-8 md:p-5 border-green-800 bg-slate-900"
              onClick={() => signIn()}
            >
              Sign In
            </Button>
            <Button
              className="border p-1 h-8 md:p-5 border-green-800  bg-slate-900"
              as={Link}
              href={"/auth/signup"}
            >
              Sign Up
            </Button>
          </div>
        </>
      )}
    </div>
  );
};

export default SigninButton;
