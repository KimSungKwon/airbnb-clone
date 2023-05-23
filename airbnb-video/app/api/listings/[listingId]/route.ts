import { NextResponse } from "next/server";

import getCurrentUser from "@/app/actions/getCurrentUser";
import prisma from '@/app/libs/prismadb';
/*
*   axios.delete(`/api/listings/${id}`)
*/
interface IParams {
  listingId?: string;
}

export async function DELETE(
  reqeust: Request,
  { params }: { params: IParams }
) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.error();
  }

  const { listingId } = params;

  if (!listingId || typeof listingId !== 'string') {
    throw new Error('Invalid ID');
  }

  const listings = await prisma.listing.deleteMany({
    where: {
      id: listingId,
      userId: currentUser.id
    }
  });

  return NextResponse.json(listings);
}