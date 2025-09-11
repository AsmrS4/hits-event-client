import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Button } from '@mui/material';
import { dateTimeConverter } from '../../../utils/converter';
import { useAppSelector } from '../../../hooks/useAppSelector';
import type { BookingProps } from '../../../models/Booking';

export const BookingCard = (props: BookingProps) => {
    const { booking } = useAppSelector((state) => state.bookingReducer);
    const dispatch: any = useDispatch();
    const handleCancelBooking = () => {};
    React.useEffect(() => {}, []);
    return (
        <div className='flex flex-col justify-between box-border w-full border-l-6 border-l-blue-500 shadow-md rounded-sm py-3 px-5'>
            <div className='title w-full flex justify-between'>
                <span className='font-medium text-xl tracking-wide'>{props.title}</span>
                <span className='font-medium text-sm bg-blue-500 m-0 text-center text-white px-3 py-1 rounded-2xl h-7'>
                    {props.companyName}
                </span>
            </div>
            <div className='footer w-full flex flex-row justify-between items-end text-sm'>
                <div className='flex flex-col'>
                    <span className='text-md font-light m-0'>
                        Место проведения: {props.location}
                    </span>
                    <span className='text-md font-light m-0'>
                        Дата и время: {dateTimeConverter(props.date)}
                    </span>
                </div>
                <Button
                    color='error'
                    sx={{ height: '36px', fontSize: '12px' }}
                    onClick={handleCancelBooking}
                >
                    Отменить
                </Button>
            </div>
        </div>
    );
};
