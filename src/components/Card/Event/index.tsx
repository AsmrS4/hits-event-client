import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';

import { type EventProps } from '../../../models/Event';
import { dateTimeConverter, isAfterDeadline } from '../../../utils/converter';
import { useAppSelector } from '../../../hooks/useAppSelector';
import { registerOnEvent } from '../../../api/Booking/bookingApi';
import { ErrorToast, InfoToast } from '../../Toast';
import { clearSession } from '../../../store/Auth/authReducer';
import type { BookingProps } from '../../../models/Booking';

export const EventCard = (props: EventProps) => {
    const { role } = useAppSelector((state) => state.authReducer);
    const { booking } = useAppSelector((state) => state.bookingReducer);
    const [hasRegistry, setHasRegistry] = React.useState<boolean>(false);
    const navigate: any = useNavigate();
    const dispatch: any = useDispatch();
    const handleGuestsClick = () => {
        navigate(`/event/${props.id}/guests`);
    };
    const handleRegisterClick = async () => {
        try {
            await registerOnEvent(props.id);
            setHasRegistry(true);
            InfoToast('Раздел "Билеты" обновлен');
        } catch (error) {
            if (error.status === 401) {
                dispatch(clearSession());
            } else {
                ErrorToast('Не удалось выполнить запрос');
            }
        }
    };
    const handleHasRegistry = () => {
        setHasRegistry(booking.some((item: BookingProps) => item.eventId == props.id));
    };
    React.useEffect(() => {
        handleHasRegistry();
    }, []);
    return (
        <div className='flex flex-col justify-between box-border w-full border-l-6 border-l-blue-500 shadow-md rounded-sm py-3 px-5'>
            <div className='title w-full flex justify-between'>
                <span className='font-medium text-xl tracking-wide'>{props.title}</span>
                <span className='font-medium text-sm bg-blue-500 m-0 text-center text-white px-3 py-1 rounded-2xl h-7'>
                    {props.companyName}
                </span>
            </div>
            <div className='content'>
                <p className='text-md font-light text-base p-2'>{props.description}</p>
            </div>
            <div className='footer w-full flex flex-row justify-between items-end text-sm'>
                <div className='flex flex-col'>
                    {props.deadline && (
                        <span className='text-md font-light'>
                            Регистрация до: {dateTimeConverter(props.deadline)}
                        </span>
                    )}
                    <span className='text-md font-light m-0'>
                        Место проведения: {props.location}
                    </span>
                    <span className='text-md font-light m-0'>
                        Дата и время: {dateTimeConverter(props.date)}
                    </span>
                </div>
                {role === 'DEAN' && (
                    <Button sx={{ height: '36px', fontSize: '12px' }} onClick={handleGuestsClick}>
                        Открыть список
                    </Button>
                )}
                {role === 'STUDENT' &&
                    !isAfterDeadline(props.deadline) &&
                    (!hasRegistry ? (
                        <Button
                            sx={{ height: '36px', fontSize: '12px' }}
                            onClick={handleRegisterClick}
                        >
                            Регистрация
                        </Button>
                    ) : (
                        <Button
                            color='success'
                            sx={{ height: '36px', fontSize: '12px' }}
                            disabled={true}
                        >
                            Вы зарегистрированы
                        </Button>
                    ))}
            </div>
        </div>
    );
};
