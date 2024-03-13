"use client";
import React, { useState, useEffect } from "react";
import RecipeDisplay from "./RecipeDisplay";
import { useSelector } from "react-redux";
import { RootState } from "@/app/redux/store";

/**
 * Component for generating recipe ideas.
 * @returns JSX element representing the generate recipe ideas button.
 */
export default function GenerateRecipeButton() {
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

  const [showChat, setShowChat] = useState(false);
  useEffect(() => {
    if (
      mealTime !== "" &&
      countryFlag !== "" &&
      prepTime !== "" &&
      healthiness !== ""
    ) {
      setShowChat(true);
    }
  }, [mealTime, countryFlag, prepTime, healthiness]);

  return (
    <>
      {showChat ? (
        <RecipeDisplay />
      ) : (
        <p className="text-2xl text-red-500 my-10">
          * PLEASE SELECT ALL DIETARY PREFERENCES
        </p>
      )}
    </>
  );
}
