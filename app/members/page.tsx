import { notFound } from "next/navigation";
import Controller from "../components/Controller";
import logo from "../../public/fork_knife_logo.svg";
import GetUsersRecipe from "../components/GetUsersRecipe";
import { options } from "@/app/api/auth/[...nextauth]/options";
import { getServerSession } from "next-auth/next";
import React from "react";
import { redirect } from "next/navigation";
import dietaryPrefData from "@/public/data.json";

async function loadNames() {
  try {
    const response = await fetch("data.json");
    const names = await response.json();
    // console.log(names);
    return names;
  } catch (error) {
    console.log(error);
  }
}
// *************************  USER'S PAGE !!! ****************************************************** //
export default async function Members() {
  const session = await getServerSession(options);

  // redirect to signin if there is no session.
  if (!session?.user) {
    const url = new URL("/api/auth/signin", process.env.BASE_URL);
    url.searchParams.append("callbackUrl", "/members");
    redirect(url.toString());
  }

  return (
    <>
      <h1 className="text-center mt-5 p-4 text-xs font-light">
        WELCOME TO THE MEMBERS PAGE
      </h1>
      <GetUsersRecipe />
      <div className="my-10 flex-col justify-center items center">
        <Controller onLoadData={dietaryPrefData} />
      </div>
    </>
  );
}
