import React from 'react';
import type { UserCardProps } from '../../../models/User';
export const GuestCard = ({ id, firstName, lastName }: UserCardProps) => {
    return (
        <div
            id={id.toString()}
            className='flex box-border w-full border-l-6 border-l-blue-500 shadow-md rounded-sm py-3 px-5'
        >
            <h2 className=''>{firstName + ' ' + lastName}</h2>
        </div>
    );
};
