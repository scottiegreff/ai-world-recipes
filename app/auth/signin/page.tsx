"use client";

import SignInForm from "@/app/components/SignInForm";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { redirect } from "next/navigation";
import { useEffect } from "react";
import { Link } from "@nextui-org/react";
import ProvidersButtons from "@/app/components/ProvidersButtons"

interface Props {
  searchParams: {
    callbackUrl?: string;
  };
}

const SigninPage = ({ searchParams }: Props) => {
  // console.log({ searchParams });
  const router = useRouter();
  const { data: session } = useSession();

  useEffect(() => {
    if (session?.user) {
      redirect("/members");
    }
  }, [session?.user]);

  return (
    <div className="flex items-center justify-center flex-col mt-10 lg:w-[50vw] m-auto">
      <ProvidersButtons />
      <SignInForm callbackUrl={searchParams.callbackUrl} />
      <Link className="mt-5 text-sm" href={"/auth/forgotPassword"}>Forgot Your Password?</Link>
    </div>
  );
};

export default SigninPage;
