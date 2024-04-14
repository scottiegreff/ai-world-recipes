"use client";
import { Delete } from "lucide-react";
import { useRef, useState } from "react";
import Recipe from "@/app/types/Recipe";
import { user } from "@nextui-org/react";

/**
 * Component that fetches and displays the user's saved recipes.
 */
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

    closeRecipesBtn.current?.classList.add("flex");
    closeRecipesBtn.current?.classList.add("flex-col");
  };

  function closeRecipes() {
    recipeDisplay.current?.classList.remove("flex");
    recipeDisplay.current?.classList.add("hidden");
    closeRecipesBtn.current?.classList.remove("flex");
    closeRecipesBtn.current?.classList.add("hidden");
  }

  const deleteRecipe = async (id: number) => {
    const alertOk = confirm("Are you sure you want to delete your recipe?");

    if (alertOk) {
      try {
        const response = await fetch(`api/recipes/`, {
          method: "DELETE",
          body: JSON.stringify({ id }),
        });
        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }
        // const userData = await response.json();
        handleFetchUser();
        setError(null);
      } catch (error: any) {
        setError(error.message);
        setUserRecipes([
          { id: 0, body: "No recipes were retrieved!", ownerId: "" },
        ]);
      }
    } else return;
  };
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

      <div
        ref={recipeDisplay}
        className="flex flex-col justify-center items-center mt-5"
      >
        <button
          
          className="md:w-50 mb-20 py-2 px-3 md:py-2 md:px-7 bg-gray-600 text-white border border-green-600 rounded-3xl text-[.75rem] md:text-md md:font-md shadow-2xl active:scale-[.99] active:shadow-none transform transition duration-150 hover:bg-gray-700 hover:border-none"
          onClick={closeRecipes}
        >
          CLOSE RECIPES
        </button>

        <h1 className="text-2xl font-bold md:mb-5">Your Saved Recipes:</h1>

        {/* map through all the recipes from userRecipes.body and split them by the "/n" character and display them with margin between them */}

        {userRecipes?.map((recipe, index) => {
          return (
            <div key={index} className="mb-5 pb-10 px-10 ">
              <hr className="my-10" />
              <p className="text-xl font-bold mb-5 text-red-500">{`Recipe: ${
                index + 1
              }`}</p>
              {recipe.body.split("\n").map((item, index) => {
                return (
                  <p className="my-2" key={index}>
                    {item}
                  </p>
                );
              })}
              <button
                // ref={closeRecipesBtn}
                className="md:w-50 mb-5 py-2 px-3 md:py-2 md:px-7 mt-10 bg-gray-600 text-white border border-red-600 rounded-3xl text-[.75rem] md:text-md md:font-md shadow-2xl active:scale-[.99] active:shadow-none transform transition duration-150 hover:bg-gray-700 hover:border-none"
                onClick={() => deleteRecipe(recipe.id)}
              >
                DELETE RECIPES
              </button>
            </div>
          );
        })}

        <button
          // ref={closeRecipesBtn}
          className="md:w-50 mb-20 py-2 px-3 md:py-2 md:px-7 mt-10 bg-gray-600 text-white border border-green-600 rounded-3xl text-[.75rem] md:text-md md:font-md shadow-2xl active:scale-[.99] active:shadow-none transform transition duration-150 hover:bg-gray-700 hover:border-none"
          onClick={closeRecipes}
        >
          CLOSE RECIPES
        </button>
      </div>
    </>
  );
}
