"use client";
import { Delete } from "lucide-react";
import { useRef, useState } from "react";
import Recipe from "@/app/types/Recipe";

export default function GetUsersRecipe() {
  const [userRecipes, setUserRecipes] = useState<Recipe>();
  const [error, setError] = useState<string | null>(null);
  const recipeDisplay = useRef<HTMLDivElement>(null);
  const closeRecipesBtn = useRef<HTMLButtonElement>(null);

  const handleFetchUser = async () => {
    try {
      const response = await fetch("/api/recipes/", {
        method: "GET",
      });
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
      const userData = await response.json();
      console.log("USER DATA: ", userData);
      setUserRecipes(userData);
      setError(null);
    } catch (error: any) {
      setError(error.message);
      setUserRecipes([
        { id: 0, body: "No recipes were retrieved!", ownerId: "" },
      ]);
    }
    recipeDisplay.current?.classList.remove("hidden");
    recipeDisplay.current?.classList.add("flex");

    // closeRecipesBtn.current?.classList.remove("hidden");
    closeRecipesBtn.current?.classList.add("flex");
    closeRecipesBtn.current?.classList.add("flex-col");
  };

  const closeRecipes = () => {
    recipeDisplay.current?.classList.remove("flex");
    recipeDisplay.current?.classList.add("hidden");
    closeRecipesBtn.current?.classList.remove("flex");
    closeRecipesBtn.current?.classList.add("hidden");
  };

  const deleteRecipe = async () => {
    const alertOk = confirm(
      "Are you sure you want to delete all your recipes?"
    );
    console.log("alertOk: ", alertOk);

    if (alertOk) {
      try {
        const response = await fetch("api/recipes/", {
          method: "DELETE",
        });
        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }
        const userData = await response.json();
        setUserRecipes(userData);
        setError(null);
      } catch (error: any) {
        setError(error.message);
        setUserRecipes([
          { id: 0, body: "No recipes were retrieved!", ownerId: "" },
        ]);
      }
    } else return;
  };

  // Regex to check if the string starts with a number and the a parentheses

  // Split the string into an array divided by numbers

  return (
    <>
      <div className="flex justify-center items-center">
        <button
          className="md:w-50 md:mb-10 py-2 px-3 md:py-2 md:px-7 bg-gray-600 text-white border border-green-600 rounded-3xl text-[.75rem] md:text-md md:font-md shadow-2xl active:scale-[.99] active:shadow-none transform transition duration-150 hover:bg-gray-700 hover:border-none"
          onClick={handleFetchUser}
        >
          GET YOUR SAVED RECIPES
        </button>
        {error && <p>Error: {error}</p>}
      </div>

      {userRecipes && (
        <div
          ref={recipeDisplay}
          className="flex flex-col justify-center items-center mt-10 mb-10"
        >
          <button
            // ref={closeRecipesBtn}
            className="md:w-50 mb-20 py-2 px-3 md:py-2 md:px-7 bg-gray-600 text-white border border-green-600 rounded-3xl text-[.75rem] md:text-md md:font-md shadow-2xl active:scale-[.99] active:shadow-none transform transition duration-150 hover:bg-gray-700 hover:border-none"
            onClick={closeRecipes}
          >
            CLOSE RECIPES
          </button>

          <h1 className="text-2xl font-bold mb-10">Your Saved Recipes:</h1>

          {userRecipes.map((recipe) => (
            <div
              key={recipe.id}
              className="flex flex-col justify-center items-center mb-10"
            >
              {recipe.body.includes("Recipe:") ? (
                <h1 className="text-md mb-5">{recipe.body}</h1>
              ) : (
                <h1 className="text-md mb-5">Recipe: {recipe.body}</h1>
              )}
            </div>
          ))}

          <button
            className="md:w-50 mb-20 py-2 px-3 md:py-2 md:px-7 bg-white text-red-500 border-2 border-red-500 rounded-3xl text-[.75rem] md:text-md md:font-md shadow-2xl active:scale-[.99] active:shadow-none transform transition duration-150 hover:bg-gray-700 hover:border-none"
            onClick={deleteRecipe}
          >
            DELETE ALL RECIPES!
          </button>
          <button
            // ref={closeRecipesBtn}
            className="md:w-50 mb-20 py-2 px-3 md:py-2 md:px-7 bg-gray-600 text-white border border-green-600 rounded-3xl text-[.75rem] md:text-md md:font-md shadow-2xl active:scale-[.99] active:shadow-none transform transition duration-150 hover:bg-gray-700 hover:border-none"
            onClick={closeRecipes}
          >
            CLOSE RECIPES
          </button>
        </div>
      )}
    </>
  );
}
