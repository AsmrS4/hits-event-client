import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { profileSchema, type ProfileSchema } from './index.config';
import { useDispatch } from 'react-redux';
import type { EditProfileProps, ProfileProps } from '../../models/Auth';
import { ErrorToast, SuccessToast } from '../Toast';
import axios from 'axios';
import { TextField } from '@mui/material';

interface ModalProps {
    isOpen: boolean;
    handleClick: () => void;
}

export const EditProfileModal = ({ isOpen, handleClick }: ModalProps) => {
    const {
        register,
        handleSubmit,
        getValues,
        setValue,
        formState: { errors },
    } = useForm<ProfileSchema>({
        resolver: zodResolver(profileSchema),
        defaultValues: {
            firstName: '',
            lastName: '',
        },
    });
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

    const handleClose = () => {
        handleClick();
    };
    const getProfile = async () => {
        try {
            const response = await axios({
                url: `${import.meta.env.API_URL}/user/me`,
                method: 'GET',
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('ACCESS_TOKEN'),
                },
            });
            setValue('firstName', response.data.firstName);
            setValue('lastName', response.data.lastName);
        } catch (error) {}
    };
    React.useEffect(() => {
        getProfile();
    }, []);
    const editProfile = async (form: EditProfileProps) => {
        try {
            await axios({
                url: `${import.meta.env.API_URL}/user/me`,
                method: 'PUT',
                data: {
                    ...form,
                },
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('ACCESS_TOKEN'),
                },
            });
        } catch (error) {}
    };
    const handleForm = async () => {
        try {
            await editProfile(getValues());
            SuccessToast('Данные обновлены');
        } catch (e) {
            ErrorToast('Не удалось обработать запрос');
        }
        handleClose();
    };
    return (
        <React.Fragment>
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
                            error={!!errors.firstName}
                            helperText={errors.firstName?.message}
                            {...register('firstName')}
                        />
                        <TextField
                            size='small'
                            label='Фамилия'
                            fullWidth
                            error={!!errors.lastName}
                            helperText={errors.lastName?.message}
                            {...register('lastName')}
                        />
                        <DialogActions>
                            <Button autoFocus variant='text' type='button' onClick={handleClose}>
                                Отмена
                            </Button>
                            <Button type='submit' variant='contained' autoFocus>
                                Изменить
                            </Button>
                        </DialogActions>
                    </form>
                </DialogContent>
            </Dialog>
        </React.Fragment>
    );
};
