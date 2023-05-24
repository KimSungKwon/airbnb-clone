import prisma from "@/app/libs/prismadb";

/*
*   현재 DB에 있는 Listing들을 받아옴
*/
export interface IListingsParams {
  userId?: string;
  locationValue?: string;
  guestCount?: number;
  roomCount?: number;
  bathroomCount?: number;
  startDate?: string;
  endDate?: string
  category?: string
}

export default async function getListings(params: IListingsParams) {
  try {
    const { userId, locationValue, guestCount, roomCount, bathroomCount, startDate, endDate, category } = params;

    let query: any = {};

    if (userId) {
      query.userId = userId;
    }
    // Filtering
    if (category) {
      query.category = category;
    }

    if (roomCount) {
      query.roomCount = {
        gte: +roomCount // to string
      }
    }

    if (guestCount) {
      query.guestCount = {
        gte: +guestCount // to string
      }
    }

    if (bathroomCount) {
      query.bathroomCount = {
        gte: +bathroomCount // to string
      }
    }

    if (locationValue) {
      query.locationValue = locationValue;
    }

    if (startDate && endDate) {
      query.NOT = { // reverse filtering. 아래 설정한 
        reservations: {
          some: {
            OR: [ // lte: 이하. gte: 이상
              {   // 끝나는 날이 startDate 이상, 시작하는 날이 endDate 이하 = 
                endDate: { gte: startDate },
                startDate: { lte: endDate },
              },
              {
                startDate: { lte: endDate },
                endDate: { gte: endDate },
              }
            ]
          }
        }
      }
    }

    const listings = await prisma.listing.findMany({
      where: query,
      orderBy: {
        createdAt: 'desc'
      }
    });

    const safeListings = listings.map((listing) => ({
      ...listing,
      createdAt: listing.createdAt.toISOString(),
    }));

    return safeListings;
  } catch (error: any) {
    throw new Error(error);
  }
}