"use client";

import { useState, useEffect } from "react";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { GiKnifeFork } from "react-icons/gi";

/**
 * Component for displaying buttons for signing in with Google or GitHub.
 * @returns JSX element representing the sign-in buttons.
 */

export default function ProvidersButtons() {
  return (
    <>
      <div className="flex flex-col md:flex-row w-full m-5 justify-around items-center py-3  border rounded-md">
        <button
          onClick={() => signIn("google")}
          className="flex justify-center rounded-xl w-[250px] my-3 md:my-0 border border-red-200 bg-slate-200 px-3 py-3 shadow-sm hover:bg-slate-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-600"
        >
          <FcGoogle size="25px" className="m-auto text-xl" />
        </button>
        <button
          onClick={() => signIn("github")}
          className="flex justify-center rounded-xl w-[250px]  bg-slate-900 px-3 py-3 shadow-sm hover:bg-slate-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-600"
        >
          <FaGithub size="25px" className="m-auto text-xl" />
        </button>
      </div>
    </>
  );
}
