import prisma from "@/app/libs/prismadb";

/*
*   현재 DB에 있는 Listing들을 받아옴
*/
export default async function getListings() {
  try {
    const listings = await prisma.listing.findMany({
      orderBy: {
        createdAt: 'desc'
      }
    });

    return listings
  } catch (error: any) {
    throw new Error(error);
  }
}