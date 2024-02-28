"use client";
import SaveRecipe from "./SaveRecipe";
import React, { useState, useEffect, useRef } from "react";
import OpenAIResponse from "@/app/interfaces/OpenAIResponse";
import LoadingSpinner from "./LoadingSpinner";
import { useChat } from "ai/react";
import RecipePhoto from "./RecipePhoto";

export default function Chat({
  userDietPrefArr,
}: {
  userDietPrefArr: string[];
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  let result: OpenAIResponse | undefined = undefined;
  const [chatCompObj, setChatCompObj] = useState<OpenAIResponse | undefined>();
  let newHistory = [];
  const [isFetching, setIsFetching] = useState(false);
  const [isGettingRecipes, setIsGettingRecipes] = useState(false);
  let [digitOnly, setDigitOnly] = useState("");

  // Event handler for key down in textarea
  const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === "Enter") {
      event.preventDefault();
      console.log("handleKeyDown");
    }
  };

  const {
    messages,
    input,
    setMessages,
    handleInputChange,
    handleSubmit,
    isLoading,
  } = useChat({
    initialInput: `Please give me 10, ${userDietPrefArr[2]}, ${userDietPrefArr[0]}, ${userDietPrefArr[4]} recipes. They are to be ${userDietPrefArr[1]} and able to be made in ${userDietPrefArr[3]}`,
  });

  let recipeArr: any = [];

  const recipeName = "al pastor tacos";

  async function fetchRecipeImg(recipeName: string) {
    const result = await fetch(
      `www.themealdb.com/api/json/v1/1/search.php?s=${recipeName}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    // console.log("result", result);
    const data = await result.json();
    console.log("data", data);
    // const result = await fetch("/api/recipeImg", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify({ recipeName }),
    // });
    // console.log("result", result);
  }

  fetchRecipeImg(recipeName);

  useEffect(() => {
    if (!isLoading && messages[0] !== undefined) {
      const regex = /\d\. (.*?):/;
      const messageCopy: any = messages[1];
      const messageContent = messageCopy?.content;
      if (messageContent) {
        const matches = messageContent.match(regex);
        if (matches) {
          for (let i = 0; i < matches.length; i++) {
            recipeArr.push(matches[i]);
            console.log("recipeArr", recipeArr);
          }
        }
      }
    }
  }, [!isLoading]);

  // show the button to fetch the recipe ideas
  if (messages[0] === undefined) {
    return (
      <>
        <div className="flex text-white flex-col w-full py-24 mx-auto stretch">
          {messages.map((m) => (
            <div key={m.id} className="whitespace-pre-wrap my-10">
              {m.role === "assistant" ? `${m.content} /n` : "\n"}
            </div>
          ))}
          <>
            <form onSubmit={handleSubmit}>
              <input
                hidden
                className="bg-white text-black bottom-0 w-full mt-10 p-2 mb-8 border border-gray-300 rounded shadow-xl"
                value={input}
                onChange={handleInputChange}
              />
              <br />
              <div className="flex justify-center items-center">
                <button
                  className="md:w-50 md:mb-10 py-2 px-3 md:py-2 md:px-20 text-white bg-gray-800 border-2 border-green-600 rounded-3xl text-[.75rem] md:text-md md:font-md shadow-2xl active:scale-[.99] active:shadow-none transform transition duration-150 hover:bg-gray-700 hover:text-white hover:border-none"
                  type="submit"
                >
                  Generate Your Recipe Ideas
                </button>
              </div>
            </form>
          </>
        </div>
        <hr />
      </>
    );
  }
  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (messages[0].content.includes("Please give me 10") && !isLoading) {
    return (
      <>
        <div className="flex text-white flex-col w-full py-10 mx-auto stretch">
          <RecipePhoto />
          {messages.map((m) => (
            <div key={m.id} className="whitespace-pre-wrap my-10 leading-6">
              {m.role === "assistant" ? `CHEF 9000:\n ${m.content}` : ""}
            </div>
          ))}
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col justify-center items-center">
              <input
                className="bg-white text-black bottom-0  w-[95px] mt-10 py-2 mb-8 border border-gray-300 rounded shadow-xl ps-4"
                placeholder="Recipe #"
                value={input}
                onChange={handleInputChange}
              />
              <br />

              <button
                className="md:w-50 md:mb-10 py-2 px-3 md:py-2 md:px-20 text-white bg-gray-800 border-2 border-green-600 rounded-3xl text-[.75rem] md:text-md md:font-md shadow-2xl active:scale-[.99] active:shadow-none transform transition duration-150 hover:bg-gray-700 hover:text-white hover:border-none"
                type="submit"
              >
                Generate Your Recipe
              </button>
              <SaveRecipe messagesObj={messages} />
            </div>
          </form>
        </div>
        <hr />
      </>
    );
  }
}
