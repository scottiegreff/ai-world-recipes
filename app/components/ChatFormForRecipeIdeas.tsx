import React from "react";
import { useSelector } from "react-redux";
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

/**
 * Component for the chat form for recipe ideas.
 * @param {ChatFormProps} props - The component props.
 * @returns {JSX.Element} The ChatFormForRecipeIdeas component.
 */
export default function ChatFormForRecipeIdeas({
  messages,
  input,
  setMessages,
  handleInputChange,
  handleSubmit,
  isLoading,
}: ChatFormProps) {
  const mealTime = useSelector(
    (state: RootState) => (state as RootState).mealTimeSelector.mealTime
  );
  const countryFlag = useSelector(
    (state: RootState) => state.countryFlagSelector.countryFlag
  );
  const restriction = useSelector(
    (state: RootState) => state.restrictionSelector.restriction
  );
  const prepTime = useSelector(
    (state: RootState) => state.prepTimeSelector.prepTime
  );
  const healthiness = useSelector(
    (state: RootState) => state.healthinessSelector.healthiness
  );

  return (
    <div className="flex text-white flex-col w-full my-10 mx-auto stretch">
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
  );
}
