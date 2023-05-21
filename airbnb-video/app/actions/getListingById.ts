import prisma from "@/app/libs/prismadb";

interface IParams {
  listingId?: string;
}

export default async function getListingById(params: IParams) {
  try {
    const { listingId } = params;

    // id가 listingId값과 같고, 조회값에 user 필드 포함시킴
    const listing = await prisma.listing.findUnique({
      where: {
        id: listingId
      },
      include: {
        user: true
      }
    })

    if (!listing) {
      return null;
    }

    // Safe 타입으로 바꾼 listing 데이터 리턴
    return {
      ...listing,
      createdAt: listing.createdAt.toISOString(),
      user: {
        ...listing.user,
        createdAt: listing.user.createdAt.toISOString(),
        updatedAt: listing.user.updatedAt.toISOString(),
        emailVerified: listing.user.emailVerified?.toISOString() || null,
      }
    }
  } catch (error: any) {
    throw new Error(error);
  }
}