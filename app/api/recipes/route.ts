import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import { PrismaClient } from "@prisma/client";


const prisma = new PrismaClient();

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

export const POST = async function (req: NextRequest) {
  if (req.method == "POST") {
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
    if (!token) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    const userId = token.sub;
    // get the body from req
    const body = await req.json();
    const { newRecipe } = body; 
    try {
      const recipe = await prisma.recipe.create({
        data: {
          body: newRecipe,
          owner: {
            connect: { id: userId },
            }
        },
      });
      if (recipe) return new NextResponse(JSON.stringify(recipe), { status: 200 });
    } catch (error) {
      return new NextResponse(
        "Error in creating a new recipe in recipes/route.ts: " + error,
        { status: 500 }
      );
    } finally {
      await prisma.$disconnect();
    }
  }
}

