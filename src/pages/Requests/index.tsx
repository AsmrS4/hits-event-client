import React from 'react';
import { EmptyResult } from '../../components/Stub';
import type { ConfirmationRequest } from '../../models/Request';
import { RequestCard } from '../../components/Card/Request';
import { useDispatch } from 'react-redux';
import { fetchRequests } from '../../store/Requests/requestAction';
import { ErrorToast } from '../../components/Toast';
import { useAppSelector } from '../../hooks/useAppSelector';

export const RequestsPage = () => {
    const [requestList, setRequestList] = React.useState<Array<ConfirmationRequest>>([]);
    const [isLoaded, setLoaded] = React.useState<boolean>(false);
    const { requests } = useAppSelector((state) => state.requestReducer);
    const dispatch: any = useDispatch();
    const fetchRequestList = async () => {
        try {
            setLoaded(false);
            dispatch(fetchRequests());
            setLoaded(true);
        } catch (error) {
            ErrorToast('Не удалось получить данные');
        }
    };
    React.useEffect(() => {
        if (!isLoaded) {
            fetchRequestList();
        } else {
            setRequestList(requests);
        }
    }, [isLoaded, requests]);
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
