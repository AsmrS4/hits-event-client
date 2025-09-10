import React from 'react';
import EventCard from '@models/Event';

export const EventCard = (props: EventCard) => {
    return (
        <div className='flex flex-col justify-between box-border w-full border-l-6 border-l-blue-500 shadow-md rounded-sm p-3'>
            <div className='title w-full font-medium text-xl'>{props.title}</div>
            <div className='content'>
                <p className='text-md font-light'>{props.description}</p>
                {props.deadline && (
                    <span className='text-md font-light'>Регистрация до: {props.deadline}</span>
                )}
            </div>
            <div className='footer w-full flex flex-row align-middle gap-2'>
                <span className='text-md font-light'>{props.location}</span>
                <span className='text-md font-light'>{props.date}</span>
            </div>
        </div>
    );
};
