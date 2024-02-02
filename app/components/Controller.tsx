"use client";
import React from "react";
import { useState, useEffect, useRef } from "react";
import SelectionCard from "./SelectionCards";
import Accordion from "./Accordion";
import { PiNumberSquareOneFill } from "react-icons/pi";
import { PiNumberSquareTwoLight } from "react-icons/pi";
import { PiNumberSquareThreeFill } from "react-icons/pi";
import { PiNumberSquareFourLight } from "react-icons/pi";
import { PiNumberSquareFiveFill } from "react-icons/pi";
import Chat from "./Chat";
import DietaryPrefData from "@/app/types/DietaryPrefData";

const gptTempArray: string[] = new Array(5).fill("");
let userDietPrefArr: string[] = new Array(5).fill("");

export default function Controller({ onLoadData }: { onLoadData: any }) {
  const mealTimeData = onLoadData.mealTimeData;
  const restrictionData = onLoadData.restrictionData;
  const countryFlagData = onLoadData.countryFlagData;
  const prepTimeData = onLoadData.prepTimeData;
  const nutritionData = onLoadData.nutritionData;

  const [parent, setParent] = useState<string | null>();
  const [userDietPref, setUserDietPref] = useState<string | null>();

  function handleChildClick(
    parent: string | null,
    userDietPref: string | null
  ) {
    setParent(parent);
    setUserDietPref(userDietPref);
    if (parent === "mealTime" && userDietPref) {
      gptTempArray[0] = userDietPref;
      userDietPrefArr = [
        ...gptTempArray.slice(0, 0),
        userDietPref,
        ...gptTempArray.slice(1),
      ];
    }
    if (parent === "restriction" && userDietPref) {
      gptTempArray[1] = userDietPref;
      userDietPrefArr = [
        ...gptTempArray.slice(0, 1),
        userDietPref,
        ...gptTempArray.slice(2),
      ];
    }
    if (parent === "country" && userDietPref) {
      gptTempArray[2] = userDietPref;
      userDietPrefArr = [
        ...gptTempArray.slice(0, 2),
        userDietPref,
        ...gptTempArray.slice(3),
      ];
    }
    if (parent === "prepTime" && userDietPref) {
      gptTempArray[3] = userDietPref;
      userDietPrefArr = [
        ...gptTempArray.slice(0, 3),
        userDietPref,
        ...gptTempArray.slice(4),
      ];
    }
    if (parent === "nutrition" && userDietPref) {
      gptTempArray[4] = userDietPref;
      userDietPrefArr = [
        ...gptTempArray.slice(0, 4),
        userDietPref,
        ...gptTempArray.slice(5),
      ];
    }
  }

  return (
    <>
      <hr />

      <div className="flex flex-col items-center justify-center">
        <h6 className="mt-10 lg:mt-20 text-xs lg:text-[.9rem] text-md font-extralight">
          Discover Our World&apos;s Recipes.
        </h6>
        <h1 className="text-sm lg:text-lg text-center mt-3 mb-20">
          An App to discover world recipes based on your dietary preferences.
        </h1>
      </div>
      <hr />
      <div className="flex flex-col justify-center items-center mt-5 mb-10">
        <h1 className="text-sm lg:text-xl text-center mt-3 mb-10">
          Instructions:
        </h1>
      </div>
      <hr />
      <Accordion title="Meal Time">
        <SelectionCard items={mealTimeData} onChildClick={handleChildClick} />
      </Accordion>
      <hr />
      <Accordion title="Country">
        <SelectionCard
          items={countryFlagData}
          onChildClick={handleChildClick}
        />
      </Accordion>
      <hr />
      <Accordion title="Dietary Restrictions">
        <SelectionCard
          items={restrictionData}
          onChildClick={handleChildClick}
        />
      </Accordion>
      <hr />
      <Accordion title="Preparation Time">
        <SelectionCard items={prepTimeData} onChildClick={handleChildClick} />
      </Accordion>
      <hr />
      <Accordion title="Healthiness">
        <SelectionCard items={nutritionData} onChildClick={handleChildClick} />
      </Accordion>
      <hr />
      {/* If  all prefrences are not selected show: Please input your preferences*/}
      {userDietPrefArr[0] === "" ||
      userDietPrefArr[1] === "" ||
      userDietPrefArr[2] === "" ||
      userDietPrefArr[3] === "" ||
      userDietPrefArr[4] === "" ? (
        <p className="mt-7 text-left p-4 text-red-500 text-lg md:text-2xl font-light">
          * Please input your preferences...
        </p>
      ) : (
        // Show the GET RECIPE IDEAS button
        <>
          <Chat userDietPrefArr={userDietPrefArr} />
        </>
      )}
    </>
  );
}
