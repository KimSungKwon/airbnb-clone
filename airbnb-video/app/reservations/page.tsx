import EmptyState from "../components/EmptyState";
import ClientOnly from "../components/ClientOnly";
import ReservationsClient from "./ReservationsClient";

import getCurrentUser from "../actions/getCurrentUser";
import getReservations from "../actions/getReservations";
/*
*   Listing을 작성한 숙소주인(작성자)이 소바자가 자신의 숙소에 예약해논걸 확인하는 페이지
*/
const ReservationsPage = async () => {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    <ClientOnly>
      <EmptyState 
        title="Unauthorized"
        subtitle="Please login"
      />
    </ClientOnly>
  }
  // authorId는 listing의 id
  const reservations = await getReservations({ authorId: currentUser?.id });

  if (reservations.length === 0) {
    return (
      <ClientOnly>
        <EmptyState 
          title="No reservations found"
          subtitle="Looks like you have no reservations on your property."
        />
      </ClientOnly>
    )
  }

  return (
    <ClientOnly>
      <ReservationsClient 
        reservations={reservations}
        currentUser={currentUser}
      />
    </ClientOnly>
  )
}

export default ReservationsPage;