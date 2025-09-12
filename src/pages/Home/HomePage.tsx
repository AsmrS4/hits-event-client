import React from 'react';
import { useDispatch } from 'react-redux';

import { Field } from '../../components/Field';
import type { EventProps } from '../../models/Event';
import { EventCard } from '../../components/Card/Event';
import { EmptyResult } from '../../components/Stub';
import { useAppSelector } from '../../hooks/useAppSelector';
import { fetchEvents } from '../../store/Events/eventAction';
import { fetchBookings } from '../../store/Booking/bookingActions';

const HomePage = () => {
    const [searchValue, setSearchValue] = React.useState<string>('');
    const [eventList, setEvents] = React.useState<Array<EventProps>>([]);
    const { events, isLoaded } = useAppSelector((state) => state.eventReducer);
    const { role, login } = useAppSelector((state) => state.authReducer);
    const dispatch: any = useDispatch();
    React.useEffect(() => {
        if (isLoaded) {
            setEvents(events);
        } else {
            if (role === 'STUDENT') dispatch(fetchBookings());
            dispatch(fetchEvents());
        }
    }, [isLoaded, login]);
    React.useEffect(() => {
        setEvents(
            searchValue.trim() != ''
                ? eventList.filter((item: EventProps) =>
                      item.title.toLowerCase().includes(searchValue.toLowerCase()),
                  )
                : events,
        );
    }, [searchValue]);
    return (
        <main className='w-full h-auto flex flex-col  px-6 py-10'>
            <div className='flex flex-col mx-auto max-w-[768px] w-full gap-10 justify-between'>
                <Field
                    size='small'
                    variant='outlined'
                    name='Поиск'
                    placeholder='Поиск по названию...'
                    value={searchValue}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                        setSearchValue(event.target.value);
                    }}
                />
                <div className='list flex flex-col w-full gap-4'>
                    {isLoaded && eventList.length == 0 && (
                        <EmptyResult message={'Мероприятия не найдены'} />
                    )}
                    {eventList.map((item) => {
                        return <EventCard key={item.id} {...item} />;
                    })}
                </div>
            </div>
        </main>
    );
};

export default HomePage;
