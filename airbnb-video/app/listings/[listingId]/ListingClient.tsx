'use client'; // categories가 client-side 라서

import { Range } from "react-date-range";
import { toast } from "react-hot-toast";
import axios from "axios";
import { differenceInCalendarDays, eachDayOfInterval } from "date-fns";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useMemo, useState } from "react";

import { SafeListing, SafeUser, SafeReservation } from "@/app/types";
import { categories } from "@/app/components/navbar/Categories";
import Container from "@/app/components/Container";
import ListingHead from "@/app/components/listings/ListingHead";
import ListingInfo from "@/app/components/listings/ListingInfo";
import ListingReservation from "@/app/components/listings/ListingReservation";

import useLoginModal from "@/app/hooks/useLoginModal";


const initialDateRange = {
  startDate: new Date(),
  endDate: new Date(),
  key: 'selection'
};

interface ListingClientProps {
  reservations?: SafeReservation[];
  listing: SafeListing & {
    user: SafeUser
  };
  currentUser?: SafeUser | null;
}

const ListingClient: React.FC<ListingClientProps> = ({ reservations=[], listing, currentUser }) => {
  const loginModal = useLoginModal();
  const router = useRouter();

  // 예약된 날짜들 리스트 가져와서 range 설정해놓기
  const disabledDates = useMemo(() => {
    let dates: Date[] = [];

    reservations.forEach((reservation) => {
      const range = eachDayOfInterval({
        start: new Date(reservation.startDate),
        end: new Date(reservation.endDate)
      });

      dates = [...dates, ...range];
    })

    return dates;
  }, [reservations])

  const [isLoading, setIsLoading] = useState(false);
  const [totalPrice, setTotalPrice] = useState(listing.price);
  const [dateRange, setDateRange] = useState<Range>(initialDateRange);

  // 예약 하기
  const onCreateReservation = useCallback(() => {
    if (!currentUser) {
      return loginModal.onOpen();
    }

    setIsLoading(true);

    axios.post('/api/reservations', {
      totalPrice,
      startDate: dateRange.startDate,
      endDate: dateRange.endDate,
      listingId: listing?.id
    })
    .then(() => {
      toast.success('Listing reserved!');
      setDateRange(initialDateRange);
      // Redirect to /trips
      router.push('/trips');
    })
    .catch(() => {
      toast.error('Something went wrong')
    })
    .finally(() => {
      setIsLoading(false);
    })
  }, [totalPrice, dateRange, listing?.id, currentUser, router, loginModal])

  // 숙박일x가격으로 총 가격 계산
  useEffect(() => {
    if (dateRange.startDate && dateRange.endDate) {
      const dayCount = differenceInCalendarDays(dateRange.endDate, dateRange.startDate);

      if (dayCount && listing.price) {
        setTotalPrice(dayCount * listing.price);
      }
    }
  }, [dateRange, listing.price]) // Calendar에 의해 dateRange가 바뀌면 totalPrice 업뎃

  // categories중에 props로 받은 listing과 일치하는 카테고리 받아옴
  const category = useMemo(() => { 
    return categories.find((item) => item.label === listing.category);
  }, [listing.category]);

  return (  
    <Container>
      <div className="max-w-screen-lg mx-auto">
        <div className="flex flex-col gap-6">
          <ListingHead 
            title={listing.title}
            imageSrc={listing.imageSrc}
            locationValue={listing.locationValue}
            id={listing.id}
            currentUser={currentUser}
          />
          <div className="grid grid-cols-1 md:grid-cols-7 md:gap-10 mt-6">
            <ListingInfo
              user={listing.user}
              category={category}
              description={listing.description}
              roomCount={listing.roomCount}
              bathroomCount={listing.bathroomCount}
              guestCount={listing.guestCount}
              locationValue={listing.locationValue}
            />
            <div className="order-first mb-10 md:order-last md:col-span-3">
              <ListingReservation 
                price={listing.price}
                totalPrice={totalPrice}
                onChangeDate={(value) => setDateRange(value)}
                onSubmit={onCreateReservation}
                dateRange={dateRange}
                disabled={isLoading}
                disabledDates={disabledDates}
              />
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
}
 
export default ListingClient;