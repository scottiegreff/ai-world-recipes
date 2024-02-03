// import { useRouter } from 'next/navigation'
// import { useSession } from 'next-auth/react';
// import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import SignUpForm from "@/app/components/SignUpForm";
import { Image, Link } from "@nextui-org/react";
// import { redirect } from 'next/navigation'
// import { useEffect } from "react";
import { signIn } from "next-auth/react";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { GiKnifeFork } from "react-icons/gi";
import ProvidersButtons from "@/app/components/ProvidersButtons"


const SignupPage = async () => {
  // const router = useRouter()
  // const { data: session } = useSession()

  // useEffect(() => {
  //   if (session?.user) {
  //     redirect('/members')
  //   }
  // }, [session?.user])

  return (
    <div className="flex flex-col justify-center md:justify-center place-items-center items-center gap-3 mt-10 lg:w-[50vw] m-auto">
      <div className="md:col-span-2 flex justify-center items-center">
        <p className="text-center p-2">Already Signed up?</p>
        <Link href={"/auth/signin"}>Sign In</Link>
      </div>
      {/* <ProvidersButtons /> */}
      <SignUpForm />
      {/* <Image src="/avatar-profile-icon.jpg" alt="Login Form" width={500} height={500} /> */}
    </div>
  );
};

export default SignupPage;
