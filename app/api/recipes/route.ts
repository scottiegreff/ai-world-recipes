import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

/**
 * Handles the GET request for retrieving recipes.
 * @param req - The NextRequest object representing the incoming request.
 * @returns A NextResponse object with the appropriate response based on the request.
 */
export const GET = async function (req: NextRequest) {
  if (req.method == "GET") {
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
    if (!token) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    const userId = token.sub;
    try {
      const owner = await prisma.recipe.findMany({
      where: { ownerId: userId },
    // orderBy: {
    //   createdAt: 'desc'
    // }
      });
      if (owner)
        return new NextResponse(JSON.stringify(owner), { status: 200 });
    } catch (error) {
      return new NextResponse(
        "Error in fetching RECIPES in recipes/route.ts: " + error,
        { status: 500 }
      );
    } finally {
      await prisma.$disconnect();
    }
  }
};

/**
 * Handles the POST request for creating a new recipe.
 * 
 * @param req - The NextRequest object representing the incoming request.
 * @returns A NextResponse object with the appropriate response for the request.
 */
export const POST = async function (req: NextRequest) {
  if (req.method == "POST") {
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
    if (!token) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    const userId = token.sub;
    const body = await req.json();
    const { newRecipe } = body;
    try {
      const recipe = await prisma.recipe.create({
        data: {
          body: newRecipe,
          owner: {
            connect: { id: userId },
          },
        },
      });
      if (recipe)
        return new NextResponse(JSON.stringify(recipe), { status: 200 });
    } catch (error) {
      return new NextResponse(
        "Error in creating a new recipe in recipes/route.ts: " + error,
        { status: 500 }
      );
    } finally {
      await prisma.$disconnect();
    }
  }
};

/**
 * Handles the DELETE request for the recipe route.
 * @param req - The NextRequest object representing the incoming request.
 * @returns A NextResponse object with the appropriate response based on the request.
 */
export const DELETE = async function (req: NextRequest) {
  if (req.method == "DELETE") {
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
    if (!token) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    const userId = token.sub;
    const { id } = await req.json();
    console.log("RECIPE ID: ", id);
    console.log("USER ID: ", userId);
    try {
      const recipe = await prisma.recipe.delete({
        where: {
          id: Number(id),
        },
      });
      if (recipe)
        return new NextResponse(JSON.stringify(recipe), { status: 200 });
    } catch (error) {
      return new NextResponse(
        "Error in deleting a recipe in recipes/route.ts: " + error,
        { status: 500 }
      );
    } finally {
      await prisma.$disconnect();
    }
  }
};
