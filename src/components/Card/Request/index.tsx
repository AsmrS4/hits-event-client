import React from 'react';
import type { ConfirmationRequest } from '../../../models/Request';
import { Button } from '@mui/material';
import DoneIcon from '@mui/icons-material/Done';
import ClearIcon from '@mui/icons-material/Clear';
import { confirmAccount, rejectAccount } from '../../../api/Request/requestApi';

const roleMapper = {
    STUDENT: 'Студент',
    MANAGER: 'Менеджер',
};

export const RequestCard = ({ id, firstName, lastName, role }: ConfirmationRequest) => {
    const handleConfirmRequest = () => {};
    const handleRejectRequest = () => {};
    return (
        <div
            id={id.toString()}
            className='flex flex-row justify-between items-center box-border w-full border-l-6 border-l-blue-500 shadow-md rounded-sm py-3 px-5'
        >
            <div className='flex flex-col items-start gap-1 font-medium'>
                <span className='text-blue-500'>{roleMapper[role]}</span>
                <h2 className=''>{firstName + ' ' + lastName}</h2>
            </div>
            <div className='flex flex-row gap-2'>
                <Button
                    color='success'
                    variant='outlined'
                    sx={{
                        boxSizing: 'border-box',
                        fontSize: '12px',
                        height: '28px',
                        width: '32px',
                        padding: '8px',
                    }}
                >
                    <DoneIcon />
                </Button>
                <Button
                    color='error'
                    variant='outlined'
                    sx={{
                        boxSizing: 'border-box',
                        fontSize: '12px',
                        height: '28px',
                        width: '32px',
                        padding: '8px',
                    }}
                >
                    <ClearIcon />
                </Button>
            </div>
        </div>
    );
};
