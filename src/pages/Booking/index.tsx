import React from 'react';
import type { BookingProps } from '../../models/Booking';
import { BookingCard } from '../../components/Card/Booking';
import { useAppSelector } from '../../hooks/useAppSelector';
import { EmptyResult } from '../../components/Stub';

export const BookingsPage = () => {
    const [bookingList, setBookingList] = React.useState<Array<BookingProps>>([]);
    const { booking } = useAppSelector((state) => state.bookingReducer);
    React.useEffect(() => {
        setBookingList(booking);
    }, []);
    React.useEffect(() => {
        setBookingList(booking);
    }, [booking]);
    return (
        <main className='w-full h-auto flex flex-col  px-6 py-10'>
            <div className='flex flex-col mx-auto max-w-[768px] w-full gap-10 justify-between'>
                <div className='list flex flex-col w-full gap-4'>
                    {bookingList.length == 0 && (
                        <EmptyResult message={'У вас нет записей на мероприятия'} />
                    )}
                    {bookingList.map((item) => {
                        return <BookingCard key={item.id} {...item} />;
                    })}
                </div>
            </div>
        </main>
    );
};
