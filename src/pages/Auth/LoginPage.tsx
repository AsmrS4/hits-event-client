import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button, TextField, Link } from '@mui/material';
import { loginSchema, type LoginSchema } from './index.config';

import type { LoginProps } from '@models/Auth';
import { useAppSelector } from '@hooks/useAppSelector';
import { authorizeUser } from '@store/Auth/authAction';
import { setErrorMessage } from '@store/Auth/authReducer';
import { ErrorToast, SuccessToast } from '@components/Toast';

const LoginPage = () => {
    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginSchema>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            login: '',
            password: '',
        },
    });
    const { error, isAuth } = useAppSelector((state) => state.authReducer);
    const dispatch: any = useDispatch();
    const navigate = useNavigate();
    const handleForm = (form: LoginProps) => {
        try {
            dispatch(authorizeUser(form));
        } catch (e) {
            ErrorToast('Не удалось обработать запрос');
        }
    };
    React.useEffect(() => {
        if (isAuth) {
            SuccessToast('Добро пожаловать');
            navigate('/');
        }
    }, [isAuth]);
    React.useEffect(() => {
        if (error) {
            ErrorToast(error);
            dispatch(setErrorMessage(null));
        }
    }, [error]);
    return (
        <main className='box-border flex flex-col justify-center w-full px-3 h-screen'>
            <div className='box-border w-full h-full flex flex-col pt-12 items-center'>
                <div className='box-border max-w-[500px] w-full h-auto flex flex-col items-start px-3 gap-6'>
                    <h2 className='text-4xl w-auto font-bold text-neutral-800 mx-0 my-0'>
                        Авторизация
                    </h2>
                    <span className='text-base w-auto font-normal text-gray-800'>
                        Введите учетные данные для входа в систему
                    </span>
                    <form
                        className='box-border flex flex-col max-w-md w-full gap-y-6'
                        onSubmit={handleSubmit(handleForm)}
                    >
                        <Controller
                            name='login'
                            control={control}
                            render={({ field: { ref, ...field } }) => (
                                <TextField
                                    {...field}
                                    size='small'
                                    label='Логин'
                                    inputRef={ref}
                                    fullWidth
                                    error={!!errors.login}
                                    helperText={errors.login?.message}
                                />
                            )}
                        />
                        <Controller
                            name='password'
                            control={control}
                            render={({ field: { ref, ...field } }) => (
                                <TextField
                                    {...field}
                                    size='small'
                                    type='password'
                                    label='Пароль'
                                    inputRef={ref}
                                    fullWidth
                                    error={!!errors.password}
                                    helperText={errors.password?.message}
                                />
                            )}
                        />
                        <Link className='w-full flex justify-center'>
                            <span className='mx-auto cursor-pointer'>Создать аккаунт</span>
                        </Link>
                        <Button type='submit' variant='contained'>
                            Войти
                        </Button>
                    </form>
                </div>
            </div>
        </main>
    );
};

export default LoginPage;
