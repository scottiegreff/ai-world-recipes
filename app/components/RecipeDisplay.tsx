"use client";
import SaveRecipe from "./SaveRecipe";
import LoadingSpinner from "./LoadingSpinner";
import ChatFormForRecipeIdeas from "./ChatFormForRecipeIdeas";
import { useChat } from "ai/react";
import RecipePhoto from "./RecipePhoto";

import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/app/redux/store";
import ChatFormForRecipeSelection from "./ChatFormForRecipeSelection";

export default function RecipeDisplay() {
  const mealTime = useSelector(
    (state: RootState) => state.mealTimeSelector.mealTime
  );
  const countryFlag = useSelector(
    (state: RootState) => state.countryFlagSelector.countryFlag
  );

  const {
    messages,
    input,
    setMessages,
    handleInputChange,
    handleSubmit,
    isLoading,
  } = useChat({
    // initialInput: `Please give me 10, ${userDietPrefArr[2]}, ${userDietPrefArr[0]}, ${userDietPrefArr[4]} recipes. They are to be ${userDietPrefArr[1]} and able to be made in ${userDietPrefArr[3]}`,
    initialInput: `Please give me 10, ${countryFlag}, ${mealTime} meals }`,
  });

  // Show LOADING SPINNER while fetching the recipe ideas
  if (isLoading) {
    return <LoadingSpinner />;
  }
  // show "GENERATE RECIPE IDEAS" button to fetch the recipe ideas from - api/chat
  if (messages[0] === undefined) {
    return (
      <>
        <ChatFormForRecipeIdeas
          messages={messages}
          input={input}
          setMessages={setMessages}
          handleInputChange={handleInputChange}
          handleSubmit={handleSubmit}
          isLoading={isLoading}
        />
        <hr />
      </>
    );
  }

  // Shows the # Text Box and Save Recipe Button
  if (messages[0].content.includes("Please give me 10") && !isLoading) {
    return (
      <>
        <div className="flex text-white flex-col w-full py-10 mx-auto stretch">
          <ChatFormForRecipeSelection
            messages={messages}
            input={input}
            setMessages={setMessages}
            handleInputChange={handleInputChange}
            handleSubmit={handleSubmit}
            isLoading={isLoading}
          />
          <SaveRecipe messagesObj={messages} />
        </div>
        <hr />
      </>
    );
  }
}
