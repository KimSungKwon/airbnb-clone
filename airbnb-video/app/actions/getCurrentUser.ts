import { getServerSession } from "next-auth/next";

import { authOptions } from "@/pages/api/auth/[...nextauth]";
import prisma from '@/app/libs/prismadb'

/*
*   현재 로그인한 유저 세션을 받아옴
*/

export async function getSession() {
  return await getServerSession(authOptions);
}

export default async function getCurrentUser() {
  try {
    const session = await getSession();
    // user 세션이 비어있으면
    if (!session?.user?.email) {
      return null;
    }
    // email을 통해 현재 유저를 얻음
    const currentUser = await prisma.user.findUnique({
      where: {
        email: session.user.email as string
      }
    });
    // email과 동일한게 없으면
    if (!currentUser) {
      return null;
    }

    return {
      ...currentUser,
      emailVerified: currentUser.emailVerified?.toISOString() || null,
      createdAt: currentUser.createdAt.toISOString(),
      updatedAt: currentUser.updatedAt.toISOString(),

    }

  } catch (error: any) {
    return null;
  }
}