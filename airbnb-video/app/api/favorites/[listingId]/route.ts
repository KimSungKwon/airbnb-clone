import { NextResponse } from "next/server";

import prisma from "@/app/libs/prismadb";
import getCurrentUser from "@/app/actions/getCurrentUser";

interface IParams {
  listingId?: string;
}

export async function POST(
  request: Request, 
  { params }: { params: IParams }
) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.error();
  }

  const { listingId } = params;

  // listingId가 없거나 undefined이면 Error
  if (!listingId || typeof listingId !== 'string') {
    throw new Error('Invalid ID');
  }
  
  // 현재 유저의 favoriteIds 리스트에 현재 좋아요한 게시물의 id를 추가
  let favoriteIds = [...(currentUser.favoriteIds || [])];
  favoriteIds.push(listingId)

  // DB의 유저 정보 변경
  const user = await prisma.user.update({
    where: {
      id: currentUser.id
    },
    data: {
      favoriteIds
    }
  });

  return NextResponse.json(user);
}

export async function DELETE(
  request: Request,
  { params }: { params: IParams}
) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.error();
  }

  const { listingId } = params;

  // listingId가 없거나 undefined이면 Error
  if (!listingId || typeof listingId !== 'string') {
    throw new Error('Invalid ID');
  }

  // 현재 유저의 favoriteIds 리스트에 현재 좋아요한 게시물의 id를 제거
  let favoriteIds = [...(currentUser.favoriteIds || [])];
  favoriteIds = favoriteIds.filter((id) => id !== listingId);

  // DB의 유저 정보 변경
  const user = await prisma.user.update({
    where: {
      id: currentUser.id
    },
    data: {
      favoriteIds
    }
  });

  return NextResponse.json(user);
}