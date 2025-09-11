import React from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import type { UserCardProps } from '../../models/User';
import { GuestCard } from '../../components/Card/Guest';
import { EmptyResult } from '../../components/Stub';

export const GuestsPage = () => {
    const { eventId } = useParams();
    const [guestList, setList] = React.useState<Array<UserCardProps>>([]);
    const [isEmpty, setIsEmpty] = React.useState<boolean>(false);
    const [isLoaded, setLoaded] = React.useState<boolean>(false);
    const fetchGuests = async () => {
        try {
            const response = await axios({
                url: `${import.meta.env.API_URL}/event/guests/${eventId}`,
                method: 'GET',
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('ACCESS_TOKEN'),
                },
            });
            const data = await response.data;
            setLoaded(true);
            setList(data);
            if (data.length == 0) {
                setIsEmpty(true);
            }
        } catch (error) {}
    };
    React.useEffect(() => {
        if (!isLoaded) {
            fetchGuests();
        }
    }, [isLoaded]);
    return (
        <main className='w-full h-auto flex flex-col px-6 py-10'>
            <div className='flex flex-col mx-auto max-w-[524px] w-full gap-10 justify-between'>
                <div className='flex flex-row justify-between gap-4'>
                    <div className='list flex flex-col w-full gap-4'>
                        {isEmpty && <EmptyResult message='Список студентов пуст' />}
                        {guestList.map((item: UserCardProps) => {
                            return <GuestCard key={item.id} {...item} />;
                        })}
                    </div>
                </div>
            </div>
        </main>
    );
};
