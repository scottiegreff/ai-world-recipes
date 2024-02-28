import React from "react";
import OpenAIResponse from "@/app/interfaces/OpenAIResponse";

export default function RecipeDisplay({
  chatCompObj,
}: {
  chatCompObj: OpenAIResponse | undefined;
}) {
  // Regex to check if the string starts with a number and the a parentheses
  // const regex = /(\d+\))/g || /Recipe:/g;

  // console.log("chatCompObj: ", chatCompObj?.choices[0].message.content);
  return (
    <>
      <div className="mt-10 mb-[20vh] p-4 text-xl md:text-xl  font-md">
        <ul className="mt-10 font-light">
          <h3 className="font-semibold text-2xl">Recipe:</h3>
          <li className="font-semibold mt-10">
            {chatCompObj?.choices[0].message.content}
          </li>
        </ul>
      </div>
    </>
  );
}