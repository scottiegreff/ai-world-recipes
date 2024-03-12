"use client";
import Image from "next/image";
import { useState, useEffect, use } from "react";
import CardData from "../types/CardData";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/app/redux/store";
import { setMealTime } from "@/app/redux/mealTime/mealTimeSlice";
import { setCountryFlag } from "@/app/redux/countryFlag/countryFlagSlice";
import { setRestriction } from "@/app/redux/restriction/restrictionSlice";
import { setPrepTime } from "@/app/redux/prepTime/prepTimeSlice";
import { setHealthiness } from "@/app/redux/healthiness/healthinessSlice";

export default function SelectionCard({ items }: { items: CardData }) {
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();

  const mealTime = useSelector(
    (state: RootState) => state.mealTimeSelector.mealTime
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

  useEffect(() => {
    if (!items) {
      setIsLoading(true);
    }
    setIsLoading(false);
  }, [items]);

  const [activeItem, setActiveItem] = useState(
    null || mealTime || countryFlag || restriction || prepTime || healthiness
  );

  const handleClick = (parent: string, name: string) => {
    setActiveItem(name);
    if (parent === "mealTime") {
      dispatch(setMealTime(name));
    }
    if (parent === "country") {
      dispatch(setCountryFlag(name));
    }
    if (parent === "restriction") {
      dispatch(setRestriction(name));
    }
    if (parent === "prepTime") {
      dispatch(setPrepTime(name));
    }
    if (parent === "nutrition") {
      dispatch(setHealthiness(name));
    }
  };
  // Prepare the items' JSX elements outside of the main return statement
  return (
    <div className="flex flex-wrap justify-center items-center rounded-full hover:cursor-pointer">
      {items.map((item, index) => (
        <div
          key={index}
          className={`${
            activeItem === item.name ? "border-4 border-red-500" : ""
          } flex flex-col justify-center items-center w-[25%] h-[25%] mx-5 sm:w-[15%] sm:h-[15%] lg:w-[12%] lg:h-[12%] my-5 lg:my-8 rounded-full shadow-md transition-transform duration-200 ease-in-out transform hover:scale-[1.04] active:scale-[1.0] active:shadow-lg`}
          onClick={() => {
            handleClick(item.parent, item.name);
          }}
        >
          <Image
            key={index}
            width={500}
            height={500}
            src={`/${item.image}.jpg`}
            className="w-full h-auto block shadow-lg rounded-full opacity-30 transition-opacity duration-300"
            alt={`${item.name}`}
            priority={true}
          />
          <div className="absolute inset-0 text-center flex items-center justify-center text-[1.6rem] lg:text-[2rem] font-thin">
            {item.name}
          </div>
        </div>
      ))}
    </div>
  );
}
