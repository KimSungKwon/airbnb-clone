import EmptyState from "../components/EmptyState";
import ClientOnly from "../components/ClientOnly";
import PropertiesClient from "./PropertiesClient";

import getCurrentUser from "../actions/getCurrentUser";
import getListings from "../actions/getListings";
/*
*   자신이 등록한 숙소들 확인
*/
const PropertiesPage = async () => {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    <ClientOnly>
      <EmptyState 
        title="Unauthorized"
        subtitle="Please login"
      />
    </ClientOnly>
  }
  // userId가 currentUser의 id와 일치하는 것만 가져옴
  const listings = await getListings({ userId: currentUser?.id });

  if (listings.length === 0) {
    return (
      <ClientOnly>
        <EmptyState 
          title="No properties found"
          subtitle="Looks like you have no properties."
        />
      </ClientOnly>
    )
  }

  return (
    <ClientOnly>
      <PropertiesClient
        listings={listings}
        currentUser={currentUser}
      />
    </ClientOnly>
  )
}

export default PropertiesPage;