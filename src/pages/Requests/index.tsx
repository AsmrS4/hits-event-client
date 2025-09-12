import React from 'react';
import { EmptyResult } from '../../components/Stub';
import type { ConfirmationRequest } from '../../models/Request';
import { RequestCard } from '../../components/Card/Request';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { clearSession } from '../../store/Auth/authReducer';

export const RequestsPage = () => {
    const [requestList, setRequestList] = React.useState<Array<ConfirmationRequest>>([]);
    const [isLoaded, setLoaded] = React.useState<boolean>(false);
    const dispatch: any = useDispatch();
    const fetchRequests = async () => {
        setLoaded(false);
        try {
            const response = await axios({
                url: `${import.meta.env.API_URL}/user/confirmation/list`,
                method: 'GET',
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('ACCESS_TOKEN'),
                },
            });
            const data = await response.data;
            setRequestList(data);
        } catch (error) {
            if (error.status === 401) {
                dispatch(clearSession());
            }
        }
        setLoaded(true);
    };
    React.useEffect(() => {
        if (!isLoaded) {
            fetchRequests();
        }
    }, [isLoaded]);
    return (
        <main className='w-full h-auto flex flex-col px-6 py-10'>
            <div className='flex flex-col mx-auto max-w-[768px] w-full gap-10 justify-between'>
                <div className='flex flex-row justify-between gap-4'>
                    <div className='list flex flex-col w-full gap-4'>
                        {isLoaded && requestList.length == 0 && (
                            <EmptyResult message={'Список заявок пуст'} />
                        )}
                        {requestList.map((item) => {
                            return <RequestCard key={item.id} {...item} />;
                        })}
                    </div>
                </div>
            </div>
        </main>
    );
};
