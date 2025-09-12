import React from 'react';
import { Field } from '../../components/Field';
import type { CompanyProps } from '../../models/Company';
import { CompanyCard } from '../../components/Card/Company';
import { Button } from '@mui/material';
import { CreateModal } from '../../components/Modal/CreateModal';
import { useAppSelector } from '../../hooks/useAppSelector';
import { useDispatch } from 'react-redux';
import { fetchCompanies } from '../../store/Company/companyAction';

export const CompanyPage = () => {
    const { companies, isLoaded } = useAppSelector((state) => state.companyReducer);
    const [searchValue, setSearchValue] = React.useState<string>('');
    const [filteredCompanies, setCompanies] = React.useState<Array<CompanyProps>>([]);
    const [isOpen, setIsOpen] = React.useState<boolean>(false);
    const dispatch: any = useDispatch();

    React.useEffect(() => {
        if (isLoaded) {
            setCompanies(companies);
        } else {
            dispatch(fetchCompanies());
        }
    }, [isLoaded]);

    React.useEffect(() => {
        setCompanies(companies);
    }, [companies]);

    React.useEffect(() => {
        if (searchValue.trim() !== '') {
            setCompanies(
                filteredCompanies.filter((item) =>
                    item.name.toLowerCase().includes(searchValue.toLowerCase()),
                ),
            );
        } else {
            setCompanies(companies);
        }
    }, [searchValue]);

    return (
        <main className='w-full h-auto flex flex-col px-6 py-10'>
            <div className='flex flex-col mx-auto max-w-[768px] w-full gap-10 justify-between'>
                <div className='flex flex-row justify-between gap-4'>
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
                    <Button
                        variant='contained'
                        onClick={() => {
                            setIsOpen(true);
                        }}
                    >
                        Добавить
                    </Button>
                </div>
                <div className='list flex flex-col sm:grid sm:grid-cols-2  w-full gap-2'>
                    {filteredCompanies.map((item) => {
                        return <CompanyCard key={item.id} {...item} />;
                    })}
                </div>
            </div>
            <CreateModal
                isOpen={isOpen}
                handleClick={() => {
                    setIsOpen(false);
                }}
            />
        </main>
    );
};
