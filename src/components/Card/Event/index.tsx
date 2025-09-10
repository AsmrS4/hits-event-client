import React from 'react';
import EventCard from '@models/Event';
import { dateTimeConverter } from '../../../utils/converter';

export const EventCard = (props: EventCard) => {
    return (
        <div className='flex flex-col justify-between box-border w-full border-l-6 border-l-blue-500 shadow-md rounded-sm py-3 px-5'>
            <div className='title w-full flex justify-between'>
                <span className='font-medium text-xl tracking-wide'>{props.title}</span>
                <span className='font-medium text-sm bg-blue-500 m-0 text-center text-white px-3 py-1 rounded-2xl h-7'>
                    {props.companyName}
                </span>
            </div>
            <div className='content'>
                <p className='text-md font-light text-base p-2 font-medium'>{props.description}</p>
            </div>
            <div className='footer w-full flex flex-col align-middle text-sm'>
                {props.deadline && (
                    <span className='text-md font-light'>
                        Регистрация до: {dateTimeConverter(props.deadline)}
                    </span>
                )}
                <span className='text-md font-light m-0'>Место проведения: {props.location}</span>
                <span className='text-md font-light m-0'>
                    Дата и время: {dateTimeConverter(props.date)}
                </span>
            </div>
        </div>
    );
};
