import React from "react";

import { useChat } from "ai/react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/app/redux/store";
import Message from "@/app/types/Message";
import { ChangeEvent, FormEvent } from "react";

type ChatFormProps = {
  messages: Message[];
  input: string;
  setMessages: (messages: Message[]) => void;
  handleInputChange: (
    e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>
  ) => void;
  handleSubmit: (e: FormEvent<HTMLFormElement>) => void;
  isLoading: boolean;
};

export default function ChatFormForRecipeSelection({
  messages,
  input,
  setMessages,
  handleInputChange,
  handleSubmit,
  isLoading,
}: ChatFormProps) {
  const mealTime = useSelector(
    (state: RootState) => state.mealTimeSelector.mealTime
  );
  const countryFlag = useSelector(
    (state: RootState) => state.countryFlagSelector.countryFlag
  );

  const useChat = {
    // initialInput: `Please give me 10, ${userDietPrefArr[2]}, ${userDietPrefArr[0]}, ${userDietPrefArr[4]} recipes. They are to be ${userDietPrefArr[1]} and able to be made in ${userDietPrefArr[3]}`,
    initialInput: `Please give me 10, ${countryFlag}, ${mealTime} meals }`,
  };

  const chef9000 = (
    <p className="text-red-500 text-xl font-bold my-5">CHEF 9000:</p>
  );
  return (
    <div className="flex text-white flex-col w-full my-5 mx-auto">
      {/* <RecipePhoto /> */}
      {messages.map((m) => (
        <div key={m.id} className="whitespace-pre-wrap leading-6 my-5">
          {m.role === "assistant" ? (
            <>
              {chef9000}
              <span>{m.content}</span>
            </>
          ) : (
            <span></span>
          )}
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
            className="w-[60vw] md:w-[20vw] mx-auto md:mb-10 py-2 md:py-2 text-white bg-gray-800 border-2 border-green-600 rounded-3xl text-[.75rem] md:text-md md:font-md shadow-2xl active:scale-[.99] active:shadow-none transform transition duration-150 hover:bg-gray-700 hover:text-white hover:border-none"
            type="submit"
          >
            Generate Your Recipe
          </button>
        </div>
      </form>
    </div>
  );
}
