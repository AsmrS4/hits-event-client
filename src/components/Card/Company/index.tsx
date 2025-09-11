import React from 'react';
import type { CompanyProps } from '../../../models/Company';

export const CompanyCard = ({ id, name }: CompanyProps) => {
    return (
        <div
            id={id.toString()}
            className='flex box-border md:max-w-[368px] sm:max-w-[600px] w-full border-l-6 border-l-blue-500 shadow-md rounded-sm py-3 px-5'
        >
            <h2 className=''>{name}</h2>
        </div>
    );
};
