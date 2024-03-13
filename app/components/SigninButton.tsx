"use client";

import { Button, user } from "@nextui-org/react";
import { signIn, useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { IoPersonCircleSharp } from "react-icons/io5";
import Image from "next/image";

/**
 * Component for displaying the sign-in button.
 * @returns JSX element representing the sign-in button.
 */
const SigninButton = () => {
  const { data: session } = useSession();
  const router = useRouter();
  let userProfileImg = session?.user.image;
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
          <div className="flex flex-col md:flex-row justify-center items-end md:items-center gap-2 md:gap-5">
            <Button
              className="border p-1 h-8 md:p-5 border-green-800 bg-slate-800"
              as={Link}
              href={"/members"}
              // onClick={() => signIn()}
            >
              Members
            </Button>
            <div className="flex flex-row md:flex-row justify-none items-center gap-1 md:gap-1">
              {session.user.image === null ? (
                <IoPersonCircleSharp className="text-2xl md:text-3xl" />
              ) : (
                <Image
                  src={userProfileImg || "/avatar-profile-icon.jpg"}
                  alt="user profile image"
                  width={40}
                  height={40}
                  className="rounded-full"
                />
              )}
              <Link
                className="hover:text-green-800 text-sm md:text-lg"
                href={"/profile"}
              >
                {usersName}
              </Link>
            </div>

            <Link
              className=" hover:text-green-800 transition-colors text-sm md:text-lg"
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
