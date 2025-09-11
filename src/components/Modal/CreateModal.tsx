import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    TextField,
    useMediaQuery,
    useTheme,
} from '@mui/material';
import React from 'react';
import { useForm } from 'react-hook-form';
import { companySchema, type CompanySchema } from './index.config';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAppSelector } from '../../hooks/useAppSelector';
import axios from 'axios';
import { ErrorToast, InfoToast, SuccessToast } from '../Toast';
import { useDispatch } from 'react-redux';
import { fetchCompanies } from '../../store/Company/companyAction';
import { clearSession } from '../../store/Auth/authReducer';

interface ModalProps {
    isOpen: boolean;
    handleClick: () => void;
}
interface CreateCompany {
    name: string;
}

export const CreateModal = ({ isOpen, handleClick }: ModalProps) => {
    const {
        register,
        handleSubmit,
        setValue,
        getValues,
        formState: { errors },
    } = useForm<CompanySchema>({
        resolver: zodResolver(companySchema),
        defaultValues: {
            name: '',
        },
    });
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
    const dispatch: any = useDispatch();
    const handleClose = () => {
        setValue('name', '');
        handleClick();
    };
    const createCompany = async (form: CreateCompany) => {
        try {
            await axios({
                url: `${import.meta.env.API_URL}/company`,
                method: 'POST',
                data: {
                    ...form,
                },
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('ACCESS_TOKEN'),
                },
            });
            dispatch(fetchCompanies());
            InfoToast('Добавлен новый партнер');
        } catch (error) {
            if (error.status === 401) {
                dispatch(clearSession());
                return;
            } else {
                ErrorToast('Что-то пошло не так');
            }
        }
    };
    const handleForm = async () => {
        try {
            await createCompany(getValues());
        } catch (e) {
            ErrorToast('Не удалось обработать запрос');
        }
        handleClose();
    };
    return (
        <>
            <Dialog
                fullScreen={fullScreen}
                open={isOpen}
                onClose={handleClose}
                aria-labelledby='responsive-dialog-title'
            >
                <DialogTitle id='responsive-dialog-title'>
                    {'Редактировать данные пользователя'}
                </DialogTitle>
                <DialogContent>
                    <form className='flex flex-col gap-3 p-2' onSubmit={handleSubmit(handleForm)}>
                        <TextField
                            size='small'
                            label='Имя'
                            fullWidth
                            error={!!errors.name}
                            helperText={errors.name?.message}
                            {...register('name')}
                        />
                        <DialogActions>
                            <Button
                                autoFocus
                                variant='outlined'
                                color='error'
                                type='button'
                                onClick={handleClose}
                            >
                                Отмена
                            </Button>
                            <Button type='submit' variant='contained' autoFocus>
                                Создать
                            </Button>
                        </DialogActions>
                    </form>
                </DialogContent>
            </Dialog>
        </>
    );
};
