import React from 'react';
import type { BookingProps } from '../../models/Booking';
import { BookingCard } from '../../components/Card/Booking';

export const BookingsPage = () => {
    const [bookingList, setBookingList] = React.useState<Array<BookingProps>>([]);

    return (
        <main className='w-full h-auto flex flex-col  px-6 py-10'>
            <div className='flex flex-col mx-auto max-w-[768px] w-full gap-10 justify-between'>
                <div className='list flex flex-col w-full gap-4'>
                    {bookingList.map((item) => {
                        return <BookingCard key={item.id} {...item} />;
                    })}
                </div>
            </div>
        </main>
    );
};
