import { NextRequest, NextResponse } from "next/server";

export const POST = async function (req: NextRequest) {
  if (req.method === "POST") {
    const body = await req.json();
    const { recipeName } = body;
    try {
      const result = await fetch(
        `www.themealdb.com/api/json/v1/1/search.php?s=${recipeName}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log("result", result);
      if (result)
        return new NextResponse(JSON.stringify(result), { status: 200 });
    } catch (error) {
      return new NextResponse(
        "Error in fetching RECIPES in recipes/route.ts: " + error,
        { status: 500 }
      );
    }
  }
};
